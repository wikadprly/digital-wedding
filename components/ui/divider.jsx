export function Diamond({ className, size = "sm" }) {
  const dimension = size === "lg" ? "h-2 w-2" : "h-1.5 w-1.5";
  return (
    <span
      className={`inline-block ${dimension} rotate-45 bg-champagne${
        className ? ` ${className}` : ""
      }`}
    />
  );
}
