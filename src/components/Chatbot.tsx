import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const getOrCreateSessionId = () => {
  let sessionId = localStorage.getItem("chat_session_id");
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("chat_session_id", sessionId);
  }
  return sessionId;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(getOrCreateSessionId);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm here to answer questions about Prabhakar's experience, skills, and projects. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [isChatLimitReached, setIsChatLimitReached] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const MAX_QUESTIONS = 15;
  const MAX_WORDS = 200;

  // Check if user is new and show tooltip
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem("chatbot_tooltip_seen");
    if (!hasSeenTooltip) {
      // Show tooltip after a short delay
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 1000);

      // Auto-hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem("chatbot_tooltip_seen", "true");
      }, 6000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem("chatbot_tooltip_seen", "true");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("get-chat-messages", {
          body: { session_id: sessionId },
        });

        if (error) {
          console.error("Error loading messages:", error);
          return;
        }

        if (data?.messages && data.messages.length > 0) {
          const loadedMessages = data.messages.map((msg: any) => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          }));
          setMessages(loadedMessages);
          
          const userQuestions = loadedMessages.filter((msg: Message) => msg.role === "user").length;
          setQuestionCount(userQuestions);
          
          if (userQuestions >= MAX_QUESTIONS) {
            setIsChatLimitReached(true);
          }
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    if (isOpen) {
      loadMessages();
    }
  }, [isOpen, sessionId]);

  const saveMessage = async (message: Message) => {
    await supabase.from("chat_messages").insert({
      session_id: sessionId,
      role: message.role,
      content: message.content,
    });
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isChatLimitReached) return;

    const wordCount = input.trim().split(/\s+/).length;
    if (wordCount > MAX_WORDS) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Please limit your question to ${MAX_WORDS} words or less. Your message has ${wordCount} words.`,
        },
      ]);
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setInput("");
    setMessages((prev) => [...prev, userMessage]);
    await saveMessage(userMessage);
    setIsLoading(true);
    
    const newQuestionCount = questionCount + 1;
    setQuestionCount(newQuestionCount);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-with-resume`;
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok || !response.body) throw new Error("Failed to get response");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      let textBuffer = "";
      let streamDone = false;

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      let finalAssistantMessage = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              finalAssistantMessage = assistantMessage;
              setMessages((prev) => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage.role === "assistant") {
                  lastMessage.content = assistantMessage;
                }
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (finalAssistantMessage) {
        await saveMessage({ role: "assistant", content: finalAssistantMessage });
      }

      if (newQuestionCount >= MAX_QUESTIONS) {
        setIsChatLimitReached(true);
        const limitMessage = "For more information, you can directly contact Prabhakar Tiwari.";
        setMessages((prev) => [...prev, { role: "assistant", content: limitMessage }]);
        await saveMessage({ role: "assistant", content: limitMessage });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <>
          {/* Tooltip for new users */}
          {showTooltip && (
            <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 w-[280px] md:w-[320px] z-50 animate-fade-in-up">
              <div className="relative bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-2xl shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)] p-4">
                {/* Close button */}
                <button
                  onClick={handleCloseTooltip}
                  className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-primary-foreground/20 transition-colors"
                  aria-label="Close tooltip"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Tooltip content */}
                <div className="pr-6">
                  <p className="text-sm leading-relaxed">
                    If you are looking for something specific from this portfolio, ask here!
                  </p>
                </div>

                {/* Arrow pointing to chatbot */}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-accent rotate-45"></div>
              </div>
            </div>
          )}

          {/* Chatbot button */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
            className="group fixed bottom-4 right-4 md:bottom-6 md:right-6 h-12 w-12 md:h-14 md:w-14 rounded-full z-50 flex items-center justify-center bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_8px_30px_-6px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_-6px_hsl(var(--accent)/0.7)] active:scale-95"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-40 animate-ping [animation-duration:2.5s]" />
            <MessageCircle className="relative h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:-rotate-12" />
          </button>
        </>
      )}

      {isOpen && (
        <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] max-w-[400px] h-[calc(100vh-8rem)] max-h-[600px] z-50 flex flex-col overflow-hidden rounded-2xl border-border/50 bg-card/95 backdrop-blur-xl shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.4)] animate-scale-in">
          {/* Gradient top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient-shift_3s_ease_infinite]" />

          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-border/50">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md">
                <MessageCircle className="h-[18px] w-[18px] text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-base md:text-lg gradient-text">Ask About Prabhakar</CardTitle>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  AI Assistant • Online
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-3 py-3 md:px-4 md:py-4">
              <div className="space-y-3 md:space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex animate-message-in ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                     <div
                      className={`max-w-[85%] px-3 py-2 md:px-4 md:py-2.5 shadow-sm ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-2xl rounded-br-md"
                          : "bg-muted/80 text-foreground rounded-2xl rounded-bl-md border border-border/40"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                      ) : (
                        <div className="text-xs md:text-sm leading-relaxed break-words [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:my-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:my-1 [&_p]:my-1 [&_li]:my-0.5">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      )}
                      {msg.role === "assistant" &&
                       msg.content.toLowerCase().includes("contact prabhakar") && (
                        <Button
                          size="sm"
                          className="mt-2 w-full text-xs bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                          onClick={() => window.location.href = "mailto:prabhakartiwari0209@gmail.com"}
                        >
                          Contact via Email
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-message-in">
                    <div className="bg-muted/80 border border-border/40 rounded-2xl rounded-bl-md px-3 py-2 md:px-4 md:py-2.5">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent animate-bounce [animation-delay:0.1s]" />
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent animate-bounce [animation-delay:0.2s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="p-3 md:p-4 border-t border-border/50 bg-background/60 backdrop-blur-sm">
              {isChatLimitReached ? (
                <div className="text-center text-xs md:text-sm text-muted-foreground py-2">
                  Chat limit reached. Please contact Prabhakar directly for more information.
                </div>
              ) : (
                <>
                  <div className="text-xs text-muted-foreground mb-2 text-right">
                    {questionCount}/{MAX_QUESTIONS} questions
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendMessage();
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask a question..."
                      disabled={isLoading}
                      className="flex-1 text-sm rounded-xl border-border/60 focus-visible:ring-primary"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading || !input.trim()}
                      className="rounded-xl bg-gradient-to-br from-primary to-accent hover:opacity-90 hover:scale-105 transition-all disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                  <div className="text-xs text-muted-foreground mt-1">
                    Max {MAX_WORDS} words per question
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};