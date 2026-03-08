"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { AuthOverlay } from "@/components/auth/auth-overlay"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Bed,
  CookingPot,
  Sofa,
  Bath,
  DoorOpen,
  Maximize2,
  Eraser,
  Wand2,
  RotateCcw,
  Download,
  Lock,
  ZoomIn,
  ZoomOut,
  Move,
  Square,
  Ruler,
  Trash2,
} from "lucide-react"

type Tool = "bedroom" | "kitchen" | "living" | "bathroom" | "door" | "wall" | "select" | "eraser"

interface DrawnElement {
  id: string
  type: Tool
  x: number
  y: number
  width: number
  height: number
  label?: string
  rotation?: number
}

const roomTools: { type: Tool; icon: typeof Bed; label: string; color: string }[] = [
  { type: "bedroom", icon: Bed, label: "Bedroom", color: "#3b82f6" },
  { type: "kitchen", icon: CookingPot, label: "Kitchen", color: "#22c55e" },
  { type: "living", icon: Sofa, label: "Hall", color: "#f59e0b" },
  { type: "bathroom", icon: Bath, label: "Bathroom", color: "#8b5cf6" },
  { type: "wall", icon: Square, label: "Walls", color: "#6b7280" },
  { type: "door", icon: DoorOpen, label: "Door", color: "#ef4444" },
]

const GRID_SIZE = 20 // Each cell = 1 foot
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

