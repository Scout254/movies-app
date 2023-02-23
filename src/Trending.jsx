import {React,useEffect, useState} from 'react'
import axios from 'axios'
import { API_KEY } from './tmdb'
import { useStateValue } from './StateProvider'
import { Swiper ,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import  Youtube  from 'react-youtube'
const Trending = () => {
    const [{ trending, selectedMovie,id }, dispatch] = useStateValue();
  

  
    useEffect(() => {
      const fetchMovies = async () => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US

          `
        );
        console.log(response.data)
        const { results } = response.data;
        
        
        const trending = results.map(
          ({
            id,
            backdrop_path,
            media_type,
            original_title,
            overview,
            release_date,
            title,
            vote_average,
            poster_path,
            
          }) => {
            return {
              id,
              backdrop_path,
              media_type,
              original_title,
              overview,
              release_date,
              title,
              vote_average,
              poster_path,
            };
          }
        );
        
        
        dispatch({
          type: "SET_TRENDING",
          trending: trending,
        });

        
        if (trending.length > 0) {
            dispatch({
              type: "SET_SELECTED_MOVIE",
              selectedMovie: trending[0],
            });
          }
      };

   
     
      fetchMovies();
    }, [dispatch]);
  
    const handleSelectMovie = (selectedMovie) => {
      dispatch({
        type: "SET_SELECTED_MOVIE",
        selectedMovie: selectedMovie,
      });
    };

    
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + "..." : string;
      };
   
    return (
        <div className="h-screen flex flex-col text-white ">
          <h1 className='text-black'>Trending Movies</h1>
          <div className=''>
            {selectedMovie && (
              <div className='h-full'>
                <div
                  className="bg-center bg-cover"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
                    height: "100vh",
                  }}
                >
                  <div className="flex flex-col h-full justify-end px-4 pb-4 bg-gradient-to-t from-black">
                    <div className='relative top-[-500px] w-[450px]'>
                      <button className="bg-red-600 h-[40px] w-[100px] cursor-pointer active:bg-black rounded-full ">PLAY</button>
                      <h2 className="text-3xl font-bold">{selectedMovie.title}</h2>
                     {truncate(selectedMovie.overview,150)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
      
          <div className="absolute top-[550px] w-full">
            
        <div className=" ">
          <Swiper 
          slidesPerView={4}
            centeredSlides
          >
                {trending?.map(
                  ({
                    id,
                    backdrop_path,
                    media_type,
                    original_title,
                    overview,
                    release_date,
                    title,
                    vote_average,
                    poster_path,
                  }) => (
                   
                      <SwiperSlide key={id} className='flex justify-center items-center'>
                      <div
                        className=" h-[300px] w-[250px]  bg-gray-900 "
                        onClick={() => handleSelectMovie({
                        id,
                        backdrop_path,
                        media_type,
                        original_title,
                        overview,
                        release_date,
                        title,
                        vote_average,
                        poster_path })}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                          alt=""
                          className="w-[250px]"
                        />
                        <div className="p-4">
                          <h2 className="text-2xl font-bold">{title || original_title}</h2>
                          
                          <p>{release_date}</p>
                          <p>{vote_average}</p>
                        </div>
                      </div>
                      </SwiperSlide> 
                  )
                )}
             </Swiper>
            </div>
          </div>
        </div>
      );
      
  };
  
  export default Trending;
  