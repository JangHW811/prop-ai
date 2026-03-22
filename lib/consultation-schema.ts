import { z } from "zod";

export const consultationSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요."),
  company: z.string().trim().optional().default(""),
  phone: z
    .string()
    .trim()
    .min(1, "연락처를 입력해 주세요.")
    .regex(/^[0-9\-+\s()]+$/, "올바른 연락처 형식으로 입력해 주세요."),
  email: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || z.email().safeParse(value).success, "올바른 이메일 형식으로 입력해 주세요."),
  service_type: z.string().trim().optional().default(""),
  message: z.string().trim().min(1, "상담 내용을 입력해 주세요."),
  file_names: z.string().trim().optional().default(""),
  file_count: z.number().int().min(0).max(5),
  agreed: z.boolean().refine((value) => value === true, "개인정보 수집·이용에 동의해 주세요."),
});

export type ConsultationPayload = z.infer<typeof consultationSchema>;
export type ConsultationFormValues = z.input<typeof consultationSchema>;
