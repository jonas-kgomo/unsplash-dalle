import Image from "next/image";

export default function Nav() {
  return (
    <nav className="flex flex-col w-full mx-auto py-3 justify-center">
      <ul className="flex gap-12 px-2 m-2 justify-center  text-slate-300 text-sm">
        <li className="flex px-4">
            <div className="flex px-4">{"  "}
            <Image width={16} height={16} src="/vdalle.png"  alt="logo"/>
       
            </div>
         
        </li>
        {/* <li>Art</li> */}
        {/* <li>3D</li>
        <li>Fashion</li>
        <li>Profiles</li> */}
        {/* <li>Nature</li> */}
        {/* <li>Space</li> */}
        {/* <li>Philosophy</li> */}
        
      </ul>
    </nav>
  )
}
