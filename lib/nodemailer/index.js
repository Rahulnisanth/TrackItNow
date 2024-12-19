"use server";
import nodemailer from "nodemailer";

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

export const generateEmailContent = async (product, type) => {
  const THRESHOLD_PERCENTAGE = 70;
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  let subject = "";
  let body = "";

  switch (type) {
    case Notification.WELCOME:
      subject = `🚀 Welcome to Track It Now - Price Tracking for ${shortenedTitle}!`;
      body = `
      <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px;">
        <h1 style="color: #1d72b8; font-size: 28px;">🎉 Welcome to <strong>Track It Now</strong>!</h1>
        <p style="font-size: 18px; margin: 10px 0;">Your journey to smarter shopping starts here!</p>
        <p>You’ve started tracking <strong>${product.title}</strong>.</p>
        <div style="border: 1px solid #ccc; padding: 20px; background-color: #f9fafb; border-radius: 10px; margin: 20px auto; max-width: 500px;">
          <h3 style="color: #e63946; font-size: 20px;">Update Preview</h3>
          <p><strong>${product.title}</strong> is back in stock! 🎯</p>
          <p><a href="${product.url}" style="background-color: #1d72b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Buy Now</a></p>
          <img src="${product.image}" alt="Image of ${product.title}" style="width: 100%; max-width: 400px; margin-top: 10px; border-radius: 5px;" />
        </div>
        <p style="font-size: 16px;">Stay tuned for updates on <strong>${product.title}</strong> and other products you're tracking.</p>
        <footer style="color: #888; font-size: 14px; margin-top: 20px;">Powered by Track It Now</footer>
      </div>
    `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `✨ ${shortenedTitle} is Back in Stock!`;
      body = `
      <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px;">
        <h2 style="color: #1d72b8;">🔔 Stock Alert!</h2>
        <p><strong>${product.title}</strong> is now back in stock!</p>
        <a href="${product.url}" style="background-color: #1d72b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Check it Out</a>
      </div>
    `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `🔥 Lowest Price for ${shortenedTitle}!`;
      body = `
      <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px;">
        <h2 style="color: #e63946;">🚨 Lowest Price Alert!</h2>
        <p>Good news! <strong>${product.title}</strong> is at its lowest price ever.</p>
        <p><a href="${product.url}" style="background-color: #1d72b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Buy Now</a></p>
      </div>
    `;
      break;

    case Notification.THRESHOLD_MET:
      subject = `💸 Huge Discount on ${shortenedTitle}!`;
      body = `
      <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px;">
        <h2 style="color: #1d72b8;">🔥 Discount Alert!</h2>
        <p><strong>${product.title}</strong> is now available at a discount of over ${THRESHOLD_PERCENTAGE}%!</p>
        <p><a href="${product.url}" style="background-color: #1d72b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Grab the Deal</a></p>
      </div>
    `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  return { subject, body };
};

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP_USERNAME,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

export const sendEmail = async (emailContent, senders) => {
  try {
    if (!process.env.EMAIL_APP_USERNAME || !process.env.EMAIL_APP_PASSWORD) {
      throw new Error(
        "Email credentials are not configured in environment variables"
      );
    }

    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.EMAIL_APP_USERNAME,
      to: Array.isArray(senders) ? senders.join(",") : senders,
      html: emailContent.body,
      subject: emailContent.subject,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
