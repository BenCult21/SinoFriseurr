import { CONTACT } from "@/lib/config";

type MapsLinkProps = {
  className?: string;
  showAddress?: boolean;
  iconOnly?: boolean;
};

export default function MapsLink({ className = "", showAddress = false, iconOnly = false }: MapsLinkProps) {
  return (
    <a
      href={CONTACT.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Standort auf Google Maps öffnen: ${CONTACT.fullAddress}`}
      className={`group inline-flex items-center gap-2 text-ink transition-colors hover:text-barber-red ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <path d="M12 21s7-6.2 7-11.6A7 7 0 0 0 5 9.4C5 14.8 12 21 12 21Z" />
        <circle cx="12" cy="9.4" r="2.4" />
      </svg>
      {!iconOnly && (
        <span className="text-sm tracking-wide">
          {showAddress ? CONTACT.fullAddress : "Standort"}
        </span>
      )}
    </a>
  );
}
