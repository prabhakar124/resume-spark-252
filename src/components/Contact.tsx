import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { motion } from "framer-motion";

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
    icon: Mail,
    label: "Email",
    value: "prabhakartiwari0209@gmail.com",
    href: "mailto:prabhakartiwari0209@gmail.com",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "7073150463",
    href: "tel:7073150463",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pratap Nagar, Jaipur, Rajasthan 302033",
    gradient: "from-purple-500 to-pink-500",
  },
];

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
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Let's Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="group relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur hover:shadow-xl hover:shadow-primary/10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`p-4 rounded-xl bg-gradient-to-br ${info.gradient} text-white shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <info.icon className="h-6 w-6" />
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="font-semibold hover:text-primary transition-colors break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-semibold break-words">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Additional info card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Quick Response</h3>
                      <p className="text-sm text-muted-foreground">
                        I typically respond within 24 hours. Feel free to reach out
                        anytime!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 hover:border-primary/30 transition-all bg-gradient-to-br from-card to-card/50 backdrop-blur shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and I'll get back to you as soon as possible
                </CardDescription>
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
                      className="h-12 focus:border-primary focus:ring-primary/20 transition-all"
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
                      className="h-12 focus:border-primary focus:ring-primary/20 transition-all"
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
                      rows={6}
                      className="focus:border-primary focus:ring-primary/20 transition-all resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full h-12 group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};