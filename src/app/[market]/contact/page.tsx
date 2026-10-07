"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMarketConfig } from "@/core/data";

const MARKET_EMAILS: Record<string, string> = {
  ng: "hello.ng@branda.com.ng",
  us: "hello.us@branda.com",
  uk: "hello.uk@branda.com",
  ca: "hello.ca@branda.com",
};

const MARKET_NAMES: Record<string, string> = {
  ng: "Nigeria",
  us: "United States",
  uk: "United Kingdom",
  ca: "Canada",
};

const SUPPORT_HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 8:00 PM (Local)" },
  { day: "Saturday", time: "9:00 AM – 5:00 PM (Local)" },
  { day: "Sunday", time: "Closed (Emergency only)" },
];

const OFFICE_LOCATIONS = [
  {
    city: "Lagos",
    address: "123 Victoria Island, Lagos, Nigeria",
    phone: "+234 1 234 5678",
  },
  {
    city: "Abuja",
    address: "45 Wuse District, Abuja, Nigeria",
    phone: "+234 9 876 5432",
  },
  {
    city: "London",
    address: "15-17 Great Portland St, London W1W 6PA, UK",
    phone: "+44 20 7946 0958",
  },
];

export default function ContactPage() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] || "ng";
  const config = getMarketConfig(segment);
  const marketName = MARKET_NAMES[segment] ?? config.country;
  const supportEmail = MARKET_EMAILS[segment] ?? MARKET_EMAILS.ng;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    marketContext: "",
    projectRequirements: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
            <svg
              className="h-12 w-12 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2l4-4m5.616-4.998L12.74 19.48a2.106 2.106 0 01-1.47.711l-3.7.496a.75.75 0 01-.91-.56l-2.18-7.94a2.106 2.106 0 01-.13-.93V7a2.25 2.25 0 012.25-2.25H9a2.25 2.25 0 012.107 1.593L12 8.75l.373 1.277a.75.75 0 01-.373 1.0L9 12.75l-3.586 3.777a.117.117 0 01-.154.012L4.343 16.38a.75.75 0 01 .13-1.098L11.35 11.39a2.25 2.25 0 01 1.55-.607h.79l2.92-2.92a2.25 2.25 0 01 3.182 0l.76 1.567a.75.75 0 01-.316 1.013l-3.77 1.374a.75.75 0 01-1.013-.317l-.33-1.158a.75.75 0 00-.714-.545h-.925a.75.75 0 00-.546 1.263l3.77 1.374a.75.75 0 01-.316 1.013l-.76 1.567a.75.75 0 01-1.013-.315l-.33-1.158a.75.75 0 00-.714-.545z"
              />
            </svg>
          </div
          >
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
            Request Submitted Successfully
          </h1>
          <p className="text-slate-600 mb-8">
            Thank you for reaching out. Our {marketName} team will contact you
            within 24 hours at{" "}
            <span className="font-semibold text-slate-900">
              {supportEmail}
            </span>{" "}
            to schedule your free consultation.
          </p>
          <Link
            href={`/${segment}`}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Back to Branda {marketName}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Company Info */}
          <div className="space-y-10">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
                Let&apos;s build your brand together.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you&apos;re launching a startup in {marketName} or
                scaling operations across West Africa, our integrated branding
                ecosystem eliminates procurement stress and delivers
                end-to-end solutions under one roof.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-sm font-medium text-slate-900">
                Office Locations
              </h2>
              <div className="space-y-4">
                {OFFICE_LOCATIONS.map((loc) => (
                  <div
                    key={loc.city}
                    className="border-l-2 border-emerald-200 pl-4"
                  >
                    <h3 className="text-sm font-semibold text-slate-900">
                      {loc.city}
                    </h3>
                    <p className="text-sm text-slate-600">{loc.address}</p>
                    <p className="text-sm text-slate-600">{loc.phone}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-sm font-medium text-slate-900">
                Customer Support Promise
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We provide 24/7 email support and operate a dedicated
                {` ${marketName}`} help desk powered by our{" "}
                <span className="font-semibold text-emerald-700">
                  StudioCare
                </span>{" "}
                system. Every inquiry receives a response within 2 business
                hours. For urgent matters, our on-call design team is
                available for emergency consultations.
              </p>
              <div className="space-y-3">
                {SUPPORT_HOURS.map((s) => (
                  <div
                    key={s.day}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-slate-600">{s.day}</span>
                    <span className="font-medium text-slate-900">
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <span className="text-sm text-slate-500">Email:</span>{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {supportEmail}
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Operational Help Desk Notice: Open 24/7 for emergencies
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Request a Free 30-Minute Consultation
              </h2>
              <p className="text-sm text-slate-600">
                Fill the form below and our {marketName} specialist will
                reach out within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                />
              </div>

              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Acme Corp"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                />
              </div>

              <div>
                <label
                  htmlFor="marketContext"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Market Context
                </label>
                <input
                  type="text"
                  id="marketContext"
                  name="marketContext"
                  value={formData.marketContext}
                  onChange={handleInputChange}
                  placeholder="e.g. Expanding to Nigeria from US"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                />
              </div>

              <div>
                <label
                  htmlFor="projectRequirements"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Project Requirements *
                </label>
                <textarea
                  id="projectRequirements"
                  name="projectRequirements"
                  required
                  rows={5}
                  value={formData.projectRequirements}
                  onChange={handleInputChange}
                  placeholder="Describe your project scope, timeline, and budget..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50 resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white rounded-xl py-3.5 font-semibold hover:bg-emerald-600 transition-colors shadow-lg"
              >
                Submit Request
              </button>

              <p className="text-xs text-slate-500">
                By submitting, you agree to our privacy policy. We respect your
                data and will never share your information.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
