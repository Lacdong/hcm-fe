function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`card-soft rounded-3xl p-6 ${
        hover ? "transition duration-300 hover:-translate-y-1 hover:shadow-2xl" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;