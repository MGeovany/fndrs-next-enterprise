"use client"

import { Github, Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function SocialSidebar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/fndrs",
      color: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/company/the-fndrs",
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/the.fndrs",
      color: "hover:text-pink-400",
    },
  ]

  return (
    <div
      className={
        `fixed left-1/2 transform -translate-x-1/2 z-[999]` +
        ` transition-opacity duration-300 ${isScrolled ? "opacity-30 hover:opacity-100" : "opacity-100"}`
      }>
      <div className="inline-flex items-center gap-3 px-8 py-4 bg-black/40 backdrop-blur-md border border-white/20 shadow-lg min-w-screen">
        <div className="flex flex-row gap-2">
          <Image src="/assets/fndrs-logo.webp" alt="logo" width={100} height={36} />
        </div>
        <div className="w-full flex-1 flex flex-row gap-3 justify-end">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                `inline-flex items-center justify-center p-2 rounded-full bg-white/10  z-100` +
                `backdrop-blur-sm border border-white/20 text-gray-300 transition-all duration-300 ` +
                `hover:bg-white/20 hover:scale-110 hover:shadow-lg ${social.color}`
              }
              title={social.name}>
              <social.icon className="h-3 w-3 transition-transform duration-300 group-hover:scale-110" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
