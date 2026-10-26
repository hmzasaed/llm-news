export function LatticeMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="lattice-mark"
    >
      <rect width="32" height="32" rx="9" fill="rgba(201,255,77,0.08)" stroke="rgba(201,255,77,0.28)" />
      <path d="M10 9.5V22.5H22" stroke="#c9ff4d" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M10 22.5L22 9.5" stroke="rgba(103,232,249,0.5)" strokeWidth="1.1" />
      <circle cx="10" cy="9.5" r="2.6" fill="#c9ff4d" />
      <circle cx="22" cy="22.5" r="2.6" fill="#67e8f9" />
      <circle cx="22" cy="9.5" r="1.4" fill="rgba(157,140,255,0.9)" />
    </svg>
  );
}

export function XLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.2l7.3-8.3L2.8 2h6.4l4.5 5.9L18.9 2Zm-1.1 18h1.8L7.3 3.9H5.4L17.8 20Z" />
    </svg>
  );
}

export function LinkedInLogo({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.8c0-1.38-.03-3.15-1.95-3.15-1.95 0-2.25 1.5-2.25 3.05V21h-4V9Z" />
    </svg>
  );
}

export function GitHubLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.24 9.24 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}
