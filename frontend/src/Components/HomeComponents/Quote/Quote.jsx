import React from "react";
import { motion } from "framer-motion";
import "./Quote.css";

function Quote() {
    return (
        <div className="dtc-quote-section">
            <motion.div
                className="quote-container"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <motion.p
                    className="quote-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    — Ready to Begin —
                </motion.p>

                <motion.h2
                    className="quote-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    Let's Build the Future Together
                </motion.h2>

                <motion.p
                    className="quote-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    viewport={{ once: true }}
                >
                    We design scalable, high-performance digital solutions that help
                    businesses grow faster in the modern era. Your vision, our expertise.
                </motion.p>

                <motion.button
                    className="quote-btn"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                >
                    Get Free Consultation →
                </motion.button>
            </motion.div>
        </div>
    );
}

export default Quote;