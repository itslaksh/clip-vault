import React, { useState } from 'react';
import './index.css';
import useTabIndicator from './useTabIndicator';
import DownClip from './DownClip';
import { Bars } from 'react-loader-spinner';
import Footer from './Footer';
import Features from './Features';


const Home = () => {
  const [inputLink, setInputLink] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setInputLink(e.target.value);
  };

  const handleFetchVideo = async () => {
    if (!inputLink.trim()) return;
    setLoading(true);
    setError(null);
    setVideoInfo(null);

    try {
      const response = await fetch(` https://clip-vault.onrender.com/video-details?url=${inputLink}`);
      if (!response.ok) throw new Error('Failed to fetch video details');
      const data = await response.json();
      setVideoInfo(data);
    } catch (err) {
      console.error('Error fetching video details:', err);
      setError('Failed to fetch video details. Please check the link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='bg-light-BG min-h-screen dark:bg-dark-BG'>
        <div className='bg-light-BG min-h-screen dark:bg-dark-BG'>
          <div className='flex justify-between px-4 xs:px-8 sm:px-10 md:px-12 py-5 xs:py-6 sm:py-7 text-xl xs:text-2xl sm:text-3xl animate-fade-in-up antialiased'>
            <div className='flex cursor-pointer'>
              <h1 className='text-black dark:text-white font-snippet'>clip</h1>
              <h1 className='font-pacifico  text-light-Purple dark:text-dark-Green'>Vault</h1>
            </div>
          </div>


          <div className="relative flex xs:flex-col items-center select-none justify-center mt-[30px] text-6xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl transition-all duration-300 animate-fade-in-up">
            {/* Glowing Torch Effect */}
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="dark:block hidden absolute w-[100px] h-[100px] bg-white rounded-full blur-[80px] opacity-100"></div>
            </div>

            {/* Main Content */}
            <h1 className="font-DarkerGro text-light-Purple  dark:text-dark-Green">
              All-in-One
            </h1>
            <h1 className="font-DarkerGro dark:text-white">Video Downloader</h1>
          </div>

          <div className="flex items-center justify-center mt-[50px] md:mt-[60px]">
            <div className='inline-flex items-center justify-between border p-2 border-black dark:border-white dark:text-white rounded-full antialiased xs:min-w-[250px] sm:min-w-[350px] md:min-w-[400px] xs:max-w-[350px] sm:max-w-[450px] md:max-w-[600px] animate-fade-in-up'>
              <input
                type="text"
                value={inputLink}
                onChange={handleInputChange}
                placeholder="Paste your video link here..."
                className='bg-transparent flex-1 outline-none px-3 font-MavenPro antialiased font-semibold text-xs xs:text-sm sm:text-base md:text-lg'
              />
              <button
                onClick={handleFetchVideo}
                className='bg-light-Purple dark:bg-dark-Green font-MavenPro font-bold text-white dark:text-black rounded-full px-4 xs:px-6 sm:px-8 py-2 mr-0 hover:bg-light-AlphaPurple dark:hover:bg-dark-HoverGreen transition-all ease-in-out duration-300 active:scale-95'
              >
                GO!
              </button>
            </div>
          </div>


          {loading && (
            <div className="flex flex-col justify-center items-center mt-10">
              <Bars
                height="40"
                width="40"
                color="#A9CF6F"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                visible={true}
              />
              <div className="text-center font-magra text-gray-700 dark:text-gray-300 mt-4">
                Fetching video details...
              </div>
            </div>
          )}

          {error && (
            <div className="text-center mt-10 text-red-600 dark:text-red-400 font-magra">
              {error}
            </div>
          )}

          {videoInfo && <DownClip videoInfo={videoInfo} />}

          <div className='h-[100px]'></div>
          <Features />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
