import { CALENDLY_URL } from "@/lib/config";

type BookingButtonProps = {
  label?: string;
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
};

export default function BookingButton({
  label = "Termin buchen",
  variant = "solid",
  className = "",
  onClick,
}: BookingButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-sm font-light tracking-wide transition-all duration-300 ease-out";
  const solid =
    "bg-ink text-paper hover:bg-ink/90";
  const outline =
    "border border-ink text-ink hover:bg-stone-50";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
    >
      <span>{label}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
