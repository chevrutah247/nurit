-- Create the nurit_subscribers table
CREATE TABLE IF NOT EXISTS nurit_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  birthday DATE NOT NULL,
  hebrew_birthday TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE nurit_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow service_role to insert rows
CREATE POLICY "Service role can insert subscribers"
  ON nurit_subscribers
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow service_role to read rows
CREATE POLICY "Service role can read subscribers"
  ON nurit_subscribers
  FOR SELECT
  TO service_role
  USING (true);
