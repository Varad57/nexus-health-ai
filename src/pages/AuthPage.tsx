import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stethoscope, Users, Building2, Eye, EyeOff, Mail, Lock, User, Activity } from "lucide-react";

type Role = "doctor" | "patient" | "staff";
type AuthMode = "login" | "register";

interface AuthPageProps {
  onLogin: (role: Role) => void;
}

const roles: { id: Role; icon: React.ElementType; title: string; desc: string }[] = [
  { id: "doctor", icon: Stethoscope, title: "Doctor", desc: "Access patient records & analytics" },
  { id: "patient", icon: Users, title: "Patient", desc: "View your health reports" },
  { id: "staff", icon: Building2, title: "Staff", desc: "Hospital management tools" },
];

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [selectedRole, setSelectedRole] = useState<Role>("doctor");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  const handleDemo = () => {
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary/30 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
        </div>
        <div className="relative z-10 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Activity className="w-7 h-7 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-display font-bold text-primary-foreground">NexusHealth AI</h1>
            </div>
            <h2 className="text-4xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              Intelligent Healthcare<br />
              <span className="text-gradient">Analytics Platform</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              AI-powered medical report analysis, real-time health insights, and critical alert detection for modern healthcare.
            </p>
            <div className="space-y-4">
              {["ML-powered health analysis", "Real-time critical alerts", "Voice & gesture control", "Smart patient management"].map((feature, i) => (
                <motion.div key={feature} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full gradient-primary" />
                  <span className="text-primary-foreground/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right auth form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold">NexusHealth AI</h1>
          </div>

          <h2 className="text-2xl font-display font-bold mb-2">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-muted-foreground mb-8">
            {mode === "login" ? "Sign in to your account" : "Get started with NexusHealth AI"}
          </p>

          {/* Role selection */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roles.map((role) => (
              <motion.button
                key={role.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedRole(role.id)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                  selectedRole === role.id
                    ? "border-primary bg-accent shadow-md"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <role.icon className={`w-5 h-5 mx-auto mb-1.5 ${selectedRole === role.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs font-medium ${selectedRole === role.id ? "text-accent-foreground" : "text-muted-foreground"}`}>{role.title}</span>
              </motion.button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "register" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Jane Smith" className="pl-10 h-11 rounded-lg" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="doctor@nexushealth.ai" className="pl-10 h-11 rounded-lg" />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10 pr-10 h-11 rounded-lg" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="gradient" size="lg" className="w-full">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4">
            <Button variant="glass" size="lg" className="w-full" onClick={handleDemo}>
              Demo Login as {roles.find(r => r.id === selectedRole)?.title}
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-primary font-medium hover:underline">
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
