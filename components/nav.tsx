export default function Nav() {
  return (
    <nav className="bg-gray-800 flex flex-col w-full mx-auto py-3 justify-center">
      <ul className="flex gap-16 justify-center  text-gray-300 text-sm">
        <li>
          <a href="">
          <img width={16} height={16} src="vdalle.png"/>
          </a>
        </li>
        <li>Abstract</li>
        <li>3D</li>
        <li>Fashion</li>
        <li>Profiles</li>
        <li>Nature</li>
        <li>Space</li>
        <li>Tech</li>
      </ul>
    </nav>
  )
}
