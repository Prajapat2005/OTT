import HeroSection from "@/components/hero-section"
import MovieCategories from "@/components/movie-categories"
import FeaturedSection from "@/components/featured-section"
import TrendingNow from "@/components/trending-now"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <HeroSection />
      <div className="w-full px-4 md:px-8 lg:px-12">
        <TrendingNow />
        <FeaturedSection />
        <MovieCategories />

        <div className="mt-16 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join StreamVerse Today</h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Get unlimited access to thousands of movies and TV shows with no ads.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" asChild>
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/plans">View Plans</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
