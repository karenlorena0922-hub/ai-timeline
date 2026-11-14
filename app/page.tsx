import timeline from "@/Data/timeline.json";
import { Timeline, type TimelineEvent } from "@/components/Timeline";
import { Aurora } from "@/components/ui/Aurora";

const events = timeline.events as TimelineEvent[];

export default function Home() {
  return (
    <div className="font-display relative isolate flex flex-1 flex-col overflow-hidden bg-background text-foreground antialiased">
      <Aurora className="pointer-events-none h-[720px] opacity-70" />
      <main className="relative">
        <Timeline title={timeline.title} events={events} />
      </main>
    </div>
  );
}
