-- Hapus tabel jika sudah ada (untuk reset)
DROP TABLE IF EXISTS invitation_contents;
DROP TABLE IF EXISTS invitations;
DROP TABLE IF EXISTS themes;

-- 1. Buat Tabel Themes (Katalog Tema)
CREATE TABLE themes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  folder_name VARCHAR(255) NOT NULL UNIQUE, -- Contoh: "Template 1"
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Buat Tabel Invitations (Daftar Undangan User)
CREATE TABLE invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  theme_id INTEGER REFERENCES themes(id) ON DELETE RESTRICT NOT NULL,
  url_slug VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'active'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Buat Tabel Invitation Contents (Data teks & foto yang diedit)
CREATE TABLE invitation_contents (
  id SERIAL PRIMARY KEY,
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE NOT NULL UNIQUE,
  groom_name VARCHAR(255) DEFAULT 'Nama Mempelai Pria',
  bride_name VARCHAR(255) DEFAULT 'Nama Mempelai Wanita',
  event_date TIMESTAMP WITH TIME ZONE,
  event_location TEXT,
  main_photo_url TEXT,
  custom_data JSONB DEFAULT '{}'::jsonb, -- Untuk field teks dinamis lainnya
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Data Dummy untuk Themes (Berdasarkan 27 folder template)
-- Anda bisa menjalankan ini agar katalog terisi otomatis
INSERT INTO themes (name, folder_name) VALUES 
('Tema Klasik 1', 'Template 1'),
('Tema Minimalis 2', 'Template 2'),
('Tema Elegan 3', 'Template 3'),
('Tema Floral 4', 'Template 4'),
('Tema Modern 5', 'Template 5'),
('Tema Rustic 6', 'Template 6'),
('Tema Vintage 7', 'Template 7'),
('Tema Gold 8', 'Template 8'),
('Tema Silver 9', 'Template 9'),
('Tema Diamond 10', 'Template 10'),
('Tema Ruby 11', 'Template 11'),
('Tema Emerald 12', 'Template 12'),
('Tema Sapphire 13', 'Template 13'),
('Tema Amethyst 14', 'Template 14'),
('Tema Pearl 15', 'Template 15'),
('Tema Coral 16', 'Template 16'),
('Tema Jade 17', 'Template 17'),
('Tema Onyx 18', 'Template 18'),
('Tema Opal 19', 'Template 19'),
('Tema Topaz 20', 'Template 20'),
('Tema Quartz 21', 'Template 21'),
('Tema Crystal 22', 'Template 22'),
('Tema Amber 23', 'Template 23'),
('Tema Garnet 24', 'Template 24'),
('Tema Beryl 25', 'Template 25'),
('Tema Zircon 26', 'Template 26'),
('Tema Spinel 27', 'Template 27');

-- Set up Row Level Security (RLS)
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitation_contents ENABLE ROW LEVEL SECURITY;

-- Policy untuk Themes (Bisa dibaca semua orang)
CREATE POLICY "Themes are viewable by everyone" ON themes
  FOR SELECT USING (true);

-- Policy untuk Invitations (User hanya bisa melihat dan mengedit miliknya)
CREATE POLICY "Users can view their own invitations" ON invitations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own invitations" ON invitations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own invitations" ON invitations
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy untuk Invitation Contents
CREATE POLICY "Users can view contents for their invitations" ON invitation_contents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM invitations WHERE invitations.id = invitation_contents.invitation_id AND invitations.user_id = auth.uid()
    )
  );
CREATE POLICY "Users can update contents for their invitations" ON invitation_contents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM invitations WHERE invitations.id = invitation_contents.invitation_id AND invitations.user_id = auth.uid()
    )
  );
