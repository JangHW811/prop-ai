"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { AdminLogin } from "./admin-login";
import { ConsulationList, type Consultation } from "./consulation-list";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const { data: cols, error } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setConsultations((cols || []) as Consultation[]);
    }
    setLoading(false);
  }

  const handleLoginSuccess = async () => {
    setIsAuthenticated(true);
    await fetchData();
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] flex items-center justify-center px-4">
        <div className="rounded-[24px] border border-[var(--border)] bg-[rgba(255,255,255,0.92)] px-6 py-5 text-center shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <p className="text-[var(--text-muted)] font-semibold">데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <ConsulationList 
      consultations={consultations} 
      onLogout={() => setIsAuthenticated(false)} 
    />
  );
}
