// import React, { useState } from 'react'
// import {FaBars, FaTimes} from "react-icons/fa";
// // import {Link} from 'react-scroll'

// const Navbar = () => {

//     const [nav, setNav] = useState(false);

//     const links = [
//         {
//             id: 1,
//             link: 'Home',
//         },
//         {
//             id: 2,
//             link: 'About',
//         },
//         // {
//         //     id: 3,
//         //     link: 'Portfolio'
//         // },
//         {
//             id: 3,
//             link: 'Experience',
//         },
//         {
//             id: 4,
//             link: 'Contact',
//         },
//     ]

//   return (
//     <div className='flex justify-between items-center px-4 w-full bg-black h-20 text-white fixed'>
//         <div>
//             <h1 className='text-5xl font-signature ml2'>Advait</h1>
//         </div>

//         <ul className='hidden md:flex'>
//             {links.map(({ id, link}) => (
//                 <li key={id} className='px-4 duration-200 cursor-pointer text-gray-500 hover:scale-125'>{link}</li>
//             ))}
            
//         </ul>
//         <div onClick={() => setNav(!nav)} className='cursor-pointer md:hidden pr-4 z-10 text-gray-500'>
//             {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
//         </div>

//         {nav && (<ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500'>
//         {links.map(({ id, link}) => (
//                 <li key={id} className='px-4 cursor-pointer hover:scale-125 duration-200 py-6 text-4xl'>{link}</li>
//             ))}

//         </ul>)}

        

//     </div>
//   )
// }

// export default Navbar
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    {
      id: 1,
      link: "Home",
    },
    {
      id: 2,
      link: "About",
    },
    // {
    //   id: 3,
    //   link: "portfolio",
    // },
    {
      id: 3,
      link: "Experience",
    },
    {
      id: 4,
      link: "Contact",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed">
      <div>
        <h1 className="text-5xl font-signature ml-2">Advait Gogte</h1>
      </div>

      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 duration-200"
          >
            <Link to={link} smooth duration={500}>
              {link}
            </Link>
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link
                onClick={() => setNav(!nav)}
                to={link}
                smooth
                duration={500}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavBar;