import React from 'react';
import angular from '../assets/Angular.png'
import bash from '../assets/bash.png';
import docker from '../assets/docker.png';
import git from '../assets/git.png';
import csharp from '../assets/csharp.png.svg';
import sqlserver from '../assets/sqlserver.png.jpg';
import jenkins from '../assets/jenkins.png';
import powershell from '../assets/powershell.png';
import azure from '../assets/azure.png';

const Experience = () => {

    const tech = [
        {
            id: 1,
            src: angular,
            title: 'Angular.js',
            style: 'shadow-pink-600'
        },
        {
            id: 2,
            src: csharp,
            title: 'C#',
            style: 'shadow-purple-600'
        },
        {
            id: 3,
            src: sqlserver,
            title: 'SQL Server',
            style: 'shadow-blue-500'
        },
        {
            id: 4,
            src: git,
            title: 'Git',
            style: 'shadow-orange-500'
        },
        {
            id: 5,
            src: jenkins,
            title: 'Jenkins',
            style: 'shadow-red-500'
        },
        {
            id: 6,
            src: powershell,
            title: 'Powershell',
            style: 'shadow-blue-300'
        },
        {
            id: 7,
            src: azure,
            title: 'Azure',
            style: 'shadow-blue-400'
        },
        {
            id: 8,
            src: bash,
            title: 'Bash',
            style: 'shadow-white'
        },
        {
            id: 9,
            src: docker,
            title: 'Docker',
            style: 'shadow-blue-400'
        },
    ]

    return (
        <div name='Experience' className='w-full h-auto md:h-screen py-10 bg-gradient-to-b to-black from-gray-800 text-white'>
            <div className='max-w-screen-lg mx-auto p-10 flex flex-col justify-center w-full h-full text-white'>
                <div>
                    <p className='text-3xl sm:text-4xl font-bold border-b-4 border-gray-500 p-2 inline'>Tech stack</p>
                    <p className='py-6'>There are the technologies I've worked with:</p>
                </div>
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0'>
                    {
                        tech.map(({ id, src, title, style }) => (
                            <div key={id}
                                className={`shadow-md hover:scale-110 duration-500 py-2 rounded-lg ${style}`}>
                                <img src={src} alt="" className='w-10 mx-auto' />
                                <p className='mt-4 text-xs md:text-base'>{title}</p>
                            </div>
                        ))
                    }


                </div>
            </div>
        </div>
    )
}

export default Experience