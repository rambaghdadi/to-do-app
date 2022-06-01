const withPWA = require("next-pwa")

// /** @type {import('next').NextConfig} */
// const nextConfig = {
// 	reactStrictMode: false,
// }

module.exports = withPWA({
	pwa: {
		dest: "public",
		swSrc: "service-worker.js",
	},
})

// module.exports = nextConfig
