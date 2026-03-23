import { NextResponse } from "next/server";

import { consultationSchema } from "@/lib/consultation-schema";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json(
      { success: false, error: "invalid_json", message: "JSON 본문이 필요합니다." },
      { status: 400 },
    );
  }

  const parsed = consultationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "validation_error",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.name === "FAIL" || parsed.data.email === "fail@propai.kr") {
    return NextResponse.json(
      {
        success: false,
        error: "simulated_failure",
        message: "더미 API 실패 경로가 실행되었습니다.",
      },
      { status: 422 },
    );
  }

  const { error } = await supabase.from("consultations").insert([
    {
      name: parsed.data.name,
      company: parsed.data.company,
      phone: parsed.data.phone,
      email: parsed.data.email,
      service_type: parsed.data.service_type,
      message: parsed.data.message,
      file_names: parsed.data.file_names,
      file_count: parsed.data.file_count,
      agreed: parsed.data.agreed,
    },
  ]);

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "database_error",
        message: "데이터 저장 중 오류가 발생합니다.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "상담 신청이 접수되었습니다.",
    received: parsed.data,
  });
}
