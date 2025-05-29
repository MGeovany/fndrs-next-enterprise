const SchemaMarkup = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FNDRS",
    url: "https://www.thefndrs.com",
    logo: "https://www.thefndrs.com/_next/image?url=%2Ffndrs-logo.webp&w=128&q=75",
    description: "FNDRS is a creative studio that transforms ideas into innovative solutions.",
    sameAs: ["https://twitter.com/FNDRS", "https://www.linkedin.com/company/FNDRS"],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}

export default SchemaMarkup
