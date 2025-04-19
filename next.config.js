/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable ESLint during build for now
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// Try to add PWA support if the module is available
let withPWA;
try {
  withPWA = require('next-pwa');
  const pwaConfig = withPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
  });
  
  module.exports = pwaConfig(nextConfig);
} catch (e) {
  // Silent fail - PWA support will not be available
  module.exports = nextConfig;
}
