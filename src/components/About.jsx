import React from 'react'

const About = () => {
  return (
    <div name="About" className='w-full h-auto py-8 md:h-screen md:py-20 bg-gradient-to-b from-gray-800 to-black text-white'>
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-gray-500'> About</p>
        </div>
        <ul className='text-xl mt-20'>
          👨🏻‍💻 Skilled Full Stack Developer with a proven track record in building scalable, robust systems using <b>C# .NET</b> and <b>Angular 17</b>. <br />
          🚀 Extensive experience across the entire <b>development lifecycle</b>, consistently delivering <b>high-performance software solutions</b> that exceed expectations. <br />
          💥 Committed to <b>pushing the boundaries</b> of what's possible in software development, ensuring every project is <b>efficient, reliable, and aligned</b> with business goals.
        </ul>
        <br />
      </div>
    </div>
  )
}

export default About