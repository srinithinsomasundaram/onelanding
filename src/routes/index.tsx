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
  Mail
} from "lucide-react";

const pageTitle = "one — One Platform. Unified Operations.";
const pageDescription =
  "one is a business operating platform that unifies people, tasks, CRM, sales, purchases, inventory, finance, SOPs, and AI. Join the Launch 10 Program: 10 businesses, 6 months free.";

const problemItems = [
  { tool: "Excel / Google Sheets", forWhat: "for manual tracking & formula errors", icon: FileSpreadsheet, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { tool: "WhatsApp Groups", forWhat: "for order updates & untracked messages", icon: MessageSquare, color: "text-green-600 bg-green-50 border-green-200" },
  { tool: "Accounting Software", forWhat: "isolated from sales & dispatch", icon: Receipt, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { tool: "Standalone CRM", forWhat: "disconnected from inventory stock", icon: UserCheck, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { tool: "Email Chains", forWhat: "for internal purchase approvals", icon: Mail, color: "text-orange-600 bg-orange-50 border-orange-200" },
];

const modules = [
  { name: "People", desc: "Manage employees, departments, roles, shift schedules and organizational access control.", icon: Users, badge: "HR & Org" },
  { name: "Tasks", desc: "Assign, track, and complete operational work with automated reminders and dependency tracking.", icon: CheckSquare, badge: "Workflows" },
  { name: "CRM", desc: "Manage leads, pipeline stages, customer interactions, follow-ups, and communication logs.", icon: UserCheck, badge: "Sales Ops" },
  { name: "Sales", desc: "Generate quotes, dispatch sales orders, process tax invoices, and track incoming payments.", icon: ShoppingBag, badge: "Revenue" },
  { name: "Purchases", desc: "Manage vendor catalogues, purchase requisitions, approval matrix, and GRNs.", icon: ShoppingCart, badge: "Procurement" },
  { name: "Inventory", desc: "Track raw materials, finished goods, batch stock, multi-warehouse movements, and reorders.", icon: Package, badge: "Warehouse" },
  { name: "Finance", desc: "Track operational expenses, accounts receivable, payables, and cash flow statement summaries.", icon: DollarSign, badge: "Accounting" },
  { name: "SOPs", desc: "Standardize step-by-step operating procedures, checklists, and compliance audits.", icon: FileText, badge: "Standards" },
  { name: "Reports", desc: "Real-time consolidated analytics across all business units and operational bottlenecks.", icon: BarChart3, badge: "Analytics" },
];

const steps = [
  { num: "01", title: "Understand", desc: "We study your existing business workflows, pain points, and current spreadsheets or tools." },
  { num: "02", title: "Configure", desc: "We map and configure one modules specifically tailored around how your team operates." },
  { num: "03", title: "Integrate", desc: "We connect existing systems (e.g. accounting software, WhatsApp, email) where technically feasible." },
  { num: "04", title: "Automate", desc: "We eliminate repetitive manual entry, redundant approvals, and status tracking follow-ups." },
  { num: "05", title: "Improve", desc: "We continuously refine rules, reports, and capabilities based on your team's real daily usage." },
];

const audiences = [
  { icon: Factory, title: "Manufacturing & Production", desc: "Seamlessly connect shop floor production, raw material purchasing, batch inventory, and sales orders." },
  { icon: HardHat, title: "Construction & Contracting", desc: "Manage site teams, project task milestones, material requisitions, contractor approvals, and vendor bills." },
  { icon: Building2, title: "Building Materials & Hardware", desc: "Track customer orders, multi-warehouse stock levels, contractor pricing quotes, and payment collections." },
  { icon: Briefcase, title: "Industrial Equipment & Services", desc: "Unify service ticketing, equipment dispatch, preventive maintenance SOPs, and client billing." },
  { icon: Boxes, title: "Distribution & Wholesale Trading", desc: "Manage product catalogues, dealer margins, bulk dispatching, inventory replenishment, and credit terms." },
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
    <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700">
      <Sparkles className="size-3 text-orange-600" />
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
            className={`rounded-2xl border bg-white transition-all overflow-hidden shadow-xs ${
              isOpen ? "border-orange-400 ring-2 ring-orange-500/10 shadow-md" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-slate-900 text-base sm:text-lg hover:text-orange-600 transition-colors cursor-pointer"
            >
              <span className="pr-4">{faq.q}</span>
              <div className={`flex size-8 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 shrink-0 transition-transform duration-200 ${
                isOpen ? "rotate-180 bg-orange-50 border-orange-200 text-orange-600" : ""
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

export default function IndexPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-700">
      <Toaster />

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/one-logo.png"
              alt="one Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold text-slate-700">
            <a href="#problem" className="hover:text-orange-600 transition-colors">Problem</a>
            <a href="#modules" className="hover:text-orange-600 transition-colors">Modules</a>
            <a href="#process" className="hover:text-orange-600 transition-colors">Process</a>
            <a href="#audiences" className="hover:text-orange-600 transition-colors">Sectors</a>
            <a href="#faq" className="hover:text-orange-600 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <a href="#apply">
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-5 py-2.5 text-xs font-extrabold text-white shadow-lift hover:opacity-95 hover:scale-[1.03] transition-all">
                <span>Apply for Launch 10</span>
                <ChevronRight className="size-4" />
              </button>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-50/60 via-white to-white">
          {/* Ambient Glowing Background Orbs */}
          <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[400px] sm:h-[550px] w-[90vw] max-w-[1000px] rounded-full bg-gradient-to-tr from-orange-500/15 via-red-500/10 to-transparent blur-[120px]" />
          <div className="pointer-events-none absolute top-24 right-1/4 h-[280px] w-[320px] rounded-full bg-orange-400/10 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center space-y-6 sm:space-y-8">
              {/* Ultra-Punchy Premium Title */}
              <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] max-w-4xl mx-auto">
                One Platform.
                <br />
                <span className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Unified Operations.
                </span>
              </h1>

              {/* Reduced, Impactful Subtitle */}
              <p className="text-sm sm:text-lg font-medium text-slate-600 max-w-xl mx-auto leading-relaxed px-2">
                Replace scattered spreadsheets & tools with one intelligent operating system for your business.
              </p>

              {/* Mobile-Optimized CTA Group */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
                <a href="#apply" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-extrabold text-white shadow-lift hover:scale-[1.02] hover:shadow-glow-orange transition-all cursor-pointer">
                    <span>Apply for Launch 10</span>
                    <ArrowRight className="size-4 sm:size-5" />
                  </button>
                </a>
                <a href="#modules" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3.5 sm:py-4 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer">
                    <span>Explore Modules</span>
                    <ChevronRight className="size-4 text-slate-400" />
                  </button>
                </a>
              </div>

              {/* Ultra-Compact Single Line Feature Highlights */}
              <div className="pt-1 flex items-center justify-center">
                <div className="inline-flex items-center justify-center gap-1.5 sm:gap-3 rounded-full border border-slate-200/80 bg-slate-50/90 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold text-slate-700 shadow-2xs whitespace-nowrap">
                  <div className="flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                    <span>6 Months Free</span>
                  </div>
                  <span className="text-slate-300 font-light">•</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                    <span>Custom Setup</span>
                  </div>
                  <span className="text-slate-300 font-light">•</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                    <span>No Credit Card</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Demo Preview (hidden on mobile viewport, visible on sm and above) */}
            <div className="hidden sm:block mt-10 sm:mt-16">
              <DashboardPreview />
            </div>
          </div>
        </section>

        {/* THE PROBLEM SECTION */}
        <section id="problem" className="relative border-y border-slate-200/80 bg-slate-50/60 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <SectionBadge>The Operational Challenge</SectionBadge>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
                Your business shouldn't run across disconnected tools.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                When operational data lives in separate apps, teams spend half their day manually copying information, chasing order updates, and correcting errors.
              </p>
              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 sm:p-5 text-orange-800 text-xs sm:text-sm font-bold shadow-xs">
                ⚡ It’s time to replace fragmented chaos with a single source of operational truth.
              </div>
            </div>

            <div className="space-y-3">
              {problemItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.tool}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:translate-x-1 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex size-10 items-center justify-center rounded-xl border ${item.color}`}>
                        <Icon className="size-5" />
                      </div>
                      <span className="font-extrabold text-slate-900 text-sm sm:text-base">{item.tool}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 pl-13 sm:pl-0">{item.forWhat}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10 MODULES UNIFIED */}
        <section id="modules" className="py-16 sm:py-24 relative bg-white">
          <div className="mx-auto max-w-7xl px-6 space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <SectionBadge>Integrated Core Modules</SectionBadge>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                One platform for your entire operational pipeline.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Every department operates from the same synchronized workspace with real-time permissions.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <div
                    key={m.name}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 hover:border-orange-500/50 hover:shadow-xl transition-all duration-300 shadow-sm"
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
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5-STEP IMPLEMENTATION WORKFLOW */}
        <section id="process" className="py-16 sm:py-24 border-t border-slate-200/80 bg-slate-50/50 relative">
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <SectionBadge>Guaranteed Onboarding</SectionBadge>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                How we onboard your business step by step.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                We don't just hand you software — our engineering team builds and configures it around your operations.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="relative rounded-3xl border border-slate-200 bg-white p-6 space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 font-mono">
                      {step.num}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="size-2 rounded-full bg-orange-600" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTORS / TARGET AUDIENCE */}
        <section id="audiences" className="py-24 relative bg-white">
          <div className="mx-auto max-w-7xl px-6 space-y-16">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <SectionBadge>Built For Operations-Heavy Businesses</SectionBadge>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Tailored for multi-step operational sectors.
              </h2>
              <p className="text-slate-600 text-base">
                Whether you manufacture goods, manage site projects, or distribute inventory, one adapts to your workflows.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {audiences.map((aud) => {
                const Icon = aud.icon;
                return (
                  <div
                    key={aud.title}
                    className="rounded-3xl border border-slate-200 bg-white p-7 hover:border-orange-400 transition-all space-y-4 shadow-sm hover:shadow-lg"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 border border-orange-200 text-orange-600">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{aud.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{aud.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* APPLICATION FORM SECTION */}
        <section id="apply" className="py-24 relative overflow-hidden bg-white border-t border-slate-200/80">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-orange-500/10 blur-[150px]" />

          <div className="mx-auto max-w-4xl px-6 relative space-y-12">
            <div className="text-center space-y-4">
              <SectionBadge>Applications Open</SectionBadge>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
                Apply for the Launch 10 Program
              </h2>
              <p className="text-slate-600 text-lg max-w-xl mx-auto">
                Strictly 10 businesses will be selected for 6 months of free software access, setup, and dedicated technical onboarding.
              </p>
            </div>

            <ApplicationForm />
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="py-24 border-t border-slate-200/80 bg-slate-50/50">
          <div className="mx-auto max-w-4xl px-6 space-y-12">
            <div className="text-center space-y-4">
              <SectionBadge>Got Questions?</SectionBadge>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
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
            <img src="/one-logo.png" alt="one Logo" className="h-8 w-auto object-contain" />
            <span className="text-xs text-slate-500 border-l border-slate-200 pl-3 font-semibold">
              Unified Business Operations Platform
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#problem" className="hover:text-orange-600 transition-colors">Problem</a>
            <a href="#modules" className="hover:text-orange-600 transition-colors">Modules</a>
            <a href="#process" className="hover:text-orange-600 transition-colors">Process</a>
            <a href="#apply" className="hover:text-orange-600 transition-colors">Apply</a>
            <a href="/terms" className="hover:text-orange-600 transition-colors">Terms & Conditions</a>
          </div>

          <div className="text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} one — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
