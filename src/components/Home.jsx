import React from 'react'
import HeroImage from '../assets/IMG_8031.jpeg';
// import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

const Home = () => {
  return (
    <div name="Home" className='h-screen w-full bg-gradient-to-b from-black via-black to-gray-800'>
        <div className='max-w-screen-lg mx-auto flex flex-col  md:flex-row items-center px-4 justify-center h-full'>
            <div className='flex flex-col justify-center h-full'>
                <h2 className='text-4xl sm:text-7xl font-bold text-white'>
                    Hello!
                </h2>
                <p className='py-4 text-gray-500'>
                    I'm a soon to be college grad looking for an entry level job as a Software/DevOps Engineer 👨🏻‍💻. I currently work as a Graduate Teaching Assistant at Computer Science department at George Mason University. I love travelling and spend most of my time in the great outdoors. 🧗🏻
                </p>
                <div>
                    {/* <button className='group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer'>
                        Resume<span className='group-hover:rotate-90 duration-300'> <MdOutlineKeyboardArrowRight size={25} className="ml-1"/></span> 
                    </button> */}
                </div>
            </div>
            <div>
                <img src={HeroImage} alt="pp" className='mx-auto md:w-2/3 w-2/3 rounded-2xl' />
            </div>
        </div>
    </div>
  )
}

export default Home