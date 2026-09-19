"use client";
import { useState } from "react";
import { siteConfig } from "@/config/site";

/**
 * Marketing contact form.
 *
 * There is no backend endpoint for this form yet, so submission opens the
 * visitor's mail client with a pre-filled message instead of pretending a
 * ticket was created. Field names stay stable for analytics and autofill.
 */
export function ContactForm({ kind = "general" }: { kind?: string }) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="success-box">
        <strong>Thanks. Your email draft is ready.</strong>
        <p>
          Your mail client should have opened with a pre-filled message to {siteConfig.email}. If it did not, send
          your note directly and mention “{kind} request”.
        </p>
      </div>
    );
  }
  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = String(data.get("name") ?? "");
        const email = String(data.get("email") ?? "");
        const message = String(data.get("message") ?? "");
        const subject = encodeURIComponent(`PesaGuard ${kind} request from ${name || "website visitor"}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nKind: ${kind}\n\n${message}`);
        window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
        setSent(true);
      }}
    >
      <label>
        Name
        <input required name="name" autoComplete="name" />
      </label>
      <label>
        Work email
        <input required type="email" name="email" autoComplete="email" />
      </label>
      <label>
        How can we help?
        <textarea required name="message" rows={5} />
      </label>
      <button className="button button-primary" type="submit">
        Send {kind} request
      </button>
      <p className="form-note">Opens your email client addressed to {siteConfig.email}. No account or ticket is created on this site.</p>
    </form>
  );
}
