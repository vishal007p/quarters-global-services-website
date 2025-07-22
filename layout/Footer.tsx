import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Contact */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-2">QUARTUS</h2>
          <p className="text-sm mb-2">
            Simplifying Visa & Document Processes <br /> with Speed & Security.
          </p>
          <p className="text-sm mb-1">
            Email:{" "}
            <a
              href="mailto:info@quartusglobalservices.com"
              className="underline hover:text-gray-300"
            >
              info@quartusglobalservices.com
            </a>
          </p>
          <p className="text-sm">Contact Number: 713-534-1245</p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3">SERVICES</h3>
          <ul className="space-y-2 text-sm">
            <li>Visa services</li>
            <li>Passport Services</li>
            <li>Agent Registration Form</li>
            <li>OCI Card</li>
            <li>Apostille & Legalization</li>
            <li>Managed Service Program</li>
            <li>Travel Medical Insurance</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Blogs</li>
            <li>Testimonials</li>
            <li>Locations</li>
            <li>Job Openings</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-3">RESOURCES</h3>
          <ul className="space-y-2 text-sm">
            <li>Support</li>
            <li>Help Center</li>
            <li>Legal</li>
            <li>Policies</li>
            <li>Terms & Condition</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-3">FOLLOW US</h3>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-gray-400">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs text-gray-400 mt-10">
        Copyright ©2025 Quartus. All rights reserved.
      </div>
    </footer>
  );
};
