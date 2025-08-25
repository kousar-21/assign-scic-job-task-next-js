import React from 'react'

export default function aboutPage() {
  // throw new Error("Something went wrong on About page!");

  return (
    <div className="bg-base-100">
      {/* Hero / About Section */}
      <section className="hero bg-base-200 py-16">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <img
            src="https://i.postimg.cc/fTKj89wd/Adobe-Express-file-4.jpg"
            alt="Smartphones"
            className="max-w-sm w-full rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-4xl font-bold mb-4 text-center lg:text-left">
              About <span className="text-primary">MyPhoneStore</span>
            </h1>
            <p className="py-4 text-lg leading-relaxed text-center lg:text-left">
              Welcome to <span className="font-semibold">MyPhoneStore</span>, your trusted online destination for the latest smartphones.
              We provide top-quality mobile phones, customer reviews, and a seamless buying experience.
              Our mission is to make premium phones accessible with excellent support.
            </p>
            <p className="text-lg leading-relaxed text-center lg:text-left">
              Whether you are looking for the newest iPhone, Samsung Galaxy, or budget-friendly devices,
              we’ve got you covered with genuine products and great deals.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 container px-5 md:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card bg-base-200 shadow-xl p-6 text-center">
            <h3 className="font-bold text-xl mb-2">📱 Quality Phones</h3>
            <p>We only sell original and high-quality smartphones with warranty support.</p>
          </div>
          <div className="card bg-base-200 shadow-xl p-6 text-center">
            <h3 className="font-bold text-xl mb-2">⭐ Trusted Reviews</h3>
            <p>Real customer reviews help you make informed decisions before buying.</p>
          </div>
          <div className="card bg-base-200 shadow-xl p-6 text-center">
            <h3 className="font-bold text-xl mb-2">🚚 Fast Delivery</h3>
            <p>Get your favorite phone delivered to your doorstep quickly and safely.</p>
          </div>
          <div className="card bg-base-200 shadow-xl p-6 text-center">
            <h3 className="font-bold text-xl mb-2">💳 Easy Payment</h3>
            <p>Enjoy secure and flexible payment options for a hassle-free shopping experience.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-base-100 py-16 px-5 md:px-10 lg:px-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="mb-2">📍 Address: 123 Phone Street, Dhaka, Bangladesh</p>
              <p className="mb-2">📞 Phone: +880 1234-567890</p>
              <p className="mb-2">✉️ Email: support@myphonestore.com</p>
              <p className="mb-2">🕑 Working Hours: 10AM - 8PM (Everyday)</p>
            </div>

            {/* Contact Form */}
            <div className="card bg-base-100 shadow-lg p-6">
              <form className="flex flex-col gap-4">
                <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
                <input type="email" placeholder="Your Email" className="input input-bordered w-full" required />
                <textarea placeholder="Your Message" className="textarea textarea-bordered w-full" rows="4" required></textarea>
                <button type="submit" className="btn btn-primary w-full">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
