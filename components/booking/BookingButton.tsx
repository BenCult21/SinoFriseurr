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
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-out";
  const solid =
    "bg-ink text-paper hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]";
  const outline =
    "border border-ink text-ink hover:-translate-y-0.5 hover:bg-ink hover:text-paper";

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className={`${base} ${variant === "solid" ? solid : outline} ${className}`}
    >
      <span>{label}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}
