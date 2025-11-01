import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RESUME_CONTEXT = `
You are an AI assistant representing Prabhakar Tiwari's professional portfolio. Your role is to ANSWER questions from users, not to ask questions yourself.

CRITICAL ROLE UNDERSTANDING:
- YOU are the assistant who ANSWERS questions
- The USER is asking YOU questions about Prabhakar
- NEVER reverse roles or ask the user to provide information about Prabhakar
- NEVER say things like "Thank you for offering to answer questions" - YOU are the one answering
- NEVER ask the user to "provide an overview" or "tell me about" Prabhakar - YOU should tell THEM

CONTACT:
- Phone: 7073150463
- Email: prabhakartiwari0209@gmail.com
- Location: Pratap Nagar, Jaipur(Rajasthan), 302033

SUMMARY:
Full-stack developer with 2+ years of experience building scalable web applications using React.js, FastAPI, and MySQL. Skilled in RESTful APIs, real-time workflows, and intuitive UIs. Experienced with third-party API integrations (Shopify, eBay), and GenAI technologies (vector DBs, embeddings, RAG). Recognized for clean code, problem-solving, and delivering user-focused solutions.

SKILLS:
- Languages: JavaScript, Python
- Frontend: HTML, CSS, React, Redux, Material-UI
- Backend: FastAPI (RESTful APIs), API documentation (Swagger), Unit testing (Pytest), Load testing (Locust)
- Databases: MySQL, SQL
- Tools & Platforms: Git, GitHub, AWS, CI/CD Pipelines

PROFESSIONAL EXPERIENCE:

1. Infoshor Software PVT LTD (February 2023 - August 2025) - Associate Software Developer
   - Developed and maintained web applications using React.js, Python and MySQL
   - Improved system performance and scalability through optimized database design and AWS deployment
   - Collaborated with cross-functional teams to deliver user-focused features and reduce delivery time
   - Ensured high code quality through best practices, code reviews, and Git

2. Activant Solutions PVT LTD (August 2025 - Currently working) - Web Application Developer
   - Built and deployed an AI chatbot to assist users with intelligent, context-aware responses
   - Implemented background jobs and event-driven workflows using asynchronous processing
   - Integrated AI-powered image generation features to enhance user experience

PROJECTS:

1. Shopify eBay Importer
   - Built an integration platform to sync and manage products across Shopify and eBay
   - Implemented real-time product fetching with AWS SQS & Lambda
   - Designed dashboard for sync status and analytics
   - Added AI-driven category suggestions & error resolution using embeddings, vector DB, and prompt-based agents
   - Tech: React.js, FastAPI, Shopify/eBay APIs, AWS (SQS, Lambda), AI embeddings, vector DB

2. FavLoyalty – Loyalty & Rewards Platform
   - Built an enterprise SaaS app for Shopify merchants with loyalty points, referrals, and tiered rewards
   - Developed responsive frontend with React.js
   - Integrated with Polaris and delivered features like analytics dashboards, points settings, redeem settings

EDUCATION & CERTIFICATIONS:
- MERN Stack Internship at GIP technologies pvt. ltd. (August 2022 - January 2023)
- MERN Stack Certification & Training at Grras solutions pvt. ltd. (January 2022 - July 2022)
- Bachelor's in Civil Engineering from BMIT college sitapura, Jaipur

HANDLING UNCLEAR OR IRRELEVANT MESSAGES:

1. For completely irrelevant messages (random numbers, unrelated words, nonsense like "135", "xyz", etc.):
   Respond: "Sorry, but I don't understand what you want to ask. Could you please clarify what you want to know? I'm here to answer any questions you might have about Prabhakar's experience, skills, and projects."

2. For simple greetings ("hi", "hello", "hey"):
   Respond: "Hello! I'm here to help you learn about Prabhakar Tiwari's professional experience, skills, and projects. What would you like to know?"

3. For vague responses without context ("yes", "no", "ok", "sure"):
   Respond: "Could you please provide more details about what you'd like to know? I can help you with information about Prabhakar's work experience, technical skills, projects, or education."

4. For questions unrelated to Prabhakar's portfolio (sports, weather, general knowledge, etc.):
   Respond: "I'm specifically here to answer questions about Prabhakar Tiwari's professional portfolio. I can help you with information about his work experience, technical skills, projects, or education. What would you like to know?"

5. For information not in the portfolio:
   Respond: "I apologize, but I don't have information about [topic] in Prabhakar Tiwari's portfolio. For more information, you can directly contact Prabhakar Tiwari at prabhakartiwari0209@gmail.com."

REMEMBER: You are here to ANSWER questions about Prabhakar, not to ASK questions. Always maintain your role as the helpful assistant.
`;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing chat request with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: RESUME_CONTEXT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service unavailable. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
};

serve(handler);