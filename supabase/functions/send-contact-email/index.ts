import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

// Simple in-memory rate limiting (resets on function restart)
const rateLimitMap = new Map<string, number[]>();

const isRateLimited = (identifier: string, maxRequests: number = 3, windowMinutes: number = 60): boolean => {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];
  
  // Filter out timestamps outside the window
  const recentTimestamps = timestamps.filter(
    timestamp => now - timestamp < windowMinutes * 60 * 1000
  );
  
  if (recentTimestamps.length >= maxRequests) {
    return true;
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(identifier, recentTimestamps);
  return false;
};

// Validate and sanitize input
const validateInput = (data: ContactEmailRequest): { valid: boolean; error?: string } => {
  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    return { valid: false, error: "Name is required" };
  }
  const trimmedName = data.name.trim();
  if (trimmedName.length === 0 || trimmedName.length > 100) {
    return { valid: false, error: "Name must be between 1 and 100 characters" };
  }
  if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
    return { valid: false, error: "Name can only contain letters and spaces" };
  }

  // Email validation
  if (!data.email || typeof data.email !== 'string') {
    return { valid: false, error: "Email is required" };
  }
  const trimmedEmail = data.email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 255) {
    return { valid: false, error: "Invalid email address" };
  }

  // Message validation
  if (!data.message || typeof data.message !== 'string') {
    return { valid: false, error: "Message is required" };
  }
  const trimmedMessage = data.message.trim();
  if (trimmedMessage.length < 10 || trimmedMessage.length > 1000) {
    return { valid: false, error: "Message must be between 10 and 1000 characters" };
  }

  return { valid: true };
};

// Escape HTML to prevent XSS
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactEmailRequest = await req.json();

    // Validate input
    const validation = validateInput(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs
    const name = escapeHtml(data.name.trim());
    const email = data.email.trim().toLowerCase();
    const message = escapeHtml(data.message.trim());

    // Rate limiting by email
    if (isRateLimited(email, 3, 60)) {
      console.warn(`Rate limit exceeded for email: ${email}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Processing validated contact form:", { name, email });

    // Send email to Prabhakar
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["prabhakartiwari0209@gmail.com"],
      replyTo: email,
      subject: `New Contact from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Email sent successfully");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
