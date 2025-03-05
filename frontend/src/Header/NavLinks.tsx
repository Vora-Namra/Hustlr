import { Link, useLocation } from 'react-router-dom';

interface NavLinksProps {
    isMobile?: boolean;
    onClose?: () => void;
}

function NavLinks({ isMobile, onClose }: NavLinksProps) {
    const links = [
        { name: "Find Jobs", url: "find-jobs" },
        { name: "Find Talent", url: "find-talent" },
        { name: "Post Job", url: "post-job/0" },
        { name: "Posted Job", url: "posted-job/0" },
        { name: "Job History", url: "job-history" },
    ];

    const location = useLocation();

    const handleClick = () => {
        if (isMobile && onClose) {
            onClose();
        }
    };

    return (
        <div className={`
            ${isMobile
                ? 'flex flex-col gap-4'
                : 'flex gap-4 md:gap-10 items-center text-mine-shaft-300 text-sm md:text-lg h-full'
            }
        `}>
            {links.map((link, index) => {
                const isActive = location.pathname === "/" + link.url;
                return (
                    <div
                        key={index}
                        className={`
                            ${isMobile
                                ? 'w-full'
                                : `h-full flex items-center ${isActive ? 'border-t-[3px] border-bright-sun-400' : ''}`
                            }
                        `}
                    >
                        <Link
                            to={`/${link.url}`}
                            className={`
                                ${isMobile
                                    ? 'block w-full px-4 py-2 hover:bg-mine-shaft-900 rounded'
                                    : 'px-2 py-1'
                                }
                                ${isActive ? 'text-bright-sun-400' : 'text-mine-shaft-300'}
                            `}
                            onClick={handleClick}
                        >
                            {link.name}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default NavLinks;