const Journal = () => {
  const articles = [
    {
      id: 1,
      img: "/images/journals/physical_profiling.jpg",
      alt: "Physical profiling of cricket players",
      tag: "Fitness",
      title: "Physical Profiling of International Cricket Players",
      source: "BMC Sports Science",
      year: "2021",
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8670808/",
    },
    {
      id: 2,
      img: "/images/journals/individual_and_team_performance.jpg",
      alt: "Team performance in cricket",
      tag: "Performance",
      title: "Individual and Team Performance in Cricket",
      source: "Royal Society Open Science",
      year: "2024",
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11251777/",
    },
    {
      id: 3,
      img: "/images/journals/modelling_career_trajectorie.jpg",
      alt: "Career trajectories of cricket players",
      tag: "Analytics",
      title: "Modelling Career Trajectories of Cricket Players",
      source: "arXiv",
      year: "2019",
      link: "https://arxiv.org/abs/1903.07218",
    },
    {
      id: 4,
      img: "/images/journals/Donald_Steve.jpg",
      alt: "Donald Bradman and Steven Smith",
      tag: "Batting",
      title: "Donald Bradman and Steven Smith: What Are Their Secrets?",
      source: "BMJ Open Sport & Exercise Medicine",
      year: "2020",
      link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7047504/",
    },
  ];

  return (
    <section
      id="journal"
      className="py-10 sm:py-14 lg:py-20"
      style={{
        backgroundColor: "#EDE8DE",
        borderTop: "1px solid #D0C9BA",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10">
          <div>
            <p
              className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{
                color: "#C4954A",
                fontFamily: "Outfit, sans-serif",
              }}
            >
              Research Library
            </p>

            <h2
              className="leading-tight"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 500,
                color: "#1C1A17",
              }}
            >
              Cricket Research Papers
            </h2>
          </div>

          <a
            href="https://scholar.google.com/scholar?q=cricket+research"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 sm:mt-0 text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
            style={{
              color: "#1C1A17",
              fontFamily: "Outfit, sans-serif",
            }}
          >
            View More →
          </a>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {/* ✅ Fixed: Image container with overflow hidden and proper sizing */}
              <div
                className="relative overflow-hidden rounded-sm mb-4 bg-stone-200"
                style={{ aspectRatio: "3 / 2" }}
              >
                <img
                  src={article.img}
                  alt={article.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    minWidth: '100%',
                    minHeight: '100%',
                  }}
                />
              </div>

              <div
                className="text-xs font-medium tracking-widest uppercase mb-2"
                style={{
                  color: "#C4954A",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {article.tag}
              </div>

              <h3
                className="text-lg font-medium leading-snug mb-2 group-hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#1C1A17",
                }}
              >
                {article.title}
              </h3>

              <p
                className="text-xs"
                style={{
                  color: "#7A7468",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {article.source} • {article.year}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;