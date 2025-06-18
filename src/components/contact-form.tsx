"use client";

import { useState } from "react";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setEmail("");
    setIsLoading(false);
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
        className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-300 transition-all"
      />
      <button
        type="submit"
        className={`btn-primary px-8 py-4 rounded-xl font-semibold text-white shadow-lg border-0 ${
          isLoading ? "loading-pulse" : ""
        }`}
        disabled={isLoading || isSubmitted}
      >
        {isSubmitted ? "Thanks!" : isLoading ? "Submitting..." : "Join Waitlist"}
      </button>
    </form>
  );
} 