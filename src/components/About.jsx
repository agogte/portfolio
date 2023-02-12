import React from 'react'

const About = () => {
  return (
    <div name="About" className='w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white'>
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-gray-500'> About</p>
            </div>
            <p className='text-xl mt-20'>As a graduate student in Computer Science, I am seeking full-time positions in Software Development and Cloud Engineering. I am highly motivated and have strong problem-solving skills, with a strong foundation in computer science concepts and technologies. I am eager to apply my knowledge and skills in a real-world setting, and am confident that my passion for technology and drive to succeed will make me a valuable asset to any team. I am set to graduate in May 2023, and am excited to begin my career in the tech industry.</p>
            <br />
            {/* <p className='text-xl'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro a veritatis nobis aliquid reiciendis totam sequi doloribus aliquam. Iste sunt accusamus tenetur dicta quam reprehenderit corporis, a quaerat, placeat non blanditiis quis assumenda perferendis voluptate dolore alias, adipisci soluta voluptatem illum sapiente laudantium. Tempore veritatis quaerat fuga? Explicabo, est eaque?
            </p> */}
        </div>
    </div>
  )
}

export default About