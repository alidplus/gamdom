import { Drawer, Sidebar, ThemeSwitch } from "@/components";
import Image from "next/image";
import Link from "next/link";

export default function Component() {
  return (
    <div className="navbar bg-base-100 gap-3 shadow-sm">
      <div className="flex-none">
        <Drawer>
          <Sidebar />
        </Drawer>
      </div>
      <div className="flex-1">
        <Link href="/" className="text-xl font-black select-none">
          Gamdom
        </Link>
      </div>
      <ThemeSwitch />
      <div className="flex flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                width={40}
                height={40}
                src="/profile.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
