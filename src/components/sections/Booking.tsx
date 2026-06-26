"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useI18n } from "@/i18n/useI18n";
import { submitForm } from "@/lib/formSubmit";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Booking() {
  const { t } = useI18n();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    whatsapp: "",
    email: "",
    service_type: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsapp.trim()) return;

    setStatus("loading");
    try {
      const result = await submitForm(
        { ...formData, from_name_field: formData.name },
        `Hire Me Inquiry - ${formData.name}`
      );

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          whatsapp: "",
          email: "",
          service_type: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full border border-neutral-300 rounded-lg p-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors";
  const labelClasses = "block text-sm font-medium text-neutral-700 mb-1";

  return (
    <section id="booking" className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 text-center">
            {t("booking.title")}
          </h2>
          <p className="mt-3 text-neutral-600 text-center">{t("booking.subtitle")}</p>

          {status === "success" && (
            <div className="mt-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
              {t("booking.success")}
            </div>
          )}
          {status === "error" && (
            <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
              {t("booking.error")}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="booking-name" className={labelClasses}>
                  {t("booking.name")} <span className="text-red-500">*</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder={t("booking.name")}
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="booking-wa" className={labelClasses}>
                  {t("booking.whatsapp")} <span className="text-red-500">*</span>
                </label>
                <input
                  id="booking-wa"
                  type="tel"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="booking-email" className={labelClasses}>
                  {t("booking.email")}
                </label>
                <input
                  id="booking-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="email@example.com"
                />
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="booking-service-type" className={labelClasses}>
                  {t("booking.serviceType")}
                </label>
                <select
                  id="booking-service-type"
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="">{t("booking.serviceType")}</option>
                  <option value="social_media">{t("booking.serviceType.socialMedia")}</option>
                  <option value="content_creation">{t("booking.serviceType.contentCreation")}</option>
                  <option value="meta_ads">{t("booking.serviceType.metaAds")}</option>
                  <option value="consultation">{t("booking.serviceType.consultation")}</option>
                  <option value="other">{t("booking.serviceType.other")}</option>
                </select>
              </div>

              {/* Project Details / Message - full width */}
              <div className="md:col-span-2">
                <label htmlFor="booking-notes" className={labelClasses}>
                  {t("booking.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="booking-notes"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder={t("booking.message")}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-8 py-3 font-semibold text-white shadow-soft hover:bg-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? t("buttons.loading") : t("booking.submit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
