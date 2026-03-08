"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingPlaygroundButton } from "@/components/floating-playground-button"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const categories = [
  { id: "all", label: "All" },
  { id: "modern", label: "Modern" },
  { id: "duplex", label: "Duplex" },
  { id: "traditional", label: "Traditional" },
  { id: "interiors", label: "Interiors" },
  { id: "elevations", label: "3D Elevations" },
]

const galleryItems = [
  { id: 1, category: "modern", title: "Modern Villa Front", image: "/placeholder.svg?height=600&width=800" },
  { id: 2, category: "interiors", title: "Living Room Design", image: "/placeholder.svg?height=800&width=600" },
  { id: 3, category: "duplex", title: "Duplex Elevation", image: "/placeholder.svg?height=600&width=800" },
  { id: 4, category: "traditional", title: "Traditional Home", image: "/placeholder.svg?height=600&width=800" },
  { id: 5, category: "elevations", title: "3D Villa View", image: "/placeholder.svg?height=800&width=600" },
  { id: 6, category: "modern", title: "Minimalist Design", image: "/placeholder.svg?height=600&width=800" },
  { id: 7, category: "interiors", title: "Kitchen Interior", image: "/placeholder.svg?height=600&width=800" },
  { id: 8, category: "duplex", title: "Modern Duplex", image: "/placeholder.svg?height=800&width=600" },
  { id: 9, category: "elevations", title: "Night View Render", image: "/placeholder.svg?height=600&width=800" },
  { id: 10, category: "traditional", title: "Heritage Style", image: "/placeholder.svg?height=600&width=800" },
  { id: 11, category: "interiors", title: "Bedroom Design", image: "/placeholder.svg?height=800&width=600" },
  { id: 12, category: "modern", title: "Contemporary Home", image: "/placeholder.svg?height=600&width=800" },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  
  const goToPrevious = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)
  }
  
  const goToNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
  }

  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Our Portfolio
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Project Gallery
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse through our collection of completed homes, 3D elevations, and interior designs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={activeCategory === category.id ? "bg-primary" : ""}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative block w-full overflow-hidden rounded-xl bg-muted break-inside-avoid cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <span className="text-white font-medium">{item.title}</span>
              </div>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No items found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <div className="max-w-5xl max-h-[90vh] px-16">
            <img
              src={filteredItems[lightboxIndex].image}
              alt={filteredItems[lightboxIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 font-medium">
              {filteredItems[lightboxIndex].title}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 text-white hover:bg-white/20"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      )}

      <Footer />
      <FloatingPlaygroundButton />
    </main>
  )
}
