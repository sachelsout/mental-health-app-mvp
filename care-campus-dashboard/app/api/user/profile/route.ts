import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); 
    
    const { user_id, campus_id, goals } = body;

    if (!user_id || !campus_id || !goals || !Array.isArray(goals)) {
        return NextResponse.json({ error: 'Missing or invalid required fields: user_id, campus_id, and goals (array) are required.' }, { status: 400 });
    }

    const db = supabaseAdmin();

    const { error } = await db.from('users')
      .update({
        campus_id: campus_id,

        goals_json: goals, 
      })

      .eq('id', user_id);

    if (error) {
        console.error("Supabase error during profile update:", error);
        return NextResponse.json({ error: `Database error: ${error.message}` }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'User profile updated successfully.' });

  } catch (error) {
    console.error('API Error in /api/user/profile:', error);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}