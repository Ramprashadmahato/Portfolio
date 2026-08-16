// controllers/contactController.js
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create new contact (public form submission)
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name: name || 'Anonymous',
      email: email || 'no-email@rcs.com',
      subject: subject || 'Website Inquiry',
      message: message || 'No message provided'
    });

    // Send Auto-Reply
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Inquiry Received',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #06b6d4;">Hello ${name},</h2>
          <p>Thank you for reaching out!</p>
          <p>We have received your inquiry regarding "<strong>${subject}</strong>". Our team is currently reviewing your message and will get back to you as soon as possible.</p>
          <hr />
          <p style="font-size: 0.9em; color: #666;">This is an automated response. Please do not reply directly to this email.</p>
          <p>Best regards,<br /><strong>Support Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Inquiry submitted and confirmation email sent.', contact });
  } catch (err) {
    console.error('Contact error:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get all contacts (admin only)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a contact (admin only)
exports.deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reply to contact via email (admin only)
exports.replyToContact = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    // Configure mail transporter (use your SMTP settings)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message
    });

    res.json({ message: 'Reply sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};