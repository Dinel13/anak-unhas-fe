/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  target: 'serverless', // add this line
}

module.exports = nextConfig
