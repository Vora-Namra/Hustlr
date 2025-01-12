import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function NavLinks() {
    const links = [
        { name: "Find Jobs", url: "find-jobs" },
        { name: "Find Talent", url: "find-talent" },
        { name: "Post Job", url: "post-job" },
        { name: "About Us", url: "about" },
    ]

    const location = useLocation();

    return (
        <div className='flex gap-10 items-center text-mine-shaft-300 text-lg h-full'>
            {
                links.map((link, index) => {
                    const isActive = location.pathname === "/" + link.url;
                    return (
                        <div
                            key={index}
                            className={`h-full flex items-center ${isActive ? 'border-t-[3px]' : ''}`}
                        >
                            <Link
                                to={`/${link.url}`}  // Prepending "/" ensures an absolute path
                                className="px-2 py-1"
                            >
                                {link.name}
                            </Link>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default NavLinks;
