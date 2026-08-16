import { CONTACT } from "@/lib/config";

type PhoneLinkProps = {
  className?: string;
  iconOnly?: boolean;
};

export default function PhoneLink({ className = "", iconOnly = false }: PhoneLinkProps) {
  return (
    <a
      href={CONTACT.phoneHref}
      aria-label={`Anrufen: ${CONTACT.phoneDisplay}`}
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
        className="shrink-0 transition-transform duration-300 group-hover:rotate-6"
      >
        <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z" />
      </svg>
      {!iconOnly && <span className="text-sm tracking-wide">{CONTACT.phoneDisplay}</span>}
    </a>
  );
}
