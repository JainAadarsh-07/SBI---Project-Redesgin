"use client"

import { useState, useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const accountTypes = [
  {
    id: "savings",
    title: "Savings Account",
    description: "Earn interest while maintaining liquidity for your everyday needs",
    features: [
      "No minimum balance for basic savings account",
      "Free digital banking services",
      "Attractive interest rates",
      "Free debit card for the first year",
      "Unlimited free transactions at SBI ATMs",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "current",
    title: "Current Account",
    description: "Designed for businesses with high transaction volumes",
    features: [
      "Multiple transaction options",
      "Overdraft facilities available",
      "Dedicated relationship manager",
      "Integrated payment solutions",
      "Multi-city banking services",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "fixed",
    title: "Fixed Deposits",
    description: "Secure your savings with guaranteed returns",
    features: [
      "Competitive interest rates",
      "Flexible tenure options from 7 days to 10 years",
      "Loan facility against FD",
      "Auto-renewal option",
      "Senior citizen benefits",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "recurring",
    title: "Recurring Deposits",
    description: "Build your savings with regular monthly deposits",
    features: [
      "Start with as low as ₹100 per month",
      "Tenure ranging from 6 months to 10 years",
      "Higher interest rates than savings account",
      "Loan facility available against RD",
      "Automatic deduction facility",
    ],
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function AccountSection() {
  const [activeTab, setActiveTab] = useState("savings")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="accounts" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-sbi-blue bg-blue-100 rounded-full mb-4">
            Accounts & Deposits
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue">Banking Solutions for Every Need</h2>
          <p className="text-lg text-gray-600">
            Choose from our range of accounts designed to suit your financial requirements and help you manage your
            money effectively.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="savings" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-transparent h-auto p-0 mb-8">
              {accountTypes.map((account) => (
                <TabsTrigger
                  key={account.id}
                  value={account.id}
                  className={`
                    data-[state=active]:bg-sbi-blue data-[state=active]:text-white 
                    border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium
                    transition-all duration-200 hover:border-sbi-blue
                    ${activeTab === account.id ? "shadow-md" : "bg-white text-gray-700"}
                  `}
                >
                  {account.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {accountTypes.map((account) => (
              <TabsContent key={account.id} value={account.id} className="mt-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="text-2xl font-bold mb-3 text-navy-blue">{account.title}</h3>
                    <p className="text-gray-600 mb-6">{account.description}</p>

                    <div className="space-y-3 mb-8">
                      {account.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <p className="text-gray-700">{feature}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-sbi-blue hover:bg-sbi-blue-dark text-white">
                        Open Account <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="border-sbi-blue text-sbi-blue hover:bg-blue-50">
                        Learn More
                      </Button>
                    </div>
                  </div>

                  <div className="order-1 md:order-2">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img src={account.image || "/placeholder.svg"} alt={account.title} className="w-full h-auto" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

