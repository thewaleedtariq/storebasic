"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface CartItem {
    id: number
    name: string
    size: string
    actualPrice: number
    discountPrice: number
    quantity: number
    image: string
}

interface CheckoutData {
    items: CartItem[]
    selectedCity: string
    subtotal: number
}

export default function CheckoutPage() {
    const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [orderConfirmed, setOrderConfirmed] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    // Form states
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        paymentMethod: "cod",
    })

    useEffect(() => {
        const savedCheckoutData = sessionStorage.getItem("checkoutData")
        if (savedCheckoutData) {
            const data = JSON.parse(savedCheckoutData)
            setCheckoutData(data)
            setFormData((prev) => ({ ...prev, city: data.selectedCity }))
        }
        setIsLoading(false)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleCompleteOrder = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)

        // Simulate order processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Clear cart and checkout data
        sessionStorage.removeItem("cart")
        sessionStorage.removeItem("checkoutData")
        localStorage.removeItem("cart")

        setOrderConfirmed(true)
        setIsProcessing(false)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading checkout...</p>
                </div>
            </div>
        )
    }

    if (!checkoutData) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-medium text-gray-900 mb-4">No checkout data found</h2>
                    <Link href="/cart" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
                        Return to Cart
                    </Link>
                </div>
            </div>
        )
    }

    if (orderConfirmed) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-6">Thank you for your order. We&apos;ll send you a confirmation email shortly.</p>
                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="block w-full bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const shippingCost = 200
    const total = checkoutData.subtotal + shippingCost

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <nav className="text-sm text-gray-600 mb-4">
                        <Link href="/" className="hover:text-gray-900">
                            HOME
                        </Link>
                        <span className="mx-2">›</span>
                        <Link href="/cart" className="hover:text-gray-900">
                            CART
                        </Link>
                        <span className="mx-2">›</span>
                        <span className="text-gray-900 font-medium">CHECKOUT</span>
                    </nav>
                    <h1 className="text-2xl font-medium text-gray-900">Checkout</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Checkout Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <form onSubmit={handleCompleteOrder} className="space-y-6">
                            {/* Contact Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                            <select
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="">Select City</option>
                                                <option value="karachi">Karachi</option>
                                                <option value="lahore">Lahore</option>
                                                <option value="islamabad">Islamabad</option>
                                                <option value="rawalpindi">Rawalpindi</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === "cod"}
                                            onChange={handleInputChange}
                                            className="mr-3"
                                        />
                                        <span className="text-sm text-gray-700">Cash on Delivery</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="baadmay"
                                            checked={formData.paymentMethod === "baadmay"}
                                            onChange={handleInputChange}
                                            className="mr-3"
                                        />
                                        <span className="text-sm text-gray-700">Baadmay (Pay in 3 installments)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Complete Order Button */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-orange-400 text-white py-3 px-6 rounded-md font-medium hover:bg-orange-500 transition-colors disabled:opacity-50"
                            >
                                {isProcessing ? "PROCESSING ORDER..." : "COMPLETE ORDER"}
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>

                        {/* Order Items */}
                        <div className="space-y-4 mb-6">
                            {checkoutData.items.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 overflow-hidden rounded">
                                        <Image
                                            src={item.image || "/placeholder.svg"}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                                        <p className="text-sm text-gray-600">Size: {item.size}</p>
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">
                                        Rs. {(item.discountPrice * item.quantity).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Totals */}
                        <div className="border-t border-gray-200 pt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-gray-900">Rs. {checkoutData.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="text-gray-900">Rs. {shippingCost.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-base font-medium border-t border-gray-200 pt-2">
                                <span className="text-gray-900">Total</span>
                                <span className="text-gray-900">Rs. {total.toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Baadmay Payment Info */}
                        {formData.paymentMethod === "baadmay" && (
                            <div className="mt-4 bg-purple-50 p-3 rounded-md">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-bold bg-purple-600 text-white px-2 py-1 text-xs rounded">baadmay</span>
                                </div>
                                <div className="text-sm text-purple-700">
                                    Pay in 3 installments of Rs. {Math.round(total / 3).toLocaleString()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
