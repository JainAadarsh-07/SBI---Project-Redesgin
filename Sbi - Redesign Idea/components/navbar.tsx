"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLoginModal } from "@/hooks/use-login-modal"
import ThemeToggle from "@/components/theme-toggle"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { openModal } = useLoginModal()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-background/80 backdrop-blur-sm py-4",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-16">
            <img src="/placeholder.svg?height=40&width=64" alt="SBI Logo" className="h-full w-full object-contain" />
          </div>
          <span className="text-foreground font-bold text-xl hidden sm:inline-block">State Bank of India</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Banking Services
          </button>
          <div className="relative group">
            <button
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Accounts & Deposits
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={() => scrollToSection("accounts")}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted w-full text-left"
                >
                  Savings Account
                </button>
                <button
                  onClick={() => scrollToSection("accounts")}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted w-full text-left"
                >
                  Current Account
                </button>
                <button
                  onClick={() => scrollToSection("accounts")}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted w-full text-left"
                >
                  Fixed Deposits
                </button>
                <button
                  onClick={() => scrollToSection("accounts")}
                  className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted w-full text-left"
                >
                  Recurring Deposits
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => scrollToSection("loans")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Loans
          </button>
          <button
            onClick={() => scrollToSection("dashboard")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => scrollToSection("support")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Support
          </button>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          <ThemeToggle />
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <Button onClick={openModal} className="bg-sbi-blue hover:bg-sbi-blue-dark text-white">
            Login
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 lg:hidden">
          <ThemeToggle />
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button
            className="text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          className="lg:hidden absolute top-full left-0 right-0 bg-background shadow-lg py-4 px-4 flex flex-col space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
          >
            Banking Services
          </button>
          <div className="relative">
            <button
              className="flex items-center justify-between w-full text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Accounts & Deposits
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="pl-4 mt-2 space-y-2">
                <button
                  onClick={() => scrollToSection("accounts")}
                  className="block py-2 text-sm text-muted-foreground hover:text-primary w-full text-left"
                >
                  Savings Account
                </button>
                <button
                  onClick={() => scrollToSection("accounts")}
                  className="block py-2 text-sm text-muted-foreground hover:text-primary w-full text-left"
                >
                  Current Account
                </button>
                <button
                  onClick={() => scrollToSection("accounts")}
                  className="block py-2 text-sm text-muted-foreground hover:text-primary w-full text-left"
                >
                  Fixed Deposits
                </button>
                <button
                  onClick={() => scrollToSection("accounts")}
                  className="block py-2 text-sm text-muted-foreground hover:text-primary w-full text-left"
                >
                  Recurring Deposits
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => scrollToSection("loans")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
          >
            Loans
          </button>
          <button
            onClick={() => scrollToSection("dashboard")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
          >
            Dashboard
          </button>
          <button
            onClick={() => scrollToSection("support")}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
          >
            Support
          </button>
          <Button
            onClick={() => {
              setIsMobileMenuOpen(false)
              openModal()
            }}
            className="bg-sbi-blue hover:bg-sbi-blue-dark text-white w-full"
          >
            Login
          </Button>
        </motion.div>
      )}
    </motion.header>
  )
}

