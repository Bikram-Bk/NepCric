const Marquee = () => {
  return (
    <div
      className="overflow-hidden py-3.5"
      style={{ backgroundColor: "#2C2A26", borderTop: "1px solid #3C3A36" }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className="mx-8 text-xs font-medium tracking-widest uppercase"
            style={{ color: "#C4954A", fontFamily: "Outfit, sans-serif" }}
          >
            Free Delivery on Orders Over रू 30,000 &nbsp; · &nbsp; Handcrafted
            Quality &nbsp; · &nbsp; Sustainable Materials &nbsp; · &nbsp; 5-Year
            Warranty
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
};

export default Marquee;
