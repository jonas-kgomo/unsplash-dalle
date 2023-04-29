
// import Image from 'next/image'
import Images from '../components/images'
import { useState, useEffect } from 'react';

import Wiki from '../components/wiki'
import Nav from 'components/nav';
 
 

const palettes = [

  ['#F7DEB5', '#FFAA4C', '#8E6A6A', '#5B3532', '#2B1342'], // Miami Vice
  // ['#F2E2AE', '#E2D189', '#B79F6B']
  ['#F2E2AE', '#C2B17A', '#A38652', '#6D5333', '#3C3D3E'], // Desert

  [  '#FFC1A6',  '#FFAD9E',  '#FF9595',  '#8C1C13',  '#590808'], // Memphis
  ['#F8F8B2', '#B2C2A8', '#6D8F7A', '#273C2C', '#1B1C26'], // Gritty 


  [
    "#e1d4b7",  
    "#a39161",  
    "#63553c",  
    "#211e1b",  
    "#f9f7f4",  
  ]
   // Purple Haze   
];


export default function Home() {

  const [query, setQuery] = useState('');

  const handleQueryChange = (event : any) => {
    setQuery(event.target.value);
  };


  // color palletes 
  const [paletteIndex, setPaletteIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: {
      preventDefault: any; code: string; 
}) => {
      // disable default
      // event.preventDefault();
      if (event.code === 'Space') {
        setPaletteIndex((index) => (index + 1) % palettes.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const  colors = palettes[paletteIndex];



  
  return (
    <div className="flex flex-col max-w-6xl mx-auto items-center min-h-screen  ">

<div className='flex'>
<Nav/>
<div className='flex mx-6 text-xs h-12 py-3 w-full px-2 m-2 '>
      

      <div style={{ display: 'flex', color: colors[3], background: colors[0] }}>
      <button className='ring-1 mx-2 ring-yellow-700 px-2 ' onClick={() => setPaletteIndex((index) => (index + 1) % palettes.length)}>
      Palette {"␣"}    </button>  
        
        {colors.map((color) => (
          <div
            key={color}
            style={{
              backgroundColor: color,
              width: '15px',
              height: '8px',
              marginTop: '8px',
            }}
          > </div>
        ))}
      </div>
    </div>
</div>
 



      <div className="flex relative  w-full mx-auto py-8  max-w-[900px]">

        <div>
          <img width={30} height={30} src="vdalle.png" className='fixed top-0 left-8 bg-overlay animate-pulse blur-lg' />
        


          <div className="flex   flex-col w-full mx-auto justify-center pt-20 pb-16 font-semibold leading-6 tracking-tight max-w-[900px]">
            <h1 style={{color: colors[3] }} className={`text-5xl mx-6  max-w-3xl`}>
              DREAM AI.
              <span style={{color:  colors[1] }} className="ml-4 text-yellow-500">
                Find anything on wikipedia
                 </span>
            </h1>
             
          </div>


          <div className="flex-auto mx-6 flex space-x-4 ">
        

            <input  style={{color: colors[3], borderColor: colors[1],  background: colors[0] }} 
             className="  block placeholder-yellow-800 placeholder-opacity-80   w-full border border-slate-300  py-2 pl-2 pr-3 shadow-sm    focus:ring-yellow-500 focus:ring-0 focus:font-light sm:text-sm "
              placeholder="Find the needles in the haystack... "  name="search"
            type="text" value={query} onChange={handleQueryChange} />
   
            {/* <input className=" placeholder:text-slate-400 placeholder:font-light text-gray-400 block bg-white w-full border border-slate-300 rounded-r-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-0 focus:font-light sm:text-sm " placeholder="Describe a list of images..." type="text" name="search" /> */}

          </div>

          <Images />
    
          <Wiki colors={colors} query={query} resultsLang="en" />
  
        </div>

        <div>
          <img width={450} height={450} src="unsplash.png" className='relative justify-center m-8 p-2' />
        </div>


      </div>




 
     
    </div>
  )
}
