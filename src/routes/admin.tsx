import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PLOTS, PLANS, formatINR } from "@/lib/data";
import { toast } from "sonner";
import { FileText, Map, Shield, Users, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: string;
  property_id?: string;
  property_name?: string;
}

function AdminPage() {
  const { role, user, logout } = useAuth();
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (role !== "SuperUser") {
      toast.error("Unauthorized. Admin access required.");
      navigate({ to: "/auth" });
    }
  }, [role, navigate]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      if (supabase) {
        const { data, error } = await supabase
          .from("inquiries")
          .select("*")
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        setInquiries(data || []);
      } else {
        // Fallback mock data
        setInquiries([
          {
            id: "1",
            created_at: new Date().toISOString(),
            name: "Rajesh Kumar",
            email: "rajesh@gmail.com",
            phone: "+91 9876543210",
            message: "I am interested in Cedar Crest Plot A. Please contact me regarding the pricing details and viewing times.",
            type: "plot",
            property_name: "Cedar Crest — Plot A"
          },
          {
            id: "2",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            name: "Anjali Rao",
            email: "anjali.rao@yahoo.com",
            phone: "+91 9123456789",
            message: "Requesting detailed drawings and floor layouts for the Magnolia Heights floor plans.",
            type: "plan",
            property_name: "Atelier I — Studio Villa"
          }
        ]);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Error loading inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "SuperUser") {
      fetchInquiries();
    }
  }, [role]);

  if (role !== "SuperUser") {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-[1480px] mx-auto container-edge py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--gold)]/10 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[var(--gold)]" />
              <span className="eyebrow">Super User Dashboard</span>
            </div>
            <h1 className="font-display text-4xl mt-2 text-slate-800">Administrative Portal</h1>
            <p className="text-sm text-[var(--muted-sage)] mt-1">Logged in as {user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchInquiries} className="border-[var(--gold)]/20">
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reload
            </Button>
            <Button variant="destructive" size="sm" onClick={() => logout().then(() => navigate({ to: "/" }))}>
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="inquiries" className="w-full">
          <TabsList className="bg-[var(--forest)]/50 p-1 mb-8">
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-white">
              <FileText className="w-4 h-4 mr-2" /> Inquiries ({inquiries.length})
            </TabsTrigger>
            <TabsTrigger value="plots" className="data-[state=active]:bg-white">
              <Map className="w-4 h-4 mr-2" /> Plots & Plans Inventory
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inquiries" className="space-y-4">
            <Card className="border border-[var(--gold)]/15">
              <CardHeader>
                <CardTitle className="text-xl font-display">Customer Inquiries</CardTitle>
                <CardDescription>All messages sent via the contact or registration forms</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="py-12 text-center text-slate-500 font-mono">Loading inquiries...</div>
                ) : inquiries.length === 0 ? (
                  <div className="py-12 text-center text-slate-500">No inquiries found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[120px]">Date</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Contact info</TableHead>
                          <TableHead>Interest Type</TableHead>
                          <TableHead>Property</TableHead>
                          <TableHead className="max-w-xs">Message</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inquiries.map((inq) => (
                          <TableRow key={inq.id} className="hover:bg-slate-50/50">
                            <TableCell className="font-mono text-xs text-slate-500">
                              {new Date(inq.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="font-medium text-slate-800">{inq.name}</TableCell>
                            <TableCell className="text-xs">
                              <div>{inq.email}</div>
                              <div className="text-[var(--gold)] mt-0.5">{inq.phone}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={inq.type === "plot" ? "default" : "secondary"}>
                                {inq.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm font-display">{inq.property_name || "General Contact"}</TableCell>
                            <TableCell className="text-xs text-slate-600 max-w-xs truncate" title={inq.message}>
                              {inq.message}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plots">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border border-[var(--gold)]/15">
                <CardHeader>
                  <CardTitle className="text-xl font-display">Plots Portfolio</CardTitle>
                  <CardDescription>Available, reserved and completed inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plot Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Size (sqft)</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {PLOTS.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium font-display text-slate-800">{p.name}</TableCell>
                          <TableCell className="text-xs">{p.location}</TableCell>
                          <TableCell className="text-xs font-mono">{p.size.toLocaleString()}</TableCell>
                          <TableCell className="text-xs font-mono text-[var(--gold)]">{formatINR(p.price)}</TableCell>
                          <TableCell>
                            <Badge className={
                              p.status === "Available" ? "bg-emerald-500 text-white" :
                              p.status === "Reserved" ? "bg-amber-500 text-white" : "bg-slate-400 text-white"
                            }>
                              {p.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border border-[var(--gold)]/15">
                <CardHeader>
                  <CardTitle className="text-xl font-display">House Plans</CardTitle>
                  <CardDescription>Bespoke configurations ready to deploy</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plan Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Config</TableHead>
                        <TableHead>Base Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {PLANS.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium font-display text-slate-800">{p.name}</TableCell>
                          <TableCell><Badge variant="outline">{p.category}</Badge></TableCell>
                          <TableCell className="text-xs font-mono">{p.bedrooms}B / {p.bathrooms}B · {p.area} sqft</TableCell>
                          <TableCell className="text-xs font-mono text-[var(--gold)]">{formatINR(p.price)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
