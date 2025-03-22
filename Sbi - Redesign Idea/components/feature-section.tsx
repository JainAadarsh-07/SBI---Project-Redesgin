"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { CreditCard, Landmark, Home, Wallet, Smartphone, Shield } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: <CreditCard className="h-10 w-10 text-sbi-blue" />,
    title: "Cards",
    description: "Debit, credit, and prepaid cards with exclusive rewards and benefits for all your needs.",
  },
  {
    icon: <Landmark className="h-10 w-10 text-sbi-blue" />,
    title: "Investments",
    description: "Grow your wealth with our range of investment options tailored to your financial goals.",
  },
  {
    icon: <Home className="h-10 w-10 text-sbi-blue" />,
    title: "Home Loans",
    description: "Competitive interest rates and flexible repayment options to help you own your dream home.",
  },
  {
    icon: <Wallet className="h-10 w-10 text-sbi-blue" />,
    title: "Personal Banking",
    description: "Comprehensive banking solutions designed to simplify your everyday financial needs.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-sbi-blue" />,
    title: "Digital Banking",
    description: "Bank anytime, anywhere with our secure and user-friendly mobile and internet banking.",
  },
  {
    icon: <Shield className="h-10 w-10 text-sbi-blue" />,
    title: "Insurance",
    description: "Protect what matters most with our comprehensive insurance solutions.",
  },
]

export default function FeatureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="features" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-sbi-blue bg-blue-100 rounded-full mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue">Comprehensive Banking Solutions</h2>
          <p className="text-lg text-gray-600">
            Discover a wide range of financial products and services designed to meet your unique needs and help you
            achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-5 inline-block p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-navy-blue">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

