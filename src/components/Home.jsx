import React from 'react'
import HeroImage from '../assets/IMG_8031.jpeg';
// import {MdOutlineKeyboardArrowRight} from 'react-icons/md'

const Home = () => {
    return (
        <div name="Home" className='h-auto w-full md:h-screen bg-gradient-to-b from-black via-black to-gray-800 py-10 md:py-24'>
            <div className='max-w-screen-lg mx-auto flex flex-col  md:flex-row items-center px-4 justify-center h-full'>
                <div className='flex flex-col justify-center h-full'>
                    <h2 className='text-3xl sm:text-6xl font-bold text-white'>
                        I'm a Full Stack Developer!
                    </h2>
                    <p className='py-4 text-gray-300 text-lg'>
                        I build robust and scalable applications using <b>Angular.js, C# .NET, SQL Server</b>.
                        I support my development process with <b>Git, Docker, Jenkins, BASH and Powershell scripts, and Linux automations (I hate Powershell 🤫)</b>.
                        I love social dancing 🕺🏻, travelling 🛫 and spend most of my time in the great outdoors. 🧗🏻
                    </p>
                </div>
                <div>
                    <img src={HeroImage} alt="displaypicture" className='mx-auto md:w-2/3 w-2/3 rounded-2xl' />
                </div>
            </div>
        </div>
    )
}

export default Home