"use server";
import { EmailContent, EmailProductInfo, NotificationType } from "../types";
import nodemailer from "nodemailer";

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

export const generateEmailContent = async (
  product: EmailProductInfo,
  type: NotificationType
) => {
  const THRESHOLD_PERCENTAGE = 40;
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
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <h1 style="color: #1d72b8;">Welcome to <strong>Track It Now</strong></h1>
          <p style="font-size: 18px;">The ultimate price tracker is here to save you money!</p>
          <p>You’ve started tracking <strong>${product.title}</strong>.<br /> Don’t worry, we’ve got you covered with the latest price updates!</p>
          <p>Here's a sneak peek of what your updates will look like:</p>
          
          <div style="border: 1px solid #ccc; padding: 20px; background-color: #f0f4f8; border-radius: 10px; margin: 20px auto; max-width: 500px;">
            <h3 style="color: #e63946;">${product.title} is back in stock!</h3>
            <p>We’re thrilled to inform you that <strong>${product.title}</strong> is now available.</p>
            <p><a href="${product.url}" style="background-color: #1d72b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Buy Now</a></p>
            <img src="${product.image}" alt="${product.title}" style="width: 100%; max-width: 400px; margin-top: 10px;" />
          </div>

          <p style="font-size: 16px;">Stay tuned for more exciting price updates on <strong>${product.title}</strong> and other products you're tracking.</p>
          <footer style="color: #888; font-size: 14px;">Powered by Track It Now</footer>
        </div>
      `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `✨ ${shortenedTitle} is Back in Stock! Get Yours Now!`;
      body = `
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <h2 style="color: #1d72b8;">Stock Update: ${product.title} is Restocked!</h2>
          <p>Great news! The item you were tracking is now back in stock!</p>
          <p><a href="${product.url}" style="background-color: #1d72b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Check it Out</a></p>
        </div>
      `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `🔥 Lowest Price Ever for ${shortenedTitle}!`;
      body = `
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <h2 style="color: #e63946;">Alert: Lowest Price for ${product.title}!</h2>
          <p>Congratulations! <strong>${product.title}</strong> is now at its lowest price!</p>
          <p>Don’t miss out – <a href="${product.url}" style="background-color: #1d72b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Buy Now</a></p>
        </div>
      `;
      break;

    case Notification.THRESHOLD_MET:
      subject = `💸 Massive Discount on ${shortenedTitle}! Over ${THRESHOLD_PERCENTAGE}% Off!`;
      body = `
        <div style="font-family: Arial, sans-serif; color: #333; text-align: center;">
          <h2 style="color: #1d72b8;">Discount Alert!</h2>
          <p>Hurry up! <strong>${product.title}</strong> is now available at a discount of over ${THRESHOLD_PERCENTAGE}%!</p>
          <p><a href="${product.url}" style="background-color: #1d72b8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Grab the Deal</a></p>
        </div>
      `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  return { subject, body };
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "trackitnowpro@gmail.com",
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export const sendEmail = async (
  emailContent: EmailContent,
  senders: string[]
) => {
  const mailOptions = {
    from: "trackitnowpro@hotmail.com",
    to: senders,
    html: emailContent.body,
    subject: emailContent.subject,
  };
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) console.log(error);
    console.log("Email info => ", info);
  });
};
