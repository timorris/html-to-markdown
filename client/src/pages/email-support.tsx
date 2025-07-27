import { ArrowLeftRight, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function EmailSupport() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/support" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeftRight className="h-6 w-6" />
              <span className="font-semibold">Back to Support</span>
            </Link>
          </div>

          {/* Email Support Content */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-400" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Email Support</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Get personalized help with technical issues, feature requests, and general questions about the HTML ↔ Markdown Converter.
              </p>
            </div>

            {/* Response Time */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl font-semibold">Response Times</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-2">Standard Inquiries</h3>
                    <p className="text-slate-400 text-sm">General questions and feature requests</p>
                    <p className="text-green-400 font-medium mt-2">24-48 hours</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-2">Technical Issues</h3>
                    <p className="text-slate-400 text-sm">Bug reports and conversion problems</p>
                    <p className="text-blue-400 font-medium mt-2">12-24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What We Can Help With */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">What We Can Help With</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-slate-200">Conversion Issues</h3>
                        <p className="text-slate-400 text-sm">Problems with HTML to Markdown or Markdown to HTML conversion</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-slate-200">Feature Requests</h3>
                        <p className="text-slate-400 text-sm">Suggestions for new features or improvements</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-slate-200">File Upload Problems</h3>
                        <p className="text-slate-400 text-sm">Issues with uploading HTML or Markdown files</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-slate-200">Browser Compatibility</h3>
                        <p className="text-slate-400 text-sm">Issues with specific browsers or devices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-slate-200">Usage Questions</h3>
                        <p className="text-slate-400 text-sm">How to use specific features or best practices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-slate-200">Integration Help</h3>
                        <p className="text-slate-400 text-sm">Using the converter in your workflow or projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Better Support */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-semibold">Tips for Better Support</h2>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-1">Include Sample Content</h3>
                    <p className="text-slate-400 text-sm">When reporting conversion issues, include the HTML or Markdown content that's causing problems</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-1">Specify Your Browser</h3>
                    <p className="text-slate-400 text-sm">Let us know which browser and version you're using (Chrome, Firefox, Safari, etc.)</p>
                  </div>
                  <div className="p-3 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-1">Describe the Expected Result</h3>
                    <p className="text-slate-400 text-sm">Tell us what you expected to happen versus what actually happened</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form Link */}
            <div className="text-center">
              <p className="text-slate-400 mb-4">Ready to get help?</p>
              <Link 
                href="/support" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Mail className="w-4 h-4" />
                Send Us a Message
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}