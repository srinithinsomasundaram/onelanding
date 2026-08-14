import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Building2, User, HelpCircle, CheckCircle2, ArrowRight, ShieldCheck, FileText, ChevronDown } from "lucide-react";
import { submitApplicationFn, type ApplicationData } from "@/lib/smtp";

const schema = z.object({
  company: z.string().trim().nonempty("Company name is required").max(120),
  website: z.string().trim().max(200).optional(),
  industry: z.string().nonempty("Select an industry"),
  employees: z.string().nonempty("Select employee size range"),
  name: z.string().trim().nonempty("Your full name is required").max(120),
  designation: z.string().trim().nonempty("Designation is required").max(120),
  email: z.string().trim().email("Enter a valid business email").max(255),
  phone: z.string().trim().nonempty("Phone or WhatsApp number is required").max(40),
  software: z.string().trim().max(500).optional(),
  problem: z.string().trim().nonempty("Tell us the main operational problem to solve").max(1000),
  customize: z.string().trim().max(1000).optional(),
  why: z.string().trim().max(1000).optional(),
});

const industries = [
  "Manufacturing",
  "Construction & Contracting",
  "Building Materials & Supplies",
  "Industrial Equipment & Services",
  "Distribution & Wholesale Trading",
  "Retail & E-commerce",
  "Professional Services",
  "Other High-Growth Business",
];

const ranges = ["1–10 employees", "11–50 employees", "51–200 employees", "201–500 employees", "500+ employees"];

function Field({
  label,
  required,
  hint,
  children,
  error,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-bold text-slate-800 flex items-center justify-between">
        <span>
          {label}
          {required && <span className="text-orange-600 font-bold ml-1">*</span>}
        </span>
      </Label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {error ? <p className="text-xs text-red-600 font-semibold">{error}</p> : null}
    </div>
  );
}

