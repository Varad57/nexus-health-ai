import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import ReportsPage from "./pages/ReportsPage";
import UploadPage from "./pages/UploadPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

type Role = "doctor" | "patient" | "staff";

const AppLayout = ({ onLogout }: { onLogout: () => void }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10 px-4">
          <SidebarTrigger />
        </header>
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>("doctor");

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isAuthenticated ? (
            <AppLayout onLogout={handleLogout} />
          ) : (
            <Routes>
              <Route path="*" element={<AuthPage onLogin={handleLogin} />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
