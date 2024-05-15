//STEP: 142 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Link from 'next/link';
import React from 'react';
//defining-props
type Props = {}
//creating-data
let currentYear = new Date().getFullYear();
const Footer = (props: Props) => {
  return (
    <footer>
        <div className="border border-[#0000000e] dark:border-[#ffffff1e]">
            <br />
            <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">About</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-base text-black dark:text-gray-300 dark:hover:text-white">Our Story</Link></li>
                            <li><Link href="/policy" className="text-base text-black dark:text-gray-300 dark:hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="/faq" className="text-base text-black dark:text-gray-300 dark:hover:text-white">FAQ</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="/courses" className="text-base text-black dark:text-gray-300 dark:hover:text-white">Courses</Link></li>
                            <li><Link href="/profile" className="text-base text-black dark:text-gray-300 dark:hover:text-white">My Account</Link></li>
                            <li><Link href="/admin/courses-analytics" className="text-base text-black dark:text-gray-300 dark:hover:text-white">Course Dashboard</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Social Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="https://www.youtube.com" className="text-base text-black dark:text-gray-300 dark:hover:text-white">Youtube</Link></li>
                            <li><Link href="https://www.instagram.com" className="text-base text-black dark:text-gray-300 dark:hover:text-white">Instagarm</Link></li>
                            <li><Link href="https://www.github.com" className="text-base text-black dark:text-gray-300 dark:hover:text-white">Github</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-[20px] font-[600] text-black dark:text-white">Contact Info</h3>
                        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">Call Us: 1-855-655-2022</p>
                        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">Address: +7011 Vermont Ave, Los Angeles, CA 9044</p>
                        <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">Mail Us: hello@elearning.com</p>
                    </div>
                </div>
            </div>
            <br />
            <p className="text-center text-black dark:text-white">Copyright © {currentYear} ELearning | All Rights Reserved</p>
            <br />
        </div>
        <br />
    </footer>
  )
}
//exprting-data
export default Footer;
//OVER: 142("m": ../../page.tsx) ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////