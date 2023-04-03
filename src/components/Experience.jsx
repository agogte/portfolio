import React from 'react'
import python from '../assets/python.png';
import bash from '../assets/bash.png';
import docker from '../assets/docker.png';
import linux from '../assets/linux.png';
import js from '../assets/js.png';
import react from '../assets/react.png';
import aws from '../assets/aws.png';
import java from '../assets/java.png';
import git from '../assets/git.png';
import spring from '../assets/spring.png';
import junit from '../assets/junit.png';
import node from '../assets/node.png';



const Experience = () => {

    const tech = [
        {
            id:1,
            src: bash,
            title: 'Bash',
            style: 'shadow-white'
        },
        {
            id:2,
            src: python,
            title: 'Python',
            style: 'shadow-blue-300'
        },
        {
            id:3,
            src: java,
            title: 'Java',
            style: 'shadow-white'
        },
        {
            id:4,
            src: aws,
            title: 'Amazon Web Services',
            style: 'shadow-yellow-500'
        },
        {
            id:5,
            src: react,
            title: 'React',
            style: 'shadow-blue-600'
        },
        {
            id:6,
            src: docker,
            title: 'Docker',
            style: 'shadow-blue-400'
        },
        {
            id:7,
            src: git,
            title: 'Git',
            style: 'shadow-orange-500'
        },
        {
            id:8,
            src: linux,
            title: 'Linux',
            style: 'shadow-white'
        },
        {
            id:9,
            src: js,
            title: 'JavaScript',
            style: 'shadow-yellow-500'
        },
        {
            id:10,
            src: spring,
            title: 'Spring-boot',
            style: 'shadow-green-500'
        },
        {
            id:11,
            src: junit,
            title: 'JUnit testing',
            style: 'shadow-red-500'
        },
        {
            id:12,
            src: node,
            title: 'Node.js',
            style: 'shadow-green-500'
        },
    ]

  return (
    <div name='Experience' className='w-full h-screen bg-gradient-to-b to-black from-gray-800 text-white'>
        <div className='max-w-screen-lg mx-auto p-10 flex flex-col justify-center w-full h-full text-white'>
            <div>
                <p className='text-4xl font-bold border-b-4 border-gray-500 p-2 inline'>Tech stack</p>
                <p className='py-6'>There are the technologies I've worked with:</p>
            </div>
            <div  className='w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0'>
                {
                    tech.map(({id, src, title, style}) => (
                        <div key={id} 
                        className={`shadow-md hover:scale-110 duration-500 py-2 rounded-lg ${style}`}>
                        <img src={src} alt="" className='w-10 mx-auto' />
                        <p className='mt-4'>{title}</p>
                        </div>
                    ))
                }
                

            </div>
        </div>
    </div>
  )
}

export default Experience