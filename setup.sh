#!/bin/bash

# SmartPlace3D Quick Setup Script (Unix/Linux/Mac)

echo "🚀 SmartPlace3D Setup Starting..."
echo ""

# Check Node.js installation
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js $NODE_VERSION found"
else
    echo "✗ Node.js not found. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm installation
echo "Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✓ npm $NPM_VERSION found"
else
    echo "✗ npm not found. Please install npm"
    exit 1
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "✗ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Allow camera permissions when prompted"
echo "4. Start placing 3D objects in AR!"
echo ""
echo "Optional:"
echo "- Copy .env.example to .env and add your Sketchfab API key for AI model search"
echo ""
echo "📚 For more info, check README.md and DEVELOPMENT.md"
echo ""

# Ask if user wants to start dev server
read -p "Would you like to start the development server now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Starting development server..."
    npm run dev
fi
