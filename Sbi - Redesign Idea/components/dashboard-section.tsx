"use client"

import { useState, useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  CreditCard,
  Wallet,
  Bell,
  MoreHorizontal,
  ChevronRight,
  Download,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Sample data for the dashboard
const accountData = {
  savingsAccount: {
    accountNumber: "XXXX XXXX 1234",
    balance: 142650,
    availableBalance: 142650,
    transactions: [
      { id: 1, description: "Salary Credit", amount: 58000, type: "credit", date: "2023-03-15" },
      { id: 2, description: "Amazon.in", amount: 2499, type: "debit", date: "2023-03-16" },
      { id: 3, description: "Electricity Bill", amount: 1850, type: "debit", date: "2023-03-20" },
      { id: 4, description: "Interest Credit", amount: 1250, type: "credit", date: "2023-03-28" },
    ],
  },
  currentAccount: {
    accountNumber: "XXXX XXXX 5678",
    balance: 85750,
    availableBalance: 85750,
    transactions: [
      { id: 1, description: "Business Income", amount: 125000, type: "credit", date: "2023-03-10" },
      { id: 2, description: "Office Supplies", amount: 15750, type: "debit", date: "2023-03-12" },
      { id: 3, description: "Vendor Payment", amount: 45000, type: "debit", date: "2023-03-18" },
      { id: 4, description: "Client Payment", amount: 35000, type: "credit", date: "2023-03-25" },
    ],
  },
}

const upcomingPayments = [
  { id: 1, description: "Home Loan EMI", amount: 24500, dueDate: "2023-04-05" },
  { id: 2, description: "Credit Card Bill", amount: 15750, dueDate: "2023-04-10" },
  { id: 3, description: "Car Insurance", amount: 8500, dueDate: "2023-04-15" },
]

const spendingCategories = [
  { category: "Shopping", amount: 12500, percentage: 35, color: "bg-blue-500" },
  { category: "Food & Dining", amount: 8750, percentage: 25, color: "bg-purple-500" },
  { category: "Bills & Utilities", amount: 7000, percentage: 20, color: "bg-green-500" },
  { category: "Travel", amount: 5250, percentage: 15, color: "bg-yellow-500" },
  { category: "Others", amount: 1750, percentage: 5, color: "bg-gray-500" },
]

export default function DashboardSection() {
  const [activeTab, setActiveTab] = useState("savings")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  }

  return (
    <section id="dashboard" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-sbi-blue bg-blue-100 rounded-full mb-4">
            Account Dashboard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue">Manage Your Finances</h2>
          <p className="text-lg text-gray-600">
            Get a comprehensive view of your accounts, track your spending, and manage upcoming payments.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="savings" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="bg-transparent h-auto p-0">
                <TabsTrigger
                  value="savings"
                  className={`
                    data-[state=active]:bg-sbi-blue data-[state=active]:text-white 
                    border border-gray-200 rounded-lg py-2 px-4 text-sm font-medium
                    transition-all duration-200 hover:border-sbi-blue mr-2
                    ${activeTab === "savings" ? "shadow-md" : "bg-white text-gray-700"}
                  `}
                >
                  Savings Account
                </TabsTrigger>
                <TabsTrigger
                  value="current"
                  className={`
                    data-[state=active]:bg-sbi-blue data-[state=active]:text-white 
                    border border-gray-200 rounded-lg py-2 px-4 text-sm font-medium
                    transition-all duration-200 hover:border-sbi-blue
                    ${activeTab === "current" ? "shadow-md" : "bg-white text-gray-700"}
                  `}
                >
                  Current Account
                </TabsTrigger>
              </TabsList>

              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>

            <TabsContent value="savings" className="mt-0">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-navy-blue">Savings Account</CardTitle>
                        <CardDescription>Account Number: {accountData.savingsAccount.accountNumber}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Available Balance</p>
                        <p className="text-3xl font-bold text-navy-blue">
                          {formatCurrency(accountData.savingsAccount.availableBalance)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-sbi-blue hover:bg-sbi-blue-dark text-white">Transfer Money</Button>
                        <Button variant="outline" className="border-sbi-blue text-sbi-blue hover:bg-blue-50">
                          Pay Bills
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-navy-blue">Recent Transactions</h4>
                        <Button variant="link" className="text-sbi-blue p-0 h-auto">
                          View All <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {accountData.savingsAccount.transactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"}`}
                              >
                                {transaction.type === "credit" ? (
                                  <ArrowDownLeft
                                    className={`h-4 w-4 ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                                  />
                                ) : (
                                  <ArrowUpRight
                                    className={`h-4 w-4 ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{transaction.description}</p>
                                <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                              </div>
                            </div>
                            <p
                              className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                            >
                              {transaction.type === "credit" ? "+" : "-"} {formatCurrency(transaction.amount)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-navy-blue">Upcoming Payments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {upcomingPayments.map((payment) => (
                        <div key={payment.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{payment.description}</p>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due on {formatDate(payment.dueDate)}
                            </div>
                          </div>
                          <Badge variant="outline" className="font-medium">
                            {formatCurrency(payment.amount)}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="text-sbi-blue p-0 h-auto w-full text-center">
                        View All Payments
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-navy-blue">Spending Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {spendingCategories.map((category, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-sm text-gray-700">{category.category}</p>
                            <p className="text-sm font-medium">{formatCurrency(category.amount)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress value={category.percentage} className="h-2" indicatorClassName={category.color} />
                            <span className="text-xs text-gray-500">{category.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-navy-blue">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 border-dashed"
                      >
                        <CreditCard className="h-6 w-6 mb-2 text-sbi-blue" />
                        <span className="text-sm">Apply for Card</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 border-dashed"
                      >
                        <Wallet className="h-6 w-6 mb-2 text-sbi-blue" />
                        <span className="text-sm">Open FD</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 border-dashed"
                      >
                        <TrendingUp className="h-6 w-6 mb-2 text-sbi-blue" />
                        <span className="text-sm">Invest Now</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-24 border-dashed"
                      >
                        <Bell className="h-6 w-6 mb-2 text-sbi-blue" />
                        <span className="text-sm">Set Alerts</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <CardHeader>
                    <CardTitle>Personalized Offers</CardTitle>
                    <CardDescription className="text-blue-100">Based on your banking relationship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-medium mb-2">Pre-approved Personal Loan</h4>
                        <p className="text-sm text-blue-100 mb-3">
                          Up to ₹5,00,000 at special interest rate of 10.25% p.a.
                        </p>
                        <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                          Apply Now
                        </Button>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <h4 className="font-medium mb-2">Credit Card Upgrade</h4>
                        <p className="text-sm text-blue-100 mb-3">
                          Upgrade to SBI Platinum Credit Card with 2X reward points
                        </p>
                        <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                          Check Eligibility
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="current" className="mt-0">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-navy-blue">Current Account</CardTitle>
                        <CardDescription>Account Number: {accountData.currentAccount.accountNumber}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Available Balance</p>
                        <p className="text-3xl font-bold text-navy-blue">
                          {formatCurrency(accountData.currentAccount.availableBalance)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-sbi-blue hover:bg-sbi-blue-dark text-white">Transfer Money</Button>
                        <Button variant="outline" className="border-sbi-blue text-sbi-blue hover:bg-blue-50">
                          Pay Bills
                        </Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-navy-blue">Recent Transactions</h4>
                        <Button variant="link" className="text-sbi-blue p-0 h-auto">
                          View All <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        {accountData.currentAccount.transactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"}`}
                              >
                                {transaction.type === "credit" ? (
                                  <ArrowDownLeft
                                    className={`h-4 w-4 ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                                  />
                                ) : (
                                  <ArrowUpRight
                                    className={`h-4 w-4 ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                                  />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{transaction.description}</p>
                                <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                              </div>
                            </div>
                            <p
                              className={`font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                            >
                              {transaction.type === "credit" ? "+" : "-"} {formatCurrency(transaction.amount)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-navy-blue">Business Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Monthly Cash Flow</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold text-navy-blue">₹99,250</p>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">+12.5%</Badge>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Pending Receivables</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold text-navy-blue">₹45,000</p>
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            3 Invoices
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-1">Upcoming Payments</p>
                        <div className="flex items-center gap-2">
                          <p className="text-xl font-bold text-navy-blue">₹32,500</p>
                          <Badge variant="outline" className="text-red-600 border-red-200">
                            Due in 5 days
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="link" className="text-sbi-blue p-0 h-auto w-full text-center">
                        View Business Analytics
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-navy-blue">Quick Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <TrendingUp className="h-4 w-4 mr-2 text-sbi-blue" />
                          Generate Statement
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <CreditCard className="h-4 w-4 mr-2 text-sbi-blue" />
                          Manage Business Cards
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Wallet className="h-4 w-4 mr-2 text-sbi-blue" />
                          Apply for Business Loan
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

