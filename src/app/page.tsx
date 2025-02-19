'use client'
import Link from "next/link";
export default function Home() {
  return (
    <div>
      click the link to log in <Link href={'/login'}>LOGIN</Link>
    </div>
  );
}
