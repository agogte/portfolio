import React from 'react'

const About = () => {
  return (
    <div name="About" className='w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white'>
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-gray-500'> About</p>
            </div>
            <p className='text-xl mt-20'>As a graduate with Master's in Computer Science, I am seeking  <b>full-time positions</b> in  <b>Full Stack Development</b>. I am highly motivated and have strong problem-solving skills, with a strong foundation in computer science concepts and software technologies. I am eager to apply my knowledge and skills in a real-world setting, and am confident that my passion for technology and drive to succeed will make me a valuable asset to any team.I graduated in May 2023, and am currently working on  <b>freelance projects</b>.</p>
            <br />
            {/* <p className='text-xl'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro a veritatis nobis aliquid reiciendis totam sequi doloribus aliquam. Iste sunt accusamus tenetur dicta quam reprehenderit corporis, a quaerat, placeat non blanditiis quis assumenda perferendis voluptate dolore alias, adipisci soluta voluptatem illum sapiente laudantium. Tempore veritatis quaerat fuga? Explicabo, est eaque?
            </p> */}
        </div>
    </div>
  )
}

export default About