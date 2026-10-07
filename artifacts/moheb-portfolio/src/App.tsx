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
  'I build high-performance, modern Flutter applications that bridge the gap between stunning visual aesthetics and frictionless user experience. Drawing from complex projects like an offline-first location-aware engine and a dynamic e-library with real-time cloud sync, I ensure your users never feel lost—delivering high-reliability mobile solutions that startups and growing businesses can trust from day one.';

const programmingLanguages = ['Dart', 'Java', 'C++', 'Python', 'JavaScript', 'PHP', 'SQL', 'HTML5', 'CSS3'];
const frameworksAndTools = [
  'Flutter',
  'SQLite / Floor ORM',
  'GetX',
  'Firebase Auth', 
  'Cloud Firestore',
  'OpenStreetMap API',
  'Git',
  'GitHub',
  'Android Studio',
  'VS Code',
];

const cosmicBadges = ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Android Studio', 'Git/GitHub'];
const geoNotesBadges = ['Flutter', 'Dart', 'SQLite', 'Floor ORM', 'GetX', 'OpenStreetMap', 'Geolocator', 'Accelerometer'];

const cosmicGalleryItems = [
  {
    label: 'Splash screen',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/splash-screen.png`,
    alt: 'Cosmic I Book splash screen with a glowing purple bookmark and galaxy background',
  },
  {
    label: 'Auth screen',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/auth-screen.png`,
    alt: 'Cosmic I Book create account screen with rounded form fields over a starry purple background',
  },
  {
    label: 'Auth loading',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/auth-loading.png`,
    alt: 'Cosmic I Book account creation loading state with a purple animated spinner',
  },
  {
    label: 'Book catalog',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/book-catalog.png`,
    alt: 'Cosmic Archive book catalog showing a two-column collection of book covers',
  },
  {
    label: 'Search feature',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/search-feature.png`,
    alt: 'Cosmic Archive filtered search view showing Atomic Habits for the query atom',
  },
];

const geoNotesGalleryItems = [
  {
    label: 'Resolved feed',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/geonotes/showing_multi_Notes.png`,
    alt: 'Geo Notes main feed displaying note cards with resolved address badges',
  },
  {
    label: 'Map picker',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/geonotes/choosing_location_custome_map.jpeg`,
    alt: 'Interactive OpenStreetMap location picker with confirm CTA button',
  },
  {
    label: 'Async loading',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/geonotes/writting_note.png`,
    alt: 'Deferred geocoding loading state card displaying a Loading badge',
  },
  {
    label: 'Error handling',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/geonotes/if_a_location_failed.jpeg`,
    alt: 'Network timeout fallback card displaying a red Retry action button',
  },
  {
    label: 'Optimistic undo',
    src: `${import.meta.env.BASE_URL}portfolio-project-images/geonotes/undo_button_of_delete_single_note.png`,
    alt: 'GetX snackbar notification with Undo action following swipe deletion',
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
      { rootMargin: '-25% 0px -55% 0px', threshold: [0.08, 0.3, 0.7] }
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
      { threshold: 0.12 }
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
               View Featured Projects <ArrowDownRight size={15} />
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
              <img
                className="profile-placeholder"
                src={`${import.meta.env.BASE_URL}portfolio-project-images/profile.jpeg`}
                alt="Moheb Yasser"
              />
            </div>
          </div>
          <div className="self-end reveal-on-scroll md:pb-2">
            <p className="display text-2xl leading-[1.35] tracking-[-.035em] text-[#dbe8f4] md:text-3xl" data-testid="text-about-intro">
               Hello, I'm Moheb Yasser.
            </p>
            <div className="mt-7 space-y-5 text-[15px] leading-8 text-[#9aa8bc]" data-testid="text-about-body">
               <p>I am a Flutter Developer and a Software Engineering student at Modern Academy, Graduation: May 2028.</p>
               <p>I believe an application can have the cleanest code and the most stunning modern theme in the world, but if the user feels lost, the system has failed. That is why my core philosophy as a developer is rooted in empathy and proactive UX guidance.</p>
               <p>From engineering offline-first architectures like Geo Notes with Floor ORM and OpenStreetMap geocoding to building Cosmic I Book with real-time cloud sync, I focus heavily on designing resilient UI flows and robust data pipelines that guide users seamlessly.</p>
               <p>Behind every user-friendly interface is a foundation of rigorous engineering discipline. As a Computer Science student at Modern Academy with a 3.44 GPA, I ground my development work in core computer science theory.</p>
               <p>Having solved over 117+ algorithmic problems in C++ on CodeForces, I approach every mobile architecture challenge, state-management hurdle, and database pipeline with analytical precision and high reliability.</p>
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
            <div className="section-label">02 / Featured projects</div>
            <h2 className="section-title display mt-7 font-medium">Production-grade mobile builds.</h2>
          </div>
        </div>

        {/* PROJECT 1: GEO NOTES */}
        <article className="project-panel mt-12 overflow-hidden reveal-on-scroll" data-testid="card-project-geo-notes">
          <div className="grid lg:grid-cols-[1.03fr_.97fr]">
            <div className="project-visual flex items-center justify-center gap-2 px-5 py-16 sm:gap-4 sm:px-10">
              {geoNotesGalleryItems.map((item, index) => (
                <div key={item.src} className={`device ${index === 0 || index === 4 ? 'hidden sm:block' : ''}`} data-testid={`frame-geonotes-gallery-${index}`}>
                  <div className="device-screen">
                    <img src={item.src} alt={item.alt} loading="lazy" />
                  </div>
                  <div className="device-caption">{item.label}</div>
                </div>
              ))}
              <div className="absolute bottom-5 left-6 mono text-[9px] uppercase tracking-[.15em] text-[#5f7992]">Geo Notes / system study</div>
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="mono text-[10px] uppercase tracking-[.16em] text-[#55c9ff]">Solo Developer · Sep 2026 – Oct 2026</div>
                  <a href="https://github.com/Moheb-yasser/Geo-Note" target="_blank" rel="noreferrer" className="outline-button text-xs" data-testid="link-geonotes-github">
                    GitHub <Github size={14} />
                  </a>
                </div>
                <h3 className="display mt-5 text-4xl font-medium leading-none tracking-[-.06em] text-[#edf6fc] sm:text-5xl">
                  Geo Notes<br /><span className="text-[#92a8bd]">— Location-Aware Engine</span>
                </h3>
                <p className="mt-7 text-[15px] leading-7 text-[#aab9c9]">
                  Developed end-to-end at DEPI under the technical direction of senior architect Eng. Hany El Nemr. Built a high-performance offline-first Flutter application utilizing Floor ORM (SQLite) with pre-seeded database bootstrapping. Engineered a deferred background geolocation pipeline capturing raw GPS coordinates and lazily resolving them to human-readable addresses via OpenStreetMap APIs, preventing UI thread lock and handling network timeouts with resilient retry states. Integrated accelerometer hardware sensors for shake-to-delete gestures paired with reactive GetX state rollbacks.
                </p>
              </div>
              <div className="mt-10">
                <div className="role-line text-sm leading-6 text-[#d9e8f3]">
                  Moheb's core role: Architecture design, SQLite/Floor database engine, asynchronous geocoding pipeline, hardware gesture integration, and GetX state management.
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {geoNotesBadges.map((badge) => (
                    <span className="tag" key={badge} data-testid={`badge-geonotes-${badge.replace(/[^a-zA-Z]/g, '-').toLowerCase()}`}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid border-t border-[#8b9fb7]/15 px-7 py-6 sm:grid-cols-[.6fr_1fr] sm:px-10">
            <div className="mono text-[10px] uppercase tracking-[.16em] text-[#6f849b]">Mentorship &amp; Track</div>
            <div className="mt-4 sm:mt-0">
              <div className="team-row">
                <span className="text-sm text-[#55c9ff]">Moheb Yasser</span>
                <span className="mono text-[10px] text-[#758da6]">Solo Mobile Architect</span>
              </div>
              <div className="team-row">
                <span className="text-sm text-[#dce7f1]">Eng. Hany El Nemr</span>
                <span className="mono text-[10px] text-[#758da6]">Technical Direction (20+ YOE)</span>
              </div>
            </div>
          </div>
        </article>

        {/* PROJECT 2: COSMIC I BOOK */}
        <article className="project-panel mt-16 overflow-hidden reveal-on-scroll" data-testid="card-project-cosmic-library">
          <div className="grid lg:grid-cols-[1.03fr_.97fr]">
            <div className="project-visual flex items-center justify-center gap-2 px-5 py-16 sm:gap-4 sm:px-10">
              {cosmicGalleryItems.map((item, index) => (
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
                <div className="flex items-center justify-between gap-4">
                  <div className="mono text-[10px] uppercase tracking-[.16em] text-[#55c9ff]">Co-Developer · Feb 2026 – Apr 2026</div>
                  <a href="https://github.com/Moheb-yasser/cosmic-library" target="_blank" rel="noreferrer" className="outline-button text-xs" data-testid="link-project-github">
                    GitHub <Github size={14} />
                  </a>
                </div>
                <h3 className="display mt-5 text-4xl font-medium leading-none tracking-[-.06em] text-[#edf6fc] sm:text-5xl">
                  Cosmic I Book<br /><span className="text-[#92a8bd]">— Mobile E-Library</span>
                </h3>
                <p className="mt-7 text-[15px] leading-7 text-[#aab9c9]">
                  Engineered a scalable Flutter application separating views, data models (Book), reusable UI components, and global themes, integrating custom typography via google_fonts and vector assets (flutter_svg) to support a catalog of 7+ dynamic categories. Implemented robust user authentication workflows and real-time cloud data synchronization using Firebase Auth and Cloud Firestore. Designed custom form fields with dynamic floating overlay error validation bubbles and an animated loading indicator. Integrated production-grade document packages (syncfusion_flutter_pdfviewer) for seamless in-app digital reading alongside real-time search filtering.
                </p>
              </div>
              <div className="mt-10">
