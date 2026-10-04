import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Honeypot spam protection (silent return for bots)
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please enter your name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // Check for configured email dispatcher (Resend)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      // Per prompt instructions: return an error (not 200) when email delivery is not configured
      console.warn("[Contact API] RESEND_API_KEY is not configured in .env.local.");
      return NextResponse.json(
        {
          success: false,
          error: "Email service is pending configuration. Please email directly at sujalguptaa121@gmail.com.",
        },
        { status: 503 }
      );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["sujalguptaa121@gmail.com"],
        subject: `Portfolio Message from ${name.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Resend API error:", errorData);
      return NextResponse.json(
        { success: false, error: "Email delivery failed. Please email directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your message was delivered.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to send your message right now. Please email directly." },
      { status: 500 }
    );
  }
}
