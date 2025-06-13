"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Plus, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Movie {
  id: string
  title: string
  description: string
  coverImage: string
  thumbnailImage: string
  genre: string[]
  year: string
  duration: string
  rating: number
}

interface MovieCardProps {
  movie: Movie
  featured?: boolean
}

export default function MovieCard({ movie, featured = false }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg transition-all duration-300",
        featured ? "aspect-[16/9]" : "aspect-[2/3]",
        isHovered ? "scale-105 z-10 shadow-xl" : "",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/movies/${movie.id}`} className="block h-full w-full">
        <Image
          src={featured ? movie.coverImage : movie.thumbnailImage}
          alt={movie.title}
          fill
          className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110 brightness-75" : "")}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-medium line-clamp-1">{movie.title}</h3>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
          </div>

          <div className="flex flex-wrap gap-1 mt-1">
            {movie.genre.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="flex gap-1 mt-3">
            <Button size="sm" className="h-8 w-8 rounded-full p-0" asChild>
              <Link href={`/movies/${movie.id}`}>
                <Play className="h-4 w-4" />
                <span className="sr-only">Play</span>
              </Link>
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 rounded-full p-0">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add to list</span>
            </Button>
            <Button size="sm" variant="outline" className="h-8 w-8 rounded-full p-0" asChild>
              <Link href={`/movies/${movie.id}`}>
                <Info className="h-4 w-4" />
                <span className="sr-only">More info</span>
              </Link>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  )
}
