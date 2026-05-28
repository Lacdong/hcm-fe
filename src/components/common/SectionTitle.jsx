function SectionTitle({
  label,
  title,
  description,
  align = "left",
  light = false,
}) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {label && (
        <p
          className={`text-sm font-semibold uppercase tracking-[0.3em] ${
            light ? "text-yellow-300" : "text-yellow-700"
          }`}
        >
          {label}
        </p>
      )}

      <h2
        className={`mt-3 text-4xl font-bold leading-tight md:text-5xl ${
          light ? "text-yellow-50" : "text-red-950"
        }`}
      >
        {title}
      </h2>

      <div className={isCenter ? "mx-auto gold-divider" : "gold-divider"} />

      {description && (
        <p
          className={`mt-6 leading-8 ${
            light ? "text-yellow-100/80" : "text-stone-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;