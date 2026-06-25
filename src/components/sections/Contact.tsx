"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useI18n } from "@/i18n/useI18n";
import { siteConfig } from "@/config/site";
import { submitForm } from "@/lib/formSubmit";
import { FaWhatsapp } from "react-icons/fa6";
import { FiMail, FiSend } from "react-icons/fi";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage(t("formErrors.nameRequired"));
      return;
    }
    if (!formData.email.trim()) {
      setStatus("error");
      setErrorMessage(t("formErrors.emailRequired"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatus("error");
      setErrorMessage(t("formErrors.emailInvalid"));
      return;
    }
    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage(t("formErrors.messageRequired"));
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    try {
      const result = await submitForm(
        { ...formData, from_name_field: formData.name },
        `Contact Form - ${formData.name}`
      );

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", whatsapp: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(t("contact.error"));
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("contact.error"));
    }
  };

  const inputClasses =
    "w-full border border-neutral-300 rounded-lg p-3 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-colors";
  const labelClasses = "block text-sm font-medium text-neutral-700 mb-1";

  return (
    <section id="contact" className="section-padding bg-neutral-100">
      <div className="container-custom">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-800 text-center">
          {t("contact.title")}
        </h2>
        <p className="mt-3 text-neutral-600 text-center">
          {t("contact.subtitle")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          {/* Quick contact buttons */}
          <div className="flex flex-col gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 w-full justify-center rounded-lg bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-soft hover:bg-[#1da851] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
            >
              <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
              {t("contact.whatsappButton")}
            </a>
            <a
              href={`mailto:${siteConfig.profile.email}`}
              className="inline-flex items-center gap-3 w-full justify-center rounded-lg border border-primary-200 px-6 py-3.5 font-semibold text-primary-800 hover:bg-primary-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50"
            >
              <FiMail className="w-5 h-5" aria-hidden="true" />
              {t("contact.emailButton")}
            </a>
          </div>

          {/* Form */}
          <div>
            {status === "success" && (
              <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
                {t("contact.success")}
              </div>
            )}
            {status === "error" && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
                {errorMessage || t("contact.error")}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className={labelClasses}>
                    {t("contact.name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder={t("contact.name")}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClasses}>
                    {t("contact.email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder={t("contact.email")}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-wa" className={labelClasses}>
                  {t("contact.whatsapp")}
                </label>
                <input
                  id="contact-wa"
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClasses}>
                  {t("contact.message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder={t("contact.message")}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-8 py-3 font-semibold text-white shadow-soft hover:bg-accent-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? t("buttons.loading") : t("contact.submit")}
                <FiSend className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
