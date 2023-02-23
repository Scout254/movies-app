import axios from "axios";
import { useStateValue } from "./StateProvider";
import React,{useEffect, useState} from "react";
import {API_KEY} from './tmdb'

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const Discover = () => {
    const [{ discoverMovie,discoverTv }, dispatch] = useStateValue();
    const[activeTab,setActiveTab] = useState(0);
    
    const handleTabClick =(event) =>{
        setActiveTab(event)
    }
  
    useEffect(() => {
      const fecthDiscoverMovie = async() => {
       
          const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US`);
           console.log(response.data)
          const { results } = response.data;
          
          const discoverMovie = results.map(({id,title,backdrop_path,original_title,overview,poster_path,release_date,vote_average})=>{
            return{id,title,backdrop_path,original_title,overview,poster_path,release_date,vote_average}
          })
          console.log(discoverMovie)
          dispatch({
            type:"SET_DISCOVER_MOVIE",
            discoverMovie:discoverMovie
          })
        
      };
     fecthDiscoverMovie();

    const fectchDiscoverTv = async()=>{
    const response = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US`);
      console.log(response.data)
     const { results } = response.data;
     
     const discoverTv = results.map(({id,name,backdrop_path,original_name,overview,poster_path,release_date,vote_average})=>{
       return{id,name,backdrop_path,original_name,overview,poster_path,release_date,vote_average}
     })
     console.log(discoverTv)
     dispatch({
       type:"SET_DISCOVER_TV",
       discoverTv:discoverTv
     })
    }
    fectchDiscoverTv();
      
    }, []);
  return (

    <Tabs selectedIndex={activeTab} onSelect={handleTabClick} className="mx-[20px] my-[100px]">
    <TabList className=" flex gap-[20px] my-[20px]">
        <Tab className="outline-none cursor-pointer" selectedClassName="border-b-4 border-red-500"><h2 className="text-2xl">Discover Movies</h2></Tab>
        <Tab className="outline-none cursor-pointer" selectedClassName="border-b-4 border-red-500"><h2 className="text-2xl">Discover TV</h2></Tab>
    </TabList>
<TabPanel>
<Swiper
    slidesPerView={4}
    className=""
    >
    <div className="">
     {discoverMovie?.map(({id,title,backdrop_path,original_title,overview,poster_path,release_date,vote_average})=>(
       <SwiperSlide key={id}>
        <div  className="h-[400px] border  w-[300px]  text-white cursor-pointer transition ease-in-out delay-150 bg-stone-900 hover:-translate-y-1 hover:scale-110 hover:bg-stone-400 duration-300" >
        <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt="" className="h-[200px] w-full"/>
       
         {/* <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="" className="h-[250px] w-[250px]" /> */}
     <div className="pt-[20px]">
       <h2 className="text-sm">{title}</h2>
         {/* {original_title}  */}
        {/* {overview} */}
       <h2>Release Date : {release_date}</h2>
        <h2>rating :{vote_average}</h2>
       </div>
        </div>
       </SwiperSlide>
      ))}
     </div>
    </Swiper>
</TabPanel>
<TabPanel><Swiper
       slidesPerView={4}
       className=""
       >
        <div className="">
            
        {discoverTv?.map(({id,name,backdrop_path,original_name,overview,poster_path,release_date,vote_average})=>(
            <SwiperSlide key={id} >
            <div  className="h-[400px] border  w-[300px] bg-gray-900 text-white cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-stone-400 duration-300">
             <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt="" className="h-[200px] w-full" />
             {/* <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt="" /> */}
             <div className="pt-[20px]">
                <h2 className="text-sm text-white">{name}</h2>
                 {/* {original_name}  */}
                {/* {overview} */}
                <h2>Release Date:{release_date}</h2>
                <h2>rating :{vote_average}</h2>
                </div>
             </div>
            </SwiperSlide>
           ))}
        </div>
      </Swiper></TabPanel>
   
    <div>
    
     
      
      
    </div>
    </Tabs>
  )
}

export default Discover