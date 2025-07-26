import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeftRight, 
  Github,
  Mail,
  MessageSquare,
  Send
} from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";

export default function Support() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !subject || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before sending your message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subject,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        
        // Clear form
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        toast({
          title: "Failed to send message",
          description: data.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ArrowLeftRight className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-50">HTML ↔ Markdown Converter</h1>
                <p className="text-sm text-slate-400 hidden sm:block">Support & Contact</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="bg-slate-800 hover:bg-slate-700">
                  Back to Converter
                </Button>
              </Link>
              
              <Button variant="ghost" size="icon" className="bg-slate-800 hover:bg-slate-700">
                <Github className="w-5 h-5 text-slate-400" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-50 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Got a technical issue? Want to send feedback about a beta feature? Need 
            details about our Business plan? Let us know.
          </p>
        </div>

        <Card className="bg-slate-900/50 border-slate-700 max-w-2xl mx-auto">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                  Your email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-50 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-slate-300">
                  Subject
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Let us know how we can help you"
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-50 placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-slate-300">
                  Your message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a comment..."
                  className="min-h-32 bg-slate-800 border-slate-600 focus:border-indigo-500 text-slate-50 placeholder-slate-400 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send message</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Contact Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-slate-900/30 rounded-xl border border-slate-700">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Email Support</h3>
            <p className="text-slate-400 text-sm">
              Get help with technical issues and general questions
            </p>
          </div>

          <div className="p-6 bg-slate-900/30 rounded-xl border border-slate-700">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Feedback</h3>
            <p className="text-slate-400 text-sm">
              Share your thoughts and suggestions for improvements
            </p>
          </div>

          <div className="p-6 bg-slate-900/30 rounded-xl border border-slate-700">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Github className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Community</h3>
            <p className="text-slate-400 text-sm">
              Join our community for discussions and updates
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}