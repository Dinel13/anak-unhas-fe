/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'lanjukang.tech'],
  },
  // target: 'serverless', // add this line for netlify
}

module.exports = nextConfig
