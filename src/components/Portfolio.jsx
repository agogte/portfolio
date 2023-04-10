import React from 'react'
import tictactoe from "../assets/portfolio/tictactoe.png"
import connect4 from "../assets/portfolio/connect4.png"
import password_generator from "../assets/portfolio/password_generator.png"
import snake from "../assets/portfolio/snake.png"
import myportfolio from "../assets/portfolio/portfolio.png"
import hangman from "../assets/portfolio/hangman.png"

const Portfolio = () => {

    const portfolios = [
        {
            id:1,
            src: tictactoe,
            href: 'https://agogte.github.io/tic-tac-toe/'
        },
        {
            id:2,
            src: connect4,
            href: 'https://agogte.github.io/connect4/'
        },
        {
            id:3,
            src: password_generator,
            href: 'https://agogte.github.io/passgen_JS/'
        },
        {
            id:4,
            src: snake,
            href: 'https://agogte.github.io/snake/'
        },
        {
            id:5,
            src: myportfolio,
            href: 'https://agogte.github.io/portfolio/'
        },
        {
            id:6,
            src: hangman,
            href: 'https://agogte.github.io/hangman/'
        }
    ]


  return (
    <div name="portfolio" className='w-full h-screen bg-gradient-to-b from-black to-gray-800 text-white'>
        <div className='max-w-screen-lg mx-auto p-10 flex flex-col justify-center w-full h-full text-white'>
            <div className='pb-8 '>
                <p className='text-4xl font-bold inline border-b-4 border-gray-500'>Portfolio</p>
                <p className='py-6'>Check out some of my work</p>
            </div>

            

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0'>
            {
                portfolios.map(({id, src, href}) => (
                    <div key='id'className='shadow-md hover:scale-110 duration-500 py-2 rounded-lg shadow-white'>
                        <a href={href}>
                        <img src={src} alt="" className='w-20 mx-auto'/>
                        <p>Go to Project</p>
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