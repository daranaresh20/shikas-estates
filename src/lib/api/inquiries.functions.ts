import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inquiryInputSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string(),
  message: z.string(),
  newsletter: z.boolean().optional(),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator(inquiryInputSchema)
  .handler(async ({ data }) => {
    try {
      // SECURITY: Import server-only admin client inside the server handler
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      const { data: insertedData, error } = await supabaseAdmin.from("inquiries").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: `${data.subject}: ${data.message}${data.newsletter ? " (Subscribed to Private List)" : ""}`,
        },
      ]).select();

      if (error) {
        console.error("[CRM Lead Capture Error]:", error);
        throw new Error(error.message);
      }

      return { success: true, leadId: insertedData?.[0]?.id };
    } catch (error: any) {
      console.error("[CRM Server Handler Crash]:", error);
      return { success: false, error: error.message || "Failed to process lead securely" };
    }
  });
