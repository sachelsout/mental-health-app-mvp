import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Uses anon key (client-safe, but server is fine)

export async function GET() {
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .order('order');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}