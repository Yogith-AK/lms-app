import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  if (!message) {
    return NextResponse.json({ error: 'Message required' }, { status: 400 });
  }

  const messages = [
    {
      role: 'system',
      content: `You are LearnBot, a helpful AI assistant for LearnHub — an online learning platform. 
You help students with programming (Python, JavaScript, React, Node.js, Git, SQL, DSA), math, science concepts, and course questions. 
Keep answers short, clear and beginner-friendly. Use simple examples when explaining code.`
    },
    ...history.slice(-6),
    { role: 'user', content: message }
  ];

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq error:', data);
      return NextResponse.json({ reply: 'Sorry, try again in a moment!' });
    }

    const reply = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not respond!';
    return NextResponse.json({ reply });

  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json({ reply: 'Network error. Please try again!' });
  }
}