"use client"

import { useEffect } from "react"
import Header from "@/components/landing/Header"
import Hero from "@/components/landing/Hero"
import Features from "@/components/landing/Features"
import Contact from "@/components/landing/Contact"
import Footer from "@/components/landing/Footer"
import { getFirebaseAnalytics } from "@/lib/firebase"

export default function LandicoLanding() {
  useEffect(() => {
    const analytics = getFirebaseAnalytics()
    if (analytics) {
      console.log("Firebase Analytics initialized")
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
