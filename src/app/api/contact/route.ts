import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  interest: string;
}

// Enhanced validation function
function validateFormData(data: ContactFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('E-mail inválido');
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('Assunto deve ter pelo menos 3 caracteres');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Mensagem deve ter pelo menos 10 caracteres');
  }

  // Length validations
  if (data.name && data.name.length > 100) {
    errors.push('Nome muito longo (máximo 100 caracteres)');
  }

  if (data.email && data.email.length > 150) {
    errors.push('E-mail muito longo (máximo 150 caracteres)');
  }

  if (data.phone && data.phone.length > 20) {
    errors.push('Telefone muito longo (máximo 20 caracteres)');
  }

  if (data.company && data.company.length > 100) {
    errors.push('Nome da empresa muito longo (máximo 100 caracteres)');
  }

  if (data.subject && data.subject.length > 150) {
    errors.push('Assunto muito longo (máximo 150 caracteres)');
  }

  if (data.message && data.message.length > 2000) {
    errors.push('Mensagem muito longa (máximo 2000 caracteres)');
  }

  return { isValid: errors.length === 0, errors };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced sanitize function
function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// Enhanced rate limiting with better memory management
const submissionLog = new Map<string, number[]>();
const MAX_SUBMISSIONS_PER_HOUR = 3;
const HOUR_IN_MS = 3600000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const submissions = submissionLog.get(ip) || [];
  
  // Clean old submissions (older than 1 hour)
  const recentSubmissions = submissions.filter(time => now - time < HOUR_IN_MS);
  
  if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
    return true;
  }
  
  // Update the log
  recentSubmissions.push(now);
  submissionLog.set(ip, recentSubmissions);
  
  // Clean up old entries periodically
  if (submissionLog.size > 1000) {
    const cutoff = now - HOUR_IN_MS;
    for (const [key, times] of submissionLog.entries()) {
      const recent = times.filter(time => time > cutoff);
      if (recent.length === 0) {
        submissionLog.delete(key);
      } else {
        submissionLog.set(key, recent);
      }
    }
  }
  
  return false;
}

// Enhanced logging function
function logContactSubmission(data: ContactFormData, ip: string, userAgent?: string) {
  const logData = {
    timestamp: new Date().toISOString(),
    ip: ip,
    userAgent: userAgent || 'Unknown',
    nome: data.name,
    email: data.email,
    empresa: data.company || 'Não informado',
    telefone: data.phone || 'Não informado',
    interesse: data.interest || 'Não especificado',
    assunto: data.subject,
    mensagem: data.message.substring(0, 100) + (data.message.length > 100 ? '...' : ''),
    messageLength: data.message.length
  };

  console.log('📧 Nova mensagem de contato recebida:', JSON.stringify(logData, null, 2));
  
  // TODO: In production, you might want to:
  // - Send to logging service (Winston, etc.)
  // - Store in database
  // - Send to monitoring service
}

// Email template generator
function generateEmailTemplate(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nova mensagem de contato - Hub Plural</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #374151; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; margin-bottom: 5px; }
        .value { background: #f9fafb; padding: 12px; border-radius: 6px; border-left: 4px solid #f59e0b; }
        .message { background: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #f59e0b; white-space: pre-wrap; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">Hub Plural</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Nova mensagem de contato</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">Nome Completo</div>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="label">E-mail</div>
            <div class="value">${data.email}</div>
          </div>
          
          ${data.phone ? `
          <div class="field">
            <div class="label">Telefone</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}
          
          ${data.company ? `
          <div class="field">
            <div class="label">Empresa</div>
            <div class="value">${data.company}</div>
          </div>
          ` : ''}
          
          ${data.interest ? `
          <div class="field">
            <div class="label">Interesse</div>
            <div class="value">${data.interest}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Assunto</div>
            <div class="value">${data.subject}</div>
          </div>
          
          <div class="field">
            <div class="label">Mensagem</div>
            <div class="message">${data.message}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Mensagem enviada através do site Hub Plural</p>
          <p>Responda este e-mail para entrar em contato diretamente com o cliente</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Confirmation email template for user
function generateConfirmationTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmação de contato - Hub Plural</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px;">Hub Plural</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Obrigado pelo seu contato!</p>
        </div>
        
        <div class="content">
          <h2>Olá, ${name}!</h2>
          
          <p>Recebemos sua mensagem e nossa equipe retornará em até 24 horas durante dias úteis.</p>
          
          <p>Enquanto isso, que tal conhecer mais sobre nossos serviços?</p>
          
          <a href="https://hubplural.com/servicos" class="button">Conhecer Nossos Serviços</a>
          
          <p>Se precisar de algo urgente, entre em contato conosco diretamente:</p>
          <ul>
            <li><strong>Telefone:</strong> (81) 3030-3030</li>
            <li><strong>WhatsApp:</strong> (81) 9 9999-9999</li>
            <li><strong>E-mail:</strong> contato@hubplural.com</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Hub Plural - Transformando a forma de trabalhar</p>
          <p>Recife, Pernambuco</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Get client information
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
    const userAgent = request.headers.get('user-agent');

    // Check rate limiting
    if (isRateLimited(ip)) {
      console.log(`🚫 Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { 
          error: 'Muitas tentativas. Tente novamente em 1 hora.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.log('❌ Invalid JSON in request body:', parseError);
      return NextResponse.json(
        { error: 'Dados inválidos no formulário', code: 'INVALID_JSON' },
        { status: 400 }
      );
    }
    
    // Sanitize inputs
    const formData: ContactFormData = {
      name: sanitizeInput(body.name || ''),
      email: sanitizeInput(body.email || ''),
      phone: sanitizeInput(body.phone || ''),
      company: sanitizeInput(body.company || ''),
      subject: sanitizeInput(body.subject || ''),
      message: sanitizeInput(body.message || ''),
      interest: sanitizeInput(body.interest || ''),
    };

    // Validate data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      console.log('❌ Validation failed:', validation.errors);
      return NextResponse.json(
        { 
          error: 'Dados inválidos', 
          details: validation.errors,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Log the submission
    logContactSubmission(formData, ip, userAgent || undefined);

    // TODO: Replace with actual email sending logic
    // Example integrations you could add here:
    /*
    
    // Using Nodemailer with Gmail/SMTP
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'contato@hubplural.com',
      subject: `[Hub Plural] ${formData.subject}`,
      html: generateEmailTemplate(formData),
      replyTo: formData.email
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: 'Confirmação de contato - Hub Plural',
      html: generateConfirmationTemplate(formData.name)
    });

    // Using SendGrid
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    await sgMail.send({
      to: 'contato@hubplural.com',
      from: 'noreply@hubplural.com',
      subject: `[Hub Plural] ${formData.subject}`,
      html: generateEmailTemplate(formData),
      replyTo: formData.email
    });

    // Using Resend
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'contato@hubplural.com',
      to: 'contato@hubplural.com',
      subject: `[Hub Plural] ${formData.subject}`,
      html: generateEmailTemplate(formData),
      reply_to: formData.email
    });

    */

    // Success response
    console.log('✅ Contact form submission successful');
    return NextResponse.json(
      { 
        message: 'Mensagem enviada com sucesso!',
        timestamp: new Date().toISOString(),
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Erro interno no processamento do formulário:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor. Tente novamente mais tarde.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json(
    { 
      status: 'ok',
      message: 'Contact API is running',
      timestamp: new Date().toISOString(),
      version: '2.0.0'
    },
    { status: 200 }
  );
} 