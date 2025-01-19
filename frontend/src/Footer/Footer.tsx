import { Divider } from '@mantine/core';
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react';
import { useLocation } from 'react-router-dom';


const Footer = () => {
  const location=useLocation();
  return location.pathname!="/signup"&& location.pathname!="/login"? (
    <footer className="bg-mine-shaft-950 text-bright-sun-300 py-12 px-16 ">
      <div className="container mx-auto flex flex-wrap justify-between items-start px-10">
        {/* Left Section */}
        <div className="w-full  md:w-1/4 mb-6 md:mb-0">
          <h1 className="text-xl font-bold text-bright-sun-300 flex items-center">
            <span className="mdi mdi-anchor mr-2 text-2xl" />
            Hustler
          </h1>
          <p className='text-mine-shaft-200'>
            New age platform for freelancers and businesses to connect and collaborate.
          </p>
          <div className="flex space-x-3 mt-4 ">
            <div className='border rounded-3xl p-3 border-bright-sun-300'><IconBrandFacebook/></div>
            <div className='border rounded-3xl p-3 border-bright-sun-300'><IconBrandInstagram/></div>
            <div className='border rounded-3xl p-3 border-bright-sun-300'><IconBrandX/></div>
          </div>
        </div>

        {/* Middle Sections */}
        <div className="w-full  md:w-1/5 mb-6 md:mb-0 ">
          <h2 className="text-lg font-semibold text-white mb-2">Product</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                Find Job
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                Find Company
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                Find Employee
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/5 mb-6 md:mb-0">
          <h2 className="text-lg font-semibold text-white mb-2">Company</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/5 ">
          <h2 className="text-lg font-semibold text-white mb-2">Support</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                Help & Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                Feedback
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-bright-sun-200">
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  ): <div></div>
};

export default Footer;
