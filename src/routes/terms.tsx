import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ChevronLeft, ArrowRight, CheckCircle2, FileText, Sparkles, Building2, UserCheck, Lock } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — one Launch 10 Program" },
      { name: "description", content: "Terms & Conditions for participating in the one Launch 10 Program." },
    ],
  }),
  component: TermsPage,
});

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-orange-700">
      <Sparkles className="size-3 text-orange-600" />
      <span>{children}</span>
    </div>
  );
}

function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-700">
      {/* STICKY HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-orange-600 transition-colors">
            <ChevronLeft className="size-4 text-orange-600" />
            <span>Back to main landing</span>
          </Link>

          <Link to="/" className="flex items-center gap-3">
            <img src="/one-logo.png" alt="one Logo" className="h-9 w-auto object-contain" />
          </Link>

          <a href="/#apply">
            <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-5 py-2 text-xs font-extrabold text-white shadow-lift hover:opacity-95 transition-all">
              <span>Apply for Launch 10</span>
              <ArrowRight className="size-3.5" />
            </button>
          </a>
        </div>
      </header>

      {/* HERO BANNER */}
      <section className="relative overflow-hidden pt-16 pb-12 border-b border-slate-200/80 bg-slate-50/50">
        <div className="mx-auto max-w-4xl px-6 text-center space-y-4">
          <SectionBadge>Official Legal Terms</SectionBadge>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Launch 10 Program Terms & Conditions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before submitting your application for the Launch 10 Program on <strong>one</strong>.
          </p>
          <p className="text-xs text-slate-400 font-medium">Last updated: August 14, 2026</p>
        </div>
      </section>

      {/* MAIN TERMS CONTENT */}
      <main className="mx-auto max-w-4xl px-6 py-16 space-y-12">
        {/* Highlight Grid */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
            <div className="flex size-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600 font-bold">
              <CheckCircle2 className="size-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">6 Months Free Access</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Selected 10 businesses receive 100% free software access and onboarding setup.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold">
              <UserCheck className="size-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">No Credit Card Required</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              No payment card information or automatic recurring charges to participate.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-xs">
            <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold">
              <Lock className="size-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Confidentiality Assured</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Your business process data and information remain strictly private and secure.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-slate-700 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-orange-700 text-xs font-black">1</span>
              Program Eligibility & Selection
            </h2>
            <p>
              The <strong>Launch 10 Program</strong> is designed for high-growth operations-heavy businesses (such as manufacturing, construction, contracting, building supplies, industrial equipment, and distribution). Strictly <strong>10 businesses</strong> will be selected by our engineering evaluation committee based on operational complexity and workflow alignment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-orange-700 text-xs font-black">2</span>
              6-Month Subscription Grant
            </h2>
            <p>
              Selected participants will be granted full access to the <strong>one</strong> unified business operations platform for 6 consecutive months starting from the official onboarding completion date. This includes custom module configuration, role access setup, document layout design, and onboarding support at zero subscription fee.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-orange-700 text-xs font-black">3</span>
              Participant Onboarding & Feedback Commitments
            </h2>
            <p>
              By participating in Launch 10, participant companies agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Appoint a primary operational lead to participate in initial setup discovery calls.</li>
              <li>Provide constructive feedback to our core engineering team regarding module usability and workflow customization.</li>
              <li>Allow the <strong>one</strong> team to conduct bi-weekly operational review check-ins during the 6-month period.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-orange-700 text-xs font-black">4</span>
              Data Privacy & Security Standard
            </h2>
            <p>
              We prioritize the privacy and security of your operational records. All customer databases, employee roles, financial logs, and transaction details processed through <strong>one</strong> are encrypted and will never be shared, sold, or exposed to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg bg-orange-100 text-orange-700 text-xs font-black">5</span>
              Post-Program Transition
            </h2>
            <p>
              At the conclusion of the 6-month free period, participants may choose to transition into a commercial subscription plan or custom service arrangement. There is zero obligation or automatic card billing required to participate.
            </p>
          </section>
        </div>

        {/* CTA Box */}
        <div className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-red-50/50 p-8 text-center space-y-4">
          <h3 className="text-2xl font-black text-slate-900">Ready to unify your business operations?</h3>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Apply now to join the 10 selected businesses receiving 6 months free access and dedicated setup.
          </p>
          <a href="/#apply" className="inline-block">
            <button className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-base font-extrabold text-white shadow-lift hover:scale-105 transition-all">
              <span>Apply for Launch 10 Program</span>
              <ArrowRight className="size-5" />
            </button>
          </a>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-10 text-slate-600">
        <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <img src="/one-logo.png" alt="one Logo" className="h-7 w-auto object-contain" />
            <span className="text-slate-500">Unified Business Operations</span>
          </div>

          <div className="text-slate-400">
            © {new Date().getFullYear()} one — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
