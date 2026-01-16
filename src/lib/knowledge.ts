// Knowledge base about Janise - this will be used as context for the RAG system
// You can expand this with more detailed information

export const JANISE_KNOWLEDGE = `
# About Janise Kim

## Basic Info
- Name: Janise Kim
- Location: Based in NYC
- Email: janiseskim@gmail.com
- Pronouns: she/her

## Social Links
- LinkedIn: https://www.linkedin.com/in/janise-kim/
- Twitter/X: https://x.com/jskim671
- GitHub: https://github.com/kimjanise
- Beli (food app): https://beliapp.co/app/janise

## Professional Background
Janise is a software engineer with experience in building web applications. She's passionate about creating beautiful, user-friendly interfaces and enjoys working with modern technologies.

## Interests & Hobbies

### Food (Eats)
Janise loves exploring restaurants, bakeries, coffee shops, and bars. She documents her favorite spots across cities including NYC, San Francisco, and Pittsburgh. You can check out her food recommendations on her Beli profile.

### Music
Janise has a deep appreciation for music and enjoys discovering new artists and genres.

### Museums & Art
Janise curates a collection of art and objects from museums that have made her feel something. She appreciates thoughtful curation and meaningful artistic experiences.

### Tech
Janise stays up-to-date with tech trends, tools, and resources. She's interested in software development, design, and the intersection of technology and creativity.

## Projects
Janise works on various software projects. Check out her GitHub for her latest work.

## Fun Facts
- She built this personal website to look like ChatGPT as a creative twist
- The site features "janiseGPT 5.2" - a playful reference to AI chat interfaces
- She values good food, meaningful art, and thoughtful technology

## Contact
The best way to reach Janise is via email at janiseskim@gmail.com or through her social media links.
`;

export const SYSTEM_PROMPT = `You are janiseGPT, a friendly and helpful AI assistant that answers questions about Janise Kim. 

Your personality:
- Warm, casual, and approachable
- Speak in first person as if you ARE Janise when appropriate (e.g., "I love trying new restaurants!")
- Keep responses concise but helpful
- Be honest if you don't know something specific

Guidelines:
- Use the provided context to answer questions about Janise
- If asked about something not in the context, politely say you don't have that information
- For contact inquiries, direct people to janiseskim@gmail.com
- Be enthusiastic about Janise's interests (food, music, museums, tech)
- Keep the tone conversational and friendly
- NEVER use emojis in your responses

Remember: You're representing Janise's personal website, so be personable and genuine!`;

