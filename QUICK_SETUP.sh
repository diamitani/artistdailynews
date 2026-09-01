#!/bin/bash
# Artist Daily News - Quick Setup Script
# Run this after adding your Supabase credentials to .env.local

set -e

echo "🚀 Artist Daily News - Artispreneur Supabase Setup"
echo "=================================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    echo ""
    echo "Create .env.local with your Artispreneur Supabase credentials:"
    echo ""
    echo "NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key"
    echo "SUPABASE_SERVICE_ROLE_KEY=your-service-role-key"
    echo ""
    exit 1
fi

# Check if credentials are set
if grep -q "your-project.supabase.co" .env.local; then
    echo "⚠️  Warning: .env.local still has placeholder values"
    echo "   Update with your real Artispreneur Supabase credentials first!"
    echo ""
    exit 1
fi

echo "✅ Step 1: Environment variables configured"
echo ""

# Test build
echo "🔨 Step 2: Testing build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed - check errors above"
    exit 1
fi
echo ""

# Show migration instructions
echo "📊 Step 3: Run database migration"
echo ""
echo "Open your Artispreneur Supabase SQL Editor and run:"
echo "  supabase/migrations/001_adn_tables.sql"
echo ""
echo "Or copy and paste this SQL:"
echo "----------------------------------------------------------------------"
cat supabase/migrations/001_adn_tables.sql
echo "----------------------------------------------------------------------"
echo ""

echo "🎯 Step 4: Test locally"
echo "   npm run dev"
echo "   Visit http://localhost:3000"
echo ""

echo "🚢 Step 5: Deploy"
echo "   1. Add environment variables to Vercel dashboard"
echo "   2. git push origin main"
echo ""

echo "✅ Setup preparation complete!"
echo "   Once migration is run, you're ready to go!"
