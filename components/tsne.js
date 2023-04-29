 
import React, { useState, useEffect, useRef } from 'react';
import { UMAP } from 'umap-js'

 
export default function UMAPlot(colors) {
  const canvasRef = useRef(null); 
  
  const [data, setData] = useState(null);
  const [dataTitle , setDataTitle] = useState("This is a UMAP for Dimension Reduction from [786] to [2] . using People+AI Research Initiative ")

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://datasets-server.huggingface.co/first-rows?dataset=Cohere%2Fwikipedia-22-12-simple-embeddings&config=Cohere--wikipedia-22-12-simple-embeddings&split=train&limit=200",
        {
          // headers: { Authorization: `Bearer ${API_TOKEN}` },
          timeout: 5000, // timeout in milliseconds
        }
      );
      const result = await response.json();
      console.log(result);
      setData(result);
 
    }

    fetchData();
  }, []);

 
   // Extract embeddings
   const embeddings = data?.rows.map((embeds) => embeds.row.emb);
  //  console.log(embeddings)

   useEffect(() => {

    if (data && canvasRef.current && embeddings) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
  
      // Initialize UMAP instance
      const umapOpts = { nComponents: 8, nEpochs: 400, nNeighbors: 10, center: false };
      const umap = new UMAP(umapOpts);
  
      // Fit UMAP on embeddings
      const transformed = umap.fit(embeddings);
  
      // Determine min and max values of transformed points
      const [minX, minY] = transformed.reduce(([minX, minY], [x, y]) => [Math.min(minX, x), Math.min(minY, y)], [Infinity, Infinity]);
      const [maxX, maxY] = transformed.reduce(([maxX, maxY], [x, y]) => [Math.max(maxX, x), Math.max(maxY, y)], [-Infinity, -Infinity]);
     // scale down
      // ctx.scale(1 / 1.8, 1 / 1.8);

      
      // Draw scatter plot
      // Draw scatter plot
ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.imageSmoothingQuality = "high";
ctx.imageSmoothingEnabled = true;

function hexToRGB(hex) {
 if (!hex) {
   return [0, 0, 0];
 }
 const r = parseInt(hex.substring(1, 3), 16);
 const g = parseInt(hex.substring(3, 5), 16);
 const b = parseInt(hex.substring(5, 7), 16);
 return [r, g, b];
}



transformed.forEach(([x, y], index) => {
  const cx = (x  - minX) / (maxX - minX) * canvas.width;
  const cy = (y  - minY) / (maxY - minY) * canvas.height;
  const radius =8;
  const lineWidth = 1; 
  const colorHex = hexToRGB(colors.color[index % 3]);

  // Draw circle
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 4 * Math.PI);
  // ctx.fillStyle = `rgb(${y * 80}, ${x * 4}, 100)`;
  ctx.fillStyle = `rgb(${colorHex[0]}, ${colorHex[1]}, ${colorHex[2]})`;

  ctx.fill();
  ctx.closePath();

  // Draw ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius + lineWidth / 2, 0, 2 * Math.PI);
  ctx.strokeStyle = colors.color[3];
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  // Add title on hover
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    // setDataTitle('out');
  
    
    if(mouseX >= cx - radius && mouseX <= cx + radius && mouseY >= cy - radius && mouseY <= cy + radius) {
      setDataTitle(data.rows[index].row.text);
      
      console.log(data.rows[index].row.text);
    }
 
    
  });


});

 
    }
  }, [data, embeddings, colors]);
  
 
   
 
 
 
 
  return (
   <div
   style={{
    background: colors.color[0],
    borderColor: colors.color[1],
    outlineStyle: "50px", 
    width: "1005px"
  }} 
   className="border-2  my-6 p-12 justify-center flex-wrap   mx-6 py-4 text-wrap"
 >
      <h2  style={{
     color: colors.color[3] }}   className='uppercase font-semibold'>UMAP Plot</h2>
   
   <div
      style={{
        color: colors.color[2],
        borderColor: colors.color[1],
        outlineStyle: "50px", 
      }}  className="font-light py-4"
       > {dataTitle}</div>
       
          <canvas ref={canvasRef}  width={700} height={300} style={{ border: "0px solid", borderColor: colors[3] , background: colors[1]}} />
    
         {data ? (
         <div>
        
        <p  style={{
     color: colors.color[3] }}   className='uppercase py-6  font-semibold'>Results {"[truncated]"}</p>
    
   
      <table   style={{
     background: colors.color[2],
     color: colors.color[0], 
     borderColor: colors.color[2],
     outlineStyle: "50px w-full",
    
   }} className="my-6 p-4">
        <thead>
          <tr
             style={{
              background: colors.color[3],
              borderColor: colors.color[1],
              color: colors.color[0],
              outlineStyle: "50px",
            }} className="   gap-2 p-4 m-4" >
            {data.features.map((feature, i) => (
              <th className="font-light uppercase m-1 px-2 text-xs" key={i}>{feature.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className="font-light text-xs " >
          {data.rows.map((row, i) => (
            <tr key={i}>
              {Object.values(row.row).map((cell, j) => (
                // <td key={j}>{cell}</td>
                // <td key={j}>{typeof cell === "string" ? cell.slice(0, 10) : cell}</td>
               // cell.slice(0, 1).parseF(4) 
               <td key={j} className="px-1 p-2  italic mx-auto font-italic">
               {typeof cell === "string"                 ? cell.slice(0, 20)
                 : Array.isArray(cell)                  ? parseFloat(cell[0]).toFixed(3)
                 : typeof cell === "number"                  ? cell.toFixed(0)
                 : cell}
             </td>
             
              
           
              ))}
            </tr>
          ))}  
        </tbody>
      </table>
    </div>   ) : 
        (<div>Loading...</div>)} 
      
    </div>
  )
}



