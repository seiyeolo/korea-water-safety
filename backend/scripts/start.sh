#!/bin/bash
set -e

echo "🚀 Starting backend application..."

# Run migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

# Seed database (optional)
echo "🌱 Seeding database (if needed)..."
npm run seed:prod || true

# Start application
echo "⚡ Starting NestJS application..."
node dist/main.js
