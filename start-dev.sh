#!/bin/bash

# Start the mock API server in the background
echo "Starting mock API server..."
npm run mock-api &
MOCK_PID=$!

# Wait a moment for the server to start
sleep 2

# Start the Next.js development server
echo "Starting Next.js development server..."
npm run dev

# Cleanup function
cleanup() {
    echo "Stopping servers..."
    kill $MOCK_PID 2>/dev/null
    exit
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for the Next.js process
wait
