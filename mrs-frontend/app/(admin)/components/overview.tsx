import Link from "next/link";
import {
  CalendarDays,
  Clapperboard,
  CircleDollarSign,
  Clock3,
  Film,
  Ticket,
  TrendingUp,
  Users,
  ArrowRight,
  Armchair,
  Settings,
  ChartNoAxesCombined,
  Plus,
} from "lucide-react";

const stats = [
  {
    label: "Total Movies",
    value: "—",
    note: "Movies in your catalog",
    icon: Film,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    href: "/mrsai/movies",
  },
  {
    label: "Upcoming Showtimes",
    value: "—",
    note: "Scheduled screenings",
    icon: CalendarDays,
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    href: "/mrsai/showtimes",
  },
  {
    label: "Reservations",
    value: "—",
    note: "Total bookings",
    icon: Ticket,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    href: "/mrsai/reservations",
  },
  {
    label: "Registered Users",
    value: "—",
    note: "Customer accounts",
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    href: "/mrsai/users",
  },
  {
    label: "Total Revenue",
    value: "—",
    note: "Recorded ticket sales",
    icon: CircleDollarSign,
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    href: "/mrsai/revenue",
  },
];

const quickActions = [
  {
    label: "Manage Movies",
    description: "Add, edit and remove movies",
    href: "/mrsai/movies",
    icon: Film,
  },
  {
    label: "Assign Showtimes",
    description: "Schedule screenings and halls",
    href: "/mrsai/showtimes",
    icon: CalendarDays,
  },
  {
    label: "Manage Reservations",
    description: "Review customer bookings",
    href: "/mrsai/reservations",
    icon: Ticket,
  },
  {
    label: "Manage Users",
    description: "View registered accounts",
    href: "/mrsai/users",
    icon: Users,
  },
  {
    label: "View Revenue",
    description: "Review cinema earnings",
    href: "/mrsai/revenue",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Cinema Setup",
    description: "Configure halls and seats",
    href: "/mrsai/cinema",
    icon: Settings,
  },
];

const overviewSections = [
  {
    title: "Movie catalog",
    description: "Keep your movie listings and posters up to date.",
    href: "/mrsai/movies",
    icon: Clapperboard,
  },
  {
    title: "Screening schedule",
    description: "Review showtimes and manage cinema scheduling.",
    href: "/mrsai/showtimes",
    icon: Clock3,
  },
  {
    title: "Cinema capacity",
    description: "Inspect configured halls and seating arrangements.",
    href: "/mrsai/cinema",
    icon: Armchair,
  },
];

type OverviewDashboardProps = {
  username?: string;
};

export default function OverviewDashboard({
  username,
}: OverviewDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-yellow-400">Administration</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome{username ? `, ${username}` : " back"}
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Monitor your cinema operations and manage daily activities.
          </p>
        </div>

        <Link
          href="/mrsai/movies"
          className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#fffd00] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-yellow-300"
        >
          <Plus className="size-4" />
          Manage Movies
        </Link>
      </section>

      {/* Summary cards */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">At a glance</h2>
          <span className="text-xs text-slate-500">
            Connect your API to populate these figures
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-yellow-400/40 hover:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                    <p className="mt-3 text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>

                  <div className={`rounded-lg p-3 ${stat.bg} ${stat.color}`}>
                    <Icon className="size-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="text-xs text-slate-500">{stat.note}</p>
                  <ArrowRight className="size-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-yellow-400" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main content and actions */}
      <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {/* Revenue placeholder */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-white">Revenue overview</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Track ticket sales and cinema earnings.
                </p>
              </div>

              <Link
                href="/mrsai/revenue"
                className="inline-flex items-center gap-1 text-sm text-yellow-400 hover:text-yellow-300"
              >
                View reports <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="mt-6 flex min-h-44 flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/40 p-6 text-center">
              <TrendingUp className="size-8 text-yellow-400" />
              <p className="mt-3 font-medium text-slate-200">
                Revenue analytics
              </p>
              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Connect your revenue endpoint to display earnings trends, daily
                totals and comparisons.
              </p>
            </div>
          </div>

          {/* Management sections */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">
              Cinema management
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              {overviewSections.map((section) => {
                const Icon = section.icon;

                return (
                  <Link
                    key={section.title}
                    href={section.href}
                    className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-yellow-400/40"
                  >
                    <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-yellow-400/10 text-yellow-400">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="font-semibold text-white">
                      {section.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {section.description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-yellow-400">
                      Open section <ArrowRight className="size-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <aside className="h-fit rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <h2 className="font-semibold text-white">Quick actions</h2>
          <p className="mt-1 text-sm text-slate-400">
            Shortcuts to common tasks.
          </p>

          <div className="mt-5 space-y-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-lg border border-slate-800 p-3 transition hover:border-yellow-400/40 hover:bg-slate-800/60"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-yellow-400">
                    <Icon className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-200">
                      {action.label}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {action.description}
                    </p>
                  </div>

                  <ArrowRight className="size-4 shrink-0 text-slate-500" />
                </Link>
              );
            })}
          </div>
        </aside>
      </section>
    </div>
  );
}
