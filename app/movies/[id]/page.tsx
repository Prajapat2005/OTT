"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Star, Clock, Calendar, ThumbsUp, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { movies } from "@/lib/data"
import MovieCard from "@/components/movie-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function MovieDetail() {
  const { id } = useParams()
  const { toast } = useToast()
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [similarScrollPosition, setSimilarScrollPosition] = useState(0)
  const [similarMaxScroll, setSimilarMaxScroll] = useState(0)

  // Find the movie by ID
  const movie = movies.find((m) => m.id === id) || movies[0]

  // Get similar movies
  const similarMovies = movies
    .filter((m) => m.id !== movie.id && m.genre.some((g) => movie.genre.includes(g)))
    .slice(0, 6)

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      toast({
        title: "Comment submitted",
        description: "Your comment has been submitted successfully.",
      })
      setComment("")
    }
  }

  const handleSimilarScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    setSimilarScrollPosition(container.scrollLeft)
    setSimilarMaxScroll(container.scrollWidth - container.clientWidth)
  }

  const scrollSimilarLeft = () => {
    const container = document.getElementById("similar-movies-container")
    if (container) {
      const scrollAmount = Math.min(container.clientWidth * 0.8, 750)

      container.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })

      setTimeout(() => {
        setSimilarScrollPosition(container.scrollLeft)
      }, 500)
    }
  }

  const scrollSimilarRight = () => {
    const container = document.getElementById("similar-movies-container")
    if (container) {
      const scrollAmount = Math.min(container.clientWidth * 0.8, 750)

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })

      setTimeout(() => {
        setSimilarScrollPosition(container.scrollLeft)
      }, 500)
    }
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Hero Banner */}
      <div className="relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent z-10" />
        <Image src={movie.coverImage || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
        <div className="container relative z-20 flex h-full flex-col justify-end gap-2 pb-10 px-4 md:px-6">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{movie.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{movie.year}</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
              <span className="text-lg font-medium">{movie.rating}/10</span>
            </div>
            <Button size="lg" className="gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Now
            </Button>
            <Button variant="outline" size="icon">
              <ThumbsUp className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cast">Cast & Crew</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="similar">Similar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold">Synopsis</h2>
                <p className="text-muted-foreground">{movie.description}</p>

                <h3 className="text-xl font-bold mt-6">Director</h3>
                <p>{movie.director}</p>

                <h3 className="text-xl font-bold mt-6">Writers</h3>
                <p>{movie.writers.join(", ")}</p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-2 font-semibold">Ratings Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Acting</span>
                      <span className="font-medium">8.5/10</span>
                    </div>
                    <Progress value={85} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span>Story</span>
                      <span className="font-medium">9.0/10</span>
                    </div>
                    <Progress value={90} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span>Direction</span>
                      <span className="font-medium">8.8/10</span>
                    </div>
                    <Progress value={88} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span>Visuals</span>
                      <span className="font-medium">9.5/10</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <h3 className="mb-2 font-semibold">Movie Info</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Release Date:</dt>
                      <dd>{movie.releaseDate}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Runtime:</dt>
                      <dd>{movie.duration}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Budget:</dt>
                      <dd>{movie.budget}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Revenue:</dt>
                      <dd>{movie.revenue}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cast" className="space-y-6">
            <h2 className="text-2xl font-bold">Cast & Crew</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {movie.cast.map((actor, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src={`/placeholder.svg?height=96&width=96&text=${actor.name.charAt(0)}`} />
                    <AvatarFallback>{actor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="font-medium leading-none">{actor.name}</h4>
                    <p className="text-xs text-muted-foreground">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Reviews</h2>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-6">
              {movie.reviews.map((review, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${review.user.charAt(0)}`} />
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{review.user}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <span>{review.date}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            <span>{review.rating}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">{review.likes}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Add Your Review</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Your Rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <button key={star} type="button" onClick={() => setRating(star)} className="p-1">
                      <Star
                        className={`h-5 w-5 ${
                          rating >= star ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-sm">{rating > 0 ? `${rating}/10` : ""}</span>
              </div>

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts about the movie..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[120px]"
                />
                <Button type="submit" disabled={!rating || !comment.trim()}>
                  Submit Review
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="similar" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Similar Movies</h2>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-background/80 transition-colors"
                  onClick={scrollSimilarLeft}
                  disabled={similarScrollPosition <= 0}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Scroll left</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-background/80 transition-colors"
                  onClick={scrollSimilarRight}
                  disabled={similarScrollPosition >= similarMaxScroll}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Scroll right</span>
                </Button>
              </div>
            </div>
            <ScrollArea className="w-full" onScroll={handleSimilarScroll}>
              <div
                id="similar-movies-container"
                className="flex space-x-4 pb-4 transition-all duration-500 ease-out"
                style={{ scrollBehavior: "smooth" }}
              >
                {similarMovies.map((movie) => (
                  <div key={movie.id} className="w-[250px] shrink-0">
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
