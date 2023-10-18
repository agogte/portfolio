import React from 'react'
import tictactoe from "../assets/portfolio/tictactoe.png"
import connect4 from "../assets/portfolio/connect4.png"
import password_generator from "../assets/portfolio/password_generator.png"
import snake from "../assets/portfolio/snake.png"
import candycrush from "../assets/portfolio/candycrush.png"
import hangman from "../assets/portfolio/hangman.png"
import whowantstobeamillionair from "../assets/portfolio/whowantstobeamillionarie.png"
import urlshortener from '../assets/portfolio/url-shortener.png'

const Portfolio = () => {

    const portfolios = [
        {
            id:1,
            src: urlshortener,
            title: "Shorten IT!",
            href: 'https://github.com/agogte/urlshortener'
        },
        {
            id:2,
            src: tictactoe,
            title: "Tic Tac Toe",
            href: 'https://agogte.github.io/tic-tac-toe/'
        },
        {
            id:3,
            src: connect4,
            title: "Connect 4",
            href: 'https://agogte.github.io/connect4/'
        },
        {
            id:4,
            src: password_generator,
            title: "Password generator",
            href: 'https://agogte.github.io/passgen_JS/'
        },
        {
            id:5,
            src: snake,
            title: "Snake",
            href: 'https://agogte.github.io/snake/'
        },
        {
            id:6,
            src: hangman,
            title: "Hangman",
            href: 'https://agogte.github.io/hangman/'
        },
        {
            id:7,
            src: whowantstobeamillionair,
            title: "Who wants to be a millionaire?",
            href: 'https://agogte.github.io/whowantstobeamillionaire/'
        },
        {
            id:8,
            src: candycrush,
            title: "Candy Crush Clone",
            href: 'https://agogte.github.io/candycrushclone/'
        }
    ]


  return (
    <div name="portfolio" className='w-full h-auto md:h-screen md:py-10 bg-gradient-to-b from-black to-gray-800 text-white'>
        <div className='max-w-screen-lg mx-auto p-10 flex flex-col justify-center w-full h-full text-white'>
            <div className='pb-8 '>
                <p className='text-4xl font-bold inline border-b-4 border-gray-500'>Portfolio</p>
                <p className='py-6'>Check out some of my work</p>
            </div>

            

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-12 text-center py-8 px-12 sm:px-0'>
            {
                portfolios.map(({id, src,title, href}) => (
                    <div key='id'className='shadow-md hover:scale-110 duration-500 py-2 rounded-lg shadow-white'>
                        <a href={href} target='_blank' rel='noopener noreferrer'>
                        <img src={src} alt="" className='w-20 mx-auto'/>
                        <p className='text-xl py-2'>{title}</p>
                        <p className='text-sm'>Go to Project</p>
                        </a>
                    </div>
                ))
            }
                
            </div>
        </div>
    </div>
  )
}

export default Portfolio