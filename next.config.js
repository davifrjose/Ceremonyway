/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images:{
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "links.papareact.com",
      "cdn.sanity.io",
    ]
  }
}

module.exports = nextConfig
