import {React,useEffect, useState} from 'react'
import axios from 'axios'
import { API_KEY } from './tmdb'
import { useStateValue } from './StateProvider'
import { Swiper ,SwiperSlide} from 'swiper/react'
import 'swiper/css'
import  Youtube  from 'react-youtube'
const Trending = () => {
    const [{ trending, selectedMovie,id }, dispatch] = useStateValue();
    const [videoId, setVideoId] = useState(null);

    
    useEffect(() => {
      const fetchMovies = async () => {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`
        );
        console.log(response.data);
        const { results } = response.data;
    
        // Fetch video information for each movie in the list and append it to the movie object
        const trending = await Promise.all(
          results.map(async ({
            id,
            backdrop_path,
            media_type,
            original_title,
            overview,
            release_date,
            title,
            vote_average,
            poster_path
          }) => {
            const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
              params: {
                api_key: API_KEY,
                append_to_response: "videos"
              }
            });
            console.log("videoinfo:", videoResponse.data);
    
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
              video: videoResponse.data.videos.results[0]
            };
          })
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
    
  
    const handleSelectMovie = async (selectedMovie) => {
      dispatch({
        type: "SET_SELECTED_MOVIE",
        selectedMovie: selectedMovie,
      });
    
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}`,{
        params:{
          api_key:API_KEY,
          append_to_response:"videos"
        }
      });
    
      const videoResults = response.data.videos.results;
      if (videoResults.length > 0) {
        setVideoId(videoResults[0].key);
      } else {
        setVideoId(null);
      }
    };
    
    const handlePlayVideo = (selectedMovie) => {
      if (selectedMovie && selectedMovie.video) {
        dispatch({
          type: "SET_SELECTED_MOVIE",
          selectedMovie: selectedMovie,
        });
        setVideoId(selectedMovie.video.key);
      } else if (trending.length > 0 && trending[0].video) {
        // If the selected movie doesn't have a video, play the first movie in the list that does
        dispatch({
          type: "SET_SELECTED_MOVIE",
          selectedMovie: trending[0],
        });
        setVideoId(trending[0].video.key);
      }
    };
    
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + "..." : string;
      };
   
    return (
        <div className="h-screen flex flex-col text-white ">
          
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
                  <div className="flex flex-col h-full justify-end px-4 pb-4 bg-gradient-to-t from-stone-800">
                    <div className='relative top-[-500px] w-[450px]'>
                    <button
                    className="bg-red-600 h-[40px] w-[100px] cursor-pointer active:bg-black rounded-full "
                    onClick={() => handlePlayVideo(selectedMovie)}>
                  
                    PLAY
                  </button>
                  <div className=''>
                        {videoId && (
                          <div className="relative top-[150px] left-[500px] ">
                            <Youtube videoId={videoId} className=" " />
                            <button 
                              className="absolute top-0 right-[-230px] bg-red-600 h-[30px] w-[40px] text-white"
                              onClick={() => setVideoId(null)}
                            >
                              Close
                            </button>
                          </div>
                        )}
                      </div>
                      <h2 className="text-5xl font-bold font-roboto">{selectedMovie.title}</h2>
                     {truncate(selectedMovie.overview,150)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
      
          <div className="absolute top-[550px] w-full">
            
        <div className="">
        <div className='text-6xl my-[20px]'>Trending</div>
          <Swiper 
          slidesPerView={4}
          
            
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
                   
                      <SwiperSlide key={id} className='flex justify-center items-center cursor-pointer transition ease-in-out delay-150 bg-stone-900 hover:-translate-y-1 hover:scale-110 hover:bg-stone-400 duration-300 '>
                      <div
                        className=" h-[300px] w-[250px] "
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
  