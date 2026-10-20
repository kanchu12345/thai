# Supabase Setup Guide for LOTUS Ceylon CMS

This guide walks you through setting up the free Supabase backend for the **LOTUS Ceylon International Tours & Services** website and CMS Admin Panel.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com/](https://supabase.com/) and sign in (or sign up for free).
2. Click **"New Project"**.
3. Fill in the project details:
   - **Name**: `lotus-ceylon-website`
   - **Database Password**: Choose a strong password and save it securely.
   - **Region**: Select a nearby region (e.g. `Singapore - ap-southeast-1` or `Mumbai - ap-south-1`).
4. Click **"Create new project"** and wait ~2 minutes for the database to spin up.

---

## 2. Run the SQL Schema

1. In your Supabase Dashboard, click on **SQL Editor** (icon in the left sidebar).
2. Click **"New query"**.
3. Open the file `supabase/schema.sql` from this repository.
4. Copy its entire contents, paste it into the Supabase SQL Editor, and click **"Run"** (green button).
5. You should see `Success. No rows returned`.
6. This automatically creates:
   - All tables (`roles`, `site_settings`, `tour_categories`, `tours`, `destinations`, `inquiries`, `reviews`)
   - Strict Row Level Security (RLS) policies (public can only read published items, public can insert inquiries, only authenticated admins can manage content)
   - Auto-updating `updated_at` triggers
   - Initial seed settings and 10 tour categories.

---

## 3. Create your First Admin User

1. In the Supabase Dashboard, click on **Authentication** > **Users**.
2. Click **"Add user"** > **"Create user"**.
3. Enter your admin email (e.g., `admin@lotusceylon.com`) and a strong password.
4. Ensure **"Auto Confirm User?"** is checked (or verify via email if required).
5. Click **"Create user"**.
6. Copy the **User UID** (UUID string, e.g. `c7b3f942-xxxx-xxxx-xxxx-xxxxxxxxxxxx`) of the user you just created.

---

## 4. Assign the Super Admin Role

1. Go back to **SQL Editor** > **New query**.
2. Run this quick query, replacing `YOUR_COPIED_USER_UID_HERE` with your actual copied UID:

```sql
INSERT INTO public.roles (user_id, role)
VALUES ('YOUR_COPIED_USER_UID_HERE', 'super_admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';
```

3. Click **Run**. Your user is now officially recognized as a `super_admin` by Row Level Security!

---

## 5. Enable Storage Bucket ("media")

The SQL script already initializes the `media` bucket, but verify or configure it via the dashboard:

1. In the Supabase Dashboard, click on **Storage**.
2. If `media` is not listed, click **"New bucket"**:
   - Bucket name: `media`
   - **Public bucket**: **ON** (checked)
   - Click **Save**.
3. Under Storage > Policies, confirm that:
   - Anyone can view images (`Public Access` SELECT).
   - Only admins can upload/delete (`Admin Upload Access`, `Admin Delete Access`).

---

## 6. Connect the Website & Admin Panel

1. In your Supabase Dashboard, click **Project Settings** (gear icon bottom left) > **API**.
2. Find the following two values:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **Project API keys** > `anon` / `public` key (e.g., `eyJhbGciOiJIUzI1NiIsInR5...`)
3. Open `js/config.js` in your project codebase:
4. Update the `supabase` section:

```javascript
supabase: {
  url: "https://your-project-id.supabase.co", // Replace with your Project URL
  anonKey: "your-anon-key-here",              // Replace with your anon/public key
  storageBucket: "media"
}
```

> **Security Note:** The `anonKey` is safe to use in frontend code because **Row Level Security (RLS)** protects your database. Unauthenticated visitors can only read published content and submit inquiries. No one can modify data without logging into `/admin` with an authenticated admin account.

---

## 7. Accessing the Admin Panel

- Open your browser to `/admin/` (or `http://localhost:port/admin/` during local testing).
- Log in with the email and password you created in Step 3.
- You can now manage Inquiries, Tour Packages, Categories, Site Settings, and Media uploads!
