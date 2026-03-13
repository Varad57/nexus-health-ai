import React from "react";
import { motion } from "framer-motion";
import { Users, FileText, AlertTriangle, Activity, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  { title: "Total Patients", value: "2,847", change: "+12.5%", trend: "up", icon: Users, color: "text-primary" },
  { title: "Reports Today", value: "142", change: "+8.2%", trend: "up", icon: FileText, color: "text-success" },
  { title: "Critical Alerts", value: "7", change: "-3.1%", trend: "down", icon: AlertTriangle, color: "text-destructive" },
  { title: "Avg Response Time", value: "2.4m", change: "-18%", trend: "down", icon: Clock, color: "text-warning" },
];

const recentPatients = [
  { id: "P-1042", name: "Sarah Johnson", age: 34, status: "normal", report: "Blood Panel", time: "10 min ago" },
  { id: "P-1043", name: "Michael Chen", age: 56, status: "critical", report: "Cardiac Report", time: "25 min ago" },
  { id: "P-1044", name: "Aisha Patel", age: 28, status: "warning", report: "Thyroid Panel", time: "1 hr ago" },
  { id: "P-1045", name: "James Wilson", age: 67, status: "critical", report: "Liver Function", time: "2 hrs ago" },
  { id: "P-1046", name: "Emily Davis", age: 41, status: "normal", report: "Complete Metabolic", time: "3 hrs ago" },
];

const criticalAlerts = [
  { patient: "Michael Chen", metric: "Troponin I", value: "2.8 ng/mL", threshold: "> 0.4 ng/mL", severity: "critical" },
  { patient: "James Wilson", metric: "ALT", value: "285 U/L", threshold: "> 56 U/L", severity: "critical" },
  { patient: "Aisha Patel", metric: "TSH", value: "0.15 mIU/L", threshold: "< 0.4 mIU/L", severity: "warning" },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Dr. Smith. Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-accent flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              {stat.trend === "up" ? (
                <ArrowUpRight className="w-3.5 h-3.5 text-success" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5 text-success" />
              )}
              <span className="text-xs font-medium text-success">{stat.change}</span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold">Recent Screenings</h2>
            <button className="text-sm text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {recentPatients.map((patient, i) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {patient.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.id} • {patient.report}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={`text-xs status-${patient.status}`}>
                    {patient.status === "normal" ? "Normal" : patient.status === "warning" ? "Warning" : "Critical"}
                  </Badge>
                  <span className="text-xs text-muted-foreground hidden sm:inline">{patient.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold">Critical Alerts</h2>
            <div className="w-2.5 h-2.5 rounded-full bg-destructive animate-pulse" />
          </div>
          <div className="space-y-3">
            {criticalAlerts.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`p-3 rounded-lg border ${alert.severity === "critical" ? "border-destructive/30 bg-destructive/5" : "border-warning/30 bg-warning/5"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{alert.patient}</span>
                  <AlertTriangle className={`w-4 h-4 ${alert.severity === "critical" ? "text-destructive" : "text-warning"}`} />
                </div>
                <p className="text-xs text-muted-foreground">{alert.metric}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-sm font-bold ${alert.severity === "critical" ? "text-destructive" : "text-warning"}`}>{alert.value}</span>
                  <span className="text-xs text-muted-foreground">{alert.threshold}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
