import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Expect { user_id: '...', mood: 3, stress: 4, energy: 2, note: '...' }
    const db = supabaseAdmin();
    const { error } = await db.from('check_ins').insert([body]);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save check-in' }, { status: 500 });
  }
}