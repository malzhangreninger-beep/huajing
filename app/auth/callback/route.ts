import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  // 用户点邮件链接后,会带着 code 来到这里
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 登录成功,跳转回首页
      return NextResponse.redirect(`${origin}/`);
    }
  }

  // 出错或没有 code,跳到登录页
  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}