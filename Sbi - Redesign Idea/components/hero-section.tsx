"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Lock, TrendingUp, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useLoginModal } from "@/hooks/use-login-modal"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const { openModal } = useLoginModal()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-background to-indigo-50 dark:from-blue-950/20 dark:via-background dark:to-indigo-950/20" />

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-200/20 to-blue-300/20 dark:from-blue-400/10 dark:to-blue-500/10 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-indigo-200/20 to-blue-200/20 dark:from-indigo-400/10 dark:to-blue-400/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={container} initial="hidden" animate="show" className="text-center md:text-left">
            <motion.span
              variants={item}
              className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-sbi-blue uppercase rounded-full bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
            >
              India's Most Trusted Bank
            </motion.span>

            <motion.h1
              variants={item}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-navy-blue dark:text-white"
            >
              Banking That Puts <span className="text-sbi-blue dark:text-blue-400">You First</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0"
            >
              Experience secure, convenient, and personalized banking solutions designed to meet your financial needs
              and help you achieve your goals.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <Button
                size="lg"
                className="bg-sbi-blue hover:bg-sbi-blue-dark text-white w-full sm:w-auto group"
                onClick={openModal}
              >
                Internet Banking
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-sbi-blue text-sbi-blue hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/50 w-full sm:w-auto"
              >
                Open an Account
              </Button>
            </motion.div>

            <motion.div variants={item} className="flex items-center justify-center md:justify-start mt-8 space-x-8">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-sbi-blue dark:text-blue-400" />
                <span className="text-sm text-muted-foreground">Secure Banking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-sbi-blue dark:text-blue-400" />
                <span className="text-sm text-muted-foreground">Protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-sbi-blue dark:text-blue-400" />
                <span className="text-sm text-muted-foreground">24/7 Service</span>
              </div>
            </motion.div>

            <motion.div variants={item} className="mt-12 hidden md:block">
              <p className="text-sm font-medium text-muted-foreground mb-4">Trusted by millions of Indians</p>
              <div className="flex items-center space-x-6">
                <img
                  src="/placeholder.svg?height=30&width=100"
                  alt="Partner 1"
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/placeholder.svg?height=30&width=100"
                  alt="Partner 2"
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/placeholder.svg?height=30&width=100"
                  alt="Partner 3"
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/placeholder.svg?height=30&width=100"
                  alt="Partner 4"
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img src="/placeholder.svg?height=600&width=500" alt="SBI Mobile Banking" className="w-full h-auto" />

              {/* Floating elements */}
              <motion.div
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg flex items-center space-x-3 max-w-[200px]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="flex-shrink-0 h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Your portfolio is up</p>
                  <p className="font-medium text-foreground">+12.5% this month</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Quick Transfers</h3>
                  <p className="text-sm text-muted-foreground">Instant money transfers to any bank account in India</p>
                  <Button variant="link" size="sm" className="px-0 text-sbi-blue dark:text-blue-400 mt-1">
                    Learn more <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <Shield className="h-5 w-5 text-sbi-blue dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Secure Banking</h3>
                  <p className="text-sm text-muted-foreground">Multi-layer security for all your transactions</p>
                  <Button variant="link" size="sm" className="px-0 text-sbi-blue dark:text-blue-400 mt-1">
                    Learn more <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

