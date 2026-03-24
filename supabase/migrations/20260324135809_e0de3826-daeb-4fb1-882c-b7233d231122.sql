
-- Create destination type enum
CREATE TYPE public.destination_type AS ENUM ('visited', 'wishlist');

-- Create event type enum
CREATE TYPE public.event_type AS ENUM ('milestone', 'custom');

-- Destinations table
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  type destination_type NOT NULL DEFAULT 'visited',
  lat DOUBLE PRECISION NOT NULL DEFAULT 0,
  lng DOUBLE PRECISION NOT NULL DEFAULT 0,
  date TEXT,
  note TEXT,
  emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Relationship events table
CREATE TABLE public.relationship_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  emoji TEXT NOT NULL DEFAULT '📌',
  type event_type NOT NULL DEFAULT 'custom',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relationship_events ENABLE ROW LEVEL SECURITY;

-- Permissive policies (no auth for now)
CREATE POLICY "Allow all on destinations" ON public.destinations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on relationship_events" ON public.relationship_events FOR ALL USING (true) WITH CHECK (true);
