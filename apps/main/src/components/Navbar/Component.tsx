"use client";
import { Drawer, Sidebar, ThemeSwitch } from "@/components";
import { Logout, Whoami } from "@/organisms";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
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
      <Whoami />
      <ThemeSwitch />
      <div className="flex flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-10"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
                  fill="#000000"
                />
              </svg>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <Logout
              onSubmit={() => {
                router.push("/auth");
              }}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
