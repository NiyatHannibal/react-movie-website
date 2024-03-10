import React from 'react'
import { useEffect, useState } from 'react';
import YouTube from '../../Components/YouTube';
function TVSHOWS() {
  const [TVSHOWS,setTVSHOWS]= useState([])
  const [videos,setVideos]= useState([])
  const [selectedShow, setSelectedShow] = useState(null);
  const getTVSHOWS = async() =>{
    try{
     await fetch(' https://api.themoviedb.org/3/tv/popular?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US&page=1')
    .then(res => res.json())
    .then(json => setTVSHOWS(json.results))
    }catch(err){
      console.error(err)
    }

  }
  const getVideos = async() =>{
    try{
    await fetch('https://api.themoviedb.org/3/tv/59941/videos?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US')
    .then(res => res.json())
    .then(json => setVideos(json.results))  // Log fetched videos
    }catch(err){
      console.error(err)
    }
  }
  const handleButtonClick = async (id) => {
    try {
      await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=fdeff6c8dc7c398d53999b4c61dee22d&language=en-US`)
     .then(res => res.json())
     .then(json =>setSelectedShow(json))
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
  getTVSHOWS();
}, []);

useEffect(() => {
    // Fetch videos for all series in the list
    TVSHOWS.forEach((TVSHOWSItem) => {
      getVideos(TVSHOWSItem.id);
    });
  }, [TVSHOWS]);
  return (
    <div className="bg-gray-700">
      <h1 className="text-3xl font-bold text-center pt-8 mb-8 transition-transform duration-300 transform hover:scale-105 text-white font-sans">TV SHOWS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     { TVSHOWS.map((data, index)=>{
       return <>
      <div key={data.id} className="flex flex-col items-center relative group">
      <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className=' w-64 h-96 object-cover rounded-lg shadow-lg mb-4 transition-transform duration-300 transform hover:scale-105 cursor-pointer' alt={data.name} />
      {videos[index] && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-16 h-16 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            )}
            {selectedShow && selectedShow.id === data.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gray-900 bg-opacity-90 p-4 rounded-lg absolute">
                  <p className="text-white font-bold">Overview</p>
                  <p className="text-white">{selectedShow.overview}</p>
                </div>
              </div>
            )}
            <div className="text-white text-center ">
              <p  className="cursor-pointer"onMouseEnter={() => handleButtonClick(data.id)}>{data.name}</p>
              <div className="flex justify-center space-x-10 mr-7 mt-3">
                <span className="bg-gray-900 text-white px-5 rounded-full">HD</span>
              <span>{data.vote_average}</span>
              </div>
              </div>
            {videos[index] && <YouTube videoId={videos[index]?.key} />}
      </div>
       </>
     })}
     </div>
    </div>
  )
}

export default TVSHOWS