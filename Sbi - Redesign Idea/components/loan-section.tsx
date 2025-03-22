"use client"

import { useState, useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { Home, Car, Briefcase, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"

const loanTypes = [
  {
    id: "home",
    title: "Home Loan",
    icon: <Home className="h-10 w-10 text-sbi-blue" />,
    description:
      "Realize your dream of owning a home with our competitive interest rates and flexible repayment options.",
    interestRate: "8.40% p.a. onwards",
    maxAmount: "Up to ₹10 Crore",
    tenure: "Up to 30 years",
    processingFee: "0.35% of loan amount",
    eligibility: [
      "Salaried individuals with minimum 2 years of work experience",
      "Self-employed professionals with minimum 3 years of practice",
      "Minimum age of 21 years and maximum age of 70 years at loan maturity",
      "Minimum monthly income of ₹25,000",
    ],
  },
  {
    id: "car",
    title: "Car Loan",
    icon: <Car className="h-10 w-10 text-sbi-blue" />,
    description:
      "Drive home your dream car with our hassle-free car loans offering attractive interest rates and quick processing.",
    interestRate: "7.85% p.a. onwards",
    maxAmount: "Up to ₹1 Crore",
    tenure: "Up to 7 years",
    processingFee: "0.40% of loan amount",
    eligibility: [
      "Salaried individuals with minimum 1 year of work experience",
      "Self-employed professionals with minimum 2 years of practice",
      "Minimum age of 21 years and maximum age of 65 years at loan maturity",
      "Minimum monthly income of ₹20,000",
    ],
  },
  {
    id: "personal",
    title: "Personal Loan",
    icon: <Briefcase className="h-10 w-10 text-sbi-blue" />,
    description:
      "Meet your immediate financial needs with our personal loans offering quick disbursals and minimal documentation.",
    interestRate: "10.50% p.a. onwards",
    maxAmount: "Up to ₹20 Lakh",
    tenure: "Up to 5 years",
    processingFee: "1% of loan amount",
    eligibility: [
      "Salaried individuals with minimum 2 years of work experience",
      "Self-employed professionals with minimum 3 years of practice",
      "Minimum age of 21 years and maximum age of 60 years at loan maturity",
      "Minimum monthly income of ₹30,000",
    ],
  },
  {
    id: "education",
    title: "Education Loan",
    icon: <GraduationCap className="h-10 w-10 text-sbi-blue" />,
    description:
      "Invest in your future with our education loans designed to help you pursue your academic aspirations.",
    interestRate: "7.30% p.a. onwards",
    maxAmount: "Up to ₹1.5 Crore for studies abroad, ₹30 Lakh for studies in India",
    tenure: "Up to 15 years",
    processingFee: "Nil",
    eligibility: [
      "Indian nationals who have secured admission to recognized institutions",
      "Minimum 60% marks in qualifying examination",
      "Co-applicant (parent/guardian) required",
      "Collateral required for loans above ₹7.5 Lakh",
    ],
  },
]

export default function LoanSection() {
  const [loanAmount, setLoanAmount] = useState([2000000])
  const [loanTenure, setLoanTenure] = useState([15])
  const [selectedLoan, setSelectedLoan] = useState("home")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const calculateEMI = () => {
    const amount = loanAmount[0]
    const tenure = loanTenure[0]
    let rate = 0.084 // Default to home loan rate

    switch (selectedLoan) {
      case "car":
        rate = 0.0785
        break
      case "personal":
        rate = 0.105
        break
      case "education":
        rate = 0.073
        break
      default:
        rate = 0.084
    }

    const monthlyRate = rate / 12
    const totalMonths = tenure * 12

    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)

    return Math.round(emi)
  }

  return (
    <section id="loans" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-sbi-blue bg-blue-100 rounded-full mb-4">
            Loan Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue">Loans Tailored to Your Needs</h2>
          <p className="text-lg text-gray-600">
            Explore our range of loan products designed to help you achieve your financial goals with competitive
            interest rates and flexible terms.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {loanTypes.map((loan) => (
              <Card
                key={loan.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedLoan === loan.id ? "border-sbi-blue ring-1 ring-sbi-blue" : "border-gray-200"}`}
                onClick={() => setSelectedLoan(loan.id)}
              >
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 rounded-lg bg-blue-50">{loan.icon}</div>
                  <div>
                    <CardTitle className="text-navy-blue">{loan.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">{loan.interestRate}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{loan.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div
            className="lg:col-span-2 bg-gray-50 rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-6 text-navy-blue">Loan Calculator</h3>

                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                      <span className="text-sm font-medium text-sbi-blue">₹{loanAmount[0].toLocaleString()}</span>
                    </div>
                    <Slider
                      value={loanAmount}
                      min={100000}
                      max={10000000}
                      step={100000}
                      onValueChange={setLoanAmount}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>₹1 Lakh</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-gray-700">Loan Tenure (Years)</label>
                      <span className="text-sm font-medium text-sbi-blue">{loanTenure[0]} Years</span>
                    </div>
                    <Slider
                      value={loanTenure}
                      min={1}
                      max={30}
                      step={1}
                      onValueChange={setLoanTenure}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                  <h4 className="text-lg font-semibold mb-4 text-navy-blue">Your Monthly EMI</h4>
                  <div className="text-3xl font-bold text-sbi-blue mb-2">₹{calculateEMI().toLocaleString()}</div>
                  <p className="text-sm text-gray-600">
                    Based on {loanTypes.find((l) => l.id === selectedLoan)?.interestRate}
                  </p>

                  <Button className="w-full mt-6 bg-sbi-blue hover:bg-sbi-blue-dark text-white">Apply Now</Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 text-navy-blue">Loan Details</h3>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="features">
                    <AccordionTrigger className="text-navy-blue font-medium">Features & Benefits</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Competitive interest rates</li>
                        <li>• Flexible repayment options</li>
                        <li>• Quick processing and disbursal</li>
                        <li>• Minimal documentation</li>
                        <li>• No hidden charges</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="eligibility">
                    <AccordionTrigger className="text-navy-blue font-medium">Eligibility</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-gray-600">
                        {loanTypes
                          .find((l) => l.id === selectedLoan)
                          ?.eligibility.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="documents">
                    <AccordionTrigger className="text-navy-blue font-medium">Required Documents</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Identity Proof (Aadhaar, PAN, Passport)</li>
                        <li>• Address Proof (Utility bills, Aadhaar)</li>
                        <li>• Income Proof (Salary slips, ITR)</li>
                        <li>• Bank statements for the last 6 months</li>
                        <li>• Property documents (for secured loans)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="fees">
                    <AccordionTrigger className="text-navy-blue font-medium">Fees & Charges</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 text-gray-600">
                        <p>
                          <span className="font-medium">Processing Fee:</span>{" "}
                          {loanTypes.find((l) => l.id === selectedLoan)?.processingFee}
                        </p>
                        <p>
                          <span className="font-medium">Prepayment Charges:</span> Up to 2% of the prepaid amount
                        </p>
                        <p>
                          <span className="font-medium">Late Payment Fee:</span> 2% per month on the overdue amount
                        </p>
                        <p>
                          <span className="font-medium">Documentation Charges:</span> As applicable
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

