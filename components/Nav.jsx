'use client'
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { idText } from "typescript";

export function Nav() {
  const [users, setUsers] = useState([]);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (user && user.organizationMemberships) {
      const isAdmin = user.organizationMemberships.map(prop => prop.role);
      setUsers(isAdmin || []);
    }
  }, [user])

  return (
    <header className="w-full h-20 px-10 bg-gray-800 flex items-center justify-between text-red-500 text-2xl font-bold">
      <a href="/">
        <span>Mercado CD</span>
      </a>
      <ul className="flex items-center justify-center gap-5">
        <a href="/" className="text-white text-lg hover:underline transition-all">
          Início
        </a>
        {isLoaded && user ? (
          <div className="flex items-center justify-center gap-5">
            {users.includes("org:admin") && (
              <a href="/user/admin" className="text-gray-500 hover:text-red-500 duration-500 text-lg hover:underline transition-all">
                Admin
              </a>
            )}
            <UserButton afterSignInUrl="/user/admin" afterSignOutUrl="/" />
          </div>
        ) : (
          <a href="/user/admin" className="text-white text-lg  hover:underline transition-all">
            Login
          </a>
        )}
      </ul>
    </header>
  );
}