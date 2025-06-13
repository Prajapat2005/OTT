"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { featuredMovies } from "@/lib/data"

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)

    // First fade out content
    setTimeout(() => {
      // Then change the slide
      setCurrentIndex((prev) => (prev === featuredMovies.length - 1 ? 0 : prev + 1))

      // Then fade in content after a short delay
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }, 400)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)

    // First fade out content
    setTimeout(() => {
      // Then change the slide
      setCurrentIndex((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1))

      // Then fade in content after a short delay
      setTimeout(() => {
        setIsAnimating(false)
      }, 300)
    }, 400)
  }, [isAnimating])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [nextSlide])

  const movie = featuredMovies[currentIndex]

  return (
    <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
        <Image src={movie.coverImage || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
      </div>

      {/* Content */}
      <div
        className="container relative z-20 flex h-full flex-col justify-end pb-10 px-4 md:px-6 transition-opacity duration-700 ease-in-out"
        style={{
          opacity: isAnimating ? 0 : 1,
          transform: `translateY(${isAnimating ? "10px" : "0"})`,
          transition: "opacity 700ms ease-in-out, transform 700ms ease-in-out",
        }}
      >
        <div className="max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
            <span className="text-sm">{movie.duration}</span>
            <span className="text-sm">{movie.year}</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">{movie.title}</h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl">{movie.description}</p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="gap-2" asChild>
              <Link href={`/movies/${movie.id}`}>
                <Play className="h-5 w-5" />
                Watch Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <Plus className="h-5 w-5" />
              Add to List
            </Button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute bottom-10 right-10 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next</span>
          </Button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-muted"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
