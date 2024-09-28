import React from 'react'
import CategoriesSlider from './CategoriesSlider';

export default function certificates() {
    const categoriesItems = [
        {
          index: 1,
          name: "Kitchen",
          URL: "/Kitchen",
          image: <img src="https://m.media-amazon.com/images/I/81871DQNiAL._AC_UL320_.jpg"  className="rounded-full w-16 h-16 border border-slate-500" alt="Kitchen" />,
        },
        {
          index: 2,
          name: "Electoronics",
          URL: "/Electoronics",
          image: <img src="https://ecommerce.routemisr.com/Route-Academy-categories/1681511121316.png" className="rounded-full w-16 h-16 border border-slate-500" alt="Electoronics" />,
        },
        {
          index: 3,
          name: "Music",
          URL: "/Music",
          image: <img src="https://ecommerce.routemisr.com/Route-Academy-categories/1681511964020.jpeg" className="rounded-full w-16 h-16 border border-slate-500" alt="Music" />,
        },
        {
          index: 4,
          name: "baby",
          URL: "/baby",
          image: <img src="https://ecommerce.routemisr.com/Route-Academy-categories/1681511427130.png" className="rounded-full w-16 h-16 border border-slate-500" alt="baby" />,
        },
        {
          index: 5,
          name: "Men",
          URL: "/Men",
          image: <img src="https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg" className="rounded-full w-16 h-16 border border-slate-500" alt="Men" />,
        },
        {
          index: 6,
          name: "Sports",
          URL: "/Sports",
          image: <img src="https://th.bing.com/th/id/R.5638648e4e7dc4bdd2744e50e6d3fe1e?rik=4KesdeJ3QARNPA&riu=http%3a%2f%2fimage.sportsmansguide.com%2fadimgs%2fl%2f5%2f582728_ts.jpg&ehk=6UtT55t3%2bKVBisSXwMtxhIasWcjknRrWfIS9%2b7n4ySg%3d&risl=&pid=ImgRaw&r=0" className="rounded-full w-16 h-16 border border-slate-500" alt="Sports" />,
        }
      ];
        return (
    <>
     <div className="">
     <h1 className="text-2xl font-bold mb-4">Categories</h1>
     <CategoriesSlider categories={categoriesItems} />
     </div>
     
    </>
  )
}
