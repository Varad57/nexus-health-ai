import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const reports = [
  { id: "R-2301", patient: "Sarah Johnson", patientId: "P-1042", type: "Blood Panel", date: "2026-03-10", status: "normal", findings: "All values within normal range" },
  { id: "R-2302", patient: "Michael Chen", patientId: "P-1043", type: "Cardiac Report", date: "2026-03-13", status: "critical", findings: "Elevated Troponin I, abnormal ECG pattern" },
  { id: "R-2303", patient: "Aisha Patel", patientId: "P-1044", type: "Thyroid Panel", date: "2026-03-12", status: "warning", findings: "Low TSH, elevated T4 levels" },
  { id: "R-2304", patient: "James Wilson", patientId: "P-1045", type: "Liver Function", date: "2026-03-13", status: "critical", findings: "ALT/AST significantly elevated" },
  { id: "R-2305", patient: "Emily Davis", patientId: "P-1046", type: "Complete Metabolic", date: "2026-03-11", status: "normal", findings: "Minor vitamin D deficiency noted" },
  { id: "R-2306", patient: "Robert Kim", patientId: "P-1047", type: "Lipid Panel", date: "2026-03-09", status: "warning", findings: "LDL cholesterol above optimal range" },
];

const ReportsPage: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">Reports</h1>
          <p className="text-muted-foreground mt-1">AI-analyzed medical reports</p>
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card-hover p-5"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{report.type}</p>
                    <Badge className={`status-${report.status} capitalize text-xs`}>{report.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.patient} ({report.patientId})</p>
                  <p className="text-sm text-muted-foreground mt-1">{report.findings}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  {report.date}
                </div>
                <Button variant="ghost" size="icon"><Eye className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
