-- ==============================================================================
-- LOTUS CEYLON International Tours & Services (Pvt) Ltd
-- Supabase Database Schema, Security & Row Level Security (RLS) Policies
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ROLES TABLE (Admin access control)
CREATE TABLE IF NOT EXISTS public.roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'editor')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Security Definer functions for RLS checks without recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.roles
    WHERE user_id = auth.uid()
    AND role IN ('super_admin', 'editor')
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.roles
    WHERE user_id = auth.uid()
    AND role = 'super_admin'
  );
$$;

-- RLS for Roles:
-- Users can read their own role
CREATE POLICY "Users can view own role"
ON public.roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Only super_admins can insert/update/delete roles
CREATE POLICY "Super admins can manage roles"
ON public.roles FOR ALL
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());


-- 3. SITE SETTINGS TABLE (Key-Value / JSON store for site-wide settings)
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read all site settings
CREATE POLICY "Public can read site settings"
ON public.site_settings FOR SELECT
TO public
USING (true);

-- Authenticated admins can edit site settings
CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());


-- 4. TOUR CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.tour_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.tour_categories ENABLE ROW LEVEL SECURITY;

-- Public can read published categories
CREATE POLICY "Public read published tour categories"
ON public.tour_categories FOR SELECT
TO public
USING (is_published = true OR public.is_admin());

-- Admins have full CRUD
CREATE POLICY "Admins manage tour categories"
ON public.tour_categories FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());


-- 5. TOURS TABLE
CREATE TABLE IF NOT EXISTS public.tours (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category_slug TEXT REFERENCES public.tour_categories(slug) ON UPDATE CASCADE ON DELETE SET NULL,
    nights INT DEFAULT 1,
    days INT DEFAULT 2,
    price_from NUMERIC(10,2),
    is_popular BOOLEAN DEFAULT false,
    hero_image TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    overview TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    itinerary JSONB DEFAULT '[]'::jsonb,
    inclusions JSONB DEFAULT '[]'::jsonb,
    exclusions JSONB DEFAULT '[]'::jsonb,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

-- Public can read published tours
CREATE POLICY "Public read published tours"
ON public.tours FOR SELECT
TO public
USING (is_published = true OR public.is_admin());

-- Admins have full CRUD
CREATE POLICY "Admins manage tours"
ON public.tours FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());


-- 6. DESTINATIONS TABLE
CREATE TABLE IF NOT EXISTS public.destinations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    region TEXT,
    hero_image TEXT,
    description TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- Public can read published destinations
CREATE POLICY "Public read published destinations"
ON public.destinations FOR SELECT
TO public
USING (is_published = true OR public.is_admin());

-- Admins have full CRUD
CREATE POLICY "Admins manage destinations"
ON public.destinations FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());


-- 7. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reference_no TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    travel_dates TEXT,
    travelers_count INT DEFAULT 2,
    tour_slug TEXT,
    package_type TEXT,
    budget_range TEXT,
    special_notes TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'customizing', 'confirmed', 'archived')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone (public/anon) can submit an inquiry
CREATE POLICY "Public can insert inquiries"
ON public.inquiries FOR INSERT
TO public
WITH CHECK (true);

-- Only authenticated admins can read, update or delete inquiries
CREATE POLICY "Admins can view and manage inquiries"
ON public.inquiries FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());


-- 8. REVIEWS & TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    guest_name TEXT NOT NULL,
    country TEXT,
    rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT NOT NULL,
    tour_taken TEXT,
    date_traveled TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public can read published reviews
CREATE POLICY "Public read published reviews"
ON public.reviews FOR SELECT
TO public
USING (is_published = true OR public.is_admin());

-- Admins have full CRUD
CREATE POLICY "Admins manage reviews"
ON public.reviews FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());


-- ==============================================================================
-- 9. AUTOMATIC updated_at TRIGGER FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_tour_categories_updated_at BEFORE UPDATE ON public.tour_categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON public.tours FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ==============================================================================
-- 10. STORAGE BUCKET CONFIGURATION & POLICIES
-- ==============================================================================
-- Run these in Supabase SQL Editor to configure the "media" bucket:

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public read access to media files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- Allow authenticated admins to upload media
CREATE POLICY "Admin Upload Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media' AND public.is_admin());

-- Allow authenticated admins to update/replace media
CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media' AND public.is_admin());

-- Allow authenticated admins to delete media
CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media' AND public.is_admin());


-- ==============================================================================
-- 11. INITIAL SEED DATA
-- ==============================================================================

-- Site Settings
INSERT INTO public.site_settings (key, value) VALUES
('general', '{
  "companyName": "LOTUS CEYLON International Tours & Services (Pvt) Ltd",
  "shortName": "Lotus Ceylon Tours",
  "slogan": "PURE JOURNEYS. SACRED EXPERIENCES.",
  "foundedYear": 2014,
  "phone": "+94 71 54 22 384",
  "phoneRaw": "94715422384",
  "email": "inquiry@lotusceylon.com",
  "secondaryEmail": "lotusceylontours@gmail.com",
  "address": "286/C, Niwandama South, Ja-Ela, Sri Lanka – 11350",
  "whatsapp": "+94 71 54 22 384"
}'::jsonb),
('hero', '{
  "headline": "PURE JOURNEYS. SACRED EXPERIENCES.",
  "intro": "Handcrafted luxury, cultural immersion, and timeless heritage across the pearl of the Indian Ocean with Lotus Ceylon Tours since 2014."
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- Initial Categories (10 Categories)
INSERT INTO public.tour_categories (slug, name, tagline, description, sort_order) VALUES
('cultural-triangle', 'Cultural Triangle', 'Ancient Palaces & Monasteries', 'Explore Sigiriya, Polonnaruwa, and Anuradhapura.', 1),
('buddhist-heritage', 'Buddhist Heritage', 'Sacred Temples & Pilgrimages', 'Sacred relics, Temple of the Tooth, and revered caves.', 2),
('wildlife-safari', 'Wildlife & Safari', 'Leopards, Elephants & Whales', 'Yala, Udawalawe, Minneriya and ocean whale sanctuaries.', 3),
('pristine-beaches', 'Pristine Beaches', 'Golden Shores & Coastal Calm', 'Bentota, Mirissa, Tangalle and Pasikudah coastal havens.', 4),
('hill-country-tea', 'Hill Country & Tea', 'Mist, Waterfalls & Plantations', 'Nuwara Eliya, Ella, and world-renowned Ceylon tea estates.', 5),
('authentic-ayurveda', 'Authentic Ayurveda', 'Holistic Healing & Wellness', 'Rejuvenating herbal wellness therapies and yoga retreats.', 6),
('romantic-honeymoon', 'Romantic Honeymoon', 'Private Escapes & Sunset Cruises', 'Curated romantic hideaways with bespoke candlelit dinners.', 7),
('family-escapes', 'Family Escapes', 'Joyful Discoveries for All Ages', 'Comfortable transfers, wildlife safaris, and beach fun.', 8),
('adventure-trekking', 'Adventure & Trekking', 'Peaks, Rainforests & Rapids', 'Knuckles Mountain Range, Adam’s Peak, and white water rafting.', 9),
('ramayana-trail', 'Ramayana Trail', 'Epic Legend & Sacred Sites', 'Seetha Amman temple, Ravana caves, and ancient legend spots.', 10)
ON CONFLICT (slug) DO NOTHING;
