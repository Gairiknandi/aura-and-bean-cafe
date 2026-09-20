-- Aura & Bean Cafe Database Schema

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  booking_code VARCHAR(20) UNIQUE NOT NULL,
  guest_name VARCHAR(100) NOT NULL,
  guest_email VARCHAR(150) NOT NULL,
  guest_phone VARCHAR(50) NOT NULL,
  party_size INT NOT NULL DEFAULT 2,
  booking_date DATE NOT NULL,
  booking_time VARCHAR(20) NOT NULL,
  seating_area VARCHAR(100) NOT NULL,
  occasion VARCHAR(100),
  special_requests TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_inquiries (
  id SERIAL PRIMARY KEY,
  ticket_code VARCHAR(20) UNIQUE NOT NULL,
  event_type VARCHAR(100) NOT NULL,
  target_date DATE NOT NULL,
  guest_count INT NOT NULL,
  estimated_budget VARCHAR(50),
  host_name VARCHAR(100) NOT NULL,
  host_company VARCHAR(100),
  host_email VARCHAR(150) NOT NULL,
  host_phone VARCHAR(50) NOT NULL,
  package_title VARCHAR(150),
  package_investment NUMERIC,
  notes TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'archived'
  email_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menu_items (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price VARCHAR(20) NOT NULL,
  numeric_price INT NOT NULL,
  description TEXT,
  dietary TEXT[],
  image TEXT,
  featured BOOLEAN DEFAULT false,
  tag VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(150) NOT NULL,
  avatar TEXT NOT NULL,
  stars VARCHAR(10) NOT NULL DEFAULT '★★★★★',
  quote TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS store_settings (
  key VARCHAR(50) PRIMARY KEY,
  value JSONB NOT NULL
);
