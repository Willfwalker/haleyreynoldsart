import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export async function POST(req: NextRequest) {
  try {
    const { 
      name, 
      email, 
      phone, 
      commissionType, 
      description, 
      budget, 
      timeline 
    } = await req.json();

    // Validate required fields
    if (!name || !email || !commissionType || !description || !budget || !timeline) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to Firebase
    const commissionData = {
      name,
      email,
      phone: phone || '',
      commissionType,
      description,
      budget,
      timeline,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'commissions'), commissionData);

    const transporter = createTransporter();

    // Get commission type label
    const commissionTypes: { [key: string]: string } = {
      'painting': 'Custom Painting',
      'sticker-set': 'Custom Sticker Set',
      'bookmark-set': 'Custom Bookmark Set',
      'mixed': 'Mixed Media Piece',
    };

    const commissionTypeLabel = commissionTypes[commissionType] || commissionType;

    // Email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B4513;">New Commission Request</h2>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #8B4513;">Client Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        </div>

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #8B4513;">Commission Details</h3>
          <p><strong>Type:</strong> ${commissionTypeLabel}</p>
          <p><strong>Budget:</strong> $${budget}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
          <h3 style="color: #8B4513;">Project Description:</h3>
          <p style="line-height: 1.6;">${description.replace(/\n/g, '<br>')}</p>
        </div>

        <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Commission ID:</strong> ${docRef.id}</p>
          <p style="font-size: 12px; color: #666;">Use this ID to reference this commission request.</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 20px;">
          This commission request was submitted through the Haley Reynolds Art website.
        </p>
      </div>
    `;

    // Auto-reply to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #8B4513;">Commission Request Received!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for your commission request! I'm excited about the possibility of creating a custom piece for you.</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #8B4513;">Your Request Summary:</h3>
          <p><strong>Commission Type:</strong> ${commissionTypeLabel}</p>
          <p><strong>Budget Range:</strong> $${budget}</p>
          <p><strong>Preferred Timeline:</strong> ${timeline}</p>
          <p><strong>Request ID:</strong> ${docRef.id}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
          <h3 style="color: #8B4513;">What's Next?</h3>
          <ul style="line-height: 1.8;">
            <li>I'll review your request within 24 hours</li>
            <li>You'll receive a detailed quote and timeline</li>
            <li>We'll schedule a consultation to discuss your vision</li>
            <li>Once approved, I'll begin creating your custom piece</li>
          </ul>
        </div>
        
        <p>I look forward to working with you to bring your vision to life!</p>
        
        <p>Best regards,<br>
        Haley Reynolds</p>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          Questions? Reply to this email or visit our <a href="${req.headers.get('origin')}/contact" style="color: #8B4513;">contact page</a>.
        </p>
      </div>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Commission Request: ${commissionTypeLabel}`,
      html: adminEmailHtml,
      replyTo: email,
    });

    // Send auto-reply to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Commission Request Received - Haley Reynolds Art',
      html: customerEmailHtml,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Commission request submitted successfully',
      commissionId: docRef.id
    });

  } catch (error) {
    console.error('Error processing commission request:', error);
    return NextResponse.json(
      { error: 'Failed to submit commission request' },
      { status: 500 }
    );
  }
}
