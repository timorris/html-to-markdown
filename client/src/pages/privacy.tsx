import { ArrowLeftRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeftRight className="h-6 w-6" />
              <span className="font-semibold">HTML ↔ Markdown Converter</span>
            </Link>
          </div>

          {/* Privacy Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p>
                We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our HTML ↔ Markdown Converter service.
              </p>
              
              <h3 className="text-xl font-medium mt-6 mb-3">Personal Information</h3>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Contact us through our support form</li>
                <li>Report bugs or provide feedback</li>
                <li>Subscribe to updates or newsletters</li>
              </ul>

              <h3 className="text-xl font-medium mt-6 mb-3">Usage Data</h3>
              <p>
                We may automatically collect certain information when you visit our service, including:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Your IP address and browser type</li>
                <li>Pages visited and time spent on our service</li>
                <li>Referring website addresses</li>
                <li>Device and operating system information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Provide, operate, and maintain our service</li>
                <li>Improve and personalize your experience</li>
                <li>Respond to your comments and questions</li>
                <li>Send you technical notices and support messages</li>
                <li>Monitor usage and analyze trends to improve our service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Data Processing and Storage</h2>
              <p>
                <strong>Local Processing:</strong> All HTML and Markdown conversion is performed locally in your browser. Your content is never transmitted to our servers during the conversion process.
              </p>
              <p className="mt-4">
                <strong>No Content Storage:</strong> We do not store, log, or have access to the content you convert using our service. Your documents and text remain completely private.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers who assist in operating our service</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
              <p>
                We may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
              </p>
              <p className="mt-4">
                <strong>Types of cookies we use:</strong>
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>Essential cookies for service functionality</li>
                <li>Preference cookies to remember your settings</li>
                <li>Analytics cookies to understand usage patterns</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Access the personal information we have about you</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to processing of your personal information</li>
                <li>Request data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us through our{" "}
                <Link href="/support" className="text-primary hover:underline">
                  support page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}