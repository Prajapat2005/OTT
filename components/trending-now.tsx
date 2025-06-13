"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import MovieCard from "@/components/movie-card"
import { movies } from "@/lib/data"

export default function TrendingNow() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  // Get trending movies (for demo purposes, using the top rated ones)
  const trendingMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 10)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    setScrollPosition(container.scrollLeft)
    setMaxScroll(container.scrollWidth - container.clientWidth)
  }

  const scrollLeft = () => {
    const container = document.getElementById("trending-container")
    if (container) {
      // Calculate a better scroll amount - about 3 cards width
      const scrollAmount = Math.min(container.clientWidth * 0.8, 600)

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
    const container = document.getElementById("trending-container")
    if (container) {
      // Force a specific scroll amount that will be visible
      const scrollAmount = 600

      // Log for debugging
      console.log("Scrolling right", {
        currentScroll: container.scrollLeft,
        maxScroll: container.scrollWidth - container.clientWidth,
        scrollAmount,
      })

      // Apply smooth scrolling with clear direction
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })

      // Update scroll position state after animation completes
      setTimeout(() => {
        setScrollPosition(container.scrollLeft)
        setMaxScroll(container.scrollWidth - container.clientWidth)
      }, 500)
    }
  }

  return (
    <div className="space-y-3 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
        </div>
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
            onClick={(e) => {
              e.preventDefault()
              scrollRight()
            }}
            disabled={scrollPosition >= maxScroll - 10}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div className="relative">
        <ScrollArea
          className="w-full"
          onScroll={(e) => {
            handleScroll(e)
            // Force update max scroll on every scroll event
            const container = e.currentTarget
            setMaxScroll(container.scrollWidth - container.clientWidth)
          }}
        >
          <div
            id="trending-container"
            className="flex space-x-4 pb-4 transition-all duration-500 ease-out"
            style={{ scrollBehavior: "smooth" }}
          >
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="w-[180px] md:w-[200px] shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>
    </div>
  )
}
