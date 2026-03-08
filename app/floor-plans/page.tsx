"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingPlaygroundButton } from "@/components/floating-playground-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, SlidersHorizontal, Maximize, Bed, Bath, Eye, X } from "lucide-react"
import Link from "next/link"

const floorPlans = [
  {
    id: 1,
    title: "Compact 2BHK",
    type: "2BHK",
    plotWidth: 25,
    plotLength: 40,
    plotArea: 1000,
    floors: 1,
    facing: "East",
    bedrooms: 2,
    bathrooms: 2,
    image: "/images/floor-plans/compact-2bhk.jpg",
  },
  {
    id: 2,
    title: "Spacious 3BHK",
    type: "3BHK",
    plotWidth: 30,
    plotLength: 50,
    plotArea: 1500,
    floors: 2,
    facing: "North",
    bedrooms: 3,
    bathrooms: 3,
    image: "/images/floor-plans/spacious-3bhk.jpg",
  },
  {
    id: 3,
    title: "Modern Duplex",
    type: "4BHK",
    plotWidth: 40,
    plotLength: 60,
    plotArea: 2400,
    floors: 2,
    facing: "South",
    bedrooms: 4,
    bathrooms: 4,
    image: "/images/floor-plans/modern-duplex.jpg",
  },
  {
    id: 4,
    title: "Luxury Villa",
    type: "5BHK",
    plotWidth: 50,
    plotLength: 80,
    plotArea: 4000,
    floors: 3,
    facing: "West",
    bedrooms: 5,
    bathrooms: 5,
    image: "/images/floor-plans/luxury-villa.jpg",
  },
  {
    id: 5,
    title: "Corner Plot 3BHK",
    type: "3BHK",
    plotWidth: 35,
    plotLength: 45,
    plotArea: 1575,
    floors: 2,
    facing: "East",
    bedrooms: 3,
    bathrooms: 2,
    image: "/images/floor-plans/spacious-3bhk.jpg",
  },
  {
    id: 6,
    title: "Budget 2BHK",
    type: "2BHK",
    plotWidth: 20,
    plotLength: 40,
    plotArea: 800,
    floors: 1,
    facing: "North",
    bedrooms: 2,
    bathrooms: 1,
    image: "/images/floor-plans/compact-2bhk.jpg",
  },
  {
    id: 7,
    title: "Premium 4BHK",
    type: "4BHK",
    plotWidth: 45,
    plotLength: 55,
    plotArea: 2475,
    floors: 2,
    facing: "South",
    bedrooms: 4,
    bathrooms: 3,
    image: "/images/floor-plans/modern-duplex.jpg",
  },
  {
    id: 8,
    title: "Executive Villa",
    type: "5BHK",
    plotWidth: 60,
    plotLength: 70,
    plotArea: 4200,
    floors: 3,
    facing: "West",
    bedrooms: 5,
    bathrooms: 6,
    image: "/images/floor-plans/luxury-villa.jpg",
  },
]

function FloorPlansContent() {
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    plotWidth: searchParams.get("width") || "",
    plotLength: searchParams.get("length") || "",
    facing: "",
    floors: searchParams.get("floors") || "",
    bedrooms: "",
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredPlans = useMemo(() => {
    return floorPlans.filter((plan) => {
      if (filters.plotWidth && plan.plotWidth < parseInt(filters.plotWidth)) return false
      if (filters.plotLength && plan.plotLength < parseInt(filters.plotLength)) return false
      if (filters.facing && plan.facing !== filters.facing) return false
      if (filters.floors && plan.floors !== parseInt(filters.floors)) return false
      if (filters.bedrooms && plan.bedrooms !== parseInt(filters.bedrooms)) return false
      return true
    })
  }, [filters])

  const clearFilters = () => {
    setFilters({
      plotWidth: "",
      plotLength: "",
      facing: "",
      floors: "",
      bedrooms: "",
    })
  }

  const hasActiveFilters = Object.values(filters).some((v) => v !== "")

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            Floor Plan Finder
          </h1>
          <p className="text-muted-foreground">
            Discover the perfect floor plan for your plot dimensions and requirements.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <span className="font-semibold">Filters</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showFilters ? "Hide" : "Show"}
            </Button>
          </div>

          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plotWidth">Min Plot Width (ft)</Label>
                <Input
                  id="plotWidth"
                  type="number"
                  placeholder="e.g., 30"
                  value={filters.plotWidth}
                  onChange={(e) => setFilters({ ...filters, plotWidth: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plotLength">Min Plot Length (ft)</Label>
                <Input
                  id="plotLength"
                  type="number"
                  placeholder="e.g., 50"
                  value={filters.plotLength}
                  onChange={(e) => setFilters({ ...filters, plotLength: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facing">Facing Direction</Label>
                <Select
                  value={filters.facing}
                  onValueChange={(value) => setFilters({ ...filters, facing: value })}
                >
                  <SelectTrigger id="facing">
                    <SelectValue placeholder="Any direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any direction</SelectItem>
                    <SelectItem value="North">North</SelectItem>
                    <SelectItem value="South">South</SelectItem>
                    <SelectItem value="East">East</SelectItem>
                    <SelectItem value="West">West</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="floors">Floors</Label>
                <Select
                  value={filters.floors}
                  onValueChange={(value) => setFilters({ ...filters, floors: value })}
                >
                  <SelectTrigger id="floors">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1 Floor</SelectItem>
                    <SelectItem value="2">2 Floors</SelectItem>
                    <SelectItem value="3">3+ Floors</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select
                  value={filters.bedrooms}
                  onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
                >
                  <SelectTrigger id="bedrooms">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="2">2 BHK</SelectItem>
                    <SelectItem value="3">3 BHK</SelectItem>
                    <SelectItem value="4">4 BHK</SelectItem>
                    <SelectItem value="5">5+ BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredPlans.length}</span> floor plans
          </p>
        </div>

        {filteredPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlans.map((plan) => (
              <Link key={plan.id} href={`/floor-plans/${plan.id}`}>
                <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={plan.image}
                      alt={plan.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        {plan.type}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {plan.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5" />
                        {plan.plotArea} sq ft
                      </span>
                      <span>{plan.plotWidth}x{plan.plotLength} ft</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Bed className="w-3.5 h-3.5" />
                        {plan.bedrooms} Beds
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Bath className="w-3.5 h-3.5" />
                        {plan.bathrooms} Baths
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg text-foreground mb-2">No floor plans found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to find more results.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
      <FloatingPlaygroundButton />
    </main>
  )
}

export default function FloorPlansPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>}>
      <FloorPlansContent />
    </Suspense>
  )
}
