"use client";

import { useRef } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CalendarCheck, CheckCircle, HandCoins, MagnifyingGlass, MapPin, NavigationArrow, Phone, PiggyBank, ShieldCheck, Sparkle, Tooth, Translate, UserPlus, Wallet } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Reveal, Wrap, flipTheme, type Hours } from "@/components/kit";
import { Faq, HoursTable, MapFrame, useDark, useStatus } from "@/components/blocks";
import { T, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

const TEL = "tel:+14699088291", PHONE = "(469) 908-8291";
const DIR = "https://www.google.com/maps/dir/?api=1&destination=2130+W+Kingsley+Rd+Garland+TX+75041";
// Listings: Mon-Fri 8-8, Sat 8-4, Sun 8-2:30 (one directory says closed Sunday; confirm).
const HOURS: Hours = { 0: [8, 14.5], 1: [8, 20], 2: [8, 20], 3: [8, 20], 4: [8, 20], 5: [8, 20], 6: [8, 16] };
const SAY = { en: { word: "¡Hola!", hint: "ES →", label: "Cambiar a español" }, es: { word: "Hello!", hint: "EN →", label: "Switch to English" } };
const SERVICES = [
  { k: "c1", Icon: ShieldCheck, cls: "md:col-span-6 md:row-span-2", big: true },
  { k: "c2", Icon: Sparkle, cls: "md:col-span-6" },
  { k: "c3", Icon: MagnifyingGlass, cls: "md:col-span-3" },
  { k: "c4", Icon: Tooth, cls: "md:col-span-3" },
  { k: "c5", Icon: UserPlus, cls: "md:col-span-12", wide: true },
];
const PAY = [["p1", ShieldCheck], ["p2", PiggyBank], ["p3", Wallet]] as const;

const btn = "inline-flex items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 text-[15px] font-bold transition-[transform,background-color] duration-300 ease-spring hover:-translate-y-0.5 active:scale-[.97]";
const primary = cn(btn, "bg-blue text-[var(--on-blue)] shadow-[inset_0_1px_0_rgba(255,255,255,.25),0_14px_30px_-14px_var(--blue)]");
const ghost = cn(btn, "bg-card text-ink shadow-[inset_0_0_0_1px_var(--line)]");
const eyebrow = "mb-3 block text-[13px] font-extrabold tracking-[.14em] text-coral uppercase";

/** Language: a sunflower speech bubble that says hello in the other language. */
function Bubble() {
  const { lang, setLang } = useLang();
  const s = SAY[lang === "es" ? "es" : "en"];
  return (
    <button type="button" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label={s.label}
      className="relative min-w-[74px] flex-none cursor-pointer rounded-[16px_16px_16px_4px] bg-sun px-3.5 py-2 text-[14px] font-extrabold text-[#3a2a00] shadow-[0_6px_14px_-8px_var(--shadow)] transition-transform duration-300 ease-spring hover:-rotate-3 after:absolute after:-bottom-[7px] after:left-0 after:border-[7px] after:border-r-0 after:border-b-0 after:border-transparent after:border-t-sun after:border-l-sun rtl:rounded-[16px_16px_4px_16px] rtl:after:right-0 rtl:after:left-auto">
      <span key={lang} className="pop block leading-none">{s.word}</span>
      <small className="mt-0.5 block text-[10px] font-bold tracking-wide opacity-70">{s.hint}</small>
    </button>
  );
}

/** Theme: a tooth that sparkles by day and puts on a nightcap at night. */
function NightTooth() {
  const { dark, setTheme } = useDark();
  const { lang } = useLang();
  return (
    <button type="button" aria-label={lang === "es" ? "Cambiar modo oscuro" : "Toggle dark mode"} aria-pressed={dark}
      onClick={e => flipTheme(e.currentTarget, () => flushSync(() => setTheme(dark ? "light" : "dark")))}
      className="group grid size-11 flex-none cursor-pointer place-items-center rounded-full bg-card shadow-[inset_0_0_0_1px_var(--line)]">
      <svg viewBox="0 0 40 40" className="size-[30px] overflow-visible transition-transform duration-500 ease-spring group-hover:-rotate-8" aria-hidden="true">
        <path d="M13 9c-4 0-6 3-5 7 1 3 2 4 2.5 8 .6 4.5 1.3 11 3.2 11 2.5 0 2.5-9 6.3-9s3.8 9 6.3 9c1.9 0 2.6-6.5 3.2-11 .5-4 1.5-5 2.5-8 1-4-1-7-5-7-3 0-4.4 2-7 2s-4-2-7-2z" fill="#fff" stroke="var(--blue)" strokeWidth="1.6" />
        <path d="M30 6l1 2.5 2.5 1-2.5 1L30 13l-1-2.5-2.5-1 2.5-1z" fill="var(--sun)" className="transition-opacity duration-300" style={{ opacity: dark ? 0 : 1 }} />
        <g className="transition-all duration-500 ease-spring" style={{ transformOrigin: "30px 6px", transform: dark ? "none" : "translateY(-14px) rotate(-30deg)", opacity: dark ? 1 : 0 }}>
          <path d="M9 11c3-7 15-9 22-4l3 1-2 3c-6-3-15-3-23 0z" fill="var(--blue)" /><circle cx="35" cy="6" r="2.6" fill="var(--sun)" />
        </g>
      </svg>
    </button>
  );
}

/** Hero art: a big friendly tooth on a Talavera disc, with two floating notes. */
function Smile() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useT();
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".disc", { scale: 0.6, rotate: -45, opacity: 0, duration: 1.4, ease: "expo.out", delay: 0.2 });
      gsap.from(".big", { y: 60, opacity: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.4 });
      gsap.from(".chip", { scale: 0.7, opacity: 0, stagger: 0.18, duration: 0.8, ease: "back.out(2)", delay: 0.9 });
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="relative aspect-square w-full max-w-[500px]" aria-hidden="true">
      <div className="disc tiles absolute inset-[6%] rounded-full bg-tint shadow-[inset_0_0_0_1px_var(--line)]" />
      <svg viewBox="0 0 64 64" className="big float absolute inset-[22%] drop-shadow-[0_30px_40px_var(--shadow)]">
        <path d="M20 10c-6 0-9 5-8 11 1 5 3 7 4 13 1 7 2 17 5 17 4 0 4-14 11-14s7 14 11 14c3 0 4-10 5-17 1-6 3-8 4-13 1-6-2-11-8-11-5 0-7 3-12 3s-7-3-12-3z" fill="#fff" stroke="var(--blue)" strokeWidth="1.6" />
        <path d="M19 16c2-2 5-2 7-1" fill="none" stroke="#dbe5f8" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      {([["chipA", Translate, "top-[12%] -left-2 -rotate-3"], ["chipB", HandCoins, "right-0 bottom-[14%] rotate-2"]] as const).map(([k, I, pos]) => (
        <div key={k} className={cn("chip glass absolute flex w-max max-w-[260px] items-center gap-3 rounded-2xl py-3 ps-3 pe-5 shadow-[inset_0_0_0_1px_var(--line),0_24px_50px_-20px_var(--shadow)]", pos)}>
          <span className="grid size-10 flex-none place-items-center rounded-xl bg-sun text-[#3a2a00]"><I size={20} weight="bold" /></span>
          <span className="text-[15px] font-bold [&_small]:block [&_small]:text-[13px] [&_small]:font-medium [&_small]:text-soft" dangerouslySetInnerHTML={{ __html: t(k) }} />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const t = useT();
  const status = useStatus(HOURS);

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-40 px-4">
        <nav className="glass pointer-events-auto mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-3 rounded-[22px] border border-line ps-3 pe-2.5 shadow-[inset_0_1px_0_var(--hi),0_20px_50px_-28px_var(--shadow)]">
          <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label="Dentista Hispano Garland">
            <span className="relative grid size-[42px] flex-none place-items-center rounded-[13px] bg-blue text-[var(--on-blue)] after:absolute after:-top-[3px] after:-right-[3px] after:size-3 after:rounded-full after:border-2 after:border-bg after:bg-sun"><Tooth size={24} weight="fill" /></span>
            <span className="min-w-0"><b className="block font-display text-[21px] leading-none font-normal max-[400px]:text-[17px]">Dentista Hispano</b><small className="mt-0.5 block text-xs font-bold tracking-[.06em] text-soft">GARLAND, TX</small></span>
          </a>
          <div className="flex items-center gap-1 text-[15px] font-semibold max-[1040px]:hidden">
            {[["servicios", "navServices"], ["pagos", "navPay"], ["visita", "navVisit"]].map(([id, k]) => <a key={id} href={`#${id}`} className="rounded-xl px-4 py-2 text-soft transition-colors hover:bg-bg2 hover:text-ink" dangerouslySetInnerHTML={{ __html: t(k) }} />)}
          </div>
          <div className="flex flex-none items-center gap-3 max-sm:gap-2">
            <Bubble /><NightTooth />
            <a href={TEL} className={cn(primary, "px-5 py-2.5 max-sm:hidden")}><Phone size={17} weight="bold" />{PHONE}</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="relative overflow-hidden pt-16 pb-24 max-sm:pt-10">
          <Wrap className="grid grid-cols-[1.1fr_.9fr] items-center gap-12 max-[960px]:grid-cols-1">
            <div>
              <Reveal>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-1.5 text-sm font-semibold shadow-[inset_0_0_0_1px_var(--line)]">
                  <i className={cn("size-2 rounded-full", status.open ? "bg-[#22a35a] shadow-[0_0_0_4px_rgba(34,163,90,.2)]" : "bg-[#9aa3b8]")} />{status.text || " "}
                </span>
              </Reveal>
              <Reveal delay={0.08}><T k="heroTitle" as="h1" className="mb-6 text-[clamp(48px,6.4vw,88px)]" /></Reveal>
              <Reveal delay={0.16}><T k="heroLead" as="p" className="mb-9 max-w-[48ch] text-lg text-soft" /></Reveal>
              <Reveal delay={0.24} className="mb-9 flex flex-wrap gap-3">
                <a href={TEL} className={primary}><CalendarCheck size={18} weight="bold" /><T k="ctaCall" /></a>
                <a href={DIR} target="_blank" rel="noopener" className={ghost}><NavigationArrow size={18} weight="bold" /><T k="ctaDir" /></a>
              </Reveal>
              <Reveal delay={0.3} className="flex flex-wrap gap-2.5">
                {["b1", "b2", "b3"].map(k => <span key={k} className="inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-2 text-sm font-semibold shadow-[inset_0_0_0_1px_var(--line)]"><CheckCircle size={17} weight="fill" className="text-bluetext" /><T k={k} /></span>)}
              </Reveal>
            </div>
            <Reveal delay={0.1} className="w-full max-w-[500px] justify-self-end max-[960px]:justify-self-center"><Smile /></Reveal>
          </Wrap>
        </section>

        <div className="tiles bg-blue py-6 text-[var(--on-blue)]">
          <Wrap className="flex flex-wrap justify-between gap-x-6 gap-y-2 text-[17px] font-bold">
            {["band1", "band2", "band3"].map(k => <T key={k} k={k} />)}
          </Wrap>
        </div>

        <section id="servicios" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-14 max-w-[720px]"><T k="svcEyebrow" className={eyebrow} /><T k="svcTitle" as="h2" className="mb-4 text-[clamp(42px,5.6vw,72px)]" /><T k="svcLead" as="p" className="max-w-[58ch] text-[17px] text-soft" /></Reveal>
            <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-12">
              {SERVICES.map(({ k, Icon, cls, big, wide }, i) => (
                <Reveal key={k} delay={(i % 3) * 0.06} className={cn("bezel rounded-[26px] transition-transform duration-500 ease-silk hover:-translate-y-1", cls)}>
                  <MagicCard gradientSize={260} gradientColor="rgba(242,182,50,.12)" gradientFrom="#f2b632" gradientTo="#1d4ea0" className="h-full rounded-[21px] [&>div:last-child]:h-full">
                    <div className={cn("relative flex h-full gap-8 overflow-hidden p-7", big ? "flex-col justify-between bg-blue p-10 text-[var(--on-blue)]" : wide ? "items-center justify-between max-sm:flex-col max-sm:items-start" : "flex-col justify-between")}>
                      {big && <div className="tiles pointer-events-none absolute inset-0 opacity-60 [--tile:rgba(255,255,255,.08)]" />}
                      <span className={cn("relative grid flex-none place-items-center rounded-2xl", big ? "size-16 bg-white/12" : "size-12 bg-tint text-bluetext")}><Icon size={big ? 32 : 24} weight="duotone" /></span>
                      <div className={cn("relative", wide && "flex-1")}>
                        <T k={`${k}t`} as="h3" className={cn("mb-2", big ? "text-[clamp(40px,4.4vw,60px)]" : "text-[28px]")} />
                        <T k={`${k}p`} as="p" className={cn("max-w-[48ch] text-[15px]", big ? "text-[17px] opacity-80" : "text-soft")} />
                      </div>
                      {wide && <a href={TEL} className={cn(primary, "relative flex-none")}><Phone size={18} weight="bold" />{PHONE}</a>}
                    </div>
                  </MagicCard>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="pagos" className="scroll-mt-24 bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-14 max-w-[720px]"><T k="payEyebrow" className={eyebrow} /><T k="payTitle" as="h2" className="mb-4 text-[clamp(42px,5.6vw,72px)]" /><T k="payLead" as="p" className="text-[17px] text-soft" /></Reveal>
            <Reveal className="relative grid grid-cols-3 overflow-hidden rounded-[30px] bg-card shadow-[inset_0_0_0_1px_var(--line),0_40px_80px_-50px_var(--shadow)] max-[900px]:grid-cols-1">
              <BorderBeam size={220} duration={11} colorFrom="#f2b632" colorTo="#1d4ea0" borderWidth={1.5} />
              {PAY.map(([k, Icon], i) => (
                <div key={k} className={cn("p-9", i > 0 && "border-s border-line max-[900px]:border-s-0 max-[900px]:border-t")}>
                  <div className="mb-8 flex items-center justify-between"><span className="grid size-12 place-items-center rounded-2xl bg-sun text-[#3a2a00]"><Icon size={24} weight="duotone" /></span><span className="font-display text-4xl text-bluetext/30">0{i + 1}</span></div>
                  <T k={`${k}t`} as="b" className="mb-2 block font-display text-[28px] leading-tight font-normal" />
                  <T k={`${k}p`} as="p" className="text-[15px] text-soft" />
                </div>
              ))}
            </Reveal>
          </Wrap>
        </section>

        <section id="visita" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12"><T k="visitEyebrow" className={eyebrow} /><T k="visitTitle" as="h2" className="text-[clamp(42px,5.6vw,72px)]" /></Reveal>
            <div className="grid grid-cols-[.9fr_1.1fr] gap-5 max-[960px]:grid-cols-1">
              <Reveal className="bezel rounded-[26px]">
                <div className="grid h-full content-start gap-5 rounded-[21px] bg-card p-8 shadow-[inset_0_1px_0_var(--hi)]">
                  <T k="hoursTitle" as="h3" className="text-[34px]" />
                  <HoursTable hours={HOURS} accent="text-bluetext font-bold" />
                  {([[TEL, Phone, PHONE, "callSub"], [DIR, MapPin, "2130 W Kingsley Rd", null]] as const).map(([href, I, strong, sub]) => (
                    <a key={strong} href={href} target={sub ? undefined : "_blank"} rel="noopener" className="group flex items-start gap-3.5">
                      <span className="grid size-11 flex-none place-items-center rounded-xl bg-tint text-bluetext transition-transform duration-300 ease-spring group-hover:scale-110"><I size={20} weight="bold" /></span>
                      <span><strong className="block">{strong}</strong>{sub ? <T k={sub} className="text-sm text-soft" /> : <span className="text-sm text-soft">Garland, TX 75041</span>}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.08} className="bezel min-h-[440px] overflow-hidden rounded-[26px]"><MapFrame q="2130+W+Kingsley+Rd,+Garland,+TX+75041" className="min-h-[428px] rounded-[21px]" /></Reveal>
            </div>
          </Wrap>
        </section>

        <section className="bg-bg2 py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[.8fr_1.2fr] gap-14 max-[960px]:grid-cols-1">
            <Reveal><T k="faqEyebrow" className={eyebrow} /><T k="faqTitle" as="h2" className="text-[clamp(42px,5.6vw,72px)]" /></Reveal>
            <Faq ids={[1, 2, 3, 4]} accent="text-coral" />
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="relative flex items-center justify-between gap-8 overflow-hidden rounded-[36px] bg-blue px-14 py-20 text-[var(--on-blue)] max-[960px]:flex-col max-[960px]:items-start max-sm:px-7 max-sm:py-14">
              <div className="tiles pointer-events-none absolute inset-0 opacity-70 [--tile:rgba(255,255,255,.07)]" />
              <div className="relative"><T k="ctaTitle" as="h2" className="mb-3 text-[clamp(44px,6vw,80px)]" /><T k="ctaLead" as="p" className="text-lg opacity-80" /></div>
              <a href={TEL} className={cn(btn, "relative flex-none bg-sun px-8 py-4 text-lg text-[#3a2a00]")}><Phone size={20} weight="bold" />{PHONE}</a>
            </Reveal>
          </Wrap>
        </section>
      </main>

      <footer className="pb-28 text-sm text-soft">
        <Wrap><div className="flex flex-wrap justify-between gap-3.5 border-t border-line pt-6"><span>© {new Date().getFullYear()} Dentista Hispano Garland · 2130 W Kingsley Rd, Garland, TX 75041</span><a href={TEL}>{PHONE}</a></div></Wrap>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-2xl p-1.5 shadow-[inset_0_0_0_1px_var(--line)] max-sm:flex">
        <a href={TEL} className={cn(primary, "flex-1 py-3")}><T k="barCall" /></a>
        <a href={DIR} target="_blank" rel="noopener" className={cn(ghost, "flex-1 py-3")}><T k="barDir" /></a>
      </div>
    </>
  );
}
