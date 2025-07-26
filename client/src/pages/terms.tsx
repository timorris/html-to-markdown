import { ArrowLeftRight } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";

export default function Terms() {
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

          {/* Terms Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the HTML ↔ Markdown Converter service, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily use this service for personal and commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>modify or copy the service code</li>
                <li>use the service for any commercial purpose without permission</li>
                <li>attempt to reverse engineer any software contained in the service</li>
                <li>remove any copyright or other proprietary notations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Service Description</h2>
              <p>
                Our service provides real-time bidirectional conversion between HTML and Markdown formats. All processing is performed locally in your browser, and no content is stored on our servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
              <p>
                The service is provided on an 'as is' basis. To the fullest extent permitted by law, this Company:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>excludes all representations and warranties relating to this service</li>
                <li>excludes all liability for damages arising out of or in connection with your use of this service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on the service could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its service are accurate, complete, or current.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Links</h2>
              <p>
                We have not reviewed all of the sites linked to our service and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
              <p>
                We may revise these terms of service at any time without notice. By using this service, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us through our{" "}
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