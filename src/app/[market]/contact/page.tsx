"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { getMarketConfig } from "@/core/data";

const MARKET_OPTIONS = [
  { code: "ng", label: "Nigeria" },
  { code: "us", label: "United States" },
  { code: "uk", label: "United Kingdom" },
  { code: "ca", label: "Canada" },
];

export default function ContactPage() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] || "ng";
  const config = getMarketConfig(segment);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    corporateEmail: "",
    phoneNumber: "",
    targetMarket: "",
    projectScope: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
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
                d="M9 12l2 2l4-4m5.616-4.998L12.74 19.48a2.106 2.106 0 01-1.47.711l-3.7.496a.75.75 0 01-.91-.56l-2.18-7.94a2.106 2.106 0 01-.13-.93V7a2.25 2.25 0 012.25-2.25H9a2.25 2.25 0 012.107 1.593L12 8.75l.373 1.277a.75.75 0 01-.373 1.0L9 12.75l-3.586 3.777a.117.117 0 01-.154.012L4.343 16.38a.75.75 0 01 .13-1.098L11.35 11.39a2.25 2.25 0 01 1.55-.607h.79l2.92-2.92a2.25 2.25 0 01 3.182 0l.76 1.567a.75.75 0 01-.316 1.013l-3.77 1.374a.75.75 0 01-1.013-.317l-.33-1.158a.75.75 0 00-.714-.545z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Thank You!
          </h2>
          <p className="text-slate-600 mb-6">
            Your consultation request has been received. Our {config.country}
            team will contact you within 2 business hours to schedule your
            free 30-minute consultation.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5 md:gap-12">
          {/* Left Column: Company Touchpoints (spans 2 columns) */}
          <div className="md:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Communication is everything, we are always open to chat.
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Reach out to us anytime and our team will be happy to assist
                with your branding needs.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-1">
                  Physical Address
                </h3>
                <p className="text-sm text-slate-600">
                  Maplewood Estate, Lagos, Nigeria
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-900 mb-1">
                  Operational Hours
                </h3>
                <p className="text-sm text-slate-600">
                  Mon - Fri: 09:00 - 18:00 | Sat: 11:30 - 16:30
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50/30 border border-emerald-100 p-6">
              <p className="text-sm text-slate-700 italic leading-relaxed">
                Our proactive end-to-end solution manages every single detail
                of your project execution, ensuring cross-channel consistency.
              </p>
            </div>
          </div>

          {/* Right Column: Action Form (spans 3 columns) */}
          <div className="md:col-span-3">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Request Free 30mins Consultation
              </h2>
              <p className="text-sm text-slate-600 mb-8">
                Fill the form below and our specialist will contact you
                within 24 hours to schedule your free consultation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
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
                      htmlFor="corporateEmail"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      id="corporateEmail"
                      name="corporateEmail"
                      required
                      value={formData.corporateEmail}
                      onChange={handleInputChange}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+234 800 000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="targetMarket"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Target Market *
                    </label>
                    <select
                      id="targetMarket"
                      name="targetMarket"
                      required
                      value={formData.targetMarket}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50"
                    >
                      <option value="">Select Market</option>
                      {MARKET_OPTIONS.map((m) => (
                        <option key={m.code} value={m.code}>
                          {m.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectScope"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Project Scope Specifications *
                  </label>
                  <textarea
                    id="projectScope"
                    name="projectScope"
                    required
                    rows={5}
                    value={formData.projectScope}
                    onChange={handleInputChange}
                    placeholder="Describe your project scope, timeline, and budget considerations..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all bg-slate-50/50 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Schedule Consultation
                </button>

                <p className="text-xs text-slate-500">
                  By submitting, you agree to our privacy policy. We respect
                  your data and will never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
