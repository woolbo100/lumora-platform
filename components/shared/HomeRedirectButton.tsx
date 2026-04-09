"use client";

type HomeRedirectButtonProps = {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function HomeRedirectButton({
  children,
  className = "",
  ariaLabel,
}: HomeRedirectButtonProps) {
  function handleClick() {
    window.location.assign(`${window.location.origin}/`);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}
