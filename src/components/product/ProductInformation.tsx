'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const informationSections = [
    {
        title: 'Shipping & Return Policy',
        content: 'The estimated delivery time for local order is 2-3 working days.'
    },
    {
        title: 'Exchange & Return Policy',
        content: '• There will be no exchange/refund on discounted products.\n• Any defect in product can be claimed on presentation of original receipt within 4 days of receiving the order.\n• For more details on refund/claims you can check our Refund Policy'
    },
    {
        title: 'Disclaimer',
        content: 'Actual color of the product may slightly vary from the colors being displayed on your device.'
    }
];

export default function ProductInformation() {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(prev => (prev === section ? null : section));
    };

    return (
        <div className="divide-y divide-gray-200 pt-8">
            {informationSections.map((section, idx) => (
                <div key={idx} className="py-4">
                    <button
                        onClick={() => toggleSection(section.title)}
                        className="flex justify-between items-center w-full text-left text-sm font-medium text-gray-900 hover:text-gray-600"
                    >
                        <span>{section.title}</span>
                        <span className="text-lg">
                            {openSection === section.title ? '-' : '+'}
                        </span>
                    </button>
                    <AnimatePresence>
                        {openSection === section.title && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-sm text-gray-600 mt-3 overflow-hidden"
                            >
                                {section.content.split('\n').map((line, i) => (
                                    <p key={i} className="mb-1">{line}</p>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
