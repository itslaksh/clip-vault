import React, { useState } from 'react';

const DownClip = ({ videoInfo }) => {
    if (!videoInfo) return null;

    const { title, thumbnail, videoUrl, duration, resolution, fileSize } = videoInfo;

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const response = await fetch(` https://clip-vault.onrender.com/download?url=${videoUrl}`, {
                method: 'GET',
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'video.mp4';
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading video:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div
            className="bg-[#3500771e] dark:bg-dark-AlphaGreen backdrop-blur-sm p-8 rounded-3xl border-[2px] border-[#6836a61e] mt-[100px] max-w-6xl mx-auto dark:border-[2px] dark:border-dark-AlphaGreen animate-fade-in-up"
        >
            <h1 className="font-magra text-center text-light-Purple dark:text-dark-Green text-2xl md:text-4xl mb-4">
                {title}
            </h1>

            <div className="flex flex-col md:flex-row items-center md:items-start font-magra mt-[60px] mb-[60px]">
                <div className="flex flex-col items-center ml-10 mb-[60px] md:mb-0 md:mr-8">
                    <div className="relative w-full md:w-[500px] h-auto">
                        <img
                            src={thumbnail}
                            alt="Video Thumbnail"
                            className="w-full h-full object-cover dark:shadow-[0px_0px_45px_0px_rgba(255,255,255,0.3)] shadow-[0px_0px_45px_0px_rgba(48,24,88,0.3)]"
                        />
                        <div className="absolute inset-0 bg-purple-950 dark:bg-green-950 opacity-60 mix-blend-overlay"></div>
                    </div>
                    <a
                        href={thumbnail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-Purple dark:text-dark-Green mt-4 underline hover:text-purple-600 dark:hover:text-green-500 transition-colors duration-200"
                    >
                        Download Thumbnail
                    </a>
                </div>

                <div className="flex-1 md:mt-[40px] sm:m-0">
                    <h2 className="text-gray-700 text-lg mb-4 dark:text-white text-center">Click to Save:</h2>
                    <div className="flex justify-center">
                        <button
                            onClick={handleDownload}
                            className="bg-none border-[2px] border-light-Purple text-light-Purple dark:border-[2px] dark:border-dark-Green text-4xl text-[25px] py-5 px-[80px] rounded-full hover:bg-light-Purple hover:text-white dark:hover:bg-dark-Green dark:hover:text-black transition-all duration-300 ease-in-out dark:text-dark-Green active:scale-95"
                            disabled={isDownloading}
                        >
                            {isDownloading ? 'Downloading...' : 'Download'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownClip;
