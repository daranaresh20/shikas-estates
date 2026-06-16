import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { formatINR } from "@/lib/data";
import { getPlots, savePlot, deletePlot, getPlans, savePlan, deletePlan, ExtendedPlot, ExtendedPlan } from "@/lib/inventoryService";
import { toast } from "sonner";
import { FileText, Map, Shield, RefreshCw, Edit, Trash2, Plus, X } from "lucide-react";

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

  // Dynamic products state
  const [plots, setPlots] = useState<ExtendedPlot[]>([]);
  const [plans, setPlans] = useState<ExtendedPlan[]>([]);

  // Modals state
  const [isPlotModalOpen, setIsPlotModalOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<ExtendedPlot | null>(null);

  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<ExtendedPlan | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (role !== "SuperUser") {
      toast.error("Unauthorized. Admin access required.");
      navigate({ to: "/auth" });
    }
  }, [role, navigate]);

  // Load inquiries and products
  const loadData = () => {
    setPlots(getPlots());
    setPlans(getPlans());
    fetchInquiries();
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      let mergedList: Inquiry[] = [];

      // 1. Fetch from Supabase if active
      if (supabase) {
        try {
          const { data, error } = await supabase
            .from("inquiries")
            .select("*")
            .order("created_at", { ascending: false });
          
          if (!error && data) {
            mergedList = data.map((item: any) => ({
              id: item.id || String(Math.random()),
              created_at: item.created_at || new Date().toISOString(),
              name: item.name,
              email: item.email,
              phone: item.phone,
              message: item.message,
              type: item.type || "general",
              property_name: item.property_name || item.subject || ""
            }));
          }
        } catch (dbErr) {
          console.warn("Failed to fetch from Supabase, relying on local:", dbErr);
        }
      }

      // 2. Fetch from Local Storage submissions
      try {
        const localKey = "shikas_inquiries";
        const localData = JSON.parse(localStorage.getItem(localKey) || "[]");
        const formattedLocal: Inquiry[] = localData.map((item: any, index: number) => ({
          id: `local_${index}_${item.at}`,
          created_at: item.at || new Date().toISOString(),
          name: item.name,
          email: item.email,
          phone: item.phone,
          message: item.message,
          type: item.subject?.toLowerCase().includes("plot") ? "plot" : "plan",
          property_name: item.subject || "General Inquiry"
        }));

        mergedList = [...mergedList, ...formattedLocal];
      } catch (localErr) {
        console.error("Failed to parse local inquiries", localErr);
      }

      if (mergedList.length === 0) {
        mergedList = [
          {
            id: "mock_1",
            created_at: new Date().toISOString(),
            name: "Rajesh Kumar",
            email: "rajesh@gmail.com",
            phone: "+91 9876543210",
            message: "I am interested in Cedar Crest Plot A. Please contact me regarding the pricing details and viewing times.",
            type: "plot",
            property_name: "Cedar Crest — Plot A"
          },
          {
            id: "mock_2",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            name: "Anjali Rao",
            email: "anjali.rao@yahoo.com",
            phone: "+91 9123456789",
            message: "Requesting detailed drawings and floor layouts for the Magnolia Heights floor plans.",
            type: "plan",
            property_name: "Atelier I — Studio Villa"
          }
        ];
      }

      mergedList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setInquiries(mergedList);
    } catch (err: any) {
      console.error(err);
      toast.error("Error loading inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "SuperUser") {
      loadData();
    }
  }, [role]);

  // Plots CRUD operations
  const handleOpenAddPlot = () => {
    setEditingPlot({
      id: "plot_" + Math.random().toString(36).substr(2, 9),
      name: "",
      location: "",
      size: 1500,
      price: 3000000,
      status: "Available",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      amenities: ["Corner Plot", "Water Supply"],
      description: "",
      additionalImages: []
    });
    setIsPlotModalOpen(true);
  };

  const handleOpenEditPlot = (plot: ExtendedPlot) => {
    setEditingPlot({ ...plot });
    setIsPlotModalOpen(true);
  };

  const handleSavePlotForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlot) return;
    const updated = savePlot(editingPlot);
    setPlots(updated);
    setIsPlotModalOpen(false);
    toast.success("Plot listing saved successfully");
  };

  const handleDeletePlotClick = (id: string) => {
    if (confirm("Are you sure you want to delete this plot?")) {
      const updated = deletePlot(id);
      setPlots(updated);
      toast.success("Plot listing deleted");
    }
  };

  // Plans CRUD operations
  const handleOpenAddPlan = () => {
    setEditingPlan({
      id: "plan_" + Math.random().toString(36).substr(2, 9),
      name: "",
      category: "2BHK",
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      price: 2500000,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      features: ["Vastu Compliant", "Modern Kitchen"],
      description: "",
      additionalImages: []
    });
    setIsPlanModalOpen(true);
  };

  const handleOpenEditPlan = (plan: ExtendedPlan) => {
    setEditingPlan({ ...plan });
    setIsPlanModalOpen(true);
  };

  const handleSavePlanForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;
    const updated = savePlan(editingPlan);
    setPlans(updated);
    setIsPlanModalOpen(false);
    toast.success("House Plan saved successfully");
  };

  const handleDeletePlanClick = (id: string) => {
    if (confirm("Are you sure you want to delete this House Plan?")) {
      const updated = deletePlan(id);
      setPlans(updated);
      toast.success("House Plan listing deleted");
    }
  };

  if (role !== "SuperUser") {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-[1480px] mx-auto container-edge py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--gold)]/10 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600 animate-pulse" />
              <span className="eyebrow text-indigo-600">Super User Dashboard</span>
            </div>
            <h1 className="font-display text-4xl mt-2 text-slate-800">Administrative Portal</h1>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <p className="text-sm text-[var(--muted-sage)]">Logged in as {user?.email}</p>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                supabase 
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}>
                {supabase ? "CONNECTED TO SUPABASE" : "RUNNING IN OFFLINE SIMULATION MODE"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={loadData} className="border-[var(--gold)]/20">
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
            <Card className="border border-[var(--gold)]/15 bg-white">
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
                              <div className="text-indigo-600 mt-0.5 font-semibold">{inq.phone}</div>
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
              {/* Plots Section */}
              <Card className="border border-[var(--gold)]/15 bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-display">Plots Portfolio</CardTitle>
                    <CardDescription>Manage available land releases</CardDescription>
                  </div>
                  <Button size="sm" onClick={handleOpenAddPlot} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Plot
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plot Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Size / Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plots.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium font-display text-slate-800">{p.name}</TableCell>
                          <TableCell className="text-xs">{p.location}</TableCell>
                          <TableCell className="text-xs">
                            <div className="font-mono">{p.size.toLocaleString()} sqft</div>
                            <div className="text-indigo-600 font-semibold mt-0.5">{formatINR(p.price)}</div>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              p.status === "Available" ? "bg-emerald-500 text-white border-0" :
                              p.status === "Reserved" ? "bg-amber-500 text-white border-0" : "bg-slate-400 text-white border-0"
                            }>
                              {p.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100" onClick={() => handleOpenEditPlot(p)}>
                              <Edit className="w-3.5 h-3.5 text-slate-600" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-rose-50" onClick={() => handleDeletePlotClick(p.id)}>
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Plans Section */}
              <Card className="border border-[var(--gold)]/15 bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-display">House Plans</CardTitle>
                    <CardDescription>Manage architectural typologies</CardDescription>
                  </div>
                  <Button size="sm" onClick={handleOpenAddPlan} className="bg-indigo-600 text-white hover:bg-indigo-700">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Plan
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plan Name</TableHead>
                        <TableHead>Config / Area</TableHead>
                        <TableHead>Base Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plans.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium font-display text-slate-800">{p.name}</TableCell>
                          <TableCell className="text-xs">
                            <Badge variant="outline">{p.category}</Badge>
                            <div className="text-[10px] text-slate-500 mt-1 font-mono">{p.bedrooms}B / {p.bathrooms}B · {p.area} sqft</div>
                          </TableCell>
                          <TableCell className="text-xs font-mono text-indigo-600 font-semibold">{formatINR(p.price)}</TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100" onClick={() => handleOpenEditPlan(p)}>
                              <Edit className="w-3.5 h-3.5 text-slate-600" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-rose-50" onClick={() => handleDeletePlanClick(p.id)}>
                              <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Plot Edit Form Modal overlay */}
        {isPlotModalOpen && editingPlot && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <Card className="w-full max-w-lg border-0 shadow-2xl bg-white max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSavePlotForm}>
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                  <CardTitle className="text-lg font-display">{editingPlot.name ? "Edit Plot" : "Create New Plot"}</CardTitle>
                  <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => setIsPlotModalOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-1">
                    <Label htmlFor="plot-name" className="text-xs font-semibold">Plot Name</Label>
                    <Input id="plot-name" value={editingPlot.name} onChange={(e) => setEditingPlot({ ...editingPlot, name: e.target.value })} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="plot-loc" className="text-xs font-semibold">Location / Address</Label>
                      <Input id="plot-loc" value={editingPlot.location} onChange={(e) => setEditingPlot({ ...editingPlot, location: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="plot-status" className="text-xs font-semibold">Availability Status</Label>
                      <select id="plot-status" className="w-full border rounded-md px-3 h-10 bg-white" value={editingPlot.status} onChange={(e) => setEditingPlot({ ...editingPlot, status: e.target.value as any })}>
                        <option>Available</option>
                        <option>Reserved</option>
                        <option>Sold</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="plot-size" className="text-xs font-semibold">Plot Size (sqft)</Label>
                      <Input id="plot-size" type="number" value={editingPlot.size} onChange={(e) => setEditingPlot({ ...editingPlot, size: Number(e.target.value) })} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="plot-price" className="text-xs font-semibold">Price (INR)</Label>
                      <Input id="plot-price" type="number" value={editingPlot.price} onChange={(e) => setEditingPlot({ ...editingPlot, price: Number(e.target.value) })} required />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="plot-img" className="text-xs font-semibold">Main Hero Image URL</Label>
                    <Input id="plot-img" value={editingPlot.image} onChange={(e) => setEditingPlot({ ...editingPlot, image: e.target.value })} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="plot-add-imgs" className="text-xs font-semibold">Additional Photos (one URL per line)</Label>
                    <Textarea id="plot-add-imgs" rows={3} placeholder="https://example.com/photo1.jpg" value={(editingPlot.additionalImages || []).join("\n")} onChange={(e) => setEditingPlot({ ...editingPlot, additionalImages: e.target.value.split("\n").filter(l => l.trim() !== "") })} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="plot-desc" className="text-xs font-semibold">Listing Description</Label>
                    <Textarea id="plot-desc" rows={3} value={editingPlot.description} onChange={(e) => setEditingPlot({ ...editingPlot, description: e.target.value })} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="plot-amenities" className="text-xs font-semibold">Amenities (comma-separated)</Label>
                    <Input id="plot-amenities" value={editingPlot.amenities.join(", ")} onChange={(e) => setEditingPlot({ ...editingPlot, amenities: e.target.value.split(",").map(a => a.trim()).filter(a => a !== "") })} />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsPlotModalOpen(false)}>Cancel</Button>
                  <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">Save Plot Details</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}

        {/* Plan Edit Form Modal overlay */}
        {isPlanModalOpen && editingPlan && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <Card className="w-full max-w-lg border-0 shadow-2xl bg-white max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSavePlanForm}>
                <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
                  <CardTitle className="text-lg font-display">{editingPlan.name ? "Edit House Plan" : "Create House Plan"}</CardTitle>
                  <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => setIsPlanModalOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-1">
                    <Label htmlFor="plan-name" className="text-xs font-semibold">Plan Name</Label>
                    <Input id="plan-name" value={editingPlan.name} onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="plan-cat" className="text-xs font-semibold">Typology Category</Label>
                      <select id="plan-cat" className="w-full border rounded-md px-3 h-10 bg-white" value={editingPlan.category} onChange={(e) => setEditingPlan({ ...editingPlan, category: e.target.value as any })}>
                        <option>1BHK</option>
                        <option>2BHK</option>
                        <option>3BHK</option>
                        <option>Luxury</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="plan-area" className="text-xs font-semibold">Total Area (sqft)</Label>
                      <Input id="plan-area" type="number" value={editingPlan.area} onChange={(e) => setEditingPlan({ ...editingPlan, area: Number(e.target.value) })} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="plan-beds" className="text-xs font-semibold">Bedrooms</Label>
                      <Input id="plan-beds" type="number" value={editingPlan.bedrooms} onChange={(e) => setEditingPlan({ ...editingPlan, bedrooms: Number(e.target.value) })} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="plan-baths" className="text-xs font-semibold">Bathrooms</Label>
                      <Input id="plan-baths" type="number" value={editingPlan.bathrooms} onChange={(e) => setEditingPlan({ ...editingPlan, bathrooms: Number(e.target.value) })} required />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="plan-price" className="text-xs font-semibold">Base Price (INR)</Label>
                      <Input id="plan-price" type="number" value={editingPlan.price} onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })} required />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="plan-img" className="text-xs font-semibold">Main Project Image URL</Label>
                    <Input id="plan-img" value={editingPlan.image} onChange={(e) => setEditingPlan({ ...editingPlan, image: e.target.value })} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="plan-add-imgs" className="text-xs font-semibold">Additional Blueprints / Photos (one URL per line)</Label>
                    <Textarea id="plan-add-imgs" rows={3} placeholder="https://example.com/layout1.jpg" value={(editingPlan.additionalImages || []).join("\n")} onChange={(e) => setEditingPlan({ ...editingPlan, additionalImages: e.target.value.split("\n").filter(l => l.trim() !== "") })} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="plan-desc" className="text-xs font-semibold">Plan Description</Label>
                    <Textarea id="plan-desc" rows={3} value={editingPlan.description || ""} onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="plan-features" className="text-xs font-semibold">Key Features (comma-separated)</Label>
                    <Input id="plan-features" value={(editingPlan.features || []).join(", ")} onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value.split(",").map(f => f.trim()).filter(f => f !== "") })} />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsPlanModalOpen(false)}>Cancel</Button>
                  <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">Save Plan Details</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
