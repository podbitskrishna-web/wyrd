import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Menu, MoveDown, Plus, Send, Sparkles, X } from 'lucide-react';
import { CustomCursor } from './components/CustomCursor';
import { ThreeLoader } from './three/ThreeLoader';

const capabilities = [
  {
    number: '01',
    title: 'Identity systems',
    copy: 'Names, voices, and visual languages that give ambitious ideas a precise place in the world.',
    tags: ['Strategy', 'Naming', 'Art direction'],
  },
  {
    number: '02',
    title: 'Digital experiences',
    copy: 'Websites and interfaces that make complex things feel immediate, considered, and worth returning to.',
    tags: ['UX / UI', 'Web design', 'Prototyping'],
  },
  {
    number: '03',
    title: 'Creative technology',
    copy: 'The connective tissue between an idea and its most compelling expression — built to move, respond, and last.',
    tags: ['Development', 'Motion', 'Systems'],
  },
];

const principles = [
  ['01', 'Look closer', 'We start where the obvious answer ends. The useful tension is usually hiding in the detail.'],
  ['02', 'Make it legible', 'Complexity is not a virtue. We find the sharpest shape for an idea, then give it room to speak.'],
  ['03', 'Build with intent', 'Design is only finished when it holds up in the real world — across screens, teams, and time.'],
];