export default function AIPlaygroundPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedTool, setSelectedTool] = useState<Tool>("bedroom")
  const [elements, setElements] = useState<DrawnElement[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [generationCount, setGenerationCount] = useState(0)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [scale, setScale] = useState(1)
  const [plotWidth, setPlotWidth] = useState(40) // feet
  const [plotLength, setPlotLength] = useState(30) // feet
  const [showMeasurements, setShowMeasurements] = useState(true)

  // Snap to grid
  const snapToGrid = useCallback((value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE
  }, [])

  // Draw the canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 0.5
    for (let x = 0; x <= canvas.width; x += GRID_SIZE) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y <= canvas.height; y += GRID_SIZE) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw major grid lines (every 5 feet)
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1
    for (let x = 0; x <= canvas.width; x += GRID_SIZE * 5) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y <= canvas.height; y += GRID_SIZE * 5) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw scale indicator
    ctx.fillStyle = "#374151"
    ctx.font = "11px Inter, sans-serif"
    ctx.fillText("1 cell = 1 ft", 10, canvas.height - 10)

    // Draw elements
    elements.forEach((element) => {
      const tool = roomTools.find((t) => t.type === element.type)
      if (!tool) return

      const isSelected = selectedElement === element.id

      // Draw fill
      ctx.fillStyle = tool.color + "30"
      ctx.fillRect(element.x, element.y, element.width, element.height)

      // Draw border
      ctx.strokeStyle = isSelected ? "#1e40af" : tool.color
      ctx.lineWidth = isSelected ? 3 : 2
      ctx.strokeRect(element.x, element.y, element.width, element.height)

      // Draw label
      ctx.fillStyle = "#1f2937"
      ctx.font = "bold 12px Inter, sans-serif"
      const labelText = element.label || tool.label
      ctx.fillText(labelText, element.x + 8, element.y + 20)

      // Draw measurements if enabled
      if (showMeasurements && element.type !== "door") {
        const widthFt = Math.abs(element.width / GRID_SIZE)
        const heightFt = Math.abs(element.height / GRID_SIZE)
        
        ctx.fillStyle = "#6b7280"
        ctx.font = "10px Inter, sans-serif"
        
        // Width measurement
        const widthText = `${widthFt}ft`
        const widthTextWidth = ctx.measureText(widthText).width
        ctx.fillText(widthText, element.x + element.width / 2 - widthTextWidth / 2, element.y + element.height + 14)
        
        // Height measurement
        ctx.save()
        ctx.translate(element.x - 8, element.y + element.height / 2)
        ctx.rotate(-Math.PI / 2)
        ctx.fillText(`${heightFt}ft`, -ctx.measureText(`${heightFt}ft`).width / 2, 0)
        ctx.restore()
      }

      // Draw door arc if it's a door
      if (element.type === "door") {
        ctx.strokeStyle = tool.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(element.x, element.y + element.height, element.width, -Math.PI / 2, 0)
        ctx.stroke()
      }
    })

    // Draw current drawing preview
    if (isDrawing) {
      const tool = roomTools.find((t) => t.type === selectedTool)
      if (tool) {
        const width = currentPos.x - startPos.x
        const height = currentPos.y - startPos.y
        
        ctx.fillStyle = tool.color + "20"
        ctx.fillRect(startPos.x, startPos.y, width, height)
        
        ctx.strokeStyle = tool.color
        ctx.lineWidth = 2
        ctx.setLineDash([5, 5])
        ctx.strokeRect(startPos.x, startPos.y, width, height)
        ctx.setLineDash([])

        // Show live dimensions
        const widthFt = Math.abs(Math.round(width / GRID_SIZE))
        const heightFt = Math.abs(Math.round(height / GRID_SIZE))
        ctx.fillStyle = "#1f2937"
        ctx.font = "bold 12px Inter, sans-serif"
        ctx.fillText(`${widthFt}ft x ${heightFt}ft`, startPos.x + 8, startPos.y - 8)
      }
    }
  }, [elements, isDrawing, startPos, currentPos, selectedTool, selectedElement, showMeasurements])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: snapToGrid((e.clientX - rect.left) / scale),
      y: snapToGrid((e.clientY - rect.top) / scale),
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getCanvasCoordinates(e)

    if (selectedTool === "select") {
      // Check if clicking on an element
      const clickedElement = [...elements].reverse().find(
        (el) => pos.x >= el.x && pos.x <= el.x + el.width && pos.y >= el.y && pos.y <= el.y + el.height
      )
      setSelectedElement(clickedElement?.id || null)
      return
    }

    if (selectedTool === "eraser") {
      const clickedElement = [...elements].reverse().find(
        (el) => pos.x >= el.x && pos.x <= el.x + el.width && pos.y >= el.y && pos.y <= el.y + el.height
      )
      if (clickedElement) {
        setElements((prev) => prev.filter((el) => el.id !== clickedElement.id))
      }
      return
    }

    setIsDrawing(true)
    setStartPos(pos)
    setCurrentPos(pos)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const pos = getCanvasCoordinates(e)
    setCurrentPos(pos)
  }

  const handleMouseUp = () => {
    if (!isDrawing) return

    const width = currentPos.x - startPos.x
    const height = currentPos.y - startPos.y

    // Only create element if it has meaningful size
    if (Math.abs(width) >= GRID_SIZE && Math.abs(height) >= GRID_SIZE) {
      const tool = roomTools.find((t) => t.type === selectedTool)
      const newElement: DrawnElement = {
        id: `${Date.now()}-${Math.random()}`,
        type: selectedTool,
        x: width < 0 ? startPos.x + width : startPos.x,
        y: height < 0 ? startPos.y + height : startPos.y,
        width: Math.abs(width),
        height: Math.abs(height),
        label: tool?.label,
      }
      setElements((prev) => [...prev, newElement])
    }

    setIsDrawing(false)
  }

  const clearCanvas = () => {
    setElements([])
    setSelectedElement(null)
  }

  const deleteSelected = () => {
    if (selectedElement) {
      setElements((prev) => prev.filter((el) => el.id !== selectedElement))
      setSelectedElement(null)
    }
  }

  const generateLayout = () => {
    if (generationCount >= 3) {
      setShowUpgradeModal(true)
      return
    }
    setGenerationCount((prev) => prev + 1)
    // AI generation would happen here
    alert(`AI Generation ${generationCount + 1}/3: Your layout has been submitted for AI processing!`)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement("a")
    link.download = `floor-plan-${Date.now()}.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const hasDrawnElements = elements.length > 0

  return (
    <AuthOverlay>
      <main className="min-h-screen bg-secondary/30">
        <Navbar />

      <div className="pt-20">
        {/* Header */}
        <div className="bg-card border-b">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <h1 className="font-serif text-3xl font-bold text-foreground">AI Playground</h1>
            <p className="text-muted-foreground mt-1">
              Sketch your layout and let AI generate possibilities
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Tools */}
            <div className="w-full lg:w-64 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Drawing Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {roomTools.map((tool) => (
                    <Button
                      key={tool.type}
                      variant={selectedTool === tool.type ? "default" : "outline"}
                      className={`w-full justify-start gap-3 ${
                        selectedTool === tool.type ? "bg-primary text-primary-foreground" : ""
                      }`}
                      onClick={() => setSelectedTool(tool.type)}
                    >
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: tool.color }}
                      />
                      <span>{tool.label}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4 space-y-2">
                  <Button
                    variant={selectedTool === "select" ? "default" : "outline"}
                    className="w-full justify-start gap-3"
                    onClick={() => setSelectedTool("select")}
                  >
                    <Move className="w-4 h-4" />
                    Select
                  </Button>
                  <Button
                    variant={selectedTool === "eraser" ? "default" : "outline"}
                    className="w-full justify-start gap-3"
                    onClick={() => setSelectedTool("eraser")}
                  >
                    <Eraser className="w-4 h-4" />
                    Eraser
                  </Button>
                  <div className="border-t my-3" />
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    onClick={clearCanvas}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear All
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                    onClick={downloadCanvas}
                    disabled={!hasDrawnElements}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  {selectedElement && (
                    <Button
                      variant="destructive"
                      className="w-full justify-start gap-3"
                      onClick={deleteSelected}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Selected
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Plot Size */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Plot Size
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Width (ft)</Label>
                    <Input
                      type="number"
                      value={plotWidth}
                      onChange={(e) => setPlotWidth(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Length (ft)</Label>
                    <Input
                      type="number"
                      value={plotLength}
                      onChange={(e) => setPlotLength(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="showMeasurements"
                      checked={showMeasurements}
                      onChange={(e) => setShowMeasurements(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="showMeasurements" className="text-sm cursor-pointer">
                      Show measurements
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* How to Use */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">How to Use</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>1. Select a room type from tools</p>
                  <p>2. Click and drag on canvas to draw</p>
                  <p>3. Add doors to connect rooms</p>
                  <p>4. Click Generate for AI suggestions</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1">
              <Card className="overflow-hidden">
                {/* Canvas Header */}
                <div className="flex items-center justify-between p-4 border-b bg-card">
                  <div className="flex items-center gap-4">
                    <h2 className="font-medium">Design Canvas</h2>
                    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
                        className="h-8 w-8 p-0"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <span className="text-sm w-16 text-center">{Math.round(scale * 100)}%</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setScale((s) => Math.min(2, s + 0.1))}
                        className="h-8 w-8 p-0"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">
                      Generations: {generationCount}/3
                    </span>
                    <Button
                      onClick={generateLayout}
                      disabled={!hasDrawnElements}
                      className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2"
                    >
                      <Wand2 className="w-4 h-4" />
                      Generate AI Layout
                    </Button>
                  </div>
                </div>

                {/* Canvas */}
                <div
                  ref={containerRef}
                  className="p-6 bg-secondary/50 overflow-auto flex items-center justify-center"
                  style={{ minHeight: "70vh" }}
                >
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "center center",
                    }}
                  >
                    <canvas
                      ref={canvasRef}
                      width={CANVAS_WIDTH}
                      height={CANVAS_HEIGHT}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={() => setIsDrawing(false)}
                      className="border-2 border-border rounded-lg cursor-crosshair bg-white shadow-lg"
                      style={{ cursor: selectedTool === "select" ? "move" : selectedTool === "eraser" ? "pointer" : "crosshair" }}
                    />
                  </div>
                </div>

                {/* Canvas Footer - Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 p-4 border-t bg-card text-sm">
                  {roomTools.map((tool) => (
                    <div key={tool.type} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border-2"
                        style={{ backgroundColor: tool.color + "30", borderColor: tool.color }}
                      />
                      <span className="text-muted-foreground">{tool.label}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tips */}
              <Card className="mt-4">
                <CardContent className="py-4">
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">Best Practices:</h4>
                      <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                        <li>Keep rooms proportional to real sizes</li>
                        <li>Place bathrooms near bedrooms</li>
                        <li>Consider natural light for living areas</li>
                        <li>Plan for proper ventilation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-red-600">Avoid:</h4>
                      <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                        <li>Overlapping rooms</li>
                        <li>Extremely small or large rooms</li>
                        <li>Irregular shapes without reason</li>
                        <li>Missing essential spaces</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-2">Unlock Unlimited Designs</h3>
              <p className="text-muted-foreground mb-6">
                You have used all 3 free generations. Upgrade to premium for unlimited AI floor plan generations.
              </p>
              <div className="flex flex-col gap-3">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Upgrade to Premium
                </Button>
                <Button variant="ghost" onClick={() => setShowUpgradeModal(false)}>
                  Maybe Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
    </AuthOverlay>
  )
}
