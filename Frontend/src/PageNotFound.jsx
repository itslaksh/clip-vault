import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFoundImage from './assets/PageNotFound.png';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-light-BG dark:bg-dark-BG text-center select-none">
            <img
                src={PageNotFoundImage}
                alt="404 Not Found"
                draggable="false"
                className="w-3/4 max-w-[100px] xs:max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mb-8 animate-fade-in-up dark:invert"
            />

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-DarkerGro text-light-Purple dark:text-dark-Green animate-fade-in-up">
                PAGE NOT FOUND
            </h1>

            <p className="mt-4 px-4 text-base sm:text-lg md:text-2xl font-MavenPro text-gray-700 dark:text-gray-300 animate-fade-in-up">
                Couldn't find that page, check out the{' '}
                <a href="/" className="text-light-Purple dark:text-dark-Green font-bold hover:underline">
                    Homepage
                </a>{' '}
                — it's usually nicer than this page.
            </p>

        </div>
    );
};

export default PageNotFound;
