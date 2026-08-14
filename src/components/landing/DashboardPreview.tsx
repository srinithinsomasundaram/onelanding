import { useState } from "react";
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
  Bot, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles,
  Zap,
  Activity,
  Layers
} from "lucide-react";

const navItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "people", label: "People", icon: Users },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "crm", label: "CRM", icon: UserCheck },
  { id: "sales", label: "Sales", icon: ShoppingBag },
  { id: "purchases", label: "Purchases", icon: ShoppingCart },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "finance", label: "Finance", icon: DollarSign },
  { id: "sops", label: "SOPs", icon: FileText },
];

const statsData = [
  { label: "Total Revenue", value: "₹48.65 L", delta: "+18.4%", positive: true, icon: TrendingUp },
  { label: "Active Orders", value: "142", delta: "+12 new", positive: true, icon: ShoppingBag },
  { label: "Outstanding Receivables", value: "₹8.40 L", delta: "-6.2%", positive: true, icon: DollarSign },
  { label: "Tasks Pending", value: "14", delta: "4 high priority", positive: false, icon: CheckSquare },
];

const activityRows = [
  { id: "SO-2048", name: "Apex Manufacturing Ltd", module: "Sales", status: "Approved", time: "10 mins ago", amount: "₹4,25,000", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "PO-1192", name: "Vanguard Supplies", module: "Purchases", status: "Pending Approval", time: "25 mins ago", amount: "₹1,80,000", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { id: "INV-3401", name: "Prism Global Corp", module: "Finance", status: "Paid", time: "1 hour ago", amount: "₹6,12,500", color: "bg-orange-50 text-orange-700 border-orange-200" },
  { id: "TSK-0842", name: "Quality Check & Audit Line B", module: "Tasks", status: "In Progress", time: "2 hours ago", amount: "SOP-12", color: "bg-red-50 text-red-700 border-red-200" },
  { id: "CRM-0521", name: "Horizon Builders Lead", module: "CRM", status: "Negotiation", time: "3 hours ago", amount: "₹12,00,000", color: "bg-purple-50 text-purple-700 border-purple-200" },
];

const barHeights = [45, 62, 54, 78, 68, 92, 85, 98, 88, 100];

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 sm:p-4 shadow-2xl">
      {/* Top Browser Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 bg-slate-50/80 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-red-400 inline-block" />
          <span className="size-3 rounded-full bg-amber-400 inline-block" />
          <span className="size-3 rounded-full bg-emerald-400 inline-block" />
          <div className="ml-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 shadow-sm">
            <span className="inline-block size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-slate-700">app.one/workspace</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-bold text-orange-700">
            <Sparkles className="size-3 text-orange-600" /> Live Operations Engine
          </span>
        </div>
      </div>

      {/* Main App Layout Grid */}
      <div className="grid lg:grid-cols-[220px_1fr] min-h-[520px]">
        {/* Sidebar Nav */}
        <aside className="hidden border-r border-slate-200 bg-slate-50/50 p-4 lg:block">
          <div className="flex items-center gap-2.5 px-2 py-2 mb-4 border-b border-slate-200/80">
            <img src="/one-logo.png" alt="one Logo" className="h-7 w-auto object-contain" />
            <div>
              <p className="text-xs font-extrabold text-slate-900 tracking-wide">Workspace</p>
              <p className="text-[10px] text-slate-500">Unified Business OS</p>
            </div>
          </div>

          <p className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
            Modules
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-md font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <Activity className="size-3 text-white/90" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Workspace Body */}
        <div className="space-y-6 p-4 sm:p-6 bg-white">
          {/* Mobile Horizontal Navigation Bar */}
          <div className="flex lg:hidden overflow-x-auto gap-2 border-b border-slate-200/80 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Operations Command Center</h3>
                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  REAL-TIME
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Cross-module synchronization across sales, inventory, and finance.</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors">
                <Layers className="size-3.5" /> Filter Modules
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md hover:opacity-90 transition-opacity">
                <Zap className="size-3.5" /> Run Automation
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-4 hover:border-orange-500/40 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                    <div className="flex size-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <ArrowUpRight className="size-3.5" />
                    <span>{stat.delta}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visualization Section */}
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            {/* Chart Container */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">Monthly Cash Flow & Margin Growth</h4>
                  <p className="text-[11px] text-slate-500">Unified revenue tracking across all active business units</p>
                </div>
                <span className="text-xs font-bold text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-lg">
                  Target +24%
                </span>
              </div>

              {/* Bar Chart Mockup */}
              <div className="mt-6 flex h-40 items-end justify-between gap-2 border-b border-slate-200 pb-2 px-2">
                {barHeights.map((height, i) => (
                  <div key={i} className="group relative flex-1 flex flex-col items-center gap-1">
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-[10px] font-mono text-white pointer-events-none">
                      {height}%
                    </div>
                    <div
                      style={{ height: `${height}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        i >= barHeights.length - 2
                          ? "bg-gradient-to-t from-red-600 to-orange-500"
                          : i % 2 === 0
                          ? "bg-gradient-to-t from-orange-500 to-amber-500"
                          : "bg-orange-200 hover:bg-orange-500"
                      }`}
                    />
                    <span className="text-[9px] font-mono text-slate-400">M{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Operations Feed */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-extrabold text-slate-900">Live Activity Log</h4>
                <span className="text-[11px] text-slate-500 font-mono">5 Active Stream</span>
              </div>

              <div className="space-y-3">
                {activityRows.map((row) => (
                  <div
                    key={row.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-white p-2.5 hover:border-orange-300 transition-all text-xs shadow-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 font-mono">{row.id}</span>
                        <span className="truncate text-slate-700 font-medium">{row.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{row.time}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`inline-block rounded-lg border px-2 py-0.5 text-[10px] font-bold ${row.color}`}>
                        {row.status}
                      </span>
                      <p className="text-[11px] font-extrabold text-slate-800 mt-1">{row.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}