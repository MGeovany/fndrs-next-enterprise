import { Button } from "@/components/ui/button/index"
import SEO from "@/next-seo.config"

import { Metadata } from "next"

export const metadata: Metadata = {
  ...SEO,
}

export default function Web() {
  return (
    <main>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-(--breakpoint-xl) px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              FNDRS Next.js Enterprise Boilerplate
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400">
              Jumpstart your enterprise project with our feature-packed, high-performance Next.js boilerplate! Experience rapid UI
              development, AI-powered code reviews, and an extensive suite of tools for a smooth and enjoyable development
              process.
            </p>
            <Button href="https://github.com/MGeovany/fndrs-next-enterprise/" className="mr-3">
              Get started
            </Button>
            <Button href="https://github.com/MGeovany/fndrs-next-enterprise/" intent="secondary">
              Deploy Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
