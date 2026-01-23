import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { getDashboard } from "../api/dashboard";

export default function Home() {
  const [range, setRange] = useState("week");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [range]);

  async function loadStats() {
    setLoading(true);
    const data = await getDashboard(range);
    setStats(data);
    setLoading(false);
  }

  if (loading || !stats) {
    return (
      <PageWrapper>
        <p className="text-center text-gray-500">
          Loading dashboard...
        </p>
      </PageWrapper>
    );
  }

  const { counts, success, momentum, velocity } = stats;

  return (
    <PageWrapper>
      {/* ───────── HEADER ───────── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-500">
            Productivity overview ({range})
          </p>
        </div>

        {/* Range Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {["week", "month", "year"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-1 rounded-md text-sm ${
                range === r
                  ? "bg-white shadow font-medium"
                  : "text-gray-500"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ───────── OVERVIEW ───────── */}
      <Section title="Overview">
        <Grid cols={4}>
          <Card label="Active Tasks" value={counts.active} />
          <Card label="Overdue Tasks" value={counts.overdue} />
          <Card label="Completed Tasks" value={counts.completed} />
          <Card
            label="Success Rate"
            value={`${success.successPercentage}%`}
          />
        </Grid>
      </Section>

      {/* ───────── HEALTH SIGNALS ───────── */}
      <Section title="Health Signals">
        <Grid cols={2}>
          <Card
            label="Overdue Load"
            value={counts.overdue}
            sub="Tasks past their due date"
          />
          <Card
            label="Avg Completion Time"
            value={
              velocity.avgCompletionTime
                ? `${Math.round(
                    velocity.avgCompletionTime / 86400000
                  )} days`
                : "—"
            }
            sub="From creation to completion"
          />
        </Grid>
      </Section>

      {/* ───────── MOMENTUM ───────── */}
      <Section title="Momentum">
        <Grid cols={3}>
          <Card
            label="Completed Today"
            value={momentum.completedToday}
          />
          <Card
            label="This Week"
            value={momentum.completedThisWeek}
          />
          <Card
            label="This Month"
            value={momentum.completedThisMonth}
          />
        </Grid>
      </Section>
    </PageWrapper>
  );
}

/* ───────── SMALL REUSABLE UI PARTS ───────── */

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Grid({ cols, children }) {
  return (
    <div
      className={`grid gap-4 ${
        cols === 4
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          : cols === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {children}
    </div>
  );
}

function Card({ label, value, sub }) {
  return (
    <div className="bg-white border border-black rounded-lg p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">
        {value}
      </p>
      {sub && (
        <p className="text-xs text-gray-400 mt-1">
          {sub}
        </p>
      )}
    </div>
  );
}
