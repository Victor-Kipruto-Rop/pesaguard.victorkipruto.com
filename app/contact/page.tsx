import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata(
  "Contact | PesaGuard",
  "Tell us what your team is solving. Sales and support requests open a pre-filled email to the PesaGuard team.",
  "/contact",
);

export default function Contact(){return <section className="section"><div className="container split"><div><p className="eyebrow">Contact PesaGuard</p><h1>Let&apos;s talk about the work behind your payments.</h1><p className="lede">Tell us what your team is solving. We will bring the right conversation.</p></div><ContactForm/></div></section>}
