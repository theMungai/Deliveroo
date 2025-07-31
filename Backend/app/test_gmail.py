import asyncio
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig

conf = ConnectionConfig(
    MAIL_USERNAME = "deliveroo1.noreply@gmail.com",
    MAIL_PASSWORD = "gihb iwum axgc asbp",
    MAIL_FROM = "deliveroo1.noreply@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
)

async def test():
    message = MessageSchema(
        subject="Test Email",
        recipients=[],  # or your test email
        body="This is a test",
        subtype="plain"
    )
    fm = FastMail(conf)
    await fm.send_message(message)

asyncio.run(test())
