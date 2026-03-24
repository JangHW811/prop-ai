"use client";

import {
  CalendarClock,
  Files,
  Inbox,
  LogOut,
  MessageSquareText,
  Paperclip,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export interface Consultation {
  id: number;
  name: string;
  phone: string;
  company?: string | null;
  email?: string | null;
  service_type?: string | null;
  message?: string | null;
  file_paths?: string | null;
  file_names?: string | null;
  file_count?: number | null;
  created_at: string;
}

interface ConsulationListProps {
  consultations: Consultation[];
  onLogout: () => void;
}

function splitCsv(value?: string | null) {
  return (value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getFileEntries(item: Consultation) {
  const paths = splitCsv(item.file_paths);
  const names = splitCsv(item.file_names);

  return paths.map((path, index) => {
    const { data } = supabase.storage.from("consultations").getPublicUrl(path);

    return {
      path,
      publicUrl: data.publicUrl,
      label: names[index] || `파일 ${index + 1}`,
    };
  });
}

function getAttachmentCount(item: Consultation) {
  const pathCount = splitCsv(item.file_paths).length;
  return pathCount > 0 ? pathCount : item.file_count || 0;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isToday(value: string) {
  const target = new Date(value);
  const today = new Date();

  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  );
}

function StatCard({
  icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "default" | "accent";
}) {
  const accentClasses =
    tone === "accent"
      ? "border-[color:rgba(3,199,90,0.14)] bg-[linear-gradient(135deg,#03c75a_0%,#02a94b_100%)] text-white"
      : "border-[var(--border)] bg-[var(--white)] text-[var(--text-dark)]";

  const mutedClasses =
    tone === "accent" ? "text-white/72" : "text-[var(--text-muted)]";
  const iconClasses =
    tone === "accent"
      ? "bg-white/16 text-white"
      : "bg-[var(--primary-light)] text-[var(--primary)]";

  return (
    <div
      className={`rounded-[24px] border px-5 py-5 shadow-[0_16px_36px_rgba(15,23,42,0.06)] ${accentClasses}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={`text-xs font-bold uppercase tracking-[0.14em] ${mutedClasses}`}
          >
            {label}
          </p>
          <p className="mt-3 text-2xl font-extrabold tracking-[-0.03em]">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-[16px] ${iconClasses}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export function ConsulationList({
  consultations,
  onLogout,
}: ConsulationListProps) {
  const totalCount = consultations.length;
  const todayCount = consultations.filter((item) =>
    isToday(item.created_at),
  ).length;
  const attachmentsCount = consultations.reduce(
    (sum, item) => sum + getAttachmentCount(item),
    0,
  );
  const latestCreatedAt = consultations[0]?.created_at;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] px-8 py-12 font-sans md:px-12 md:py-14">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 md:gap-6">
        <section className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[rgba(255,255,255,0.92)] shadow-[0_22px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm mb-8">
          <div className="flex flex-col gap-5 px-8 py-6 md:px-12 md:py-9 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-[var(--primary-light)] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[var(--primary)]">
                Admin Workspace
              </span>
              <div className="mt-4 flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#03c75a_0%,#02a94b_100%)] text-[var(--white)] shadow-[var(--shadow-green)]">
                  <Inbox className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold tracking-[-0.03em] text-[var(--text-dark)] md:text-[2rem]">
                    상담 신청 관리
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--text-muted)] md:text-[15px]">
                    최근 접수순으로 상담 요청을 빠르게 확인하고, 첨부 파일과
                    핵심 정보를 한 화면에서 정리해 볼 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 lg:justify-end">
              <div className="rounded-[18px] border border-[var(--border)] bg-[var(--white)] px-4 py-3 text-sm text-[var(--text-muted)] shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-light)]">
                  Last update
                </span>
                <span className="mt-1 block font-semibold text-[var(--text-body)]">
                  {latestCreatedAt
                    ? formatDate(latestCreatedAt)
                    : "접수 내역 없음"}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="btn-secondary !rounded-[18px] !px-5 !py-3 !text-sm !font-bold"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Inbox className="h-5 w-5" />}
            label="Total Requests"
            value={`${totalCount}건`}
          />
          <StatCard
            icon={<CalendarClock className="h-5 w-5" />}
            label="Received Today"
            value={`${todayCount}건`}
          />
          <StatCard
            icon={<Paperclip className="h-5 w-5" />}
            label="Attachments"
            value={`${attachmentsCount}개`}
          />
          <StatCard
            icon={<Files className="h-5 w-5" />}
            label="Review Queue"
            value={totalCount === 0 ? "비어 있음" : `${totalCount}건 확인 대기`}
            tone="accent"
          />
        </section>

        <section className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--white)] shadow-[0_24px_52px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 border-b border-[var(--border)] px-8 py-8 md:px-12 md:py-9 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                Consultation List
              </p>
              <h2 className="mt-2 text-xl font-extrabold tracking-[-0.02em] text-[var(--text-dark)]">
                접수 내역 {totalCount}건
              </h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                이름, 연락처, 문의 유형, 첨부 파일을 빠르게 훑어보도록 정보
                밀도를 정리했습니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[var(--bg-light)] px-3 py-1.5 text-xs font-bold text-[var(--text-muted)]">
                최근 접수순
              </span>
              <span className="rounded-full bg-[var(--primary-light)] px-3 py-1.5 text-xs font-bold text-[var(--primary-dark)]">
                오늘 {todayCount}건
              </span>
              <span className="rounded-full bg-[var(--accent-light)] px-3 py-1.5 text-xs font-bold text-[var(--accent)]">
                첨부 {attachmentsCount}개
              </span>
            </div>
          </div>

          {totalCount === 0 ? (
            <div className="px-5 py-16 md:px-8 md:py-20">
              <div className="mx-auto flex max-w-md flex-col items-center rounded-[24px] bg-[var(--bg-light)] px-6 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[var(--white)] text-[var(--primary)] shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                  <MessageSquareText className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[var(--text-dark)]">
                  등록된 상담 신청이 없습니다
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                  새로운 문의가 접수되면 이 영역에 정리된 리스트와 파일 다운로드
                  버튼이 함께 표시됩니다.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-6 px-6 py-6 md:hidden">
                {consultations.map((item) => {
                  const files = getFileEntries(item);
                  const attachmentCount = getAttachmentCount(item);

                  return (
                    <article
                      key={item.id}
                      className="rounded-[22px] border border-[var(--border)] bg-[var(--bg-light)] p-4 shadow-[0_10px_26px_rgba(15,23,42,0.04)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-light)]">
                            #{item.id}
                          </p>
                          <h3 className="mt-1 text-lg font-extrabold text-[var(--text-dark)]">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-[var(--primary-dark)]">
                            {item.phone}
                          </p>
                        </div>
                        <span className="rounded-full bg-[var(--accent-light)] px-3 py-1.5 text-xs font-bold text-[var(--accent)]">
                          {item.service_type || "미분류"}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-[var(--text-body)]">
                        <div className="rounded-[16px] bg-[var(--white)] px-4 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-light)]">
                            회사 / 이메일
                          </p>
                          <p className="mt-2 leading-6">
                            {item.company || "-"}
                          </p>
                          <p className="text-[var(--text-muted)]">
                            {item.email || "-"}
                          </p>
                        </div>
                        <div className="rounded-[16px] bg-[var(--white)] px-4 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-light)]">
                            상담 내용
                          </p>
                          <p className="mt-2 whitespace-pre-wrap break-words leading-6 text-[var(--text-body)]">
                            {item.message || "문의 내용 없음"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
                        <span>{formatDate(item.created_at)}</span>
                        <span className="rounded-full bg-[var(--white)] px-2.5 py-1 font-bold text-[var(--text-body)]">
                          첨부 {attachmentCount}개
                        </span>
                      </div>

                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {files.map((file, index) => (
                            <a
                              key={file.path}
                              href={file.publicUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--white)] px-3 py-2 text-xs font-bold text-[var(--primary)]"
                              title={file.label}
                            >
                              <Paperclip className="h-3.5 w-3.5" />
                              다운로드 {index + 1}
                            </a>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="hidden md:block">
                <div className="overflow-x-auto px-4 pb-4 pt-3 md:px-6 md:pb-6">
                  <table className="min-w-[1100px] w-full border-separate border-spacing-0 text-left">
                    <thead>
                      <tr>
                        <th className="rounded-l-[18px] bg-[var(--bg-light)] pl-5 pr-5 pt-5 pb-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--text-light)]">
                          ID
                        </th>
                        <th className="bg-[var(--bg-light)] pl-5 pr-5 pt-5 pb-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--text-light)]">
                          이름
                        </th>
                        <th className="bg-[var(--bg-light)] pl-5 pr-5 pt-5 pb-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--text-light)]">
                          연락처
                        </th>
                        <th className="bg-[var(--bg-light)] pl-5 pr-5 pt-5 pb-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--text-light)]">
                          회사 / 이메일
                        </th>
                        <th className="bg-[var(--bg-light)] pl-5 pr-5 pt-5 pb-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--text-light)]">
                          문의 유형
                        </th>
                        <th className="bg-[var(--bg-light)] pl-5 pr-5 pt-5 pb-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--text-light)]">
                          상담 내용
                        </th>
                        <th className="bg-[var(--bg-light)] pl-5 pr-5 pt-5 pb-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--text-light)]">
                          첨부파일
                        </th>
                        <th className="rounded-r-[18px] bg-[var(--bg-light)] pl-5 pr-5 pt-5 pb-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[var(--text-light)]">
                          신청 일시
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {consultations.map((item) => {
                        const files = getFileEntries(item);
                        const attachmentCount = getAttachmentCount(item);

                        return (
                          <tr key={item.id} className="group">
                            <td className="border-b border-[rgba(228,232,239,0.85)] pl-5 pr-5 pt-5 pb-5 align-top text-sm font-semibold text-[var(--text-light)] transition-colors group-hover:bg-[#f7fcf9]">
                              #{item.id}
                            </td>
                            <td className="border-b border-[rgba(228,232,239,0.85)] pl-5 pr-5 pt-5 pb-5 align-top transition-colors group-hover:bg-[#f7fcf9]">
                              <div>
                                <p className="font-bold text-[var(--text-dark)]">
                                  {item.name}
                                </p>
                                <p className="mt-1 text-xs text-[var(--text-muted)]">
                                  {item.company || "회사 정보 없음"}
                                </p>
                              </div>
                            </td>
                            <td className="border-b border-[rgba(228,232,239,0.85)] pl-5 pr-5 pt-5 pb-5 align-top text-sm font-bold text-[var(--primary-dark)] transition-colors group-hover:bg-[#f7fcf9]">
                              {item.phone}
                            </td>
                            <td className="border-b border-[rgba(228,232,239,0.85)] pl-5 pr-5 pt-5 pb-5 align-top text-sm leading-6 text-[var(--text-body)] transition-colors group-hover:bg-[#f7fcf9]">
                              <p>{item.company || "-"}</p>
                              <p className="text-[var(--text-muted)]">
                                {item.email || "-"}
                              </p>
                            </td>
                            <td className="border-b border-[rgba(228,232,239,0.85)] pl-5 pr-5 pt-5 pb-5 align-top transition-colors group-hover:bg-[#f7fcf9]">
                              <span className="inline-flex rounded-full bg-[var(--accent-light)] px-3 py-1.5 text-xs font-bold text-[var(--accent)]">
                                {item.service_type || "미분류"}
                              </span>
                            </td>
                            <td className="border-b border-[rgba(228,232,239,0.85)] pl-5 pr-5 pt-5 pb-5 align-top text-sm text-[var(--text-body)] transition-colors group-hover:bg-[#f7fcf9]">
                              <div className="max-w-[24rem]">
                                <p
                                  className="line-clamp-3 whitespace-pre-wrap break-words leading-6"
                                  title={item.message || ""}
                                >
                                  {item.message || "문의 내용 없음"}
                                </p>
                              </div>
                            </td>
                            <td className="border-b border-[rgba(228,232,239,0.85)] pl-5 pr-5 pt-5 pb-5 align-top transition-colors group-hover:bg-[#f7fcf9]">
                              {files.length > 0 ? (
                                <div className="flex max-w-[13rem] flex-wrap gap-2">
                                  {files.map((file, index) => (
                                    <a
                                      key={file.path}
                                      href={file.publicUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--white)] px-3 py-1.5 text-xs font-bold text-[var(--primary)] transition-colors hover:bg-[var(--primary-light)]"
                                      title={file.label}
                                    >
                                      <Paperclip className="h-3.5 w-3.5" />
                                      파일 {index + 1}
                                    </a>
                                  ))}
                                </div>
                              ) : attachmentCount > 0 ? (
                                <span className="inline-flex rounded-full bg-[var(--bg-light)] px-3 py-1.5 text-xs font-bold text-[var(--text-muted)]">
                                  {attachmentCount}개
                                </span>
                              ) : (
                                <span className="text-sm text-[var(--text-light)]">
                                  -
                                </span>
                              )}
                            </td>
                            <td className="border-b border-[rgba(228,232,239,0.85)] pl-5 pr-5 pt-5 pb-5 align-top text-sm font-medium text-[var(--text-muted)] transition-colors group-hover:bg-[#f7fcf9]">
                              {formatDate(item.created_at)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
