"use client"

import { useState, useRef, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { MessageSquare, X, Send, Paperclip, Bot, Loader2 } from "lucide-react"

// Example chatbot responses
const botResponses = {
  greeting: [
    "Hello! Welcome to SBI's virtual assistant. How can I help you today?",
    "Hi there! I'm SBI's AI assistant. What can I assist you with?",
    "Welcome to SBI! I'm here to help with your banking queries.",
  ],
  account: [
    "To check your account balance, please log in to your Internet Banking or use the YONO SBI app. Alternatively, you can visit your nearest SBI ATM or branch.",
    "Your account details are available through Internet Banking, YONO SBI app, or by visiting any SBI branch with your ID proof.",
  ],
  loan: [
    "SBI offers various loan products including Home Loans, Personal Loans, Car Loans, and Education Loans. Our current interest rates start from 7.30% p.a. depending on the loan type.",
    "To apply for a loan, you can visit our website, use the YONO SBI app, or visit your nearest SBI branch. You'll need identity proof, address proof, income documents, and other relevant documents based on the loan type.",
  ],
  card: [
    "SBI offers a wide range of credit and debit cards with various benefits. You can apply for a card through Internet Banking, YONO SBI app, or by visiting your nearest branch.",
    "If your card is lost or stolen, please call our 24/7 helpline at 1800-11-2211 immediately to block it. You can also block it through Internet Banking or the YONO SBI app.",
  ],
  branch: [
    "You can locate your nearest SBI branch or ATM using the Branch Locator feature on our website or the YONO SBI app.",
    "SBI has over 22,000 branches and 58,000 ATMs across India. You can find the one nearest to you using our website or mobile app.",
  ],
  default: [
    "I'm sorry, I don't have information on that topic yet. For specific assistance, please call our customer care at 1800-11-2211 or visit your nearest SBI branch.",
    "I'm still learning about that. For immediate assistance, please contact our customer support at 1800-11-2211 or use Internet Banking.",
    "I don't have enough information about that. Would you like to know about our accounts, loans, cards, or branch locations instead?",
  ],
}

// Helper function to get a response based on keywords
const getResponse = (message: string) => {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hi") || lowerMessage.includes("hello") || lowerMessage.includes("hey")) {
    return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)]
  } else if (
    lowerMessage.includes("account") ||
    lowerMessage.includes("balance") ||
    lowerMessage.includes("statement")
  ) {
    return botResponses.account[Math.floor(Math.random() * botResponses.account.length)]
  } else if (
    lowerMessage.includes("loan") ||
    lowerMessage.includes("borrow") ||
    lowerMessage.includes("mortgage") ||
    lowerMessage.includes("interest")
  ) {
    return botResponses.loan[Math.floor(Math.random() * botResponses.loan.length)]
  } else if (lowerMessage.includes("card") || lowerMessage.includes("credit") || lowerMessage.includes("debit")) {
    return botResponses.card[Math.floor(Math.random() * botResponses.card.length)]
  } else if (lowerMessage.includes("branch") || lowerMessage.includes("atm") || lowerMessage.includes("location")) {
    return botResponses.branch[Math.floor(Math.random() * botResponses.branch.length)]
  } else {
    return botResponses.default[Math.floor(Math.random() * botResponses.default.length)]
  }
}

// Message type
type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

// Suggested questions
const suggestedQuestions = [
  "How do I check my account balance?",
  "What are the current loan interest rates?",
  "How do I apply for a credit card?",
  "Where is the nearest SBI branch?",
  "How do I reset my internet banking password?",
]

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm SBI's virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getResponse(userMessage.content),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    handleSendMessage()
  }

  return (
    <>
      {/* Chat button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-sbi-blue text-white shadow-lg hover:bg-sbi-blue-dark transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="p-4 bg-sbi-blue text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8 bg-white text-sbi-blue">
                  <Bot size={18} />
                </Avatar>
                <div>
                  <h3 className="font-medium">SBI Virtual Assistant</h3>
                  <p className="text-xs text-blue-100">Online | 24/7 Support</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </Button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-sbi-blue text-white rounded-tr-none"
                          : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-3 bg-white text-gray-800 border border-gray-200 rounded-tl-none">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Suggested questions */}
            {messages.length < 3 && (
              <div className="p-3 bg-white border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="text-xs bg-blue-50 text-sbi-blue px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <div className="p-3 bg-white border-t border-gray-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex items-center space-x-2"
              >
                <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                  <Paperclip size={18} />
                </Button>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-sbi-blue hover:bg-sbi-blue-dark text-white"
                  disabled={!inputValue.trim() || isTyping}
                >
                  {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

