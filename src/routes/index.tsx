import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ApplicationForm } from "@/components/landing/ApplicationForm";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import {
  Users,
  CheckSquare,
  UserCheck,
  ShoppingBag,
  ShoppingCart,
  Package,
  DollarSign,
  FileText,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Factory,
  HardHat,
  Building2,
  Briefcase,
  Boxes,
  ChevronRight,
  ChevronDown,
  FileSpreadsheet,
  MessageSquare,
  Receipt,
  Mail,
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock,
  Layers,
  Sliders,
  Calculator,
  ArrowUpRight,
  Check
} from "lucide-react";

const problemItems = [
  { tool: "Excel / Google Sheets", forWhat: "manual tracking & formula breakage", icon: FileSpreadsheet, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { tool: "WhatsApp Groups", forWhat: "order updates & untracked chat logs", icon: MessageSquare, color: "text-green-600 bg-green-50 border-green-200" },
  { tool: "Accounting Software", forWhat: "isolated from sales & warehouse dispatch", icon: Receipt, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { tool: "Standalone CRM", forWhat: "disconnected from real-time stock levels", icon: UserCheck, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { tool: "Email Chains", forWhat: "slow internal purchase & requisition approvals", icon: Mail, color: "text-orange-600 bg-orange-50 border-orange-200" },
];

const modules = [
  { 
    id: "people", 
    name: "People", 
    desc: "Manage employees, departments, roles, shift schedules and organizational access control.", 
    icon: Users, 
    badge: "HR & Org",
    metrics: ["100% Attendance Tracking", "Automated Payroll Readiness", "Role-based ACL"],
    sampleAction: "Approve Shift Schedule for Plant A"
  },
  { 
    id: "tasks", 
    name: "Tasks", 
    desc: "Assign, track, and complete operational work with automated reminders and dependency tracking.", 
    icon: CheckSquare, 
    badge: "Workflows",
    metrics: ["Zero SLA Misses", "Real-time Priority Queues", "Multi-stage Kanban"],
    sampleAction: "Assign Preventive Maintenance Ticket #402"
  },
  { 
    id: "crm", 
    name: "CRM", 
    desc: "Manage leads, pipeline stages, customer interactions, follow-ups, and communication logs.", 
    icon: UserCheck, 
    badge: "Sales Ops",
    metrics: ["Auto Lead Capture", "WhatsApp & Email Sync", "Deal Stage Tracking"],
    sampleAction: "Convert Lead 'Horizon Infra' to Active Opportunity"
  },
  { 
    id: "sales", 
    name: "Sales", 
    desc: "Generate quotes, dispatch sales orders, process tax invoices, and track incoming payments.", 
    icon: ShoppingBag, 
    badge: "Revenue",
    metrics: ["Instant Quotation Builder", "GST Compliant Invoicing", "Auto Credit Controls"],
    sampleAction: "Generate Invoice for Order #SO-8842"
  },
  { 
    id: "purchases", 
    name: "Purchases", 
    desc: "Manage vendor catalogues, purchase requisitions, approval matrix, and GRNs.", 
    icon: ShoppingCart, 
    badge: "Procurement",
    metrics: ["3-Way GRN Matching", "Automated Approval Matrix", "Vendor Rating Matrix"],
    sampleAction: "Issue Purchase Order PO-1192 to Steel Corp"
  },
  { 
    id: "inventory", 
    name: "Inventory", 
    desc: "Track raw materials, finished goods, batch stock, multi-warehouse movements, and reorders.", 
    icon: Package, 
    badge: "Warehouse",
    metrics: ["Multi-warehouse Realtime", "Batch & Expiry Guard", "Auto Stock Reorder"],
    sampleAction: "Transfer 500 Units from Central to Site B"
  },
  { 
    id: "finance", 
    name: "Finance", 
    desc: "Track operational expenses, accounts receivable, payables, and cash flow statement summaries.", 
    icon: DollarSign, 
    badge: "Accounting",
    metrics: ["Live P&L Summary", "Automated AR Followups", "Petty Cash Ledger"],
    sampleAction: "Log Expense Entry EXP-904"
  },
  { 
    id: "sops", 
    name: "SOPs", 
    desc: "Standardize step-by-step operating procedures, checklists, and compliance audits.", 
    icon: FileText, 
    badge: "Standards",
    metrics: ["Audit Trail Compliance", "Digital Sign-off Checklists", "Version History"],
    sampleAction: "Run Quality Check SOP for Batch #701"
  },
  { 
    id: "reports", 
    name: "Reports", 
    desc: "Real-time consolidated analytics across all business units and operational bottlenecks.", 
    icon: BarChart3, 
    badge: "Analytics",
    metrics: ["Cross-Module Dashboards", "Automated Daily EOD Email", "Custom Export"],
    sampleAction: "Export Monthly Operations Bottleneck Audit"
  },
];

const steps = [
  { num: "01", title: "Understand", desc: "We study your existing business workflows, pain points, and current spreadsheets or tools." },
  { num: "02", title: "Configure", desc: "We map and configure one modules specifically tailored around how your team operates." },
  { num: "03", title: "Integrate", desc: "We connect existing systems (e.g. accounting software, WhatsApp, email) where technically feasible." },
  { num: "04", title: "Automate", desc: "We eliminate repetitive manual entry, redundant approvals, and status tracking follow-ups." },
  { num: "05", title: "Improve", desc: "We continuously refine rules, reports, and capabilities based on your team's real daily usage." },
];

const audiences = [
  { 
    icon: Factory, 
    title: "Manufacturing & Production", 
    desc: "Seamlessly connect shop floor production, raw material purchasing, batch inventory, and sales orders.",
    flow: ["BOM Requisition", "Raw Stock Check", "Production Order", "QC Audit", "Dispatch"]
  },
  { 
    icon: HardHat, 
    title: "Construction & Contracting", 
    desc: "Manage site teams, project task milestones, material requisitions, contractor approvals, and vendor bills.",
    flow: ["Site Requisition", "Manager Approval", "Vendor Dispatch", "GRN Site Verification", "Bill Log"]
  },
  { 
    icon: Building2, 
    title: "Building Materials & Hardware", 
    desc: "Track customer orders, multi-warehouse stock levels, contractor pricing quotes, and payment collections.",
    flow: ["Dealer Quote", "Stock Reservation", "Tax Invoice", "Dispatch Tracking", "AR Collection"]
  },
  { 
    icon: Briefcase, 
    title: "Industrial Equipment & Services", 
    desc: "Unify service ticketing, equipment dispatch, preventive maintenance SOPs, and client billing.",
    flow: ["Service Ticket", "Technician Dispatch", "SOP Checklist", "Client Signoff", "Invoice"]
  },
  { 
    icon: Boxes, 
    title: "Distribution & Wholesale Trading", 
    desc: "Manage product catalogues, dealer margins, bulk dispatching, inventory replenishment, and credit terms.",
    flow: ["Bulk Order", "Credit Check", "Warehouse Packing", "Waybill / Delivery", "Payment Ledger"]
  },
];

const faqs = [
  {
    q: "Is one really free for six months?",
    a: "Yes. Selected businesses in the Launch 10 Program receive full software platform access, setup, and dedicated support at zero subscription cost for 6 months.",
  },
  {
    q: "What happens after the six months end?",
    a: "You can transition smoothly into a standard subscription, managed service plan, or custom commercial arrangement. There is no obligation to continue if it does not fit your goals.",
  },
  {
    q: "Will my credit card automatically be charged?",
    a: "No. We do not ask for any credit card or automatic renewal commitments to participate in Launch 10.",
  },
  {
    q: "Can one be customized for our exact operational process?",
    a: "Yes! Custom workflow configurations, specific data fields, approval thresholds, custom document layouts, and dashboards are included as part of the program.",
  },
  {
    q: "Do we have to replace all our current software immediately?",
    a: "No. We integrate with your essential existing systems (such as accounting or communication tools) where technically feasible so your operations transition smoothly.",
  },
  {
    q: "How many businesses will be selected for Launch 10?",
    a: "Strictly 10 businesses. This ensures our core engineering team can work directly with each participant to configure and refine the platform.",
  },
];

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-orange-600 shadow-xs">
      <Sparkles className="size-3 text-orange-500 animate-pulse" />
      <span>{children}</span>
    </div>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-orange-500/50 bg-white shadow-xl ring-4 ring-orange-500/10"
                : "border-slate-200/80 bg-white/80 hover:border-slate-300 hover:bg-white shadow-sm"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left font-extrabold text-slate-900 text-base sm:text-lg hover:text-orange-600 transition-colors cursor-pointer"
            >
              <span className="pr-4 leading-snug">{faq.q}</span>
              <div className={`flex size-9 items-center justify-center rounded-xl shrink-0 transition-transform duration-300 ${
                isOpen ? "rotate-180 bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md" : "bg-slate-100 border border-slate-200 text-slate-500"
              }`}>
                <ChevronDown className="size-4 shrink-0" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-in fade-in-0 duration-200">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function RoiCalculator() {
  const [teamSize, setTeamSize] = useState<number>(25);
  const [manualHours, setManualHours] = useState<number>(10);

  // Math estimation logic
  const hoursSavedPerMonth = Math.round(teamSize * manualHours * 0.70 * 4);
  const estimatedMoneySavedPerMonth = Math.round(hoursSavedPerMonth * 450);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gradient-to-br from-orange-500/15 via-red-500/10 to-transparent blur-3xl" />
      
      <div className="flex flex-col lg:flex-row items-stretch gap-8 relative z-10">
        <div className="lg:w-1/2 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 border border-orange-200">
              <Calculator className="size-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Interactive Efficiency Estimator</h3>
              <p className="text-xs text-slate-500">Calculate how much manual spreadsheet time your business reclaims.</p>
            </div>
          </div>

          <div className="space-y-5 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Operational Team Size: <span className="text-orange-600 text-sm font-extrabold ml-1">{teamSize} Employees</span>
                </label>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                <span>5 employees</span>
                <span>75 employees</span>
                <span>150+ employees</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Manual Hours / Person / Week: <span className="text-orange-600 text-sm font-extrabold ml-1">{manualHours} Hours</span>
                </label>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                value={manualHours}
                onChange={(e) => setManualHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
                <span>2 hrs/wk (Low)</span>
                <span>12 hrs/wk (Avg)</span>
                <span>25 hrs/wk (Heavy)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="pointer-events-none absolute -bottom-10 -right-10 size-48 rounded-full bg-orange-600/20 blur-2xl" />
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-400">
              <Zap className="size-3 text-orange-400" /> Estimated Operational Impact
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hours Reclaimed / Mo</p>
                <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {hoursSavedPerMonth.toLocaleString("en-IN")} <span className="text-xs font-semibold text-orange-400">hrs</span>
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Est. Monthly Savings</p>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">
                  ₹{(estimatedMoneySavedPerMonth / 1000).toFixed(0)}k <span className="text-xs font-semibold text-slate-400">/mo</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-300 font-medium">Replace spreadsheet errors with automated SOP workflows.</span>
            <a href="#apply" className="shrink-0">
              <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-4 py-2 text-xs font-extrabold text-white shadow-lift hover:scale-105 transition-all cursor-pointer">
                <span>Claim Launch 10 Spot</span>
                <ArrowRight className="size-3.5" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IndexPage() {
  const [selectedModuleId, setSelectedModuleId] = useState("sales");
  const [selectedAudienceTitle, setSelectedAudienceTitle] = useState(audiences[0].title);

  const activeModule = modules.find((m) => m.id === selectedModuleId) || modules[0];
  const activeAudience = audiences.find((a) => a.title === selectedAudienceTitle) || audiences[0];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-700">
      <Toaster />

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 px-4 py-2 text-center text-xs font-extrabold text-white shadow-sm flex items-center justify-center gap-2">
        <Sparkles className="size-3.5 animate-pulse shrink-0" />
        <span>Launch 10 Program Open: 10 Selected Businesses Get 6 Months Free + Custom Engineering Setup</span>
        <a href="#apply" className="underline underline-offset-2 hover:text-orange-100 ml-1 font-black">
          Apply Now &rarr;
        </a>
      </div>

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/one-logo.png"
              alt="one Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs font-bold text-slate-700">
            <a href="#problem" className="hover:text-orange-600 transition-colors">Problem</a>
            <a href="#calculator" className="hover:text-orange-600 transition-colors">ROI Calculator</a>
            <a href="#modules" className="hover:text-orange-600 transition-colors">Modules</a>
            <a href="#process" className="hover:text-orange-600 transition-colors">Process</a>
            <a href="#audiences" className="hover:text-orange-600 transition-colors">Sectors</a>
            <a href="#faq" className="hover:text-orange-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#apply">
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-5 py-2.5 text-xs font-extrabold text-white shadow-lift hover:scale-[1.03] transition-all cursor-pointer">
                <span>Apply for Launch 10</span>
                <ChevronRight className="size-4" />
              </button>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-white via-orange-50/20 to-slate-50/50 bg-grid-pattern">
          {/* Ambient Glowing Background Orbs */}
          <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[95vw] max-w-[1200px] rounded-full bg-gradient-to-tr from-orange-500/20 via-red-500/15 to-amber-400/10 blur-[130px] animate-pulse-glow" />
          <div className="pointer-events-none absolute top-1/3 right-10 h-[300px] w-[350px] rounded-full bg-orange-400/15 blur-[110px]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
              
              <SectionBadge>The Unified Business Operating System</SectionBadge>

              {/* Ultra-Punchy Premium Title */}
              <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.06] max-w-4xl mx-auto">
                One Platform.
                <br />
                <span className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent drop-shadow-xs">
                  Unified Operations.
                </span>
              </h1>

              {/* Reduced, Impactful Subtitle */}
              <p className="text-base sm:text-xl font-medium text-slate-600 max-w-2xl mx-auto leading-relaxed px-2">
                Replace fragmented spreadsheets & disconnected tools with one intelligent operational engine built specifically around how your business works.
              </p>

              {/* CTA Group */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
                <a href="#apply" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-base font-extrabold text-white shadow-lift hover:scale-[1.03] hover:shadow-glow-orange transition-all cursor-pointer">
                    <span>Apply for Launch 10</span>
                    <ArrowRight className="size-5" />
                  </button>
                </a>
                <a href="#modules" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/90 px-7 py-4 text-sm font-bold text-slate-800 hover:bg-slate-100 hover:border-slate-400 transition-all cursor-pointer shadow-xs">
                    <span>Explore 9 Modules</span>
                    <ChevronRight className="size-4 text-slate-400" />
                  </button>
                </a>
              </div>

              {/* Key Features Pill */}
              <div className="pt-2 flex items-center justify-center">
                <div className="inline-flex items-center justify-center gap-2 sm:gap-4 rounded-full border border-slate-200/90 bg-white/90 backdrop-blur-md px-4 py-2 text-xs font-bold text-slate-700 shadow-sm">
                  <div className="flex items-center gap-1.5 shrink-0 text-emerald-700">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>6 Months Free</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5 shrink-0 text-orange-700">
                    <CheckCircle2 className="size-4 text-orange-600 shrink-0" />
                    <span>Custom Engineering Setup</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5 shrink-0 text-slate-700">
                    <CheckCircle2 className="size-4 text-slate-600 shrink-0" />
                    <span>No Credit Card</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DASHBOARD LIVE DEMO CONTAINER */}
            <div className="hidden sm:block mt-12 sm:mt-16 relative">
              {/* Floating Accent Badges around preview */}
              <div className="absolute -top-6 -left-4 z-20 hidden lg:flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white/95 px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xl backdrop-blur-md">
                <div className="size-3 rounded-full bg-emerald-500 animate-ping" />
                <span>Real-Time Warehouse & Sales Sync</span>
              </div>
              <div className="absolute -bottom-6 -right-4 z-20 hidden lg:flex items-center gap-2 rounded-2xl border border-orange-200 bg-white/95 px-4 py-2.5 text-xs font-bold text-slate-800 shadow-xl backdrop-blur-md">
                <Sparkles className="size-4 text-orange-500" />
                <span>Zero Excel Formula Errors</span>
              </div>

              <DashboardPreview />
            </div>
          </div>
        </section>

        {/* STATS HIGHLIGHT BANNER */}
        <section className="border-y border-slate-200 bg-white py-10 relative z-10">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-slate-900">10</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Modules Unified</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">6 Months</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Free Program Access</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-slate-900">100%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Tailored Configuration</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-slate-900">&lt; 15 Mins</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Team Daily Onboarding</p>
            </div>
          </div>
        </section>

        {/* THE PROBLEM SECTION */}
        <section id="problem" className="relative border-b border-slate-200 bg-slate-50/70 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <SectionBadge>The Operational Challenge</SectionBadge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Your business shouldn't run across fragmented tools.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                When operational data lives in separate apps, teams spend half their day manually copying numbers, chasing WhatsApp updates, and debugging spreadsheet formula errors.
              </p>
              <div className="rounded-2xl border border-orange-300/80 bg-orange-50/80 p-5 text-orange-900 text-sm font-bold shadow-xs flex items-center gap-3">
                <span className="text-xl">⚡</span>
                <span>It’s time to replace fragmented chaos with a single, synchronized source of operational truth.</span>
              </div>
            </div>

            <div className="space-y-3.5">
              {problemItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.tool}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-4.5 transition-all hover:border-orange-400 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`flex size-11 items-center justify-center rounded-xl border shrink-0 ${item.color}`}>
                        <Icon className="size-5" />
                      </div>
                      <span className="font-extrabold text-slate-900 text-base">{item.tool}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 shrink-0 self-start sm:self-auto">
                      {item.forWhat}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ROI CALCULATOR SECTION */}
        <section id="calculator" className="py-16 sm:py-24 bg-white relative">
          <div className="mx-auto max-w-7xl px-6 space-y-10">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <SectionBadge>Measurable ROI</SectionBadge>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Calculate your operational savings.
              </h2>
              <p className="text-slate-600 text-base">
                See how much time and money unified operations reclaims for your team every month.
              </p>
            </div>

            <RoiCalculator />
          </div>
        </section>

        {/* 9 MODULES UNIFIED & INTERACTIVE SANDBOX */}
        <section id="modules" className="py-16 sm:py-24 relative bg-slate-50/60 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <SectionBadge>Integrated Core Modules</SectionBadge>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                One platform for your entire operational pipeline.
              </h2>
              <p className="text-slate-600 text-base">
                Every department operates from the same synchronized workspace with real-time permissions and cross-module visibility.
              </p>
            </div>

            {/* Interactive Module Filter Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none justify-start lg:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
              {modules.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedModuleId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModuleId(m.id)}
                    className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg scale-105"
                        : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="size-4" />
                    <span>{m.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Module Spotlight Card */}
            <div className="rounded-3xl border border-orange-300/70 bg-white p-6 sm:p-10 shadow-xl relative overflow-hidden transition-all">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                <div className="space-y-6 lg:max-w-xl">
                  <div className="flex items-center gap-3">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-600">
                      {(() => {
                        const Icon = activeModule.icon;
                        return <Icon className="size-7" />;
                      })()}
                    </div>
                    <div>
                      <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-0.5 text-[10px] font-extrabold text-orange-700 uppercase tracking-wider">
                        {activeModule.badge}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{activeModule.name} Module</h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    {activeModule.desc}
                  </p>

                  <div className="space-y-2.5">
                    <p className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Key Capabilities</p>
                    {activeModule.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm font-bold text-slate-800">
                        <div className="flex size-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                          <Check className="size-3.5 stroke-[3]" />
                        </div>
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full lg:w-96 rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-orange-400 font-bold">MODULE PREVIEW</span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> LIVE ENGINE
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Simulated Action</p>
                      <p className="text-xs font-bold text-white mt-1">{activeModule.sampleAction}</p>
                    </div>

                    <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 flex items-center justify-between">
                      <span className="text-xs text-slate-300">Automated Audit Trail</span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">VERIFIED</span>
                    </div>

                    <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50 flex items-center justify-between">
                      <span className="text-xs text-slate-300">Cross-Module Sync</span>
                      <span className="text-xs font-mono text-orange-400 font-bold">INSTANT</span>
                    </div>
                  </div>

                  <a href="#apply" className="block pt-2">
                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 py-3 text-xs font-extrabold text-white hover:opacity-95 cursor-pointer shadow-md">
                      <span>Configure {activeModule.name} for Your Team</span>
                      <ArrowRight className="size-4" />
                    </button>
                  </a>
                </div>
              </div>
            </div>

            {/* Grid of all 9 modules */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-4">
              {modules.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedModuleId === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModuleId(m.id)}
                    className={`group relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-orange-500 bg-white shadow-xl ring-2 ring-orange-500/20"
                        : "border-slate-200 bg-white hover:border-orange-300 hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 border border-orange-100 text-orange-600 group-hover:scale-110 transition-transform">
                        <Icon className="size-6" />
                      </div>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                        {m.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5-STEP IMPLEMENTATION WORKFLOW */}
        <section id="process" className="py-16 sm:py-24 border-t border-slate-200 bg-white relative">
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <SectionBadge>Guaranteed Onboarding</SectionBadge>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                How we onboard your business step by step.
              </h2>
              <p className="text-slate-600 text-base">
                We don't just hand you software — our engineering team builds and configures it around your operations.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="relative rounded-3xl border border-slate-200 bg-slate-50/50 p-6 space-y-4 flex flex-col justify-between hover:bg-white hover:border-orange-400 hover:shadow-xl transition-all group"
                >
                  <div>
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 font-mono">
                      {step.num}
                    </span>
                    <h3 className="mt-3 text-lg font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">{step.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                    <div className="size-2.5 rounded-full bg-orange-600 group-hover:scale-125 transition-transform" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phase {step.num}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTORS / TARGET AUDIENCE */}
        <section id="audiences" className="py-24 relative bg-slate-50/60 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <SectionBadge>Built For Operations-Heavy Businesses</SectionBadge>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Tailored for multi-step operational sectors.
              </h2>
              <p className="text-slate-600 text-base">
                Whether you manufacture goods, manage site projects, or distribute inventory, one adapts to your exact operational steps.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {audiences.map((aud) => {
                const Icon = aud.icon;
                return (
                  <div
                    key={aud.title}
                    className="rounded-3xl border border-slate-200 bg-white p-7 hover:border-orange-400 transition-all space-y-5 shadow-sm hover:shadow-xl group"
                  >
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 group-hover:scale-110 transition-transform">
                      <Icon className="size-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900">{aud.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2">{aud.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Sample Workflow Pipeline</p>
                      <div className="flex flex-wrap gap-1.5">
                        {aud.flow.map((f, i) => (
                          <span key={i} className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-700 border border-slate-200">
                            {f} {i < aud.flow.length - 1 && <ChevronRight className="size-2.5 text-slate-400" />}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* APPLICATION FORM SECTION */}
        <section id="apply" className="py-24 relative overflow-hidden bg-white border-t border-slate-200">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] rounded-full bg-gradient-to-tr from-orange-500/20 via-red-500/10 to-transparent blur-[160px]" />

          <div className="mx-auto max-w-4xl px-4 sm:px-6 relative space-y-12">
            <div className="text-center space-y-4">
              <SectionBadge>Applications Open • Launch 10 Cohort</SectionBadge>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
                Apply for the Launch 10 Program
              </h2>
              <p className="text-slate-600 text-lg max-w-xl mx-auto">
                Strictly 10 businesses will be selected for 6 months of free software access, setup, and dedicated technical onboarding.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-xl p-2 sm:p-6 shadow-2xl">
              <ApplicationForm />
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="py-24 border-t border-slate-200 bg-slate-50/60">
          <div className="mx-auto max-w-4xl px-6 space-y-12">
            <div className="text-center space-y-4">
              <SectionBadge>Got Questions?</SectionBadge>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>

            <FaqAccordion />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12 text-slate-600">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/one-logo.png" alt="one Logo" className="h-9 w-auto object-contain" />
            <span className="text-xs text-slate-500 border-l border-slate-200 pl-3 font-bold">
              One Platform. Unified Operations.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-extrabold text-slate-700">
            <a href="#problem" className="hover:text-orange-600 transition-colors">Problem</a>
            <a href="#calculator" className="hover:text-orange-600 transition-colors">ROI Calculator</a>
            <a href="#modules" className="hover:text-orange-600 transition-colors">Modules</a>
            <a href="#process" className="hover:text-orange-600 transition-colors">Process</a>
            <a href="#apply" className="hover:text-orange-600 transition-colors">Apply</a>
            <a href="/terms" className="hover:text-orange-600 transition-colors">Terms & Conditions</a>
          </div>

          <div className="text-xs font-semibold text-slate-400">
            © {new Date().getFullYear()} one — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
