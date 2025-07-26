import { ArrowLeftRight, MessageSquare, Lightbulb, Star, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function Feedback() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/support" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeftRight className="h-6 w-6" />
              <span className="font-semibold">Back to Support</span>
            </Link>
          </div>

          {/* Feedback Content */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-green-400" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Share Your Feedback</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Your thoughts and suggestions help us improve the HTML ↔ Markdown Converter. We value every piece of feedback!
              </p>
            </div>

            {/* Types of Feedback */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">Feature Suggestions</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Have an idea for a new feature or improvement? We'd love to hear about it!
                  </p>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• New conversion formats</li>
                    <li>• User interface improvements</li>
                    <li>• Workflow enhancements</li>
                    <li>• Integration capabilities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-200 mb-2">User Experience</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Tell us about your experience using the converter - what works well and what doesn't.
                  </p>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>• Ease of use feedback</li>
                    <li>• Performance observations</li>
                    <li>• Design preferences</li>
                    <li>• Accessibility concerns</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* What We're Working On */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-semibold">What We're Currently Working On</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-2">🚀 Performance Improvements</h3>
                    <p className="text-slate-400 text-sm">Making conversions faster and more efficient for large documents</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-2">📱 Mobile Experience</h3>
                    <p className="text-slate-400 text-sm">Optimizing the interface for mobile and tablet devices</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-2">🔧 Advanced Features</h3>
                    <p className="text-slate-400 text-sm">Adding support for more HTML elements and Markdown extensions</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <h3 className="font-medium text-slate-200 mb-2">💾 Export Options</h3>
                    <p className="text-slate-400 text-sm">More file formats and export customization options</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Guidelines */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Feedback Guidelines</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-slate-200">Be Specific</h3>
                      <p className="text-slate-400 text-sm">The more details you provide, the better we can understand and address your feedback</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-slate-200">Include Use Cases</h3>
                      <p className="text-slate-400 text-sm">Tell us how you're using the converter and what you're trying to achieve</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-medium text-slate-200">Share Examples</h3>
                      <p className="text-slate-400 text-sm">If possible, include examples of content that could be improved or features you'd like to see</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Requests */}
            <Card className="bg-slate-900/50 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Popular Feature Requests</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">Batch file conversion</span>
                    <span className="text-sm text-slate-500">Requested by 23 users</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">Custom CSS styling for preview</span>
                    <span className="text-sm text-slate-500">Requested by 18 users</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">Keyboard shortcuts</span>
                    <span className="text-sm text-slate-500">Requested by 15 users</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300">Save/load sessions</span>
                    <span className="text-sm text-slate-500">Requested by 12 users</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Form Link */}
            <div className="text-center">
              <p className="text-slate-400 mb-4">Ready to share your thoughts?</p>
              <Link 
                href="/support" 
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Send Your Feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}