"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Heading } from "@/components/ui/Heading";

export type TimelineEvent = {
  id: number;
  date: string;
  year: number;
  title: string;
  description: string;
  category: string;
  people: string[];
};

type TimelineProps = {
  title: string;
  events: TimelineEvent[];
};

const categoryThemes: Record<string, { accent: string; wash: string; dot: string }> = {
  Foundations: {
    accent: "text-violet-700",
    wash: "bg-violet-500/10",
    dot: "bg-violet-500",
  },
  Research: {
    accent: "text-sky-700",
    wash: "bg-sky-500/10",
    dot: "bg-sky-500",
  },
  Applications: {
    accent: "text-amber-700",
    wash: "bg-amber-500/12",
    dot: "bg-amber-500",
  },
  "Generative AI": {
    accent: "text-fuchsia-700",
    wash: "bg-fuchsia-500/10",
    dot: "bg-fuchsia-500",
  },
  Governance: {
    accent: "text-emerald-700",
    wash: "bg-emerald-500/10",
    dot: "bg-emerald-500",
  },
};

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  if (!month) return year;

  const formatted = new Date(Number(year), Number(month) - 1, Number(day ?? 1));
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    ...(day ? { day: "numeric" } : {}),
    year: "numeric",
  }).format(formatted);
};

