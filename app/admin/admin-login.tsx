"use client";

import { useState } from "react";

interface AdminLoginProps {
    onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (id === "admin" && password === "1234") {
            onLoginSuccess();
        } else {
            setErrorMsg("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-light)] p-4 font-sans">
            <div 
                className="w-full max-w-md bg-[var(--white)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] border border-[var(--border)]"
                style={{ padding: '3.5rem 2.5rem' }}
            >
                <div className="flex flex-col items-center mb-10">
                    <div 
                        className="bg-[var(--primary)] text-[var(--white)] rounded-[var(--radius-lg)] flex items-center justify-center font-black text-3xl mb-4 shadow-[var(--shadow-green)]"
                        style={{ width: '4.5rem', height: '4.5rem' }}
                    >
                        A
                    </div>
                    <h2 className="text-3xl font-extrabold text-[var(--text-dark)] tracking-tight">관리자 로그인</h2>
                    <p className="mt-2.5 text-sm text-[var(--text-muted)] font-medium">관리자 전용 대시보드에 접속합니다.</p>
                </div>
                
                <form 
                    className="flex flex-col" 
                    onSubmit={handleLogin}
                    style={{ gap: '1.5rem' }}
                >
                    <div className="flex flex-col" style={{ gap: '1.25rem' }}>
                        <div>
                            <label className="block text-sm font-bold text-[var(--text-body)] mb-2">아이디</label>
                            <input
                                type="text"
                                value={id}
                                onChange={(e) => { setId(e.target.value); setErrorMsg(""); }}
                                className="appearance-none relative block w-full px-4 py-3 border border-[var(--border)] placeholder-[var(--text-light)] text-[var(--text-body)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-mid)] focus:border-[var(--primary)] sm:text-sm bg-[var(--bg-light)] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[var(--text-body)] mb-2">비밀번호</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setErrorMsg(""); }}
                                className="appearance-none relative block w-full px-4 py-3 border border-[var(--border)] placeholder-[var(--text-light)] text-[var(--text-body)] rounded-[var(--radius-md)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-mid)] focus:border-[var(--primary)] sm:text-sm bg-[var(--bg-light)] transition-colors"
                            />
                        </div>
                    </div>

                    {errorMsg && (
                        <div className="text-sm font-bold text-[#ff4d4f] bg-[#fff2f0] py-2.5 px-3 rounded-[var(--radius-sm)] text-center">
                            {errorMsg}
                        </div>
                    )}

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn-primary w-full justify-center !py-3.5 text-base shadow-[var(--shadow-green)]"
                        >
                            로그인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
