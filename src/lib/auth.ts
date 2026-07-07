import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import {prisma} from "../lib/prisma"
import nodemailer from "nodemailer"






const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    user:{
        additionalFields:{
            role:{
                type:"string",
                defaultValue:"USER",
                required:false
            }
        }
    },
    emailAndPassword:{
        enabled:true,
        autoSignIn:true,
        requireEmailVerification:true
    },
    trustedOrigins:[process.env.APP_URL!],
      emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
        try {
  const info = await transporter.sendMail({
    from: `${process.env.SMPT_USER}`, 
    to: `${user.email}`, // list of recipients
    subject: "verify your email", 
    text: "verify your email", 
    html: `Click on this link to verify your email: ${url}`, 
  });

  console.log("Message sent: %s", info.messageId);
  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}

    },
  },



});