import React from "react";
import "./CTA.css";

const CTA = () => {
    return (
        <section className="cta-section container">
            <div className="cta-container">
                <h2>Talk to an Expert</h2>
                <p>
                    Ready to scale your business with custom enterprise solutions?
                    Leave your email and we'll reach out within 24 hours to schedule a strategy call.
                </p>

                <div className="cta-form">
                    <input
                        type="email"
                        placeholder="Enter your work email"
                    />
                    <button>Get Started</button>
                </div>
            </div>
        </section>
    );
};

export default CTA;