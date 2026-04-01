-- Donations ticker table
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  show_until TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  is_visible BOOLEAN DEFAULT true
);

-- Index for efficient querying of active donations
CREATE INDEX IF NOT EXISTS idx_donations_visible ON public.donations (is_visible, show_until DESC);

-- RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow public to read visible donations
CREATE POLICY "Public can read visible donations" ON public.donations
  FOR SELECT USING (is_visible = true AND show_until > NOW());

-- Allow service role full access
CREATE POLICY "Service role full access" ON public.donations
  FOR ALL USING (true) WITH CHECK (true);
