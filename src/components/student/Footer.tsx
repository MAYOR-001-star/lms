// @ts-expect-error: No declaration file for assets
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#0b0e17] text-gray-300 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-700 pb-10">
        {/* Left section */}
        <div>
          <img src={assets.logo_dark} alt="Edemy Logo" className="w-32 mb-4" />
          <p className="text-sm leading-6 text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>
        </div>

        {/* Company as */}
        <div>
          <h3 className="font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#"> Home</a>
            </li>
            <li>
              <a href="#"> About us</a>
            </li>
            <li>
              <a href="#"> Contact us</a>
            </li>
            <li>
              <a href="#"> Privacy policy</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold text-white mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-gray-200 px-3 py-2 rounded-md w-full focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <p className="text-center text-gray-500 text-sm mt-6">
        Copyright © 2024 © Edemy, All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
