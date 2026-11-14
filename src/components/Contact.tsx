import { useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Reveal } from "@/components/Section";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

const contactInfo = [
  {
    label: "Email",
    value: "prabhakartiwari0209@gmail.com",
    href: "mailto:prabhakartiwari0209@gmail.com",
  },
  {
    label: "Phone",
    value: "+91 70731 50463",
    href: "tel:7073150463",
  },
  {
    label: "LinkedIn",
    value: "in/prabhakar-tiwari",
    href: "https://linkedin.com/in/prabhakar-tiwari-619169249/",
  },
  {
    label: "Location",
    value: "Pratap Nagar, Jaipur, Rajasthan 302033",
  },
];

const fieldClass =
  "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-0 transition-colors";

export const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      const lastSubmission = localStorage.getItem("last_contact_submission");
      if (lastSubmission) {
        const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
        const minutesSinceLastSubmission = timeSinceLastSubmission / 1000 / 60;

        if (minutesSinceLastSubmission < 5) {
          toast({
            title: "Rate limit exceeded",
            description: `Please wait ${Math.ceil(5 - minutesSinceLastSubmission)} more minutes before submitting another message.`,
            variant: "destructive",
          });
          setIsSubmitting(false);
          return;
        }
      }

      const { error: dbError } = await supabase
        .from("contacts")
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message,
        }]);

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: validatedData,
        }
      );

      if (emailError) throw emailError;

      localStorage.setItem("last_contact_submission", Date.now().toString());

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-page">
        <Reveal className="border-t border-border pt-6">
          <p className="eyebrow">
            <span className="text-primary">05</span>
            <span className="mx-2">/</span>
            Contact
          </p>
          <h2 className="mt-8 max-w-4xl font-serif text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight">
            Let's build something <em className="text-primary">intelligent</em>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <dl className="divide-y divide-border border-y border-border">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="eyebrow shrink-0">{info.label}</dt>
                  <dd className="min-w-0 text-[15px] sm:text-right">
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-1 break-all transition-colors hover:text-primary"
                      >
                        {info.value}
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{info.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-muted-foreground">
              I typically reply within 24 hours.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow">Name</span>
                  <input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    maxLength={100}
                    required
                    className={fieldClass}
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">Email</span>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    maxLength={255}
                    required
                    className={fieldClass}
                  />
                </label>
              </div>

              <label className="block">
                <span className="eyebrow flex justify-between">
                  <span>Message</span>
                  <span className="normal-case tracking-normal">{formData.message.length}/1000</span>
                </span>
                <textarea
                  placeholder="Tell me about your project or role (min. 10 characters)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={1000}
                  required
                  rows={5}
                  className={`${fieldClass} resize-none`}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex h-12 items-center gap-2 rounded-sm bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
