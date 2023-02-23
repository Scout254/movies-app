import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_KEY } from './tmdb';

const Popular = () => {
    const[movies,setMovies] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`);
            console.log(response)
            setMovies(
                response.data.results[
                    Math.floor(Math.random() * response.data.results.length - 1)
                ]
            );
            return response;
        };
        fetchData();
    },[])
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + "..." : string;
      };
  return (
    <div className=' flex text-white h-[600px] mx-[20px]'>
    
    <div className="h-full w-[450px] bg-black flex flex-col gap-[20px] pt-[200px] px-[20px]">
    <h1 className='text-4xl'>{movies.title || movies.original_title}</h1>
            {truncate(movies?.overview,150)}
            <div className='flex gap-[10px] pt-[20px]'>
            <button className='bg-red-600 h-[40px] w-[100px] cursor-pointer'>PLAY</button>
            <button className='border h-[40px] w-[100px] cursor-pointer'>MYLIST</button>
            </div>
        </div>
    <div className=' h-full w-full '>
        {/* <img src={`https://image.tmdb.org/t/p/w500${movies.backdrop_path}`} alt=""
        className='h-[480px] w-1/2' 
        /> */}
        <img src={`https://image.tmdb.org/t/p/w500${movies.poster_path}`} alt=""
        className='h-full w-full' />
    </div>
        
        
    
    </div>
  )
}

export default Popular