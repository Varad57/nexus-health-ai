import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Filter, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const patients = [
  { id: "P-1042", name: "Sarah Johnson", age: 34, gender: "Female", condition: "Diabetes Type 2", lastVisit: "2026-03-10", status: "normal", reports: 8 },
  { id: "P-1043", name: "Michael Chen", age: 56, gender: "Male", condition: "Cardiac Arrhythmia", lastVisit: "2026-03-13", status: "critical", reports: 15 },
  { id: "P-1044", name: "Aisha Patel", age: 28, gender: "Female", condition: "Hypothyroidism", lastVisit: "2026-03-12", status: "warning", reports: 5 },
  { id: "P-1045", name: "James Wilson", age: 67, gender: "Male", condition: "Liver Cirrhosis", lastVisit: "2026-03-13", status: "critical", reports: 22 },
  { id: "P-1046", name: "Emily Davis", age: 41, gender: "Female", condition: "Anemia", lastVisit: "2026-03-11", status: "normal", reports: 6 },
  { id: "P-1047", name: "Robert Kim", age: 52, gender: "Male", condition: "Hypertension", lastVisit: "2026-03-09", status: "warning", reports: 12 },
  { id: "P-1048", name: "Maria Garcia", age: 45, gender: "Female", condition: "Chronic Kidney Disease", lastVisit: "2026-03-08", status: "warning", reports: 18 },
  { id: "P-1049", name: "David Park", age: 38, gender: "Male", condition: "Asthma", lastVisit: "2026-03-07", status: "normal", reports: 4 },
];

const PatientsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = patients.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold">Patients</h1>
          <p className="text-muted-foreground mt-1">{patients.length} registered patients</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4" /> Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Add New Patient</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Full Name</Label>
                <Input className="mt-1.5" placeholder="Patient name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Age</Label>
                  <Input className="mt-1.5" type="number" placeholder="Age" />
                </div>
                <div>
                  <Label>Gender</Label>
                  <Input className="mt-1.5" placeholder="Gender" />
                </div>
              </div>
              <div>
                <Label>Condition</Label>
                <Input className="mt-1.5" placeholder="Primary condition" />
              </div>
              <Button variant="gradient" className="w-full">Add Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patients by name or ID..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {["all", "normal", "warning", "critical"].map((s) => (
            <Button
              key={s}
              variant={filterStatus === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(s)}
              className="capitalize"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Patient list */}
      <div className="space-y-3">
        {filtered.map((patient, i) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="glass-card-hover p-4 flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-medium">
                {patient.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium">{patient.name}</p>
                <p className="text-sm text-muted-foreground">{patient.id} • {patient.age}y • {patient.gender}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-medium">{patient.condition}</p>
                <p className="text-xs text-muted-foreground">{patient.reports} reports</p>
              </div>
              <Badge className={`status-${patient.status} capitalize`}>{patient.status}</Badge>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex md:hidden items-center gap-2">
              <Badge className={`status-${patient.status} capitalize text-xs`}>{patient.status}</Badge>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PatientsPage;
