function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
}) {
  const baseClass =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300";

  const variants = {
    primary:
      "bg-red-900 text-white shadow-lg shadow-red-950/20 hover:bg-red-800",
    secondary:
      "border border-red-900 text-red-900 hover:bg-red-50",
    gold:
      "bg-yellow-700 text-white shadow-lg shadow-yellow-900/20 hover:bg-yellow-800",
    ghost:
      "text-red-900 hover:bg-red-50",
  };

  const buttonClass = `${baseClass} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClass}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}

export default Button;