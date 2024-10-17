import React from 'react';
import Navbar from './Navbar';

const AboutPage = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Header Section */}
      <header className="  text-black py-6">
        <h1 className="text-3xl font-bold text-center">About Thrift Treasures</h1>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow py-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-4">Our Story</h2>
          <p className="text-gray-700 text-lg mb-6 text-justify">
            At Thrift Treasures, we believe that every item has a story to tell. Our journey began with a passion for sustainability and a desire to make stylish, pre-loved items accessible to everyone. We carefully curate a diverse collection of clothing, accessories, home decor, and more, ensuring that each piece meets our high standards of quality.
          </p>
          <h2 className="text-2xl font-semibold text-center mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg mb-6 text-justify">
            Our mission is to promote sustainable shopping while providing a platform for unique and affordable finds. By giving pre-loved items a second chance, we not only reduce waste but also encourage creativity in fashion and home decor. We are committed to supporting our community and helping you discover hidden treasures that reflect your style.
          </p>
          <h2 className="text-2xl font-semibold text-center mb-4">Join Us</h2>
          <p className="text-gray-700 text-lg mb-6 text-justify">
            We invite you to explore our collection and find your next favorite piece. Whether you’re a seasoned thrift shopper or new to the experience, we’re here to help you every step of the way. Thank you for being a part of our journey towards a more sustainable future!
          </p>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-black text-white py-4">
        <p className="text-center">© 2024 Thrift Treasures. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

export default AboutPage;
