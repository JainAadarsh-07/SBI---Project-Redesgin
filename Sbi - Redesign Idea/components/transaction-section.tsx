"use client"

import { useState, useRef } from "react"
import { useInView } from "framer-motion"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  ShoppingBag,
  Coffee,
  Utensils,
  Search,
  Download,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  {
    id: "TX123456",
    date: "2023-03-15",
    description: "Salary Credit",
    amount: 58000,
    type: "credit",
    category: "income",
    icon: <ArrowDownLeft className="h-4 w-4 text-green-500" />,
  },
  {
    id: "TX123457",
    date: "2023-03-16",
    description: "Amazon.in",
    amount: 2499,
    type: "debit",
    category: "shopping",
    icon: <ShoppingBag className="h-4 w-4 text-red-500" />,
  },
  {
    id: "TX123458",
    date: "2023-03-18",
    description: "Starbucks Coffee",
    amount: 450,
    type: "debit",
    category: "food",
    icon: <Coffee className="h-4 w-4 text-red-500" />,
  },
  {
    id: "TX123459",
    date: "2023-03-20",
    description: "Electricity Bill",
    amount: 1850,
    type: "debit",
    category: "utilities",
    icon: <ArrowUpRight className="h-4 w-4 text-red-500" />,
  },
  {
    id: "TX123460",
    date: "2023-03-22",
    description: "Restaurant Payment",
    amount: 1200,
    type: "debit",
    category: "food",
    icon: <Utensils className="h-4 w-4 text-red-500" />,
  },
  {
    id: "TX123461",
    date: "2023-03-25",
    description: "Credit Card Payment",
    amount: 15000,
    type: "debit",
    category: "bills",
    icon: <CreditCard className="h-4 w-4 text-red-500" />,
  },
  {
    id: "TX123462",
    date: "2023-03-28",
    description: "Interest Credit",
    amount: 1250,
    type: "credit",
    category: "income",
    icon: <ArrowDownLeft className="h-4 w-4 text-green-500" />,
  },
]

export default function TransactionSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  }

  return (
    <section id="transactions" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-sbi-blue bg-blue-100 rounded-full mb-4">
            Transaction History
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy-blue">Track Your Finances</h2>
          <p className="text-lg text-gray-600">
            Monitor your financial activities with our comprehensive transaction history and analytics tools.
          </p>
        </div>

        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Transactions</SelectItem>
                    <SelectItem value="credit">Credits Only</SelectItem>
                    <SelectItem value="debit">Debits Only</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">More Filters</span>
                </Button>

                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-full bg-gray-100">{transaction.icon}</div>
                        {transaction.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{transaction.id}</TableCell>
                    <TableCell
                      className={`text-right font-medium ${transaction.type === "credit" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "credit" ? "+" : "-"} ₹{transaction.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}

                {filteredTransactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No transactions found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-6 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Balance</h3>
            <p className="text-2xl font-bold text-navy-blue">₹1,42,650</p>
            <p className="text-sm text-green-600 mt-1">+₹1,250 this month</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-medium text-gray-500 mb-2">Income</h3>
            <p className="text-2xl font-bold text-green-600">₹59,250</p>
            <p className="text-sm text-gray-600 mt-1">This month</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-medium text-gray-500 mb-2">Expenses</h3>
            <p className="text-2xl font-bold text-red-600">₹20,999</p>
            <p className="text-sm text-gray-600 mt-1">This month</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-sm font-medium text-gray-500 mb-2">Savings</h3>
            <p className="text-2xl font-bold text-sbi-blue">₹38,251</p>
            <p className="text-sm text-gray-600 mt-1">This month</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

