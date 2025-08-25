'use client' //t tells Next.js:“Hey, this component should be a Client Component, not a Server Component.”
import Image from 'next/image';
import React from 'react';
import logo from '../../Images/7879976.jpg'
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content px-5 md:px-10 lg:px-26 py-6 sm:py-8 md:py-12">
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {/* Company Info Section */}
                    <div>
                        <aside className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="mb-4">
                                <Link href='/' className="inline-block">
                                    <Image
                                        className='w-12 h-12 sm:w-14 sm:h-14 rounded-2xl hover:scale-105 transition-transform duration-200'
                                        src={logo}
                                        alt="Phone Logo"
                                    />
                                </Link>
                            </div>
                            <div className="space-y-2">
                                <p className="font-semibold text-base sm:text-lg">My Technologia Ltd.</p>
                                <p className="text-sm sm:text-base opacity-75 leading-relaxed">
                                    Providing reliable tech since 1992
                                </p>
                            </div>
                        </aside>
                    </div>

                    {/* Services Navigation */}
                    <nav className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h6 className="footer-title text-base text-center sm:text-lg font-semibold mb-4 text-primary">
                            Services
                        </h6>
                        <div className="flex flex-col space-y-3">
                            <Link
                                href='/about'
                                className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1"
                            >
                                Branding
                            </Link>
                            <a className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1">
                                Design
                            </a>
                            <a className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1">
                                Marketing
                            </a>
                            <a className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1">
                                Advertisement
                            </a>
                        </div>
                    </nav>

                    {/* Company Navigation */}
                    <nav className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h6 className="footer-title text-base sm:text-lg font-semibold mb-4 text-primary">
                            Company
                        </h6>
                        <div className="flex flex-col space-y-3">
                            <Link
                                href='/about'
                                className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1"
                            >
                                About us
                            </Link>
                            <a className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1">
                                Contact
                            </a>
                            <a className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1">
                                Jobs
                            </a>
                            <a className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1">
                                Press kit
                            </a>
                        </div>
                    </nav>

                    {/* Legal Navigation */}
                    <nav className="flex flex-col items-center sm:items-start text-center sm:text-left">
                        <h6 className="footer-title text-base sm:text-lg font-semibold mb-4 text-primary">
                            Legal
                        </h6>
                        <div className="flex flex-col space-y-3">
                            <Link
                                href='/about'
                                className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1"
                            >
                                Terms of use
                            </Link>
                            <a className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1">
                                Privacy policy
                            </a>
                            <a className="link link-hover text-sm sm:text-base hover:text-primary transition-all duration-200 hover:translate-x-1">
                                Cookie policy
                            </a>
                        </div>
                    </nav>
                </div>

                {/* Bottom Section - Copyright/Social Links (Optional) */}
                <div className="border-t border-base-300 mt-8 pt-6 text-center">
                    <p className="text-sm opacity-75">
                        © {new Date().getFullYear()} My Technologia Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;