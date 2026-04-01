import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET — fetch visible donations (last 30 days)
export async function GET() {
  const { data, error } = await supabase
    .from('donations')
    .select('donor_name, amount, currency, created_at')
    .eq('is_visible', true)
    .gte('show_until', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

// POST — add a donation (requires admin secret)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { donor_name, amount, currency, secret } = body;

  // Simple secret check for admin access
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!donor_name || !amount) {
    return NextResponse.json({ error: 'donor_name and amount required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('donations')
    .insert({
      donor_name,
      amount: parseFloat(amount),
      currency: currency || 'USD',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
