import { PLOTS, PLANS, Plot, Plan } from "@/lib/data";

// Add support for additional images
export interface ExtendedPlot extends Plot {
  additionalImages?: string[];
}

export interface ExtendedPlan extends Plan {
  additionalImages?: string[];
}

export const getPlots = (): ExtendedPlot[] => {
  if (typeof window === "undefined") return PLOTS;
  const saved = localStorage.getItem("shikas_custom_plots");
  if (!saved) {
    localStorage.setItem("shikas_custom_plots", JSON.stringify(PLOTS));
    return PLOTS;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return PLOTS;
  }
};

export const savePlot = (plot: ExtendedPlot): ExtendedPlot[] => {
  const plots = getPlots();
  const index = plots.findIndex((p) => p.id === plot.id);
  if (index > -1) {
    plots[index] = plot;
  } else {
    plots.push(plot);
  }
  localStorage.setItem("shikas_custom_plots", JSON.stringify(plots));
  return plots;
};

export const deletePlot = (id: string): ExtendedPlot[] => {
  const plots = getPlots().filter((p) => p.id !== id);
  localStorage.setItem("shikas_custom_plots", JSON.stringify(plots));
  return plots;
};

export const getPlans = (): ExtendedPlan[] => {
  if (typeof window === "undefined") return PLANS;
  const saved = localStorage.getItem("shikas_custom_plans");
  if (!saved) {
    localStorage.setItem("shikas_custom_plans", JSON.stringify(PLANS));
    return PLANS;
  }
  try {
    return JSON.parse(saved);
  } catch {
    return PLANS;
  }
};

export const savePlan = (plan: ExtendedPlan): ExtendedPlan[] => {
  const plans = getPlans();
  const index = plans.findIndex((p) => p.id === plan.id);
  if (index > -1) {
    plans[index] = plan;
  } else {
    plans.push(plan);
  }
  localStorage.setItem("shikas_custom_plans", JSON.stringify(plans));
  return plans;
};

export const deletePlan = (id: string): ExtendedPlan[] => {
  const plans = getPlans().filter((p) => p.id !== id);
  localStorage.setItem("shikas_custom_plans", JSON.stringify(plans));
  return plans;
};
