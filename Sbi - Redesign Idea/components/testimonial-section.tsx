"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    content:
      "SBI has been my banking partner for over 15 years. Their digital transformation has made banking so convenient that I rarely need to visit a branch anymore. The mobile app is intuitive and secure.",
    author: "Rajesh Sharma",
    role: "Business Owner, Delhi",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: 2,
    content:
      "The home loan process with SBI was surprisingly smooth. The relationship manager guided me through every step, and the interest rates were the most competitive in the market. Highly recommended!",
    author: "Priya Patel",
    role: "IT Professional, Bangalore",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
  {
    id: 3,
    content:
      "As a student, SBI's zero-balance account has been perfect for my needs. The educational loan process was straightforward, and the customer service team was always helpful whenever I had questions.",
    author: "Amit Kumar",
    role: "Graduate Student, Mumbai",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4,
  },
  {
    id: 4,
    content:
      "I've been using SBI's corporate banking services for my company, and their business solutions have significantly streamlined our financial operations. Their dedicated corporate team understands our unique needs.",
    author: "Sunita Reddy",
    role: "CEO, Hyderabad",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
  }

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  useEffect(() => {
    startAutoplay()
    return () => stopAutoplay()
  }, [])

  const handlePrev = () => {
    stopAutoplay()
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
    startAutoplay()
  }

  const handleNext = () => {
    stopAutoplay()
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    startAutoplay()
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-sbi-blue bg-blue-100 rounded-full mb-4">
            Customer Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue">What Our Customers Say</h2>
          <p className="text-lg text-gray-600">
            Hear from our satisfied customers about their experience with SBI's banking services and solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden h-[300px] md:h-[250px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    {[...Array(5 - testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gray-300" />
                    ))}
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 italic mb-6">"{testimonials[currentIndex].content}"</p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <img
                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[currentIndex].author}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonials[currentIndex].author}</h4>
                      <p className="text-sm text-gray-600">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full border-gray-200 hover:border-sbi-blue hover:text-sbi-blue"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    stopAutoplay()
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                    startAutoplay()
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex ? "w-8 bg-sbi-blue" : "w-2.5 bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full border-gray-200 hover:border-sbi-blue hover:text-sbi-blue"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

