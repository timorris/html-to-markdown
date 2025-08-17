import { Resend } from 'resend';
import { getSecret, getEnvValue, secretLocation } from './_utils.js';

const contactSchema = {
  validate: (data) => {
    const { email, subject, message } = data;
    if (!email || !email.includes('@')) throw new Error('Invalid email');
    if (!subject || subject.length < 1) throw new Error('Subject required');
    if (!message || message.length < 1) throw new Error('Message required');
    return { email, subject, message };
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, subject, message } = contactSchema.validate(req.body);
    
    const apiKey = secretLocation === 'keyvault' ? await getSecret('v-resend-api-key') : getEnvValue('RESEND_API_KEY');
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Email service not configured. Please contact support directly.' 
      });
    }

    const resend = new Resend(apiKey || '');
    
      //from: 'delivered@resend.dev',

    // Send notification to the site owner (always goes to verified email)
    const emailResponse = await resend.emails.send({
      from: 'send@notifications.htmlmd.com',
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
        error: `Email delivery failed: ${emailResponse.error.error || emailResponse.error.message || 'Unknown error'}` 
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
}