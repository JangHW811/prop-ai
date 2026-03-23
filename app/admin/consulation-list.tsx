"use client";

interface ConsulationListProps {
  consultations: any[];
  onLogout: () => void;
}

import { supabase } from "@/lib/supabase";

export function ConsulationList({ consultations, onLogout }: ConsulationListProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-gray)] p-4 md:p-8 font-sans flex flex-col">
      <div className="w-full bg-[var(--white)] p-6 md:p-8 shadow-[var(--shadow-lg)] rounded-[var(--radius-xl)] border border-[var(--border)] flex-1 flex flex-col">
        <div className="flex justify-between items-center border-b border-[var(--border)] pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--primary)] text-[var(--white)] rounded-[var(--radius-sm)] flex items-center justify-center font-black text-sm shadow-[var(--shadow-green)]">
              A
            </div>
            <h1 className="text-2xl font-extrabold text-[var(--text-dark)] tracking-tight">상담 신청 내역</h1>
          </div>
          <button
            onClick={onLogout}
            className="btn-secondary !py-2 !px-4 !text-sm"
          >
            로그아웃
          </button>
        </div>

        {(!consultations || consultations.length === 0) ? (
          <div className="text-center py-24 text-[var(--text-light)]">
            <p className="text-lg font-medium">등록된 상담 신청 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-[var(--bg-light)] border-y border-[var(--border)]">
                  <th className="p-4 font-bold text-[var(--text-muted)] text-sm w-16 text-center">ID</th>
                  <th className="p-4 font-bold text-[var(--text-muted)] text-sm w-28">이름</th>
                  <th className="p-4 font-bold text-[var(--text-muted)] text-sm">연락처</th>
                  <th className="p-4 font-bold text-[var(--text-muted)] text-sm">회사/서비스</th>
                  <th className="p-4 font-bold text-[var(--text-muted)] text-sm">이메일</th>
                  <th className="p-4 font-bold text-[var(--text-muted)] text-sm">문의 유형</th>
                  <th className="p-4 font-bold text-[var(--text-muted)] text-sm min-w-[240px]">상담 내용</th>
                  <th className="p-4 font-bold text-[var(--text-muted)] text-sm w-20 text-center">첨부파일</th>
                  <th className="p-4 font-bold text-[var(--text-muted)] text-sm w-44">신청 일시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {consultations.map((item) => (
                  <tr key={item.id} className="hover:bg-[var(--primary-light)] transition-[background] duration-200">
                    <td className="p-4 text-sm text-[var(--text-light)] text-center font-medium">{item.id}</td>
                    <td className="p-4 text-sm font-bold text-[var(--text-dark)]">{item.name}</td>
                    <td className="p-4 text-sm font-bold text-[var(--primary-dark)]">{item.phone}</td>
                    <td className="p-4 text-sm text-[var(--text-body)]">
                      {item.company || <span className="text-[var(--text-light)]">-</span>}
                    </td>
                    <td className="p-4 text-sm text-[var(--text-body)]">
                      {item.email || <span className="text-[var(--text-light)]">-</span>}
                    </td>
                    <td className="p-4 text-sm">
                      {item.service_type ? (
                        <span className="bg-[var(--accent-light)] text-[var(--accent)] font-bold px-3 py-1.5 rounded-full text-xs tracking-wide">
                          {item.service_type}
                        </span>
                      ) : (
                        <span className="text-[var(--text-light)]">-</span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-[var(--text-body)] max-w-sm">
                      <div className="line-clamp-2 hover:line-clamp-none cursor-pointer leading-relaxed" title={item.message}>
                        {item.message}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-center">
                      {item.file_paths ? (
                        <div className="flex flex-col gap-1 items-center">
                          {item.file_paths.split(",").map((path: string, index: number) => {
                            const { data } = supabase.storage.from("consultations").getPublicUrl(path);
                            // Get actual filename from the saved string: {timestamp}-{random}-{name}.ext
                            // Better yet, just show "파일 1", "파일 2" or full path briefly
                            const originalName = item.file_names?.split(",")[index]?.trim() || `파일 ${index + 1}`;
                            
                            return (
                              <a 
                                key={path} 
                                href={data.publicUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-block bg-[var(--bg-gray)] px-2 py-0.5 rounded-[var(--radius-sm)] text-xs font-bold text-[var(--primary)] border border-[var(--border)] hover:bg-[var(--primary-light)] transition-colors"
                                title={originalName}
                              >
                                다운로드 {index + 1}
                              </a>
                            );
                          })}
                        </div>
                      ) : item.file_count > 0 ? (
                        <span className="bg-[var(--bg-gray)] px-2.5 py-1 rounded-[var(--radius-sm)] text-xs font-bold text-[var(--text-muted)] border border-[var(--border)] shadow-sm" title={item.file_names}>
                          {item.file_count}개
                        </span>
                      ) : (
                        <span className="text-[var(--text-light)]">-</span>
                      )}
                    </td>
                    <td className="p-4 text-xs font-medium text-[var(--text-muted)]">
                      {new Date(item.created_at).toLocaleString("ko-KR", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
