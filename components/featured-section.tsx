"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import MovieCard from "@/components/movie-card"
import { movies } from "@/lib/data"

export default function FeaturedSection() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  const featuredMovies = movies.filter((movie) => movie.rating >= 8.5).slice(0, 10)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    setScrollPosition(container.scrollLeft)
    setMaxScroll(container.scrollWidth - container.clientWidth)
  }

  const scrollLeft = () => {
    const container = document.getElementById("featured-container")
    if (container) {
      // Calculate a better scroll amount - about 2 featured cards width
      const scrollAmount = Math.min(container.clientWidth * 0.8, 800)

      // Apply smooth scrolling with clear direction
      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })

      // Update scroll position state after animation completes
      setTimeout(() => {
        setScrollPosition(container.scrollLeft)
      }, 500)
    }
  }

  const scrollRight = () => {
    const container = document.getElementById("featured-container")
    if (container) {
      // Calculate a better scroll amount - about 2 featured cards width
      const scrollAmount = Math.min(container.clientWidth * 0.8, 800)

      // Apply smooth scrolling with clear direction
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })

      // Update scroll position state after animation completes
      setTimeout(() => {
        setScrollPosition(container.scrollLeft)
      }, 500)
    }
  }

  return (
    <div className="space-y-3 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Featured Movies</h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-background/80 transition-colors"
            onClick={scrollLeft}
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-background/80 transition-colors"
            onClick={scrollRight}
            disabled={scrollPosition >= maxScroll}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div className="relative">
        <ScrollArea className="w-full" onScroll={handleScroll}>
          <div
            id="featured-container"
            className="flex space-x-4 pb-4 transition-all duration-500 ease-out"
            style={{ scrollBehavior: "smooth" }}
          >
            {featuredMovies.map((movie) => (
              <div key={movie.id} className="w-[320px] md:w-[400px] shrink-0">
                <MovieCard movie={movie} featured />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </div>
  )
}
