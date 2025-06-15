import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 text-black text-sm font-questrial mt-10">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div className="space-y-2">
                    <h6 className="font-bold">MY ACCOUNT</h6>
                    <ul className="space-y-1">
                        <li>ORDER TRACKING</li>
                        <li>ABOUT US</li>
                        <li>CONTACT US</li>
                        <li>STORE LOCATOR</li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h6 className="font-bold">FAQS</h6>
                    <ul className="space-y-1">
                        <li>PRIVACY</li>
                        <li>TERMS & CONDITIONS</li>
                        <li>
                            <a
                                href="#"
                                className="text-[#000000] underline hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                            >
                                RETURN & EXCHANGE POLICY
                            </a>
                        </li>
                        <li>BAADMAY</li>
                    </ul>
                </div>

                <div className="space-y-2 text-sm">
                    <p>
                        <span className="font-semibold">Email:</span>{" "}
                        <a href="mailto:customercare@mocciani.com.pk" className="underline">
                            customercare@mocciani.com.pk
                        </a>
                    </p>
                    <p>
                        <span className="font-semibold">WhatsApp Chat:</span>{" "}
                        <a href="https://wa.me/923451111127" className="underline">
                            +92-345-111-11-27
                        </a>
                    </p>
                    <p>
                        <span className="font-semibold">Call : UAN</span>{" "}
                        <a href="tel:+9242111000110" className="underline">
                            +92 42 111 000 110
                        </a>
                    </p>
                    <p className="mt-2 font-semibold">Customer services timing</p>
                    <p>Monday to Saturday</p>
                    <p>09:30 am till 5:30 pm</p>

                    <p className="mt-2 font-semibold">Response Time:</p>
                    <p>24 Working Hours (excluding holidays)</p>
                </div>

                <div className="space-y-3">
                    <p>Subscribe to our Newsletter for Exclusive Updates!</p>
                    <form className="flex space-x-2">
                        <input
                            type="email"
                            placeholder="your-email@example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-[#f26c4f] text-white px-4 py-2 rounded"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </div>

            <div className="text-center py-4 text-xs text-gray-600 border-t border-gray-200 mt-6">
                © MOCCIANI 2025
            </div>
        </footer>
    );
};

export default Footer;