const projectTypes = ['Brand identity', 'Website', 'Digital product', 'E-commerce', 'Digital experience', 'Strategy', 'Technology / Development', 'Something else'];
const projectStages = ['Just an idea', 'Early exploration', 'Planning', 'Already designing', 'Already building', 'Existing product', 'Looking to improve'];
const timelines = ['As soon as possible', 'Within 1 month', '1-3 months', '3-6 months', 'Flexible', 'Not sure yet'];
const budgets = ['Not decided yet', 'Under 5L', '5L-10L', '10L-25L', '25L+', 'Prefer to discuss'];
const sources = ['Search', 'Instagram', 'LinkedIn', 'Referral', 'Word of mouth', 'Other'];
const contactMethods = ['Email', 'Phone', 'WhatsApp', 'Video call'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.14 },
    );
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen);
    return () => document.body.classList.remove('menu-is-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const description = String(data.get('description') ?? '').trim();

    const errors: string[] = [];
    if (!name) errors.push('name');
    if (!email) errors.push('email');
    if (!description) errors.push('project description');

    if (errors.length > 0) {
      setFormError(`Please fill in the required fields: ${errors.join(', ')}.`);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      form.reset();
    }, 900);
  };

  return (
    <div className="site-shell">
      <CustomCursor />

      <div className="atmosphere" aria-hidden="true">
        <div className="atmosphere-glow atm-glow-1" />
        <div className="atmosphere-glow atm-glow-2" />
        <div className="atmosphere-glow atm-glow-3" />
      </div>

      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-glass" aria-hidden="true" />
        <div className="nav-content">
          <a className="brand" href="#top" aria-label="WYRD Designs home" onClick={closeMenu}>
            <img src="/assets/images/Logo_Design_Black_final.png" alt="WYRD Designs" />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#studio">Studio</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#approach">Approach</a>
          </nav>
          <a className="header-contact" href="#contact">Start a conversation <ArrowUpRight size={15} /></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Mobile navigation">
          <a href="#studio" onClick={closeMenu}>Studio <span>01</span></a>
          <a href="#capabilities" onClick={closeMenu}>Capabilities <span>02</span></a>
          <a href="#approach" onClick={closeMenu}>Approach <span>03</span></a>
          <a href="#contact" onClick={closeMenu}>Contact <span>04</span></a>
        </nav>
        <p>Design & technology studio<br />Bangalore, India</p>
      </div>

      <main id="top">
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-topline"><span>Design & technology studio</span><span>Bangalore / India</span><span className="hero-index">(00 — 01)</span></div>
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow reveal">Independent studio <span>—</span> EST. 2024</p>
              <h1 id="hero-title" className="hero-title reveal reveal-delay-1">Make room<br /><em>for the</em> strange.</h1>
              <p className="hero-intro reveal reveal-delay-2">WYRD is an independent design and technology studio for people building what does not exist yet.</p>
              <a className="text-link reveal reveal-delay-3" href="#studio">Enter the studio <MoveDown size={16} /></a>
            </div>
            <div className="hero-visual" data-cursor="explore">
              <ThreeLoader variant="hero" />
            </div>
          </div>
          <div className="hero-footer"><span>Scroll to explore</span><span className="scroll-line" /><span>Selected thinking / 2024—25</span></div>
        </section>

        <section className="statement section-pad" id="studio" aria-labelledby="statement-title">
          <div className="section-marker reveal"><span>01</span><span>Studio</span></div>
          <div className="statement-layout">
            <h2 id="statement-title" className="statement-title reveal">The best work<br />starts with a <em>better</em><br />question.</h2>
            <div className="statement-side reveal reveal-delay-1">
              <p>We work at the edges of design, technology, and culture — where the brief is still becoming clear.</p>
              <p>Our role is to make the unfamiliar feel inevitable. To turn the quiet hunch into something people can see, use, and remember.</p>
              <a className="text-link" href="#capabilities">What we make <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="capabilities section-pad" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-marker reveal"><span>02</span><span>Capabilities</span></div>
          <div className="section-heading-row reveal"><h2 id="capabilities-title">From first<br /><em>principle</em> to<br />final detail.</h2><p>One studio, three ways to make an idea real.</p></div>
          <div className="capability-list">
            {capabilities.map((capability) => (
              <article className="capability-row reveal" key={capability.number} data-cursor="explore">
                <span className="capability-number">{capability.number}</span>
                <h3>{capability.title}</h3>
                <p>{capability.copy}</p>
                <div className="capability-tags">{capability.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <Plus className="capability-plus" size={20} />
              </article>
            ))}
          </div>
        </section>

        <section className="approach section-pad" id="approach" aria-labelledby="approach-title">
          <div className="section-marker reveal"><span>03</span><span>Approach</span></div>
          <div className="approach-layout">
            <div className="approach-content">
              <div className="approach-intro reveal"><p className="eyebrow">A point of view</p><h2 id="approach-title">Less noise.<br /><em>More signal.</em></h2></div>
              <div className="principles">
                {principles.map(([number, title, copy]) => <article className="principle reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
              </div>
              <div className="approach-quote reveal"><span className="quote-mark">"</span><p>We do not decorate answers.<br />We design the conditions<br />for better ones.</p></div>
            </div>
            <div className="approach-visual" data-cursor="explore">
              <ThreeLoader variant="process" />
            </div>
          </div>
        </section>

        <section className="contact section-pad" id="contact" aria-labelledby="contact-title">
          <div className="section-marker reveal"><span>04</span><span>Contact</span></div>
          <div className="contact-intro contact-copy reveal">
            <p className="eyebrow">Have a good question?</p>
            <h2 id="contact-title">Let's make<br /><em>something</em><br />clear.</h2>
            <p className="lead">We want to understand what you're trying to build. The early, unfinished version is usually the most interesting — tell us where you are, and we'll take it from there.</p>
          </div>

          <div className="contact-layout">
            <aside className="contact-sidebar">
              <div className="contact-info-card glass reveal">
                <div className="label">Email</div>
                <div className="value"><a href="mailto:hello@wyrddesigns.com">hello@wyrddesigns.com</a></div>
              </div>
              <div className="contact-info-card glass reveal reveal-delay-1">
                <div className="label">Studio</div>
                <div className="value">Bangalore, India</div>
              </div>
              <div className="contact-info-card glass reveal reveal-delay-2">
                <div className="label">Response</div>
                <div className="value">Usually within two working days</div>
              </div>
              <div className="contact-visual" data-cursor="explore">
                <ThreeLoader variant="contact" />
              </div>
            </aside>

            <div className="form-wrap reveal reveal-delay-1">
              {submitted ? (
                <div className="success-message glass">
                  <div className="success-icon"><Check size={22} /></div>
                  <h3>Message received.</h3>
                  <p>Thanks for reaching out. We'll read through what you've shared and get back to you soon.</p>
                  <button className="text-link" type="button" onClick={() => setSubmitted(false)}>Send another <ArrowUpRight size={16} /></button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="enquiry-form">

                  <div className="form-group">
                    <div className="form-group-header">
                      <span className="form-group-number">01</span>
                      <h3 className="form-group-title">About you</h3>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="name">Full name <span>*</span></label>
                        <input id="name" name="name" type="text" autoComplete="name" placeholder="Your name" />
                      </div>
                      <div className="field">
                        <label htmlFor="email">Email address <span>*</span></label>
                        <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="phone">Phone number</label>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
                      </div>
                      <div className="field">
                        <label>Preferred contact method</label>
                        <OptionChips name="contactMethod" options={contactMethods} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group-header">
                      <span className="form-group-number">02</span>
                      <h3 className="form-group-title">About the project</h3>
                    </div>
                    <div className="form-row form-row-single">
                      <div className="field">
                        <label>What are you looking to make? <span>*</span></label>
                        <OptionChips name="projectType" options={projectTypes} />
                      </div>
                    </div>
                    <div className="form-row form-row-single">
                      <div className="field">
                        <label htmlFor="description">Tell us about the project <span>*</span></label>
                        <textarea id="description" name="description" rows={4} placeholder="What are you trying to build, change, solve, or explore?" />
                      </div>
                    </div>
                    <div className="form-row form-row-single">
                      <div className="field">
                        <label htmlFor="goals">What would make this project successful?</label>
                        <textarea id="goals" name="goals" rows={3} placeholder="The outcome that would make this worth doing." />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group-header">
                      <span className="form-group-number">03</span>
                      <h3 className="form-group-title">Timing & context</h3>
                    </div>
                    <div className="form-row form-row-single">
                      <div className="field">
                        <label>Where are you currently?</label>
                        <OptionChips name="projectStage" options={projectStages} />
                      </div>
                    </div>
                    <div className="form-row form-row-single">
                      <div className="field">
                        <label>When are you hoping to begin?</label>
                        <OptionChips name="timeline" options={timelines} />
                      </div>
                    </div>
                    <div className="form-row form-row-single">
                      <div className="field">
                        <label>Do you have a working budget range?</label>
                        <OptionChips name="budget" options={budgets} />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group-header">
                      <span className="form-group-number">04</span>
                      <h3 className="form-group-title">A few more things</h3>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="company">Company / organisation</label>
                        <input id="company" name="company" type="text" autoComplete="organization" placeholder="Optional" />
                      </div>
                      <div className="field">
                        <label htmlFor="role">Role / position</label>
                        <input id="role" name="role" type="text" placeholder="Optional" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="field">
                        <label htmlFor="website">Website / existing presence</label>
                        <input id="website" name="website" type="url" placeholder="Optional" />
                      </div>
                      <div className="field">
                        <label htmlFor="refs">Reference links / inspiration</label>
                        <input id="refs" name="refs" type="text" placeholder="Optional" />
                      </div>
                    </div>
                    <div className="form-row form-row-single">
                      <div className="field">
                        <label>How did you find WYRD?</label>
                        <OptionChips name="source" options={sources} />
                      </div>
                    </div>
                  </div>

                  {formError && <div className="form-error-banner" role="alert">{formError}</div>}

                  <div className="form-footer">
                    <p className="form-closing">Good work usually starts<br />with a good <em>conversation.</em></p>
                    <button className="submit-button" type="submit" disabled={submitting}>
                      {submitting ? 'Sending...' : 'Start the conversation'} <ArrowUpRight size={17} />
                    </button>
                  </div>

                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-pad"><div className="footer-top"><a className="brand" href="#top" aria-label="Back to top"><img src="/assets/images/Logo_Design_Black_final.png" alt="WYRD Designs" /></a><a className="text-link" href="#top">Back to top <ArrowUpRight size={16} /></a></div><div className="footer-bottom"><span>(c) 2024 WYRD Designs</span><span>Made with curiosity in Bangalore</span><a href="mailto:hello@wyrddesigns.com">Email us <ArrowUpRight size={14} /></a></div></footer>

      <ChatAssistant open={chatOpen} onToggle={() => setChatOpen((o) => !o)} />
    </div>
  );
}

function OptionChips({ name, options }: { name: string; options: string[] }) {
  const [selected, setSelected] = useState<string>('');
  return (
    <div className="option-group" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const id = `${name}-${option.replace(/\s+/g, '-').toLowerCase()}`;
        return (
          <label key={option} className={`option-chip ${selected === option ? 'selected' : ''}`}>
            <input
              type="radio"
              name={name}
              value={option}
              id={id}
              checked={selected === option}
              onChange={() => setSelected(option)}
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}

interface ChatMessage {
  role: 'wyrd' | 'user';
  text: string;
}

const chatSuggestions = [
  'What does WYRD do?',
  'How do you approach a project?',
  'Are you the right studio for me?',
];

const wyrdResponses: Record<string, string> = {
  'what does wyrd do?': 'WYRD works across three connected capabilities: identity systems, digital experiences, and creative technology. We design and build the visual language, interfaces, and technical systems that give ambitious ideas a precise place in the world.',
  'how do you approach a project?': 'We start where the obvious answer ends. Our approach is built on three principles: look closer, make it legible, and build with intent. We design the conditions for better answers rather than decorating the first one.',
  'are you the right studio for me?': 'If you are building something that does not exist yet, or trying to make the unfamiliar feel inevitable, we are probably a good fit. The best way to find out is to start a conversation through the contact form.',
};

function ChatAssistant({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'wyrd', text: 'A guide to the WYRD studio. Ask about what we do, how we think, or whether we might be right for your project.' },
  ]);
  const [input, setInput] = useState('');
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { role: 'user', text: trimmed };
    const key = trimmed.toLowerCase();
    const response =
      wyrdResponses[key] ??
      "I don't have that information. I can tell you about WYRD's capabilities, approach, or whether we might be a fit for your project. For anything else, reach out through the contact form.";
    setMessages((prev) => [...prev, userMsg, { role: 'wyrd', text: response }]);
    setInput('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      <button
        className={`chat-launcher ${open ? 'active' : ''}`}
        onClick={onToggle}
        aria-label={open ? 'Close studio guide' : 'Open studio guide'}
        aria-expanded={open}
      >
        {open ? <X size={20} /> : <Sparkles size={20} />}
      </button>

      <div className={`chat-panel ${open ? 'open' : ''}`} role="dialog" aria-label="WYRD studio guide">
        <div className="chat-header">
          <div className="chat-title">
            <span>WYRD Guide</span>
            <span>Studio assistant</span>
          </div>
          <button className="chat-close" onClick={onToggle} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role}`}>{msg.text}</div>
          ))}
          <div ref={messagesEnd} />
        </div>
        {messages.length <= 1 && (
          <div className="chat-suggestions">
            {chatSuggestions.map((s) => (
              <button key={s} className="chat-suggestion" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        )}
        <form className="chat-input-row" onSubmit={handleSubmit}>
          <input
            className="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            aria-label="Message"
          />
          <button className="chat-send" type="submit" aria-label="Send">
            <Send size={16} />
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
