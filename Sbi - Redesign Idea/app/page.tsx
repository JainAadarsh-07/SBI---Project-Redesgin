import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import AccountSection from "@/components/account-section"
import LoanSection from "@/components/loan-section"
import DashboardSection from "@/components/dashboard-section"
import TransactionSection from "@/components/transaction-section"
import TestimonialSection from "@/components/testimonial-section"
import SupportSection from "@/components/support-section"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"
import AIChatbot from "@/components/ai-chatbot"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeatureSection />
        <AccountSection />
        <LoanSection />
        <DashboardSection />
        <TransactionSection />
        <TestimonialSection />
        <SupportSection />
      </main>
      <Footer />
      <LoginModal />
      <AIChatbot />
    </div>
  )
}

