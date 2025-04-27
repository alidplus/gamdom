import Link from "next/link";

export default function Component() {
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <li>
        <Link href="/">Dashboard</Link>
      </li>
      <li>
        <Link href="/other">Other Page</Link>
      </li>
      <li>
        <Link href="/another">Anther Page</Link>
      </li>
    </ul>
  );
}
