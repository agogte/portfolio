import React from 'react'
import error from '../assets/image-removebg-preview.png'

const Whoopsie = () => {
  return (
    <div className='bg-black text-white h-screen w-screen'>
        <img src={ error } alt="" style={{width: 500, height: 500}}/>
        <h2>Web page is currently under maintenance</h2>
        <h3>Apologies for the inconvenience</h3>
    </div>
  )
}

export default Whoopsie