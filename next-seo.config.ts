import { Metadata } from "next"

const SEO: Metadata = {
  title: "FNDRS - Make things with excellence",
  description: "FNDRS is a creative agency that transforms ideas into innovative solutions.",
  metadataBase: new URL("https://www.thefndrs.com"),
  openGraph: {
    type: "website",
    locale: "en_HN",
    url: "https://www.thefndrs.com",
    siteName: "FNDRS",
    title: "FNDRS - Make things with excellence",
    description: "FNDRS is a creative agency that transforms ideas into innovative solutions.",
    images: [
      {
        url: "https://www.thefndrs.com/og.png",
        width: 1200,
        height: 630,
        alt: "FNDRS - Make things with excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FNDRS",
    creator: "@FNDRS",
    title: "FNDRS - Make things with excellence",
    description: "FNDRS is a creative agency that transforms ideas into innovative solutions.",
    images: [
      {
        url: "https://www.thefndrs.com/og.png",
        alt: "FNDRS - Make things with excellence",
      },
    ],
  },
}

export default SEO
