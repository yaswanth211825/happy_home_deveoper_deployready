import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingPlaygroundButton } from "@/components/floating-playground-button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Maximize, Building, Calendar } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Sunrise Villa",
    type: "4BHK Duplex",
    plotSize: "2400 sq ft",
    location: "Green Valley Estate",
    year: "2024",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Ocean View Residence",
    type: "5BHK Luxury",
    plotSize: "3500 sq ft",
    location: "Coastal Heights",
    year: "2024",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Metro Heights",
    type: "3BHK Modern",
    plotSize: "1800 sq ft",
    location: "Downtown Metro",
    year: "2023",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Garden House",
    type: "3BHK Traditional",
    plotSize: "2000 sq ft",
    location: "Palm Gardens",
    year: "2023",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "The Corner House",
    type: "4BHK Corner Plot",
    plotSize: "2200 sq ft",
    location: "Riverside Colony",
    year: "2023",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Compact Living",
    type: "2BHK Modern",
    plotSize: "1000 sq ft",
    location: "Urban Square",
    year: "2022",
    status: "Completed",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-accent uppercase tracking-wider">
            Our Work
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Completed Projects
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our portfolio of successfully delivered homes and construction projects.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {project.type}
                    </span>
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                      {project.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-xl mb-1">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-white/80 text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      {project.plotSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {project.year}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
      <FloatingPlaygroundButton />
    </main>
  )
}
