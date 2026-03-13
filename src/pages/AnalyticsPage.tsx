import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, FileText, Activity } from "lucide-react";

const metrics = [
  { label: "Patient Satisfaction", value: "94%", change: "+2.3%", icon: Users },
  { label: "Report Accuracy", value: "99.2%", change: "+0.4%", icon: FileText },
  { label: "Avg Analysis Time", value: "1.8s", change: "-22%", icon: Activity },
  { label: "Anomalies Detected", value: "156", change: "+18%", icon: TrendingUp },
];

const monthlyData = [
  { month: "Oct", patients: 2100, reports: 3400, critical: 45 },
  { month: "Nov", patients: 2300, reports: 3800, critical: 38 },
  { month: "Dec", patients: 2450, reports: 4100, critical: 52 },
  { month: "Jan", patients: 2600, reports: 4500, critical: 41 },
  { month: "Feb", patients: 2720, reports: 4800, critical: 35 },
  { month: "Mar", patients: 2847, reports: 5200, critical: 28 },
];

const AnalyticsPage: React.FC = () => {
  const maxReports = Math.max(...monthlyData.map(d => d.reports));

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl font-display font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">Platform performance and health insights</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                <m.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{m.label}</span>
            </div>
            <p className="text-2xl font-display font-bold">{m.value}</p>
            <p className="text-xs text-success font-medium mt-1">{m.change} vs last month</p>
          </motion.div>
        ))}
      </div>

      {/* Simple bar chart */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-display font-semibold mb-6">Monthly Report Volume</h2>
        <div className="flex items-end gap-4 h-48">
          {monthlyData.map((d, i) => (
            <motion.div
              key={d.month}
              initial={{ height: 0 }}
              animate={{ height: `${(d.reports / maxReports) * 100}%` }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <span className="text-xs font-medium">{d.reports.toLocaleString()}</span>
              <div className="w-full gradient-primary rounded-t-lg flex-1 min-h-[20px]" />
              <span className="text-xs text-muted-foreground">{d.month}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Health distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-display font-semibold mb-4">Health Risk Distribution</h2>
          <div className="space-y-4">
            {[
              { label: "Normal", pct: 68, className: "bg-success" },
              { label: "Warning", pct: 22, className: "bg-warning" },
              { label: "Critical", pct: 10, className: "bg-destructive" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className={`h-full rounded-full ${item.className}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-lg font-display font-semibold mb-4">Top Detected Conditions</h2>
          <div className="space-y-3">
            {[
              { condition: "Diabetes Markers", count: 342, trend: "+5%" },
              { condition: "Cardiac Risk Factors", count: 218, trend: "+12%" },
              { condition: "Thyroid Imbalance", count: 186, trend: "-3%" },
              { condition: "Liver Abnormalities", count: 154, trend: "+8%" },
              { condition: "Renal Dysfunction", count: 98, trend: "-1%" },
            ].map((item, i) => (
              <div key={item.condition} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono">#{i + 1}</span>
                  <span className="text-sm font-medium">{item.condition}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-display font-semibold">{item.count}</span>
                  <span className="text-xs text-success">{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
