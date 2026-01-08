# Maximo Design CMS

A modern catalog management system built with Next.js, Supabase, and shadcn/ui.

## Features

- 🔐 **Authentication** - Secure login with Supabase Auth
- 📚 **Catalog Management** - Create and manage multiple catalogs
- 🖼️ **Image Upload** - Upload catalog pages with drag-and-drop
- 🗂️ **Organization** - Categorize catalogs and manage page order
- 📱 **Responsive** - Works on desktop and mobile
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Getting Started

### 1. Prerequisites

- Node.js 18.17 or later
- A Supabase account (free tier works)

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to initialize (~2 minutes)
3. Go to **SQL Editor** and run the schema from `supabase/schema.sql`
4. Go to **Storage** and create a bucket named `catalog-images`
   - Set it to **public** for easy image access
5. Copy your project credentials:
   - Go to **Settings** → **API**
   - Copy the **Project URL** and **anon public** key

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the CMS.

### 6. Create Your First Admin User

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Enter an email and password
5. Use these credentials to login to the CMS

## Usage

### Creating a Catalog

1. Login to the CMS
2. Click **Create Catalog**
3. Enter a title, category (optional), and description (optional)
4. Click **Create**

### Uploading Pages

1. Open a catalog from the list
2. Click **Choose File** and select one or more images
3. Click **Upload Pages**
4. Pages will be numbered sequentially

### Publishing a Catalog

1. Go to the catalog list
2. Click **Publish** on the catalog you want to make public
3. Published catalogs can be accessed via API

### Deleting Pages or Catalogs

- **Delete a page**: Click the Delete button on any page in the catalog
- **Delete a catalog**: Click Delete in the catalog list (this deletes all pages too)

## Project Structure

```
backend/
├── app/
│   ├── admin/                 # Protected admin pages
│   │   ├── catalogs/[id]/    # Catalog detail page
│   │   └── page.tsx          # Catalog list
│   ├── login/                # Login page
│   └── page.tsx              # Root redirect
├── components/
│   ├── admin/                # Admin components
│   │   ├── catalog-header.tsx
│   │   ├── catalog-list.tsx
│   │   ├── create-catalog-button.tsx
│   │   ├── header.tsx
│   │   ├── page-grid.tsx
│   │   └── page-uploader.tsx
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── supabase/             # Supabase clients
│   │   ├── client.ts         # Browser client
│   │   └── server.ts         # Server client
│   ├── types/
│   │   └── database.ts       # TypeScript types
│   └── utils.ts              # Utility functions
├── supabase/
│   └── schema.sql            # Database schema
└── middleware.ts             # Auth middleware
```

## Database Schema

### Tables

**catalogs**
- `id` - UUID primary key
- `title` - Catalog title
- `description` - Optional description
- `category` - Category (Gun Metal, Gold, etc.)
- `is_published` - Published status
- `published_at` - Publish timestamp
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `created_by` - Creator user ID

**catalog_pages**
- `id` - UUID primary key
- `catalog_id` - Foreign key to catalogs
- `page_number` - Page sequence number
- `image_url` - Public image URL
- `thumbnail_url` - Thumbnail URL (optional)
- `storage_path` - Path in Supabase Storage
- `created_at` - Creation timestamp

### Storage

**catalog-images** bucket
- Public read access
- Authenticated upload access
- Stores all catalog page images

## API Access (Future)

You can build API routes to fetch catalogs for your main website:

```typescript
// Example: Fetch all published catalogs
const { data } = await supabase
  .from('catalogs')
  .select('*, catalog_pages(*)')
  .eq('is_published', true)
  .order('published_at', { ascending: false });
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

The app will automatically use Vercel's edge network for fast global access.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Security Notes

- All admin routes are protected by middleware
- Row Level Security (RLS) is enabled on all tables
- Only authenticated users can create/edit catalogs
- Only published catalogs are publicly accessible
- File uploads are validated and stored securely

## Troubleshooting

### "Error: No user found"
- Make sure you've created a user in Supabase Auth
- Check that your credentials are correct

### Images not uploading
- Verify the `catalog-images` bucket exists
- Make sure the bucket is set to public
- Check storage policies in Supabase

### "Invalid JWT" errors
- Clear browser cookies and re-login
- Check that environment variables are set correctly

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
