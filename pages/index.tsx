import type { FC } from 'react'
import Image from 'next/image'
import Images from '../components/images'
import { useState, useEffect } from 'react';

import Wiki from './wiki'
 
type ProductCardProps = { src: string; href: string; name: string }

const ProductCard: FC<ProductCardProps> = ({ src, href, name }) => (
  <li className="min-w-[120px]">
    <a className="flex flex-col" href={href}>
      <Image width={120} height={78} alt={name} src={src} />
      <p className="pt-3 whitespace-no-wrap text-sm font-semibold text-center no-underline hover:underline">
        {name}
      </p>
    </a>
  </li>
)

const palettes = [

  ['#F7DEB5', '#FFAA4C', '#8E6A6A', '#5B3532', '#2B1342'], // Miami Vice
  ['#E2BE9D', '#F6C36D', '#F8DDA4', '#F5E6CC', '#7F8084'], // Desert
  [  '#FFC1A6',  '#FFAD9E',  '#FF9595',  '#8C1C13',  '#590808'], // Memphis
  ['#F8F8B2', '#B2C2A8', '#6D8F7A', '#273C2C', '#1B1C26'], // Gritty
  ['#FFFBF0', '#EFEFEB', '#99999B', '#212121', '#F1DA7E'], // Cyber
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





      <div className="flex relative  w-full mx-auto py-8  max-w-[900px]">

        <div>
          <img width={30} height={30} src="vdalle.png" className='fixed top-0 left-8 bg-overlay animate-pulse blur-lg' />
          {/* <img width={50} height={50} src="vdalle.png" className='fixed top-0' /> */}
          {/* <h1 className="text-4xl text-yellow-900 flex tracking-tight max-w-3xl font-semibold mb-4 mt-10">
            DREAM Search
          </h1>
          <p className="text-gray-500 text-xl">
            Search Millions of Wikipedia Article
          </p> */}


<div className='flex mx-6 text-xs '>
       <button className='ring-1 ring-yellow-600 px-2 ' onClick={() => setPaletteIndex((index) => (index + 1) % palettes.length)}>
        Palette    </button>  <span className='px-2  m-1   bg-slate-600 '> ⌥ or Alt
</span>   
      <div style={{ display: 'flex' }}>
        {colors.map((color) => (
          <div
            key={color}
            style={{
              backgroundColor: color,
              width: '15px',
              height: '6px',
              marginTop: '8px',
            }}
          ></div>
        ))}
      </div>
    </div>

          <div className="flex   flex-col w-full mx-auto justify-center pt-20 pb-16 font-semibold leading-6 tracking-tight max-w-[900px]">
            <h1 style={{color: colors[3] }} className={`text-5xl mx-6  max-w-3xl`}>
              DREAM AI.
              <span style={{color:  colors[1] }} className="ml-4 text-yellow-500">
                Search millions of Wikipedia Articles
              </span>
            </h1>
             
          </div>


          <div className="flex-auto mx-6 flex space-x-4 ">
            {/* <button className="h-10 flex py-2 text-md -mr-4 px-6 font-medium uppercase rounded-none bg-yellow-900 text-gray-100" type="submit">
              DREAM 
            </button> */}
              

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
