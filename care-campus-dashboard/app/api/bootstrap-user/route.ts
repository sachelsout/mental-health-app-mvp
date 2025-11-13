import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json();
    const db = supabaseAdmin();
    const { error } = await db.from('users').upsert({
      id: user.id,
      email: user.email,
      consent_accepted_at: new Date().toISOString(), // Default consent for demo
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to bootstrap user' }, { status: 500 });
  }
}