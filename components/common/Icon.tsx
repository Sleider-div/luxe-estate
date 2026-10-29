interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = "" }: IconProps) {
  return (
    <span className={`material-icons select-none inline-flex items-center justify-center ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}

