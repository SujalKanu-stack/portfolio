import { JOURNEY, JourneyItem } from "@/data/content";

export default function Journey() {
  const categories: JourneyItem["category"][] = ["Education", "Hackathon", "Certification"];

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-16 md:py-24 px-6 max-w-5xl mx-auto border-t border-white/5"
    >
      <div className="mb-10">
        <h2
          id="journey-heading"
          className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-2"
        >
          Academic & Technical Journey
        </h2>
        <p className="text-sm sm:text-base text-slate-400">
          Formal university study, competitive engineering hackathons, and certified coursework.
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => {
          const items = JOURNEY.filter((item) => item.category === category);
          if (items.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00D8F6] mb-4">
                {category === "Hackathon" ? "National Hackathons" : category}
              </h3>

              <div className="divide-y divide-white/5 border-y border-white/5">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                  >
                    {/* Year on the left */}
                    <div className="sm:col-span-3 text-xs font-mono text-slate-400 font-medium">
                      {item.year}
                    </div>

                    {/* Content on the right */}
                    <div className="sm:col-span-9">
                      <h4 className="text-sm font-bold text-slate-200">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#00D8F6]/80 font-medium mt-0.5">
                        {item.institution}
                        {item.location && ` &bull; ${item.location}`}
                      </p>
                      {item.details && (
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {item.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
