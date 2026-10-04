import { JOURNEY, JourneyItem, SECTIONS } from "@/data/content";

export default function Journey() {
  const educationItems = JOURNEY.filter((item) => item.category === "Education");
  const hackathonItems = JOURNEY.filter((item) => item.category === "Hackathon");
  const certificationItems = JOURNEY.filter((item) => item.category === "Certification");

  const renderColumn = (title: string, items: JourneyItem[]) => (
    <div className="flex flex-col h-full bg-[var(--surface)] p-5 rounded-2xl border border-white/5">
      <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent)] mb-3 pb-2 border-b border-white/5">
        {title}
      </h3>

      <div className="space-y-4 my-auto">
        {items.map((item, idx) => (
          <div key={idx} className="flex gap-3 items-baseline">
            <span className="text-[10px] font-mono text-[var(--muted-dark)] font-semibold flex-shrink-0 w-16">
              {item.year.includes(" - ") ? "2023 - Pres" : item.year}
            </span>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[var(--text)] truncate">
                {item.title}
              </h4>
              <p className="text-[11px] text-[var(--muted)] truncate">
                {item.institution}
              </p>
              {item.details && (
                <p className="text-[10px] text-[var(--muted-dark)] line-clamp-2 mt-0.5 leading-tight">
                  {item.details}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="screen-panel w-full"
    >
      <div className="screen-panel-content max-w-[1200px] w-full mx-auto px-6 md:px-12">
        <div className="mb-4">
          <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold">
            {SECTIONS[3].eyebrow}
          </span>
          <h2
            id="journey-heading"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]"
          >
            Academic & Competitive Journey
          </h2>
        </div>

        {/* 3 Equal Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {renderColumn("Education", educationItems)}
          {renderColumn("National Hackathons", hackathonItems)}
          {renderColumn("Certifications", certificationItems)}
        </div>
      </div>
    </section>
  );
}
