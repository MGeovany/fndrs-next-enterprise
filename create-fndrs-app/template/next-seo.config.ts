import { Metadata } from "next"

import { BASE_URL } from "./constants"

const SEO: Metadata = {
  title: "FNDRS Next Enterprise - Production-ready Next.js Boilerplate",
  description:
    "FNDRS Next Enterprise is a high-performance, scalable, and secure boilerplate for building modern web applications with Next.js",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "en_HN",
    url: BASE_URL,
    siteName: "FNDRS Next Enterprise",
    title: "FNDRS Next Enterprise - Production-ready Next.js Boilerplate",
    description:
      "Built by FNDRS, this boilerplate provides an enterprise-grade foundation with modern tooling, preconfigured CI/CD, linting, and performance optimizations.",
    images: [
      {
        url: "https://www.thefndrs.com/og.png",
        width: 1200,
        height: 630,
        alt: "FNDRS Next Enterprise - Production-ready Next.js Boilerplate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FNDRS",
    creator: "@FNDRS",
    title: "FNDRS Next Enterprise - Production-ready Next.js Boilerplate",
    description:
      "The ultimate Next.js 15 starter kit for agencies and teams. Designed by FNDRS with best practices for speed, security, and scalability.",
    images: [
      {
        url: "https://www.thefndrs.com/og.png",
        alt: "FNDRS Next Enterprise - Production-ready Next.js Boilerplate",
      },
    ],
  },
}

export default SEO
