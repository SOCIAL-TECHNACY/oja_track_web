"use client";

import Image from "next/image";
import Link from "next/link";

export interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  href?: string | null;
  className?: string;
  eyebrow?: string;
  onClick?: () => void;
}

const sizeConfig = {
  sm: { img: 28, imgClass: "w-7 h-7", text: "text-base", badge: "rounded-lg" },
  md: { img: 36, imgClass: "w-9 h-9", text: "text-lg", badge: "rounded-xl" },
  lg: { img: 44, imgClass: "w-11 h-11", text: "text-xl", badge: "rounded-xl" },
  xl: { img: 56, imgClass: "w-14 h-14", text: "text-2xl", badge: "rounded-2xl" },
};

export default function BrandLogo({
  size = "md",
  showText = true,
  href = "/",
  className = "",
  eyebrow,
  onClick,
}: BrandLogoProps) {
  const config = sizeConfig[size] || sizeConfig.md;

  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`relative ${config.imgClass} ${config.badge} overflow-hidden shadow-sm shrink-0 bg-white ring-1 ring-black/5 dark:ring-white/10`}
      >
        <Image
          src="/logo.png"
          alt="OjaTrack Logo"
          width={config.img}
          height={config.img}
          className="w-full h-full object-contain p-0.5"
          priority
        />
      </div>

      {showText && (
        <span className="leading-tight">
          <span
            className={`block font-black tracking-tight text-light-primary dark:text-ink-primary ${config.text}`}
          >
            Oja<span className="text-brand-primary">Track</span>
          </span>
          {eyebrow && (
            <span className="block text-[10px] font-bold tracking-[0.14em] text-brand-primary uppercase">
              {eyebrow}
            </span>
          )}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label="OjaTrack home"
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
