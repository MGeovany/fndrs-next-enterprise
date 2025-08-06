import { CopyCommand } from "@/components/copy-command"
import { SocialSidebar } from "@/components/social-sidebar"
import StarField from "@/components/starfield"
import SEO from "@/next-seo.config"

import { ArrowRight, Github, Zap } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  ...SEO,
}

export default function MainPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1fa8_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1fa8_1px,transparent_1px)] bg-[size:8rem_8rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_190%)]" />

      <StarField />
      <SocialSidebar />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center pt-20">
        <div className="mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm backdrop-blur-sm"
            style={{ backgroundColor: "#19191b" }}>
            <span
              className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-[length:200%_100%] bg-clip-text text-transparent animate-text-shine"
              style={{
                backgroundImage: "linear-gradient(90deg, #9ca3af 0%, #ffffff 50%, #9ca3af 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
              ✨ Powered by FNDRS — Built for scale
            </span>
          </div>
        </div>

        <h1 className="bg-gradient-to-b dark:from-white from-white from-30% dark:to-white/40 to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent text-balance sm:text-6xl md:text-7xl lg:text-8xl translate-y-[-1rem] animate-fade-in [--animation-delay:200ms] z-10">
          FNDRS Enterprise Boilerplate
          <br />
          for scalable Next.js apps
        </h1>

        <h2 className="mb-12 text-lg tracking-tight text-gray-300/80 md:text-2xl text-balance translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]">
          A production-grade starter kit with everything you need to build fast, secure, and maintainable applications.
          <br />
          Optimized for teams that build with purpose.
        </h2>

        <div className="flex flex-col items-center gap-8 px-4 sm:px-6 lg:px-8 w-full">
          <CopyCommand />

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
            <a
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg text-md font-medium focus-visible:outline-none cursor-pointer focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none border h-12 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 hover:from-blue-600/30 hover:to-purple-600/30 hover:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              href="https://github.com/fndrs/fndrs-next-enterprise">
              <Github className="mr-2 h-5 w-5" />
              View on GitHub
            </a>

            <a
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-lg text-md font-medium focus-visible:outline-none cursor-pointer focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none border h-12 px-6 py-3 bg-white/[0.06] border-white/10 hover:bg-white/[0.12] hover:border-white/20 focus:ring-2 focus:ring-white/20 transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              href="https://github.com/fndrs/fndrs-next-enterprise">
              Documentation
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
