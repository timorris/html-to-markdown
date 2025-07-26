import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { Resend } from 'resend';
//import { getSecret } from "./util";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  const contactSchema = z.object({
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(1)
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const { email, subject, message } = contactSchema.parse(req.body);
      
      
      if (!process.env.RESEND_API_KEY) {
        return res.status(500).json({ 
          error: 'Email service not configured. Please contact support directly.' 
        });
      }
      
      //const resendApiKey = await getSecret('resend-api-key');
      //const resend = new Resend(resendApiKey as string || '');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      // Send notification to the site owner (always goes to verified email)
      const emailResponse = await resend.emails.send({
        from: 'delivered@resend.dev',
        to: ['bethatway@gmail.com'], // Always send to verified email address
        subject: `Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Reply directly to ${email} to respond to this inquiry.</em></p>
        `,
        replyTo: email,
      });



      if (emailResponse.error) {
        console.error('Resend error:', emailResponse.error);
        return res.status(500).json({ 
          error: `Email delivery failed: ${(emailResponse.error as any).error || (emailResponse.error as any).message || 'Unknown error'}` 
        });
      }

      res.json({ 
        success: true, 
        message: 'Email sent successfully', 
        emailId: emailResponse.data?.id,
        recipient: email 
      });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ 
        error: 'Failed to send email. Please try again later.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
