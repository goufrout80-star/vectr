import Link from "next/link";

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`wordmark ${inverse ? "wordmark--inverse" : ""}`} aria-label="VECTR home">
      VECTR
    </Link>
  );
}
