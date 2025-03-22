"use client"

import { useState, useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import { MessageSquare, Phone, Mail, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const faqs = [
  {
    question: "How do I open a savings account with SBI?",
    answer:
      "You can open a savings account with SBI by visiting your nearest branch with KYC documents (Aadhaar, PAN, passport-sized photographs). Alternatively, you can initiate the process online through our website or mobile app and complete it at the branch.",
  },
  {
    question: "What is the minimum balance requirement for SBI savings accounts?",
    answer:
      "The minimum balance requirement varies based on the type of account and branch location. For regular savings accounts in metro cities, it's typically ₹3,000, while in semi-urban areas it's ₹2,000, and in rural areas it's ₹1,000. We also offer zero-balance accounts like BSBD accounts.",
  },
  {
    question: "How can I apply for an SBI credit card?",
    answer:
      "You can apply for an SBI credit card through our website, mobile app, or by visiting any SBI branch. Existing SBI customers may also receive pre-approved offers through their internet banking portal. The application requires identity proof, address proof, income proof, and a passport-sized photograph.",
  },
  {
    question: "What is the process for applying for an education loan?",
    answer:
      "To apply for an education loan, you can visit our website or any SBI branch. You'll need to provide admission proof from the institution, academic records, identity and address proof, income documents of parents/guardian, and collateral details for loans above ₹7.5 lakhs. Our education loans cover tuition fees, accommodation, and other education-related expenses.",
  },
  {
    question: "How do I reset my internet banking password?",
    answer:
      "If you've forgotten your internet banking password, visit the SBI online banking portal and click on 'Forgot Password'. You can reset it using your username, registered mobile number, and either your ATM card details or a one-time password sent to your registered mobile number. For security reasons, you may need to visit a branch in some cases.",
  },
  {
    question: "What should I do if my debit card is lost or stolen?",
    answer:
      "If your debit card is lost or stolen, immediately block it through the SBI mobile app, internet banking, or by calling our 24/7 helpline at 1800-11-2211. After blocking, you can apply for a replacement card through your online banking account or by visiting your home branch.",
  },
]

export default function SupportSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true)
      setName("")
      setEmail("")
      setMessage("")
    }, 1000)
  }

  return (
    <section id="support" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-sbi-blue bg-blue-100 rounded-full mb-4">
            Customer Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue">We're Here to Help</h2>
          <p className="text-lg text-gray-600">
            Get answers to your questions and connect with our customer support team for personalized assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid grid-cols-2 mb-8">
                <TabsTrigger value="faq" className="text-sm">
                  Frequently Asked Questions
                </TabsTrigger>
                <TabsTrigger value="contact" className="text-sm">
                  Contact Information
                </TabsTrigger>
              </TabsList>

              <TabsContent value="faq" className="mt-0">
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search FAQs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-navy-blue hover:text-sbi-blue">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <p className="text-center py-8 text-gray-500">No FAQs found matching your search criteria.</p>
                  )}
                </Accordion>
              </TabsContent>

              <TabsContent value="contact" className="mt-0">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-blue-100 text-sbi-blue">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-blue">Phone Support</h3>
                      <p className="text-gray-600 mt-1">24/7 Customer Care: 1800-11-2211</p>
                      <p className="text-gray-600">International: +91-80-26599990</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-blue-100 text-sbi-blue">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-blue">Email Support</h3>
                      <p className="text-gray-600 mt-1">customercare@sbi.co.in</p>
                      <p className="text-gray-600">For complaints: complaints@sbi.co.in</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-blue-100 text-sbi-blue">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-blue">Live Chat</h3>
                      <p className="text-gray-600 mt-1">Available Monday to Saturday</p>
                      <p className="text-gray-600">9:00 AM to 7:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-blue-100 text-sbi-blue">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-navy-blue">Head Office</h3>
                      <p className="text-gray-600 mt-1">State Bank Bhavan, Madame Cama Road</p>
                      <p className="text-gray-600">Nariman Point, Mumbai - 400021</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold mb-6 text-navy-blue">Send Us a Message</h3>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Message Sent Successfully!</h4>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <Button onClick={() => setSubmitted(false)} className="bg-sbi-blue hover:bg-sbi-blue-dark text-white">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-sbi-blue hover:bg-sbi-blue-dark text-white">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

