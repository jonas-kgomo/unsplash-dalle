import { NextPage } from 'next';
import client from '../lib/weviate';
import { useState } from 'react';
import Image from 'next/image';
import fetch from 'node-fetch';

type Props = {
  query: string;
  resultsLang?: string;
  colors: string[];
};



const Wiki: NextPage<Props> = ({ query, resultsLang , colors}) => {
//  const [searchResults, setSearchResults] = useState<any[]>([]);
// const [searchResults, setSearchResults] = useState<{
//  length: number;
//  result: any[]
// }>({result: []});
const [searchResults, setSearchResults] = useState<any[]>([]);


 const semanticSearch = async () => {


    const nearText = { concepts: [query] };
    const properties = ['text', 'title', 'url', 'views', 'lang', '_additional {distance}'];

   

    let response;
    if (resultsLang) {

       const whereFilter = {
     path: ['lang'],
     operator: 'Equal' as const,
     valueString: resultsLang,
   };
      response = await client.graphql
        .get()
        .withClassName('Articles')
        .withFields(properties.join(' '))
        .withNearText(nearText)
        .withWhere(whereFilter)
        .withLimit(5)
        .do();
    } else {
      response = await client.graphql
        .get()
        .withClassName('Articles')
        .withFields(properties.join(' '))
        .withNearText(nearText)
        .withLimit(5)
        .do();
    }

 
 
    const result = response.data.Get.Articles;
    
    return result ;
  };

  const printResult = (result: any[]) => {
    result.forEach((item) => {
      // console.log(`\033[95m${item.title} (${item.views})  \033[0m`);
      // console.log(`\033[4m${item.url}\033[0m`);
      console.log(item.text);
      console.log('');
    });
  };

  


  const getResult = (result: any[]) => {
   return (
     <div >
       {result.map((item) => (
         <div key={item.url} style={{background: colors[0], borderColor: colors[1], outlineStyle: '50px'  }} className="border-2  my-6 p-2  flex-wrap   bg-yellow-100 mx-6 py-4 text-wrap">
           <h3 style={{color: colors[3] }} className='font-semibold text-xl text-yellow-800'>{item.title}</h3>
           <p style={{color: colors[4] }} >{item.text}</p>
           <span  className=' flex w-42 text-xs' >
           <a  style={{color: colors[2] }} className='text-yellow-800  font-light hover:bg-yellow-300' href={item.url}> URL {"↗"}  </a>
           <p className='px-2' > Views  {item.views}  </p>
            
           {/* <Image src={imageUrl}  className="mx-auto my-2 w-1/2" width={120} height={78} alt={item.title}   /> */}
           </span>
           
         </div>
       ))}
       {/* <span className='py-3 bg-white flex w-full h-4'></span> */}
        
     </div>
   );
 };

 
 




  return (
    <>
<button style={{background: colors[3] }}
      className='bg-yellow-900 text-white px-3 mx-6  p-1 rounded-none font-semibold text-base sm:text-sm uppercase'
        onClick={async () => {
          const result = await semanticSearch();
          // setSearchResults(result);
          setSearchResults( result );
 
          // alert(searchResults)
        }}
      >
        Search
      </button>
      {searchResults.length > 0   &&
      <div  
      className='flex py-2 text-xs text-gray-800 font-light  uppercase bg-brown-500 mx-6'>
       <p style={{background: colors[3], color: colors[1] }} className='uppercase text-yellow-200 px-2 p-1 bg-yellow-800 '> {resultsLang || 'All'}</p>
       <p style={{background: colors[0] }} className='px-2 p-1 bg-yellow-200'>  {query ? query : ''}</p>
   
      </div>

    }
   
      {searchResults.length > 0 && getResult(searchResults)}
    </> 
  );
};

export default Wiki;