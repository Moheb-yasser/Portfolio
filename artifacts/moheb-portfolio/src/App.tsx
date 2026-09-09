import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const usp =
  'I build high-performance, modern Flutter applications that bridge the gap between stunning visual aesthetics and frictionless user experience. Drawing from complex projects like a dynamic e-library with multi-state form validation and real-time cloud sync, I ensure your users never feel lost—delivering high-reliability mobile solutions that startups and growing businesses can trust from day one.';

const programmingLanguages = ['Dart', 'Java', 'C++', 'Python', 'JavaScript', 'PHP', 'SQL', 'HTML5', 'CSS3'];
const frameworksAndTools = ['Flutter', 'Firebase Auth', 'Cloud Firestore', 'Git', 'GitHub', 'Android Studio', 'VS Code'];
const projectBadges = ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Android Studio', 'Git/GitHub'];
const galleryItems = [
  {
    label: 'Splash screen',
    src: '/portfolio-project-images/splash-screen.png',
    alt: 'Cosmic I Book splash screen with a glowing purple book mark and galaxy background',
  },
  {
    label: 'Auth screen',
    src: '/portfolio-project-images/auth-screen.png',
    alt: 'Cosmic I Book create account screen with rounded form fields over a starry purple background',
  },
  {
    label: 'Auth loading',
    src: '/portfolio-project-images/auth-loading.png',
    alt: 'Cosmic I Book account creation loading state with a purple animated spinner',
  },
  {
    label: 'Book catalog',
    src: '/portfolio-project-images/book-catalog.png',
    alt: 'Cosmic Archive book catalog showing a two-column collection of book covers',
  },
  {
    label: 'Search feature',
    src: '/portfolio-project-images/search-feature.png',
    alt: 'Cosmic Archive filtered search view showing Atomic Habits for the query atom',
  },
];
const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.08, 0.3, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal-on-scroll').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const message = String(form.get('message') ?? '');
    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    setSent(true);
    window.location.href = `mailto:mohebyasser280@gmail.com?subject=${subject}&body=${body}`;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell grain">
      <header className="nav-shell fixed inset-x-0 top-0 z-20" data-testid="header-navigation">
        <div className="container-wide flex h-[72px] items-center justify-between">
          <a href="#home" onClick={closeMenu} className="display flex items-center gap-3" data-testid="link-home-logo">
            <span className="grid h-8 w-8 place-items-center rounded border border-[#55c9ff]/60 bg-[#55c9ff]/10 text-sm font-semibold text-[#55c9ff]">MY</span>
            <span className="hidden text-sm font-semibold tracking-wide text-[#e7edf6] sm:block">Moheb Yasser</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link mono text-[11px] uppercase tracking-[.11em] ${activeSection === item.id ? 'active' : ''}`}
                data-testid={`link-nav-${item.id}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="outline-button hidden min-h-9 px-4 text-[10px] md:inline-flex" data-testid="button-header-contact">
            Start a conversation <ArrowUpRight size={14} />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 place-items-center border border-[#8b9fb7]/25 text-[#c6d5e5] md:hidden"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="container-wide border-t border-[#8b9fb7]/15 py-4 md:hidden" aria-label="Mobile navigation">
            {navigationItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={closeMenu} className="nav-link mono block py-3 text-xs uppercase tracking-[.14em]" data-testid={`link-mobile-nav-${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="home" className="relative flex min-h-[760px] items-end overflow-hidden pb-20 pt-36 md:min-h-[860px] md:pb-28" data-testid="section-home">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow" />
         {/* Portrait drop-in: add /portfolio-project-images/profile.jpg in the hero avatar frame below when ready. */}
         <div className="hero-profile-frame absolute bottom-28 right-[7vw] z-[1] hidden lg:grid" aria-label="Profile Photo Placeholder">
           <span>Profile Photo<br />Placeholder</span>
         </div>
        <div className="container-wide relative z-[1]">
          <div className="eyebrow reveal delay-1">Flutter developer / software engineering student</div>
          <h1 className="hero-title display mt-8 max-w-5xl font-semibold reveal delay-2" data-testid="text-hero-title">
            Building apps<br />
            <span className="outlined">people can</span><br />
            <span className="accent">trust.</span>
          </h1>
          <div className="mt-10 grid max-w-5xl gap-8 border-t border-[#8b9fb7]/20 pt-6 md:grid-cols-[1fr_1.4fr] md:items-end reveal delay-3">
            <p className="mono max-w-[260px] text-[11px] leading-6 text-[#8ea3ba]" data-testid="text-hero-kicker">
              High-reliability mobile work for startups and growing businesses.
            </p>
            <p className="max-w-2xl text-base leading-7 text-[#b3c1d2] md:text-lg md:leading-8" data-testid="text-hero-usp">{usp}</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 reveal delay-4">
            <a href="#projects" className="solid-button" data-testid="button-view-project">
               View Cosmic Library <ArrowDownRight size={15} />
            </a>
            <a href="#contact" className="outline-button" data-testid="button-hero-contact">
               Get in Touch <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="mt-20 flex items-center gap-3 text-[#627991] reveal delay-4">
            <span className="h-9 w-px bg-[#55c9ff]" />
            <span className="mono text-[10px] uppercase tracking-[.15em]">Scroll to explore</span>
          </div>
        </div>
      </section>

      <section id="about" className="container-wide scroll-mt-24 py-28 md:py-40" data-testid="section-about">
        <div className="grid gap-14 md:grid-cols-[.82fr_1.18fr] md:gap-24">
          <div className="reveal-on-scroll">
            <div className="section-label">01 / About me</div>
            <h2 className="section-title display mt-7 max-w-md font-medium">About Me</h2>
            <div className="profile-card mt-12">
               {/* Portrait drop-in: add the image at /portfolio-project-images/profile.jpg when ready. */}
              <div className="profile-placeholder"><span>Profile Photo Placeholder</span></div>
              <div className="profile-card-meta">
                <span className="mono text-[10px] uppercase tracking-[.12em] text-[#7b91aa]">Based in Egypt</span>
                <span className="mono text-[10px] uppercase tracking-[.12em] text-[#55c9ff]">Available for select work</span>
              </div>
            </div>
          </div>
          <div className="self-end reveal-on-scroll md:pb-2">
            <p className="display text-2xl leading-[1.35] tracking-[-.035em] text-[#dbe8f4] md:text-3xl" data-testid="text-about-intro">
               Hello I&apos;am Moheb Yasser.
            </p>
            <div className="mt-7 space-y-5 text-[15px] leading-8 text-[#9aa8bc]" data-testid="text-about-body">
               <p>I am a Flutter Developer and a Software Engineering student at Modern Academy, Graduation: May 2028.</p>
               <p>I believe an application can have the cleanest code and the most stunning modern theme in the world, but if the user feels lost, the system has failed. That is why my core philosophy as a developer is rooted in empathy and proactive UX guidance.</p>
               <p>When I built Cosmic I Book—a dynamic mobile e-library featuring real-time cloud sync and document rendering—I focused heavily on designing intuitive UI flows, custom floating error validation bubbles, and understandable hints that guide the user every step of the way. If a user doesn&apos;t instantly know what to do next, the code isn&apos;t finished yet.</p>
               <p>Behind every user-friendly interface is a foundation of rigorous engineering discipline. As a Computer Science student at Modern Academy with a 3.44 GPA, I ground my development work in core computer science theory.</p>
               <p>However, I believe my true technical edge comes from problem-solving: having solved over 117+ algorithmic problems in C++ on CodeForces, I approach every mobile architecture challenge, state-management hurdle, and database pipeline with analytical precision and high reliability.</p>
               <p>Whether you are a startup or a growing company looking to turn a complex idea into a high-performance, user-centric mobile application, I am here to deliver. Ready to start a project? Let&apos;s connect! Send me an email at <a className="blue underline decoration-[#55c9ff]/40 underline-offset-4" href="mailto:mohebyasser280@gmail.com">mohebyasser280@gmail.com</a> with your project vision.</p>
            </div>
            <div className="mt-10 grid gap-5 border-t border-[#8b9fb7]/17 pt-6 sm:grid-cols-2">
              <div><div className="mono text-[10px] uppercase tracking-[.13em] text-[#6d839b]">Focus</div><div className="mt-2 text-sm text-[#d6e1ed]">Mobile product engineering</div></div>
              <div><div className="mono text-[10px] uppercase tracking-[.13em] text-[#6d839b]">Approach</div><div className="mt-2 text-sm text-[#d6e1ed]">Clarity over complexity</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="container-wide scroll-mt-24 py-28 md:py-36" data-testid="section-projects">
        <div className="flex flex-wrap items-end justify-between gap-6 reveal-on-scroll">
          <div>
            <div className="section-label">02 / Featured project</div>
            <h2 className="section-title display mt-7 font-medium">One deep build.</h2>
          </div>
          <a href="https://github.com/Moheb-yasser/cosmic-library" target="_blank" rel="noreferrer" className="outline-button" data-testid="link-project-github">
            View on GitHub <Github size={15} />
          </a>
        </div>

        <article className="project-panel mt-12 overflow-hidden reveal-on-scroll" data-testid="card-project-cosmic-library">
          <div className="grid lg:grid-cols-[1.03fr_.97fr]">
            <div className="project-visual flex items-center justify-center gap-2 px-5 py-16 sm:gap-4 sm:px-10">
              {galleryItems.map((item, index) => (
                 <div key={item.src} className={`device ${index === 0 || index === 4 ? 'hidden sm:block' : ''}`} data-testid={`frame-gallery-${index}`}>
                  <div className="device-screen">
                     <img src={item.src} alt={item.alt} loading="lazy" />
                  </div>
                   <div className="device-caption">{item.label}</div>
                </div>
              ))}
              <div className="absolute bottom-5 left-6 mono text-[9px] uppercase tracking-[.15em] text-[#5f7992]">Cosmic I Book / interface study</div>
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
              <div>
                <div className="mono text-[10px] uppercase tracking-[.16em] text-[#55c9ff]">Co-Developer · Feb 2026 – Apr 2026</div>
                <h3 className="display mt-5 text-4xl font-medium leading-none tracking-[-.06em] text-[#edf6fc] sm:text-5xl">Cosmic I Book<br /><span className="text-[#92a8bd]">— Mobile E-Library</span></h3>
                 <p className="mt-7 text-[15px] leading-7 text-[#aab9c9]">Engineered a scalable Flutter application separating views, data models (Book), reusable UI components, and global themes, integrating custom typography via google_fonts and vector assets (flutter_svg) to support a catalog of 7+ dynamic categories. Implemented robust user authentication workflows and real-time cloud data synchronization using Firebase Auth and Cloud Firestore. Designed custom form fields with dynamic floating overlay error validation bubbles and an animated loading indicator. Integrated production-grade document packages (syncfusion_flutter_pdfviewer) for seamless in-app digital reading alongside real-time search filtering.</p>
              </div>
              <div className="mt-10">
                <div className="role-line text-sm leading-6 text-[#d9e8f3]">Moheb&apos;s core role: Flutter application development, responsive UI implementation, authentication flows, and cloud-backed state management.</div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {projectBadges.map((badge) => <span className="tag" key={badge} data-testid={`badge-project-${badge.replace(/[^a-zA-Z]/g, '-').toLowerCase()}`}>{badge}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div className="grid border-t border-[#8b9fb7]/15 px-7 py-6 sm:grid-cols-[.6fr_1fr] sm:px-10">
            <div className="mono text-[10px] uppercase tracking-[.16em] text-[#6f849b]">Three-person team</div>
            <div className="mt-4 sm:mt-0">
              <div className="team-row"><span className="text-sm text-[#dce7f1]">Menna Hamada</span><span className="mono text-[10px] text-[#758da6]">Co-developer</span></div>
              <div className="team-row"><span className="text-sm text-[#55c9ff]">Moheb Yasser</span><span className="mono text-[10px] text-[#758da6]">Core Flutter / cloud</span></div>
              <div className="team-row"><span className="text-sm text-[#dce7f1]">Hussain Farooq</span><span className="mono text-[10px] text-[#758da6]">Co-developer</span></div>
            </div>
          </div>
        </article>
      </section>

      <section id="skills" className="container-wide scroll-mt-24 py-28 md:py-36" data-testid="section-skills">
        <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-28">
          <div className="reveal-on-scroll">
            <div className="section-label">03 / Toolkit</div>
            <h2 className="section-title display mt-7 font-medium">The tools<br />behind the calm.</h2>
            <p className="mt-7 max-w-xs text-sm leading-7 text-[#8fa3b8]">A practical stack for shaping robust mobile products, from first wireframe to production handoff.</p>
          </div>
          <div className="reveal-on-scroll">
            <div className="skill-card">
              <div className="mb-5 flex items-center justify-between gap-4"><span className="mono text-[11px] uppercase tracking-[.13em] text-[#55c9ff]">01</span><h3 className="display text-xl text-[#e4edf5]">Programming Languages</h3></div>
              <div className="skill-list">{programmingLanguages.map((skill) => <span key={skill} data-testid={`skill-language-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>{skill}</span>)}</div>
            </div>
            <div className="skill-card">
              <div className="mb-5 flex items-center justify-between gap-4"><span className="mono text-[11px] uppercase tracking-[.13em] text-[#55c9ff]">02</span><h3 className="display text-xl text-[#e4edf5]">Frameworks &amp; Tools</h3></div>
              <div className="skill-list">{frameworksAndTools.map((skill) => <span key={skill} data-testid={`skill-tool-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>{skill}</span>)}</div>
            </div>
            <div className="mt-12 flex items-center gap-3 border-l-2 border-[#55c9ff] py-2 pl-4 text-sm text-[#a6b7c8]">
              <Check size={16} className="text-[#55c9ff]" /> Always learning. Always shipping with intent.
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="container-wide scroll-mt-24 py-28 md:py-40" data-testid="section-contact">
        <div className="contact-box grid gap-14 p-7 sm:p-10 md:grid-cols-[.92fr_1.08fr] md:gap-20 md:p-14 reveal-on-scroll">
          <div>
            <div className="section-label">04 / Contact</div>
            <h2 className="section-title display mt-7 font-medium">Get In Touch</h2>
            <p className="mt-6 text-xl leading-8 text-[#d7e4ef]" data-testid="text-contact-subtext">Let&apos;s build something exceptional together.</p>
            <div className="mt-12 space-y-5">
              <a href="mailto:mohebyasser280@gmail.com" className="group flex items-center gap-3 text-sm text-[#a8bbcd] transition-colors hover:text-[#55c9ff]" data-testid="link-contact-email"><Mail size={16} className="text-[#55c9ff]" /> mohebyasser280@gmail.com <ArrowUpRight size={14} className="opacity-50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
              <a href="https://www.linkedin.com/in/moheb-yasser" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-[#a8bbcd] transition-colors hover:text-[#55c9ff]" data-testid="link-contact-linkedin"><Linkedin size={16} className="text-[#55c9ff]" /> linkedin.com/in/moheb-yasser <ArrowUpRight size={14} className="opacity-50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
              <a href="https://github.com/Moheb-yasser" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-sm text-[#a8bbcd] transition-colors hover:text-[#55c9ff]" data-testid="link-contact-github"><Github size={16} className="text-[#55c9ff]" /> github.com/Moheb-yasser <ArrowUpRight size={14} className="opacity-50 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
            </div>
          </div>
          <form onSubmit={handleContactSubmit} className="space-y-7" data-testid="form-contact">
            {sent && <div className="success-note" role="status" data-testid="status-contact-success">Your message is ready to send. Your email client should open now.</div>}
            <label className="block"><span className="form-label">Name</span><input required name="name" className="field" placeholder="What should I call you?" data-testid="input-contact-name" /></label>
            <label className="block"><span className="form-label">Email</span><input required type="email" name="email" className="field" placeholder="you@company.com" data-testid="input-contact-email" /></label>
            <label className="block"><span className="form-label">Message</span><textarea required name="message" rows={4} className="field resize-none" placeholder="Tell me what you are building..." data-testid="input-contact-message" /></label>
            <button type="submit" className="solid-button w-full sm:w-auto" data-testid="button-submit-contact">Prepare email <ArrowUpRight size={15} /></button>
          </form>
        </div>
      </section>

      <footer className="container-wide border-t border-[#8b9fb7]/15 pb-8 pt-12" data-testid="footer">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div><div className="eyebrow">Available for meaningful builds</div><div className="footer-mark display mt-4">MOHEB<br />YASSER</div></div>
          <div className="flex flex-col items-start gap-4 md:items-end"><a href="#home" className="mono text-[10px] uppercase tracking-[.14em] text-[#8ca2b8] hover:text-[#55c9ff]" data-testid="link-footer-top">Back to top ↑</a><span className="mono text-[10px] text-[#536b84]">© {new Date().getFullYear()} / built with care</span></div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;