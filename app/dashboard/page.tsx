"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AuthOverlay } from "@/components/auth/auth-overlay"
import { useAuth } from "@/components/auth/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  Bookmark,
  Search,
  Download,
  FileText,
  Settings,
  LogOut,
  User,
  Maximize,
  Bed,
  Eye,
  Trash2,
} from "lucide-react"

const savedPlans = [
  {
    id: 1,
    title: "Compact 2BHK",
    type: "2BHK",
    plotArea: "1000 sq ft",
    savedDate: "2024-01-15",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Spacious 3BHK",
    type: "3BHK",
    plotArea: "1500 sq ft",
    savedDate: "2024-01-10",
    image: "/placeholder.svg?height=200&width=300",
  },
]

const searchHistory = [
  {
    id: 1,
    query: "3BHK, 30x50 ft, East facing",
    date: "2024-01-18",
    results: 12,
  },
  {
    id: 2,
    query: "4BHK Duplex, 2000+ sq ft",
    date: "2024-01-15",
    results: 8,
  },
  {
    id: 3,
    query: "2BHK Modern, North facing",
    date: "2024-01-12",
    results: 15,
  },
]

const downloads = [
  {
    id: 1,
    title: "Compact 2BHK Blueprint",
    type: "PDF",
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "3BHK Elevation Design",
    type: "PDF",
    date: "2024-01-10",
  },
]

const constructionRequests = [
  {
    id: 1,
    planTitle: "Spacious 3BHK",
    status: "Under Review",
    date: "2024-01-16",
    statusColor: "bg-yellow-500",
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("saved")
  const { setLoggedIn } = useAuth()

  const handleLogout = () => {
    setLoggedIn(false)
    router.push("/login")
  }

  return (
    <AuthOverlay>
      <main className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold text-foreground hidden sm:block">
                HappyHomeBuilders
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Welcome Back, John!
            </h1>
            <p className="text-muted-foreground">
              Manage your saved floor plans, searches, and construction requests.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/floor-plans">
                <Search className="w-4 h-4 mr-2" />
                Find Plans
              </Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/ai-playground">
                Design Your Own
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{savedPlans.length}</div>
                  <div className="text-sm text-muted-foreground">Saved Plans</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{searchHistory.length}</div>
                  <div className="text-sm text-muted-foreground">Searches</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Download className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{downloads.length}</div>
                  <div className="text-sm text-muted-foreground">Downloads</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{constructionRequests.length}</div>
                  <div className="text-sm text-muted-foreground">Requests</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="saved">
              <Bookmark className="w-4 h-4 mr-2" />
              Saved Plans
            </TabsTrigger>
            <TabsTrigger value="searches">
              <Search className="w-4 h-4 mr-2" />
              Search History
            </TabsTrigger>
            <TabsTrigger value="downloads">
              <Download className="w-4 h-4 mr-2" />
              Downloads
            </TabsTrigger>
            <TabsTrigger value="requests">
              <FileText className="w-4 h-4 mr-2" />
              Requests
            </TabsTrigger>
          </TabsList>

          {/* Saved Plans */}
          <TabsContent value="saved">
            {savedPlans.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPlans.map((plan) => (
                  <Card key={plan.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted">
                      <img
                        src={plan.image}
                        alt={plan.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{plan.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {plan.type} | {plan.plotArea}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Saved {plan.savedDate}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/floor-plans/${plan.id}`}>
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No saved plans yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start exploring floor plans and save your favorites.
                  </p>
                  <Button asChild>
                    <Link href="/floor-plans">Browse Floor Plans</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Search History */}
          <TabsContent value="searches">
            <Card>
              <CardContent className="divide-y">
                {searchHistory.map((search) => (
                  <div
                    key={search.id}
                    className="py-4 first:pt-6 last:pb-6 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{search.query}</p>
                      <p className="text-sm text-muted-foreground">
                        {search.results} results found
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{search.date}</p>
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Search Again
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Downloads */}
          <TabsContent value="downloads">
            <Card>
              <CardContent className="divide-y">
                {downloads.map((download) => (
                  <div
                    key={download.id}
                    className="py-4 first:pt-6 last:pb-6 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">{download.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {download.type} | Downloaded on {download.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Construction Requests */}
          <TabsContent value="requests">
            {constructionRequests.length > 0 ? (
              <Card>
                <CardContent className="divide-y">
                  {constructionRequests.map((request) => (
                    <div
                      key={request.id}
                      className="py-4 first:pt-6 last:pb-6 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{request.planTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          Submitted on {request.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${request.statusColor}`}
                        />
                        <span className="text-sm font-medium">{request.status}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No construction requests</h3>
                  <p className="text-muted-foreground mb-4">
                    Find a floor plan you love and request a construction quote.
                  </p>
                  <Button asChild>
                    <Link href="/floor-plans">Browse Floor Plans</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
    </AuthOverlay>
  )
}
