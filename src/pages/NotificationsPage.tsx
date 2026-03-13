import React from "react";
import { motion } from "framer-motion";
import { Bell, AlertTriangle, FileText, Users, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { id: 1, type: "critical", title: "Critical Alert: Michael Chen", desc: "Troponin I levels critically elevated (2.8 ng/mL). Immediate attention required.", time: "5 min ago", read: false },
  { id: 2, type: "critical", title: "Critical Alert: James Wilson", desc: "ALT levels 5x above normal range. Liver function deteriorating.", time: "25 min ago", read: false },
  { id: 3, type: "report", title: "New Report Available", desc: "Blood panel results for Sarah Johnson are ready for review.", time: "1 hr ago", read: false },
  { id: 4, type: "patient", title: "New Patient Registered", desc: "David Park (P-1049) has been added to your patient list.", time: "2 hrs ago", read: true },
  { id: 5, type: "report", title: "AI Analysis Complete", desc: "Thyroid panel analysis for Aisha Patel completed. Warning flags detected.", time: "3 hrs ago", read: true },
  { id: 6, type: "system", title: "System Update", desc: "ML model v2.4 deployed. Improved cardiac anomaly detection accuracy by 12%.", time: "5 hrs ago", read: true },
];

const iconMap = {
  critical: AlertTriangle,
  report: FileText,
  patient: Users,
  system: CheckCircle2,
};

const NotificationsPage: React.FC = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">Notifications</h1>
          <p className="text-muted-foreground mt-1">{unreadCount} unread notifications</p>
        </div>
        <button className="text-sm text-primary font-medium hover:underline">Mark all read</button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif, i) => {
          const Icon = iconMap[notif.type as keyof typeof iconMap] || Bell;
          return (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`glass-card p-4 flex gap-4 transition-all ${!notif.read ? "border-l-2 border-l-primary" : "opacity-70"}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                notif.type === "critical" ? "bg-destructive/10 text-destructive" :
                notif.type === "report" ? "bg-primary/10 text-primary" :
                notif.type === "patient" ? "bg-success/10 text-success" :
                "bg-muted text-muted-foreground"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{notif.title}</p>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{notif.time}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{notif.desc}</p>
              </div>
              {!notif.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;
