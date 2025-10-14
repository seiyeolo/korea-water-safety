#!/bin/bash
set -e

echo "🚀 Starting deployment process..."

# Run Prisma migrations
echo "📦 Running database migrations..."
npx prisma migrate deploy

# Run seed only if SKIP_SEED is not set
if [ "$SKIP_SEED" != "true" ]; then
  echo "🌱 Checking if database needs seeding..."
  npm run seed:prod || echo "⚠️ Seed skipped or already completed"
else
  echo "⏭️ Skipping seed (SKIP_SEED=true)"
fi

# Start the application
echo "🎯 Starting application..."
exec npm start
