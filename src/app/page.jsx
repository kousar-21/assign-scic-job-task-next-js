'use client';

import Image from "next/image";
import { motion } from 'framer-motion';
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col justify-center">
      {/* Hero / Banner Section */}
      <section className="lg:py-16 md:py-10 py-8">
        <div className="lg:mx-20 md:mx-10 mx-5 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Right Side → Image */}
          <div className="relative w-full md:mb-1 mb-14">
            <motion.div
              // className="absolute -bottom-10"
              animate={{ y: [0, 70, 0] }}
              transition={{ ease: "easeInOut", duration: 3, repeat: Infinity }}
            >
              <img
                src="https://i.postimg.cc/fTKj89wd/Adobe-Express-file-4.jpg"
                alt="Smartphone Showcase"
                width={500}
                height={500}
                className="rounded-br-[40px] md:rounded-br-[80px] lg:rounded-br-[100px] lg:rounded-tl-[100px] md:rounded-tl-[80px] rounded-tl-[40px] shadow-2xl border-4 border-white lg:size-72 md:size-52 size-36 " />
            </motion.div>
            <motion.div
              className="absolute -bottom-10 lg:left-28"
              animate={{ x: [80, 180, 80] }}
              transition={{ ease: "easeInOut", duration:3, repeat: Infinity }}
            >
              <img
                src="https://i.postimg.cc/wB0jP910/Adobe-Express-file-5.jpg"
                alt="Smartphone Showcase"
                width={300}
                height={300}
                className="rounded-br-[40px] md:rounded-br-[80px] lg:rounded-br-[100px] lg:rounded-tl-[100px] md:rounded-tl-[80px] rounded-tl-[40px] shadow-2xl border-4 border-white lg:size-72 md:size-52 size-36 " />
            </motion.div>
          </div>

          {/* Left Side → Text Content */}
          <div className="text-center lg:text-left max-w-lg">
            <p className="text-blue-600 font-medium mb-2">Welcome to MyPhoneStore</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Find Your Perfect <span className="text-blue-600">Smartphone</span>
            </h1>
            <p className="mb-6 text-lg text-gray-600">
              Discover the latest smartphones with trusted reviews, fast delivery,
              and secure payments — all in one place.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/product" className="bg-blue-600 hover:bg-blue-50 text-white hover:text-blue-700 hover:border-2 font-medium py-3 px-6 rounded-lg transition duration-300">
                Shop Now
              </Link>
              <Link href="/about" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white font-medium py-3 px-6 rounded-lg transition duration-300">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}