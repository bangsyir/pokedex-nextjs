import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar: NextPage = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])
  const renderThemeToggle: any = () => {
    if (theme === "dark") {
      return <button onClick={() => setTheme("light")}><SunIcon className="h-5 w-5 text-yellow-500"/></button>;
    } else {
      return <button onClick={() => setTheme("dark")}><MoonIcon className="h-5 w-5"/></button>;
    }
  };
  if (!mounted) return null
  return (
    <nav className="bg-white dark:bg-neutral-900 p-4 border dark:border-neutral-800 flex justify-between z-50">
      <Link href="/">
        <div className="font-bold text-lg cursor-pointer">PokemonDex</div>
      </Link>
      <div>{renderThemeToggle()}</div>
    </nav>
  );
};

export default Navbar;
