# utils/send_email.py

from fastapi_mail import FastMail, MessageSchema
from fastapi_mail.email_utils import DefaultChecker
from app.utils.mail_config import conf

async def send_otp_email(email_to: str, otp_code: str):
    message = MessageSchema(
        subject="Your One-Time Password (OTP)",
        recipients=[email_to],
        body=f"""
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #eff2f5ff; padding: 20px; text-align: center;">
          <h2>Deliveroo Delivery App</h2>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #333;">Your One-Time Password (OTP)</h2>
          <p style="font-size: 16px; color: #555;">Welcome to Deliveroo</p>
          <p style="font-size: 16px; color: #555;">Use the OTP below to continue with your verification. This code is valid for <strong>30 minutes</strong>.</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; font-size: 28px; font-weight: bold; color: #004080; background-color: #f0f8ff; padding: 12px 24px; border-radius: 6px; letter-spacing: 2px;">
              {otp_code}
            </span>
          </div>
          <p style="font-size: 14px; color: #777;">If you didn’t request this OTP, please ignore this message or contact support.</p>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999;">
          &copy; 2025 Deliveroo. All rights reserved.
        </div>
      </div>
        """,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message)
