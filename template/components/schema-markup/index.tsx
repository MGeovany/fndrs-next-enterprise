import { BASE_URL } from "@/constants"

const SchemaMarkup = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FNDRS Next Enterprise",
    url: BASE_URL,
    logo: "https://www.thefndrs.com/_next/image?url=%2Ffndrs-logo.webp&w=128&q=75",
    description:
      "FNDRS Next Enterprise is a production-ready Next.js boilerplate for building secure, scalable, and performant web applications.",
    sameAs: [
      "https://twitter.com/FNDRS",
      "https://www.linkedin.com/company/FNDRS",
      "https://github.com/MGeovany/fndrs-next-enterprise",
    ],
    founder: {
      "@type": "Person",
      name: "FNDRS",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@thefndrs.com",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}

export default SchemaMarkup
