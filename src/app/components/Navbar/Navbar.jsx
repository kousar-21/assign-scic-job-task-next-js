'use client' //t tells Next.js:“Hey, this component should be a Client Component, not a Server Component.”

import Link from 'next/link';
import React from 'react';
import WebLogoPage from '../WebLogo/page';
import { signOut, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const Navbar = () => {
    // access session data
    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter()
    const links = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Product", href: "/product" },
        { name: "Add Products", href: "/addProduct", private: true },
    ];

    const handleLinkClick = (link) => {
        if (link.private && !session) {
            router.push("/login"); // redirect if not logged in
        } else {
            router.push(link.href);
        }
    };
    return (
        <div className="navbar px-5 md:px-10 lg:px-20 bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links.map(link => (
                            <li key={link.href}>
                                <button
                                    onClick={() => handleLinkClick(link)}
                                    className={`w-full text-left ${pathname === link.href ? 'bg-sky-500 text-white underline' : ''}`}
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <WebLogoPage></WebLogoPage>
                </div>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    {links.map(link => (
                        <li key={link.href}>
                            <button
                                onClick={() => handleLinkClick(link)}
                                className={`px-3 py-1 rounded ${pathname === link.href ? 'bg-sky-500 text-white underline' : ''}`}
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
                {/* If no user → show Login button */}
                {!session ? (
                    <Link href="/login">
                        <button className="btn btn-info rounded-lg">Login</button>
                    </Link>
                ) : (
                    // If logged in → show Logout button
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="btn btn-error rounded-lg">
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;