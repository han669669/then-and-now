interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F3F4F6" />
          </linearGradient>
        </defs>
        
        {/* Main circle background */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="url(#logoGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Inner circle for depth */}
        <circle
          cx="20"
          cy="20"
          r="15"
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
        />
        
        {/* Split line in the middle */}
        <line
          x1="20"
          y1="8"
          x2="20"
          y2="32"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        
        {/* Left side (Before) - slightly darker */}
        <path
          d="M 5 20 A 15 15 0 0 1 20 5 L 20 35 A 15 15 0 0 1 5 20 Z"
          fill="rgba(0,0,0,0.2)"
        />
        
        {/* Arrow pointing right */}
        <path
          d="M 16 17.5 L 23 17.5 L 23 16 L 27 20 L 23 24 L 23 22.5 L 16 22.5 Z"
          fill="url(#arrowGradient)"
          className="drop-shadow-sm"
        />
        
        {/* Small highlight dots for visual interest */}
        <circle cx="12" cy="14" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="28" cy="26" r="1" fill="rgba(255,255,255,0.4)" />
      </svg>
    </div>
  );
}