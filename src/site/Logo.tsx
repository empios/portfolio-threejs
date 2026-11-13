/** The site mark: a small cluster of connected nodes, echoing the hero's point cloud. */
export function Logo({ size = 36 }: { readonly size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="32" fill="#0B0D12" />
      <path
        d="M19 42 28 21 45 27 42 44Z M28 21 42 44"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="42" r="5.5" fill="#7B6CF0" />
      <circle cx="28" cy="21" r="5.5" fill="#3E9BD1" />
      <circle cx="45" cy="27" r="5" fill="#2BB58F" />
      <circle cx="42" cy="44" r="6.5" fill="#A0DA39" />
    </svg>
  );
}
