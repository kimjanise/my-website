'use client';

import { useTheme } from '@/context/ThemeContext';

interface Person {
  name: string;
  nameUrl?: string;
  role?: string;
  description: React.ReactNode;
  link?: { prefix?: string; text: string; suffix?: string; url: string };
}

const people: Person[] = [
  {
    name: "mom & dad",
    description: "-- my first believers. i'm so incredibly lucky to have them not only as my parents, but also as lifelong role models. i've been talking more about my upbringing with them recently, and their thesis for raising me was simple: \"risk is a teacher you can't replace.\" against what everyone else told them to do, my parents bet early on my ability to recover from failure, learn, and try again. they believed in it so strongly that they completely uprooted their lives to immigrate here without knowing a single sentence in english, hoping it would give me more room to choose my own path. one of my end goals in life is to publish a biography about them."
  },
  {
    name: "alex",
    description: "get's a mention for being my brother and built-in friend whether he likes it or not. lol."
  },
  {
    name: "victoria + alexa",
    description: "are my best friends at cmu. i don't even want to know how many all-nighters we've pulled together."
  },
  {
    name: "stephanie zhang",
    nameUrl: "https://www.linkedin.com/in/stephaniewzhang/",
    description: "the most amazing mentor i could've asked for at datadog."
  },
  {
    name: "mr. kyle adams",
    role: "3rd grade teacher",
    description: "was the type of teacher who truly went above and beyond-- the kind you think only exist in coming-of-age movies. when i first met him, i was the fresh face at my new school. from proofreading my travel diaries to inviting me to \"looney lunches\" (where he'd screen looney tunes in his classroom during lunchtime), mr. adams made a point of noticing me at a time when i felt largely invisible. when i ruptured my spleen after falling over a balcony, he was the first person to visit me in the hospital. he's proof that a teacher's impact goes way beyond the classroom. miss you mr. adams."
  },
  {
    name: "laura du",
    nameUrl: "https://x.com/laurayd?lang=en",
    role: "partner @ afore capital",
    description: "wrote me my first check to drop whatever i was doing at school and book a one-way plane ticket to sf. that decision gave me my first real taste of agency and rewired a lot of parts in my brain."
  },
  {
    name: "mar hershenson",
    nameUrl: "https://pear.vc/team/mar-hershenson/",
    role: "co-founder @ pear vc",
    description: "specializes in pre-seed + seed investments, and i love how thoughtfully bullish she is on early talent. you can tell she used to be a technical founder by how hands-on she is with the founders she backs. also, i ran into her earlier this year at treehacks, where she'd somehow made the time as a managing partner to come judge projects irl. says a lot."
  },
  {
    name: "dr. henny admoni",
    nameUrl: "https://hennyadmoni.com/",
    role: "associate professor @ cmu",
    description: "does super cool things with assistive robots at the harp lab. in another life i would've stuck with hardware. maybe i will in the future :)"
  },
  {
    name: "dario amodei",
    nameUrl: "https://www.darioamodei.com/",
    role: "co-founder @ anthropic",
    description: "is someone i really admire for his safety-first approach to scaling intelligence responsibly. i think it's reassuring to see someone in his position care so deeply about the downstream impact of his systems, especially in a space where capability is moving so much faster than accountability.",
    link: { prefix: "i recommend everyone to give this ", text: "short essay", suffix: " a read!", url: "https://www.darioamodei.com/post/the-urgency-of-interpretability" }
  },
  {
    name: "mira murati",
    nameUrl: "https://x.com/miramurati?lang=en",
    role: "co-founder @ thinking machines lab",
    description: "is pure aura."
  }
];

export function PeopleContent() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ul className="space-y-4 list-disc list-outside ml-5">
      {people.map((person, index) => (
        <li key={index} className={`text-[15px] leading-relaxed ${isDark ? 'text-[#ececec]' : 'text-[#0d0d0d]'}`}>
          {person.nameUrl ? (
            <a
              href={person.nameUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:opacity-70"
            >
              {person.name}
            </a>
          ) : (
            <span className="font-semibold">{person.name}</span>
          )}
          {person.role && ` (${person.role})`}
          {' '}
          {person.description}
          {person.link && (
            <>
              {' '}
              {person.link.prefix}
              <a
                href={person.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline underline-offset-2 hover:opacity-70`}
              >
                {person.link.text}
              </a>
              {person.link.suffix}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
