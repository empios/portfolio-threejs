/**
 * The site mark: the Polish "ł" from Włodarczyk, its stroke drawn as a
 * gradient cursor. `Wordmark` sets the surname with the same stroke.
 */
export function Logo({ size = 36 }: { readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="lt-logo-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6A4FD6" />
          <stop offset="0.55" stopColor="#1FA187" />
          <stop offset="1" stopColor="#A0DA39" />
        </linearGradient>
      </defs>
      <circle cx="256" cy="256" r="256" fill="#0B0D12" />
      <rect x="222" y="96" width="68" height="320" rx="34" fill="#FFFFFF" />
      <rect x="146" y="226" width="220" height="60" rx="30" fill="url(#lt-logo-g)" transform="rotate(-28 256 256)" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="lt-wordmark" aria-hidden="true">
      w<span className="lt-wordmark__l">l</span>odarczyk
    </span>
  );
}
