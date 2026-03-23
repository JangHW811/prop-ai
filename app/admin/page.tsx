"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AdminLogin } from "./admin-login";
import { ConsulationList } from "./consulation-list";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const fetchData = async () => {
    setLoading(true);
    const { data: cols, error } = await supabase
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
    } else {
      setConsultations(cols || []);
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-light)] flex items-center justify-center">
        <p className="text-[var(--text-muted)] font-medium">데이터를 불러오는 중입니다...</p>
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