export function Timeline({ title, events }: TimelineProps) {
  const [activeId, setActiveId] = useState(events[0]?.id ?? 0);
  const eventRefs = useRef<Record<number, HTMLElement | null>>({});
  const activeIndex = Math.max(0, events.findIndex((event) => event.id === activeId));
  const activeEvent = events[activeIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const firstVisible = visible[0]?.target;
        if (firstVisible instanceof HTMLElement) {
          setActiveId(Number(firstVisible.dataset.eventId));
        }
      },
      { rootMargin: "-25% 0px -60%", threshold: 0 },
    );

    Object.values(eventRefs.current).forEach((event) => {
      if (event) observer.observe(event);
    });

    return () => observer.disconnect();
  }, [events]);

  const goToEvent = (index: number) => {
    const event = events[index];
    if (!event) return;
    setActiveId(event.id);
    eventRefs.current[event.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const navigation = (
    <>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">Navigate</p>
          <p className="mt-1 text-sm font-medium text-foreground">{activeEvent?.year}</p>
        </div>
        <p className="font-mono text-xs text-muted">
          {String(activeIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
        </p>
      </div>

      <div className="relative pl-1">
        <div aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-foreground/10" />
        <div
          aria-hidden
          className="absolute left-[6px] top-3 w-[3px] rounded-full bg-foreground/65 transition-all duration-700"
          style={{ height: `${((activeIndex + 1) / events.length) * 100}%` }}
        />
        <ol className="relative space-y-1">
          {events.map((event, index) => {
            const theme = categoryThemes[event.category] ?? categoryThemes.Research;
            const isActive = event.id === activeId;

            return (
              <li key={event.id}>
                <button
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  aria-label={`Go to ${event.title}`}
                  onClick={() => goToEvent(index)}
                  className={`group flex w-full items-center gap-4 rounded-xl py-2 pl-0 text-left transition-all duration-300 ${
                    isActive ? "translate-x-1" : "hover:translate-x-1"
                  }`}
                >
                  <span
                    className={`relative z-10 size-3 shrink-0 rounded-full border-2 border-background transition-all duration-300 ${
                      isActive ? `${theme.dot} scale-125 ring-4 ring-white/70` : "bg-foreground/20"
                    }`}
                  />
                  <span
                    className={`font-mono text-xs transition-colors ${
                      isActive ? `${theme.accent} font-semibold` : "text-muted group-hover:text-foreground"
                    }`}
                  >
                    {event.year}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );

  return (
    <div className="mx-auto w-full max-w-6xl min-w-0 px-4 pb-24 sm:px-8 lg:px-12">
      <header className="mx-auto max-w-4xl pt-28 text-center sm:pt-36">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-muted">A visual history</p>
        <Heading as="h1" size="display" className="text-balance">
          {title}
        </Heading>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          Fifteen moments that shaped how we think about machines, intelligence, and the future of making.
        </p>
      </header>

      <div className="mt-12">
        <GlassCard
          as="nav"
          radius="lg"
          aria-label="Timeline years"
          className="fixed left-5 top-1/2 z-50 hidden w-[170px] -translate-y-1/2 p-5 xl:block"
        >
          {navigation}
        </GlassCard>

        <div className="xl:hidden">
          <GlassCard
            as="nav"
            radius="full"
            aria-label="Timeline navigation"
            className="fixed inset-x-3 top-3 z-50 flex items-center gap-2 p-2 shadow-lg sm:inset-x-5"
          >
            <Button
              size="icon"
              aria-label="Previous event"
              onClick={() => goToEvent(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="shrink-0 disabled:pointer-events-none disabled:opacity-35"
            >
              <span aria-hidden className="text-lg leading-none">←</span>
            </Button>
            <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {events.map((event, index) => (
                <button
                  key={event.id}
                  type="button"
                  aria-current={event.id === activeId ? "step" : undefined}
                  aria-label={`Go to ${event.title}`}
                  onClick={() => goToEvent(index)}
                  className={`min-w-12 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
                    event.id === activeId ? "bg-foreground text-background" : "text-muted hover:bg-white/60 hover:text-foreground"
                  }`}
                >
                  {event.year}
                </button>
              ))}
            </div>
            <Button
              size="icon"
              aria-label="Next event"
              onClick={() => goToEvent(activeIndex + 1)}
              disabled={activeIndex === events.length - 1}
              className="shrink-0 disabled:pointer-events-none disabled:opacity-35"
            >
              <span aria-hidden className="text-lg leading-none">→</span>
            </Button>
          </GlassCard>
        </div>

        <main className="relative mx-auto mt-14 min-w-0 max-w-4xl xl:mt-0">
          <div aria-hidden className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-transparent via-foreground/15 to-transparent" />
          <div className="space-y-10 sm:space-y-16">
            {events.map((event, index) => {
              const theme = categoryThemes[event.category] ?? categoryThemes.Research;
              const isActive = event.id === activeId;

              return (
                <article
                  key={event.id}
                  id={`event-${event.id}`}
                  data-event-id={event.id}
                  ref={(element) => {
                    eventRefs.current[event.id] = element;
                  }}
                  className="relative grid min-w-0 grid-cols-[28px_minmax(0,1fr)] items-start gap-3 scroll-mt-32 sm:grid-cols-[32px_minmax(0,1fr)] sm:gap-4"
                >
                  <div className="relative z-10 mt-8 flex size-7 items-center justify-center rounded-full border border-background bg-background shadow-sm sm:size-8">
                    <span className={`size-2.5 rounded-full ${theme.dot} transition-transform duration-500 ${isActive ? "scale-125" : "scale-75"}`} />
                  </div>

                  <GlassCard
                    radius="lg"
                    className={`timeline-card w-full min-w-0 max-w-full break-words relative overflow-hidden p-4 transition-all duration-700 sm:p-8 ${
                      isActive
                        ? `timeline-focus ring-1 ring-foreground/10 ${theme.wash}`
                        : "opacity-70 hover:opacity-100"
                    }`}
                    onPointerMove={(pointerEvent) => {
                      const card = pointerEvent.currentTarget;
                      const bounds = card.getBoundingClientRect();
                      const x = (pointerEvent.clientX - bounds.left) / bounds.width - 0.5;
                      const y = (pointerEvent.clientY - bounds.top) / bounds.height - 0.5;
                      card.style.setProperty("--timeline-rotate-x", `${y * -5}deg`);
                      card.style.setProperty("--timeline-rotate-y", `${x * 5}deg`);
                    }}
                    onPointerLeave={(pointerEvent) => {
                      pointerEvent.currentTarget.style.setProperty("--timeline-rotate-x", "0deg");
                      pointerEvent.currentTarget.style.setProperty("--timeline-rotate-y", "0deg");
                    }}
                  >
                    <span aria-hidden className={`pointer-events-none absolute -right-3 -top-8 hidden text-[120px] font-semibold leading-none tracking-[-0.08em] opacity-[0.06] sm:block ${theme.accent}`}>
                      {event.year}
                    </span>
                    <div className="relative flex flex-wrap items-center justify-between gap-2 sm:gap-4">
                      <span className={`max-w-full rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] sm:px-3 sm:text-[11px] sm:tracking-[0.16em] ${theme.accent}`}>
                        {event.category}
                      </span>
                      <span className="font-mono text-[10px] text-muted sm:text-[11px]">CHAPTER {String(index + 1).padStart(2, "0")}</span>
                    </div>

                    <time dateTime={event.date} className="relative mt-5 block font-mono text-xs text-muted sm:mt-6 sm:text-sm">
                      {formatDate(event.date)}
                    </time>
                    <Heading as="h2" size="card" className="relative mt-2 max-w-2xl text-balance">
                      {event.title}
                    </Heading>
                    <p className="relative mt-4 max-w-2xl text-[13px] leading-6 text-muted sm:text-[15px]">
                      {event.description}
                    </p>

                    {event.people.length > 0 && (
                      <div className="relative mt-7 border-t border-hairline pt-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">People</p>
                        <p className="mt-2 text-sm text-foreground/80">{event.people.join(" · ")}</p>
                      </div>
                    )}
                  </GlassCard>
                </article>
              );
            })}
          </div>
        </main>
      </div>

      <footer className="mx-auto mt-24 max-w-xl text-center sm:mt-32">
        <p className="text-sm leading-6 text-muted">The story continues. Each milestone is a reminder that progress is built one thoughtful experiment at a time.</p>
      </footer>
    </div>
  );
}
