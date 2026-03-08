"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingPlaygroundButton } from "@/components/floating-playground-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Compass,
  Building2,
  HardHat,
  Palette,
  FileText,
  MessageSquare,
  CheckCircle2,
} from "lucide-react"

const services = [
  {
    icon: Compass,
    title: "Architectural Planning",
    description:
      "Complete architectural design services including floor plans, elevations, and 3D visualizations. We create functional spaces that reflect your lifestyle.",
    features: [
      "Custom Floor Plan Design",
      "3D Elevation & Rendering",
      "Site Analysis & Planning",
      "Vastu Compliant Designs",
    ],
  },
  {
    icon: Building2,
    title: "Structural Design",
    description:
      "Expert structural engineering to ensure your home is safe, stable, and built to last. We handle all load calculations and foundation designs.",
    features: [
      "Foundation Design",
      "Load-bearing Analysis",
      "Column & Beam Layout",
      "Seismic Compliance",
    ],
  },
  {
    icon: HardHat,
    title: "Construction",
    description:
      "End-to-end construction services with quality materials and skilled craftsmen. We bring your dream home to life with attention to every detail.",
    features: [
      "Full Construction Management",
      "Quality Material Sourcing",
      "Skilled Labor Team",
      "Timeline Adherence",
    ],
  },
  {
    icon: Palette,
    title: "Interior Design",
    description:
      "Transform your spaces with our interior design expertise. From modern minimalist to traditional elegance, we create interiors that inspire.",
    features: [
      "Space Planning",
      "Furniture Selection",
      "Lighting Design",
      "Color Consultation",
    ],
  },
  {
    icon: FileText,
    title: "Documentation & Approvals",
    description:
      "We handle all paperwork including building permits, municipal approvals, and compliance documentation so you can focus on your vision.",
    features: [
      "Building Permit Assistance",
      "Municipal Plan Approval",
      "Completion Certificate",
      "Utility Connections",
    ],
  },
]

const process = [
  {
    step: "01",
    title: "Consultation",
    description: "Share your requirements, budget, and vision with our team.",
  },
  {
    step: "02",
    title: "Design",
    description: "We create custom plans and 3D visualizations for your approval.",
  },
  {
    step: "03",
    title: "Planning",
    description: "Detailed cost estimation, material selection, and timeline creation.",
  },
  {
    step: "04",
    title: "Construction",
    description: "Building begins with regular progress updates and quality checks.",
  },
  {
    step: "05",
    title: "Handover",
    description: "Final inspection, documentation, and key handover ceremony.",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-accent text-sm font-medium uppercase tracking-wider">
              What We Offer
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mt-2 mb-6">
              Comprehensive Home Building Services
            </h1>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              From the first sketch to the final brick, we provide end-to-end services to build your dream home. Our experienced team handles every aspect of the construction process.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card
                key={service.title}
                className="border-border hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              How We Work
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Our Process
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <div key={item.step} className="relative text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="bg-primary text-primary-foreground p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">
                  Ready to Build Your Dream Home?
                </h2>
                <p className="text-primary-foreground/70">
                  Get in touch with our team for a free consultation and quote.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0"
              >
                <Link href="/contact">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Us Today
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
      <FloatingPlaygroundButton />
    </main>
  )
}
