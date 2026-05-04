
const { OpenAI } = require('openai');
require('dotenv').config({ path: '.env.local' });

async function test() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('GROQ_API_KEY is missing');
    return;
  }

  const groq = new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1',
  });

  try {
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: 'Hi' }],
    });
    console.log('API Response:', response.choices[0].message.content);
  } catch (err) {
    console.error('API Error:', err.message);
  }
}

test();
