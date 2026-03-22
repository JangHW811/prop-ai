"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FileText, Send, UploadCloud, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  consultationSchema,
  type ConsultationFormValues,
  type ConsultationPayload,
} from "@/lib/consultation-schema";

const allowedExtensions = [
  "pdf",
  "doc",
  "docx",
  "ppt",
  "pptx",
  "xls",
  "xlsx",
  "hwp",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "zip",
  "txt",
];

const serviceOptions = [
  "앱 개발",
  "웹 개발",
  "웹+앱 개발",
  "UI/UX 기획·디자인",
  "AI 기능 연동",
  "유지보수·운영",
  "기타",
];

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export function ContactForm() {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      name: "",
      company: "",
      phone: "",
      email: "",
      service_type: "",
      message: "",
      file_names: "",
      file_count: 0,
      agreed: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (payload: ConsultationPayload) => {
      const response = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message ?? "전송 중 오류가 발생했습니다.");
      }
      return json;
    },
    onSuccess: () => {
      setSubmitError("");
      setIsSuccess(true);
    },
    onError: (error) => {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
    },
  });

  const fileNames = useMemo(
    () => attachedFiles.map((file) => file.name).join(", "),
    [attachedFiles],
  );

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;

    const next = [...attachedFiles];
    const errors: string[] = [];

    Array.from(incoming).forEach((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!allowedExtensions.includes(extension)) {
        errors.push(`${file.name}: 지원하지 않는 형식`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        errors.push(`${file.name}: 10MB 초과`);
        return;
      }
      if (next.length >= 5) {
        errors.push("최대 5개까지만 첨부 가능합니다.");
        return;
      }
      if (!next.find((item) => item.name === file.name && item.size === file.size)) {
        next.push(file);
      }
    });

    setAttachedFiles(next);
    setFileError(errors.join(" "));
  };

  const onSubmit = (values: ConsultationFormValues) => {
    mutation.mutate({
      ...values,
      file_names: fileNames,
      file_count: attachedFiles.length,
      email: values.email?.trim() ?? "",
      company: values.company?.trim() ?? "",
      service_type: values.service_type?.trim() ?? "",
    });
  };

  return (
    <div className="contact-form-wrap reveal">
      <div className="form-header">
        <h3><FileText size={18} /> 상담 신청서</h3>
      </div>

      {isSuccess ? (
        <div className="form-success" id="formSuccess">
          <div className="success-icon"><Send size={44} /></div>
          <h3>상담 신청이 완료되었습니다!</h3>
          <p>빠른 시간 내에 담당자가 연락드리겠습니다.<br />문의사항은 아래 연락처로 직접 연락 주셔도 됩니다.</p>
          <a href="tel:0637152298" className="btn-primary">063-715-2298</a>
        </div>
      ) : (
        <form id="consultForm" noValidate aria-label="상담 신청 폼" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="f-name">이름 <span className="required">*</span></label>
            <input id="f-name" placeholder="성함을 입력해 주세요" {...register("name")} />
            <span className="form-error" id="err-name">{errors.name?.message}</span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="f-company">회사명 / 서비스명</label>
              <input id="f-company" placeholder="없으면 비워두셔도 됩니다" {...register("company")} />
            </div>
            <div className="form-group">
              <label htmlFor="f-phone">연락처 <span className="required">*</span></label>
              <input id="f-phone" placeholder="010-0000-0000" {...register("phone")} />
              <span className="form-error" id="err-phone">{errors.phone?.message}</span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="f-email">이메일</label>
            <input id="f-email" placeholder="example@email.com" {...register("email")} />
            <span className="form-error">{errors.email?.message}</span>
          </div>

          <div className="form-group">
            <label htmlFor="f-service">문의 유형</label>
            <select id="f-service" {...register("service_type")}>
              <option value="">선택해 주세요</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="f-message">상담 내용 <span className="required">*</span></label>
            <textarea id="f-message" rows={4} placeholder="아이디어나 개발하고 싶은 서비스를 자유롭게 적어 주세요." {...register("message")} />
            <span className="form-error" id="err-message">{errors.message?.message}</span>
          </div>

          <div className="form-group">
            <label>
              파일 첨부 <span className="optional">(선택사항)</span>
            </label>
            <div
              className="file-drop-zone"
              id="fileDropZone"
              role="button"
              tabIndex={0}
              aria-label="파일 첨부 영역, 클릭하거나 파일을 드래그하세요"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.currentTarget.classList.add("dragover");
              }}
              onDragLeave={(event) => {
                event.currentTarget.classList.remove("dragover");
              }}
              onDrop={(event) => {
                event.preventDefault();
                event.currentTarget.classList.remove("dragover");
                addFiles(event.dataTransfer.files);
              }}
            >
              <input
                ref={fileInputRef}
                id="f-files"
                type="file"
                multiple
                onChange={(event) => {
                  addFiles(event.target.files);
                  event.target.value = "";
                }}
              />
              <div className="file-drop-content">
                <UploadCloud size={28} />
                <p>파일을 드래그하거나 <strong>클릭하여 선택</strong></p>
                <p className="file-hint">PDF, Word, PPT, Excel, HWP, 이미지, ZIP (최대 10MB / 최대 5개)</p>
              </div>
            </div>
            <div id="file-list" className="file-list" aria-live="polite">
              {attachedFiles.map((file, index) => (
                <div className="file-item" key={`${file.name}-${file.size}`}>
                  <FileText className="file-item-icon" size={16} />
                  <span className="file-item-name" title={file.name}>{file.name}</span>
                  <span className="file-item-size">{formatBytes(file.size)}</span>
                  <button
                    className="file-item-del"
                    type="button"
                    aria-label={`${file.name} 삭제`}
                    onClick={() => setAttachedFiles(attachedFiles.filter((_, fileIndex) => fileIndex !== index))}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <span className="form-error">{fileError}</span>
          </div>

          <div className="form-group form-check">
            <label className="check-label" htmlFor="f-agree">
              <input id="f-agree" type="checkbox" {...register("agreed")} />
              <span>개인정보 수집·이용에 동의합니다 <span className="required">*</span></span>
            </label>
            <span className="form-error" id="err-agree">{errors.agreed?.message}</span>
          </div>

          {submitError ? <p className="form-error">{submitError}</p> : null}

          <button className="btn-submit" type="submit" id="submitBtn" disabled={mutation.isPending}>
            <Send size={18} /> {mutation.isPending ? "전송 중..." : "상담 신청하기"}
          </button>
        </form>
      )}
    </div>
  );
}
