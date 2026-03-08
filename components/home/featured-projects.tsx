import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Maximize, ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Modern Villa",
    type: "4BHK Duplex",
    plotSize: "2400 sq ft",
    location: "Green Valley",
    image: "/images/projects/modern-villa.jpg",
  },
  {
    id: 2,
    title: "Classic Residence",
    type: "3BHK Independent",
    plotSize: "1800 sq ft",
    location: "Palm Heights",
    image: "/images/projects/classic-residence.jpg",
  },
  {
    id: 3,
    title: "Urban Retreat",
    type: "3BHK Modern",
    plotSize: "1500 sq ft",
    location: "Metro City",
    image: "/images/projects/urban-retreat.jpg",
  },
  {
    id: 4,
    title: "Coastal Dream",
    type: "5BHK Luxury",
    plotSize: "3200 sq ft",
    location: "Ocean View",
    image: "/images/projects/coastal-dream.jpg",
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Our Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
              Featured Projects
            </h2>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {project.type}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Maximize className="w-3.5 h-3.5" />
                      {project.plotSize}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
