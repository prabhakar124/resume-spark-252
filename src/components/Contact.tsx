import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

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
      // Validate input data
      const validatedData = contactSchema.parse(formData);

      // Check rate limit (stored in localStorage)
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

      // Save to database
      const { error: dbError } = await supabase
        .from("contacts")
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message,
        }]);

      if (dbError) throw dbError;

      // Send email via edge function
      const { error: emailError } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: validatedData,
        }
      );

      if (emailError) throw emailError;

      // Update rate limit timestamp
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
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 opacity-0 animate-slide-in-left">
            <Card className="card-hover border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <CardDescription className="text-base">Feel free to reach out through any of these channels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-4 group p-3 rounded-lg hover:bg-primary/5 transition-colors">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <a
                    href="mailto:prabhakartiwari0209@gmail.com"
                    className="hover:text-primary transition-colors font-medium"
                  >
                    prabhakartiwari0209@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4 group p-3 rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <a href="tel:7073150463" className="hover:text-accent transition-colors font-medium">
                    7073150463
                  </a>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">Pratap Nagar, Jaipur, Rajasthan 302033</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="card-hover border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur opacity-0 animate-slide-in-right">
            <CardHeader>
              <CardTitle className="text-2xl">Send a Message</CardTitle>
              <CardDescription className="text-base">I'll get back to you as soon as possible</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    maxLength={100}
                    required
                    className="focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    maxLength={255}
                    required
                    className="focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message (minimum 10 characters)"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    maxLength={1000}
                    required
                    rows={5}
                    className="focus:border-primary focus:ring-primary/20 transition-all resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {formData.message.length}/1000 characters
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full group relative overflow-hidden" 
                  disabled={isSubmitting}
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
