import { NextPage } from "next";
import client from "../lib/weviate";
import { useState, useEffect, SetStateAction, Key } from "react";
import Image from "next/image";
// import fetch from 'node-fetch';
import UMAPlot from  './tsne';

type Props = {
  query: string;
  resultsLang?: string;
  colors: string[];
};

const Wiki: NextPage<Props> = ({ query, resultsLang, colors }) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [view, setView] = useState<'searchResults' | 'table'>('searchResults');
  const [LIMIT, setLIMIT] = useState(0)
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const MAX_API_CALLS = 5; // maximum number of allowed API calls
  

  useEffect(() => {
    const fetchImageUrl = async (title: string) => {
      try {
        const response = await fetch(
          `/api/wikimage?title=${encodeURIComponent(title)}`
        );
        const data = await response.json();
        const fileExtension = data.imageUrl.split(".").pop()?.toLowerCase();
        if (fileExtension !== "svg" && fileExtension !== "stl") {
          return data.imageUrl;
        }
      } catch (error) {
        console.error(error);
      }
      return null;
    };

    const getImageUrls = async () => {
      const urls: (string | null)[] = await Promise.all(
        searchResults.map((item) => fetchImageUrl(item.title))
      );
      setImageUrls(urls.filter((url) => url !== null) as string[]);
      
    };

    if (searchResults.length > 0) {
      getImageUrls();
    }
  }, [searchResults]);

  const semanticSearch = async () => {
   setLIMIT(LIMIT + 1);
      // check if the number of API calls has reached the maximum limit
  if (LIMIT >= MAX_API_CALLS) {
    alert('API call limit exceeded. Cannot make any more API calls.');
    // return null;
    return <div>
    API call limit exceeded. Cannot make any more API calls.
    </div>;
  }

  // if the limit has not been reached, increment the number of API calls

     console.log(LIMIT);
    setSearchResults([]);
     
      
        
    const nearText = { concepts: [query] };
    const properties = [
      "text",
      "title",
      "url",
      "views",
      "lang",
      "_additional {distance}",
    ];



    let response;
    if (resultsLang) {
      const whereFilter = {
        path: ["lang"],
        operator: "Equal" as const,
        valueString: resultsLang,
      };
      response = await client.graphql
        .get()
        .withClassName("Articles")
        .withFields(properties.join(" "))
        .withNearText(nearText)
        .withWhere(whereFilter)
        .withLimit(5)
        .do();
    } else {
      response = await client.graphql
        .get()
        .withClassName("Articles")
        .withFields(properties.join(" "))
        .withNearText(nearText)
        .withLimit(5)
        .do();
    }

    const result = response.data.Get.Articles;
    return result;
  };

  

  const getResult = (result: any[]) => {
    
    return (
      
      <div>

        {result.map((item, index) => {
          // const imageUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(item.title)}`;
          // const firstUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(item.title)}`;
          const imageUrl = imageUrls[index];
          if (!imageUrl) {
            // If imageUrl is undefined, skip this index
            return null;
          }

          return (
            <div
              key={item.url}
              style={{
                background: colors[0],
                borderColor: colors[1],
                outlineStyle: "50px",
              }}
              className="border-2 my-6 p-2 flex-wrap bg-yellow-100 mx-6 py-4 text-wrap"
            >
              <h3
                style={{ color: colors[3] }}
                className="font-semibold text-xl text-yellow-800"
              >
                {item.title}
              </h3>
              <p className="flex flex-grid gap-4 " style={{ color: colors[4] }}>
                <span className="w-4/5  ">
                  {item.text}
                  <div className="py-2 uppercase" >
                  <span   style={{
                        background: colors[0], 
                        color: colors[2],
                      }} className=" flex h-8   w-42 text-xs">
                    <a   style={{
                        background: colors[2], 
                        color: colors[0],
                      }}
                      className="px-2 py-2  font-light hover:bg-yellow-300"
                      href={item.url}
                    >
                   
                      URL {"↗"}{" "}
                    </a>
                    <p className="px-2 py-2 ">
                      {" "}
                      VIEWS {"ↁ"}  ―  {item.views} {"M"}  ― EMBS {Math.abs(item._additional.distance.toFixed(0))}{" "}
                    </p>
                  </span>
                </div>
                  </span>

              

                {imageUrl && (
                  <div
                    style={{ background: colors[3] }}
                    className="mx-auto relative  w-2/5   min-h-36 mx-auto mx-2  p-4 my-auto"
                  >
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      width={400}
                      height={300}
                      objectFit="cover"
                      objectPosition="center"
                      className="aspect-square"
                    />
                  </div>
                )}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const ScatterPlot = (result: any[]) => { 
    const maxValue = -142;
    const midValue = -146;
    const minValue = -150;
  
    return (
      <div
        style={{
          background: colors[0],
          borderColor: colors[1],
          outlineStyle: "50px",
        }}
        className="border-2 mx-4 w-48 grid grid-cols-3 gap-0  bg-yellow-100  "
      >
        {result.map((value) => (
          <div
            key={value}
            style={{
              backgroundColor:
                value._additional.distance.toFixed(0) > maxValue
                  ? colors[4]
                  : value._additional.distance.toFixed(0) < minValue
                  ? colors[1]
                  : value._additional.distance.toFixed(0) < midValue
                  ? colors[2]
                  : colors[3],
            }}
            className="h-16 w-16 relative"
          >
            <p style={{ color: 'white', fontSize: '10px'}}
              className=" font-light mx-auto p-1  text-center "
               > {value.title.slice(0,16)} <br/>
              {Math.abs(value._additional.distance.toFixed(0))}
            </p>
          </div>
        ))}
      </div>
    );
  };
  

  return (
    <>
      <div className="flex ">
        <button
          style={{ background: colors[3] }}
          className="bg-yellow-900 text-white px-3 mx-6 p-1 rounded-none font-semibold text-base sm:text-sm uppercase"
          onClick={async () => {
            const result = await semanticSearch();
            setSearchResults(result); 
            
          }}
        >
          Search
        </button>
   
        <button
  style={{ background: colors[3] }}
  className="bg-yellow-900 text-white px-3 ml-0 mx-6 p-1 rounded-none font-semibold text-base sm:text-sm uppercase"
  onClick={() => {
    switch (view) {
      case 'searchResults':
        setView('table');
        break;
      case 'table':
        setView('searchResults');
        break;
      default:
        setView('searchResults');
    }
  }}
>
          
          {view === 'searchResults' ? 'Graph [UMAP]' :  'Results [Back] ' }
       
        </button>
      </div>
     

      {view === 'searchResults' ?   (<> {searchResults.length > 0 && (
       
       <div className="">
            <div className="container m-2 ">
         <div>{ScatterPlot(searchResults)}</div>
       </div>
         <div className="flex-grow-0 w-full">{getResult(searchResults)}</div>
       </div>
     )}</> ) : 
     <UMAPlot color={colors}/>
     }
 

    </>
  );
};


 
export default Wiki;


 