import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Server-side client with service role key (admin access)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // This is the service role key
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Delete user data from users table
    const { error: deleteDataError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId);

    if (deleteDataError) {
      console.error('Error deleting user data:', deleteDataError);
      throw deleteDataError;
    }

    // Delete auth user (requires admin privileges)
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteAuthError) {
      console.error('Error deleting auth user:', deleteAuthError);
      throw deleteAuthError;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete account' },
      { status: 500 }
    );
  }
}