interface LoadingProps {
  className?: string;
  width?: number;
  height?: number;
  showLabel?: boolean;
}

export default function Loading({
  className,
  width = 48,
  height = 48,
  showLabel = true,
}: LoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className ?? ''}`}
      role="status"
      aria-label="Carregando">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#232428]"
        aria-hidden>
        {/* Braços fixos */}
        <path d="M10 10 7 7" />
        <path d="m10 14-3 3" />
        <path d="m14 10 3-3" />
        <path d="m14 14 3 3" />
        {/* Hélices (arcos) com rotação */}
        <g
          style={{ transformOrigin: '12px 12px' }}
          className="animate-spin">
          <path d="M14.205 4.139a4 4 0 1 1 5.439 5.863" />
          <path d="M19.637 14a4 4 0 1 1-5.432 5.868" />
          <path d="M4.367 10a4 4 0 1 1 5.438-5.862" />
          <path d="M9.795 19.862a4 4 0 1 1-5.429-5.873" />
        </g>
        {/* Corpo central */}
        <rect x="10" y="8" width="4" height="8" rx="1" />
      </svg>
      {showLabel && (
        <span className="text-sm font-medium tracking-wide text-[#232428]/80">
          Carregando...
        </span>
      )}
    </div>
  );
}
