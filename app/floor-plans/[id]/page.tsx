"use client"

import { use } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingPlaygroundButton } from "@/components/floating-playground-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthOverlay } from "@/components/auth/auth-overlay"
import {
  ArrowLeft,
  Download,
  MessageSquare,
  Bookmark,
  Maximize,
  Bed,
  Bath,
  Building,
  Compass,
  Ruler,
  IndianRupee,
} from "lucide-react"

const floorPlanData = {
  1: {
    id: 1,
    title: "Compact 2BHK",
    type: "2BHK",
    plotWidth: 25,
    plotLength: 40,
    plotArea: 1000,
    builtUpArea: 850,
    floors: 1,
    facing: "East",
    bedrooms: 2,
    bathrooms: 2,
    description: "A well-designed compact 2BHK floor plan perfect for nuclear families. Features efficient space utilization with a modern layout.",
    estimatedCost: "25-30 Lakhs",
    rooms: [
      { name: "Master Bedroom", size: "12x14 ft" },
      { name: "Bedroom 2", size: "10x12 ft" },
      { name: "Living Room", size: "15x12 ft" },
      { name: "Kitchen", size: "10x10 ft" },
      { name: "Bathroom 1", size: "5x8 ft" },
      { name: "Bathroom 2", size: "5x6 ft" },
    ],
    blueprintImage: "/placeholder.svg?height=600&width=800",
    elevationImage: "/placeholder.svg?height=600&width=800",
    structuralImage: "/placeholder.svg?height=600&width=800",
  },
  2: {
    id: 2,
    title: "Spacious 3BHK",
    type: "3BHK",
    plotWidth: 30,
    plotLength: 50,
    plotArea: 1500,
    builtUpArea: 1350,
    floors: 2,
    facing: "North",
    bedrooms: 3,
    bathrooms: 3,
    description: "A spacious 3BHK duplex design with ample natural light. Perfect for growing families seeking comfort and style.",
    estimatedCost: "45-55 Lakhs",
    rooms: [
      { name: "Master Bedroom", size: "14x16 ft" },
      { name: "Bedroom 2", size: "12x14 ft" },
      { name: "Bedroom 3", size: "12x12 ft" },
      { name: "Living Room", size: "18x14 ft" },
      { name: "Dining Room", size: "12x10 ft" },
      { name: "Kitchen", size: "12x10 ft" },
      { name: "Bathroom 1", size: "6x8 ft" },
      { name: "Bathroom 2", size: "5x8 ft" },
      { name: "Bathroom 3", size: "5x6 ft" },
    ],
    blueprintImage: "/placeholder.svg?height=600&width=800",
    elevationImage: "/placeholder.svg?height=600&width=800",
    structuralImage: "/placeholder.svg?height=600&width=800",
  },
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default function FloorPlanDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const plan = floorPlanData[id as keyof typeof floorPlanData] || floorPlanData[1]

  return (
    <AuthOverlay>
      <main className="min-h-screen pt-20">
        <Navbar />

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/floor-plans"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Floor Plans
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  {plan.type}
                </span>
                <span className="text-sm text-muted-foreground">
                  {plan.facing} Facing
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                {plan.title}
              </h1>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {plan.description}
              </p>
            </div>

            {/* Image Tabs */}
            <Tabs defaultValue="blueprint" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="blueprint">Blueprint</TabsTrigger>
                <TabsTrigger value="elevation">Elevation</TabsTrigger>
                <TabsTrigger value="structural">Structural</TabsTrigger>
              </TabsList>
              <TabsContent value="blueprint" className="mt-4">
                <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden border border-border">
                  <img
                    src={plan.blueprintImage}
                    alt="Blueprint"
                    className="w-full h-full object-contain"
                  />
                </div>
              </TabsContent>
              <TabsContent value="elevation" className="mt-4">
                <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden border border-border">
                  <img
                    src={plan.elevationImage}
                    alt="Elevation"
                    className="w-full h-full object-contain"
                  />
                </div>
              </TabsContent>
              <TabsContent value="structural" className="mt-4">
                <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden border border-border">
                  <img
                    src={plan.structuralImage}
                    alt="Structural Design"
                    className="w-full h-full object-contain"
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Room Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Room Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {plan.rooms.map((room) => (
                    <div
                      key={room.name}
                      className="p-4 bg-secondary/50 rounded-lg"
                    >
                      <div className="font-medium text-foreground">
                        {room.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {room.size}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Maximize className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Plot Area</div>
                    <div className="font-semibold">{plan.plotArea} sq ft</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Ruler className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Plot Size</div>
                    <div className="font-semibold">
                      {plan.plotWidth} x {plan.plotLength} ft
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Built-up Area</div>
                    <div className="font-semibold">{plan.builtUpArea} sq ft</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bed className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                    <div className="font-semibold">{plan.bedrooms}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bath className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                    <div className="font-semibold">{plan.bathrooms}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Compass className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Facing</div>
                    <div className="font-semibold">{plan.facing}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estimated Cost */}
            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <IndianRupee className="w-6 h-6 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Estimated Construction Cost
                  </span>
                </div>
                <div className="font-serif text-2xl font-bold text-foreground">
                  {plan.estimatedCost}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  *Cost may vary based on location and materials
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                <Download className="w-4 h-4 mr-2" />
                Download Plan
              </Button>
              <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Request Construction Quote
              </Button>
              <Button variant="ghost" className="w-full">
                <Bookmark className="w-4 h-4 mr-2" />
                Save to Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

        <Footer />
        <FloatingPlaygroundButton />
      </main>
    </AuthOverlay>
  )
}
