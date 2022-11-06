import type { FC } from 'react'
import Image from 'next/image'
import Images from '../components/images'

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

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
     
      

      <div className="flex relative  w-full mx-auto py-8  max-w-[900px]">

<div>
      <img width={60} height={60} src="vdalle.png" className='fixed top-0 bg-overlay animate-pulse blur-lg' /> 
      <img width={50} height={50} src="vdalle.png" className='fixed top-0' /> 
      <h1 className="text-5xl flex tracking-tight max-w-3xl font-semibold mb-4 mt-10">
      Welcome to DREAM-E   
      </h1>
      <p className="text-gray-500 text-xl">
        The API for fetching any unique images for your website
      </p>

     
      <div className="flex-auto flex space-x-4 py-6">
        <button className="h-10 -mr-4 px-6 font-light uppercase rounded-l-md bg-yellow-900 text-gray-100" type="submit">
          DREAM 
        </button>
        
        <input className=" placeholder:text-slate-400 placeholder:font-light text-gray-400 block bg-white w-full border border-slate-300 rounded-r-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-0 focus:font-light sm:text-sm " placeholder="Describe a list of images..." type="text" name="search"/>

      </div>

     <Images />

      <div className="border rounded-md p-4 my-5  mx-auto text-xs  text-gray-500">
      <p className='py-4'>Fetching a list of images</p>
  <div className="animate-pulse flex space-x-4">
   
    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
    <div className="flex-1 space-y-6 py-1">
      <div className="h-2 bg-slate-200 rounded"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div className="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</div>
      </div>

      <div>      <img width={380} height={350} src="unsplash.png" className='relative justify-center m-8 p-2' /> </div>
    </div>



      <div className="flex flex-col w-full mx-auto justify-center pt-20 pb-16 font-semibold leading-6 tracking-tight max-w-[900px]">
        <h1 className="text-5xl max-w-3xl">
          DREAM-E.
          <span className="ml-4 text-gray-500">
            The best way to get any images for your website.
          </span>
        </h1>
      </div>

      <section className="flex flex-col w-full mx-auto py-8  max-w-[900px]">
        <ul className="inline-flex gap-8 overflow-x-scroll">
          <ProductCard
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-mac-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1625783380000"
            name="Mac"
            href="https://apple.com/shop/buy-mac"
          />
          <ProductCard
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-iphone-nav-202108_GEO_US?wid=400&hei=260&fmt=png-alpha&.v=1628817965000"
            name="iPhone"
            href="https://apple.com/shop/buy-mac"
          />
          <ProductCard
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-ipad-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1625783381000"
            name="iPad"
            href="https://apple.com/shop/buy-mac"
          />

          <ProductCard
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-watch-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1625783378000"
            name="Apple Watch"
            href="https://apple.com/shop/buy-mac"
          />
          <ProductCard
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airpods-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1627410283000"
            name="AirPods"
            href="https://apple.com/shop/buy-mac"
          />
          <ProductCard
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-airtags-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1625783380000"
            name="AirTag"
            href="https://apple.com/shop/buy-mac"
          />
          <ProductCard
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-appletv-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1625783378000"
            name="Apple TV"
            href="https://apple.com/shop/buy-mac"
          />
          <ProductCard
            src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/store-card-13-homepod-mini-nav-202108?wid=400&hei=260&fmt=png-alpha&.v=1625783386000"
            name="HomePod mini"
            href="https://apple.com/shop/buy-mac"
          />
        </ul>
      </section>
      <section className="relative bottom-0  absolute flex-col w-full mx-auto py-7 justify-center">
        <p className="text-center justify-center bottom-0 absolute">
          Save on Mac or iPad for college with education pricing. And get
          AirPods. Shop now →
        </p>
      </section>
    </div>
  )
}
