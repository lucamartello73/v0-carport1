"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, TreePine } from "lucide-react"
import { FooterMartello1930 } from "@/components/footer-martello1930"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-beige">
      {/* Header con Logo */}
      <header className="configurator-header">
        <div className="container-configurator">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://www.genspark.ai/api/files/s/b9y2WFTPti"
                alt="Martello 1930 Logo"
                width={50}
                height={50}
                className="object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary">Martello 1930</h1>
                <p className="text-sm text-secondary">Configuratore Coperture</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Configuratore Coperture Auto
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Scegli il tipo di struttura che desideri configurare e personalizza ogni dettaglio
          </p>
        </div>

        {/* Configurator Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Steel/Aluminum Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-accent-pink hover:border-primary cursor-pointer bg-white">
            <CardHeader className="bg-gradient-to-br from-primary to-[#5D4037] text-white rounded-t-lg pb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  <Building2 className="w-16 h-16" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-center">
                Strutture in Acciaio/Alluminio
              </CardTitle>
              <CardDescription className="text-white/90 text-center text-lg mt-2">
                Carport moderni e resistenti
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-surface-beige rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-secondary">Strutture metalliche di alta qualità</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-surface-beige rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-secondary">Ampia gamma di colori RAL</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-surface-beige rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-secondary">Resistenza massima agli agenti atmosferici</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-surface-beige rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-secondary">Design moderno e personalizzabile</p>
                </div>
              </div>
              <Link href="/acciaio" className="block">
                <Button className="button-primary w-full text-lg py-6 group-hover:scale-105 transition-transform">
                  Configura Struttura in Acciaio
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Wood Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-accent-pink hover:border-primary cursor-pointer bg-white">
            <CardHeader className="bg-gradient-to-br from-primary to-[#5D4037] text-white rounded-t-lg pb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                  <TreePine className="w-16 h-16" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-center">
                Strutture in Legno
              </CardTitle>
              <CardDescription className="text-white/90 text-center text-lg mt-2">
                Pergole naturali ed eleganti
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="bg-surface-beige rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-secondary">Legno massello di prima qualità</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-surface-beige rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-secondary">Tinte naturali per legno</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-surface-beige rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-secondary">Estetica naturale e calda</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-surface-beige rounded-full p-1 mt-1">
                    <svg className="w-4 h-4 text-accent-pink" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-secondary">Perfette per giardini e terrazze</p>
                </div>
              </div>
              <Link href="/legno" className="block">
                <Button className="button-primary w-full text-lg py-6 group-hover:scale-105 transition-transform">
                  Configura Struttura in Legno
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 max-w-3xl mx-auto">
          <div className="product-card bg-white">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Hai bisogno di aiuto nella scelta?
            </h3>
            <p className="text-secondary text-lg mb-6">
              Contattaci per una consulenza personalizzata. Il nostro team è a tua disposizione.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+390185167656" className="button-primary px-6 py-3 inline-flex items-center justify-center">
                📞 Chiamaci: +39 0185 167 656
              </a>
              <a href="mailto:info@martello1930.net" className="bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-surface-beige transition-colors inline-flex items-center justify-center">
                ✉️ Scrivici una Email
              </a>
            </div>
            <p className="text-sm text-secondary mt-4">
              Sede: Via Salita al Convento 1, 16039 Sestri Levante (GE)
            </p>
          </div>
        </div>
      </div>

      <FooterMartello1930 />
    </div>
  )
}
