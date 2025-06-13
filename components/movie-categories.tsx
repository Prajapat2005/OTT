"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import MovieCard from "@/components/movie-card"
import { movies } from "@/lib/data"

// Group movies by genre
const getMoviesByGenre = () => {
  const genres = new Set<string>()

  // Collect all unique genres
  movies.forEach((movie) => {
    movie.genre.forEach((g) => genres.add(g))
  })

  // Create a map of genre to movies
  const moviesByGenre: Record<string, typeof movies> = {}

  Array.from(genres).forEach((genre) => {
    moviesByGenre[genre] = movies.filter((movie) => movie.genre.includes(genre))
  })

  return moviesByGenre
}

export default function MovieCategories() {
  const moviesByGenre = getMoviesByGenre()
  const genres = Object.keys(moviesByGenre)

  return (
    <div className="space-y-10 py-6">
      <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>

      {genres.map((genre) => (
        <CategoryRow key={genre} title={genre} movies={moviesByGenre[genre]} />
      ))}
    </div>
  )
}

function CategoryRow({ title, movies }: { title: string; movies: typeof movies }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    setScrollPosition(container.scrollLeft)
    setMaxScroll(container.scrollWidth - container.clientWidth)
  }

  const scrollLeft = () => {
    const container = document.getElementById(`scroll-container-${title}`)
    if (container) {
      // Calculate a better scroll amount - about 4-5 cards width
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
    const container = document.getElementById(`scroll-container-${title}`)
    if (container) {
      // Calculate a better scroll amount - about 4-5 cards width
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
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">{title}</h3>
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
            id={`scroll-container-${title}`}
            className="flex space-x-4 pb-4 transition-all duration-500 ease-out"
            style={{ scrollBehavior: "smooth" }}
          >
            {movies.map((movie) => (
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