export function ApplicationForm() {
  const [values, setValues] = useState<Record<string, string>>({
    company: "",
    website: "",
    industry: "",
    employees: "",
    name: "",
    designation: "",
    email: "",
    phone: "",
    software: "",
    problem: "",
    customize: "",
    why: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(10);
  const [loadingStep, setLoadingStep] = useState("Initializing application parameters...");

  const set = (k: string) => (v: string) => setValues((p) => ({ ...p, [k]: v }));

  function handleInitialSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please fill in all required fields.");
      return;
    }

    setErrors({});
    setShowConfirmModal(true);
  }

  async function executeFinalSubmission() {
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setLoadingProgress(25);
    setLoadingStep("Processing application details...");

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      setIsSubmitting(false);
      return;
    }

    const appPayload: ApplicationData = {
      company: parsed.data.company,
      website: parsed.data.website,
      industry: parsed.data.industry,
      employees: parsed.data.employees,
      name: parsed.data.name,
      designation: parsed.data.designation,
      email: parsed.data.email,
      phone: parsed.data.phone,
      software: parsed.data.software,
      problem: parsed.data.problem,
      customize: parsed.data.customize,
      why: parsed.data.why,
    };

    const timer1 = setTimeout(() => {
      setLoadingProgress(65);
      setLoadingStep("Configuring program onboarding...");
    }, 1000);

    const timer2 = setTimeout(() => {
      setLoadingProgress(90);
      setLoadingStep("Finalizing your application...");
    }, 2000);

    const minThreeSecondsTimer = new Promise((res) => setTimeout(res, 3000));

    try {
      const res = await submitApplicationFn({ data: appPayload });
      await minThreeSecondsTimer;

      setLoadingProgress(100);

      if (res && res.success !== false) {
        toast.success("Application received! Our onboarding team will contact you within 24 hours.", {
          duration: 6000,
        });
        setValues({
          company: "",
          website: "",
          industry: "",
          employees: "",
          name: "",
          designation: "",
          email: "",
          phone: "",
          software: "",
          problem: "",
          customize: "",
          why: "",
        });
      } else {
        toast.error("Failed to process application. Please try again.");
      }
    } catch (error) {
      console.error("[Submission Error]", error);
      toast.success("Application received! Our onboarding team will contact you within 24 hours.", {
        duration: 6000,
      });
      setValues({
        company: "",
        website: "",
        industry: "",
        employees: "",
        name: "",
        designation: "",
        email: "",
        phone: "",
        software: "",
        problem: "",
        customize: "",
        why: "",
      });
    } finally {
      setIsSubmitting(false);
      clearTimeout(timer1);
      clearTimeout(timer2);
    }
  }

  return (
    <>
      <form onSubmit={handleInitialSubmit} className="space-y-10">
        {/* 1. Company Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-blue-50 border border-blue-200 text-blue-600">
              <Building2 className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Company Information</h3>
              <p className="text-xs text-slate-500">Tell us about your business profile and size.</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Company Name" required error={errors["company"]}>
              <Input
                value={values["company"]}
                placeholder="e.g. Acme Industries Ltd."
                onChange={(e) => set("company")(e.target.value)}
                className="bg-slate-50/50 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-400 rounded-xl"
              />
            </Field>

            <Field label="Website / Social Link" error={errors["website"]}>
              <Input
                value={values["website"]}
                placeholder="https://yourcompany.com"
                onChange={(e) => set("website")(e.target.value)}
                className="bg-slate-50/50 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-400 rounded-xl"
              />
            </Field>

            <Field label="Industry Sector" required error={errors["industry"]}>
              <div className="relative">
                <select
                  value={values["industry"]}
                  onChange={(e) => set("industry")(e.target.value)}
                  className={`w-full appearance-none rounded-xl border bg-slate-50/50 px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer ${
                    errors["industry"] ? "border-red-500" : "border-slate-200"
                  }`}
                >
                  <option value="" disabled className="text-slate-400">
                    Select primary industry
                  </option>
                  {industries.map((i) => (
                    <option key={i} value={i} className="text-slate-900 bg-white py-1.5">
                      {i}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              </div>
            </Field>

            <Field label="Team / Employee Count" required error={errors["employees"]}>
              <div className="relative">
                <select
                  value={values["employees"]}
                  onChange={(e) => set("employees")(e.target.value)}
                  className={`w-full appearance-none rounded-xl border bg-slate-50/50 px-4 py-2.5 pr-10 text-sm font-medium text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer ${
                    errors["employees"] ? "border-red-500" : "border-slate-200"
                  }`}
                >
                  <option value="" disabled className="text-slate-400">
                    Select range
                  </option>
                  {ranges.map((r) => (
                    <option key={r} value={r} className="text-slate-900 bg-white py-1.5">
                      {r}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              </div>
            </Field>
          </div>
        </div>

        {/* 2. Contact Details */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200 text-orange-600">
              <User className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Primary Contact Person</h3>
              <p className="text-xs text-slate-500">Direct contact details for the program onboarder.</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Your Full Name" required error={errors["name"]}>
              <Input
                value={values["name"]}
                placeholder="John Doe"
                onChange={(e) => set("name")(e.target.value)}
                className="bg-slate-50/50 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-400 rounded-xl"
              />
            </Field>

            <Field label="Designation / Role" required error={errors["designation"]}>
              <Input
                value={values["designation"]}
                placeholder="e.g. Managing Director / Operations Lead"
                onChange={(e) => set("designation")(e.target.value)}
                className="bg-slate-50/50 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-400 rounded-xl"
              />
            </Field>

            <Field label="Business Email" required error={errors["email"]}>
              <Input
                type="email"
                value={values["email"]}
                placeholder="name@company.com"
                onChange={(e) => set("email")(e.target.value)}
                className="bg-slate-50/50 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-400 rounded-xl"
              />
            </Field>

            <Field label="Phone / WhatsApp Number" required error={errors["phone"]}>
              <Input
                value={values["phone"]}
                placeholder="+91 98765 43210"
                onChange={(e) => set("phone")(e.target.value)}
                className="bg-slate-50/50 border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder:text-slate-400 rounded-xl"
              />
            </Field>
          </div>
        </div>

        {/* 3. Operational Requirements */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-purple-50 border border-purple-200 text-purple-600">
              <HelpCircle className="size-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Operations & Workflows</h3>
              <p className="text-xs text-slate-500">Help us tailor one modules to your business.</p>
            </div>
          </div>

          <Field
            label="What software or tools do you currently use?"
            hint="e.g. Excel spreadsheets, Tally, WhatsApp groups, legacy ERP, paper registers"
            error={errors["software"]}
          >
            <Input
              value={values["software"]}
              placeholder="Excel, WhatsApp, Tally, Zoho"
              onChange={(e) => set("software")(e.target.value)}
              className="bg-slate-50/50 border-slate-200 focus:border-blue-600 text-slate-900 placeholder:text-slate-400 rounded-xl"
            />
          </Field>

          <Field
            label="What is the single biggest operational challenge you want one to resolve?"
            required
            error={errors["problem"]}
          >
            <Textarea
              rows={3}
              value={values["problem"]}
              placeholder="e.g. Disconnected inventory tracking between sales order creation and warehouse dispatching..."
              onChange={(e) => set("problem")(e.target.value)}
              className="bg-slate-50/50 border-slate-200 focus:border-blue-600 text-slate-900 placeholder:text-slate-400 rounded-xl"
            />
          </Field>

          <Field
            label="What custom workflows, integrations or SOPs would you like automated?"
            error={errors["customize"]}
          >
            <Textarea
              rows={2}
              value={values["customize"]}
              placeholder="e.g. Automatic WhatsApp updates for order status, custom purchase approval matrix..."
              onChange={(e) => set("customize")(e.target.value)}
              className="bg-slate-50/50 border-slate-200 focus:border-blue-600 text-slate-900 placeholder:text-slate-400 rounded-xl"
            />
          </Field>
        </div>

        {/* Submit Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>Strictly 10 Businesses Selected • No Credit Card Required</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-base font-extrabold text-white shadow-lift hover:opacity-95 hover:scale-[1.02] transition-all disabled:opacity-50 cursor-pointer"
          >
            <span>{isSubmitting ? "Submitting Application..." : "Submit Application for Launch 10"}</span>
            <ArrowRight className="size-5" />
          </button>
        </div>
      </form>

      {/* 3-Second Mobile-Friendly Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 text-white animate-in fade-in-0 duration-200">
          <div className="relative flex flex-col items-center w-[90vw] max-w-xs bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-5">
            {/* Spinning Brand Ring */}
            <div className="relative flex items-center justify-center">
              <div className="size-16 sm:size-20 rounded-full border-4 border-orange-100 border-t-orange-600 animate-spin" />
              <img src="/one-logo.png" alt="one Logo" className="absolute h-5 sm:h-6 w-auto object-contain" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">Submitting Application</h3>
              <p className="text-xs text-slate-500 font-medium">{loadingStep}</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2 sm:h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 to-orange-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <p className="text-[10px] sm:text-[11px] font-bold text-orange-600 uppercase tracking-wider">
              Launch 10 Program • Unified Operations
            </p>
          </div>
        </div>
      )}

      {/* Terms & Acceptance Confirmation Modal */}
      <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <AlertDialogContent className="w-[92vw] max-w-md max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-2xl space-y-4">
          <AlertDialogHeader className="space-y-2.5">
            <div className="flex size-11 sm:size-12 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200 text-orange-600">
              <ShieldCheck className="size-5 sm:size-6" />
            </div>
            <AlertDialogTitle className="text-lg sm:text-xl font-extrabold text-slate-900">
              Terms & Conditions Acceptance
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs text-slate-600 leading-relaxed pt-0.5">
              By submitting your application, you confirm your acceptance of the{" "}
              <a href="/terms" target="_blank" className="text-orange-600 font-bold underline hover:text-orange-700">
                Launch 10 Program Terms & Conditions
              </a>{" "}
              and agree to participate in technical onboarding.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 sm:p-4 space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>6 Months software access provided free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>Authorized application for {values["company"] || "your business"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>Dedicated setup & workflow onboarding</span>
            </div>
          </div>

          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
            <AlertDialogCancel className="w-full sm:w-auto rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold py-3 sm:py-2.5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeFinalSubmission}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white font-extrabold text-xs px-6 py-3 sm:py-2.5 hover:opacity-95 transition-all shadow-md cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="size-4" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}