import React from 'react'
import {FaGithub, FaLinkedin} from 'react-icons/fa'
import {HiOutlineMail} from 'react-icons/hi'
import {BsFillPersonLinesFill} from 'react-icons/bs'

const SocialLinks = () => {
    const links = [
        {
            id:1,
            child: (
                <>
                LinkedIn <FaLinkedin size={30} />
                </>
            ),
            // href: 'https://www.linkedin.com/in/advait-gogte/',
            href: 'https://agogte.github.io/error/',
            style: 'rounded-tr-md'
        },
        {
            id:2,
            child: (
                <>
                Github <FaGithub size={30} />
                </>
            ),
            href: 'https://github.com/agogte',
        },
        {
            id:3,
            child: (
                <>
                Mail <HiOutlineMail size={30} />
                </>
            ),
            href: 'mailto:agogte@gmu.edu',
        },
        {
            id:4,
            child: (
                <>
                Resume <BsFillPersonLinesFill size={30} />
                </>
            ),
            href: 'https://agogte.github.io/error/',
            style: 'rounded-br-md',
            download: true,
        }
    ]

  return (
    <div className='hidden lg:flex flex-col top-[35%] left-0 fixed'>
        <ul>
            {links.map(({id, child, href, style, download}) => (
                <li key={id} className={'flex ml-[-100px] justify-between items-center w-40 h-14 px-4 bg-gray-500 hover:rounded-md hover:ml-[-10px] duration-300'}>
                    <a href={href}
                    className='flex justify-between items-center w-full text-white'
                    download = {download}
                    target= '_blank'
                    rel="noreferrer"
                    >
                    {child}
                    </a>
                </li>
            ))}
            
        </ul>
    </div>
  )
}

export default SocialLinks