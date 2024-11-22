import React from 'react';

const featuresList = [
    {
        title: 'Download from Multiple Platforms',
        description: 'Clip Vault supports downloading videos from popular platforms like YouTube, Reddit, Twitter, Pinterest, and more, all in one place.',
        icon: 'fas fa-cloud-download-alt',
    },
    {
        title: 'No Sign-In Required',
        description: 'Download your favorite videos instantly without the hassle of creating an account or signing in. Completely hassle-free!',
        icon: 'fas fa-user-lock',
    },
    {
        title: 'High-Quality Downloads',
        description: 'Enjoy downloading videos in the best possible quality, from 720p to Full HD and even 4K resolution, if available.',
        icon: 'fas fa-video',
    },
    // {
    //     title: 'Fast and Secure',
    //     description: 'Experience lightning-fast download speeds and a secure, encrypted environment to keep your data safe.',
    //     icon: 'fas fa-bolt',
    // },
    {
        title: 'User-Friendly Interface',
        description: 'A simple and intuitive interface that makes downloading videos easy, even for first-time users.',
        icon: 'fas fa-smile',
    },
    {
        title: 'No Watermarks',
        description: 'Download videos without any watermarks, so you can enjoy them in their original, unaltered form.',
        icon: 'fas fa-water',
    },
    // {
    //     title: 'Unlimited Downloads',
    //     description: 'Download as many videos as you want without any restrictions or hidden fees.',
    //     icon: 'fas fa-infinity',
    // },
    // {
    //     title: 'Cross-Platform Support',
    //     description: 'Whether you’re on Windows, macOS, or Linux, Clip Vault works seamlessly across all platforms.',
    //     icon: 'fas fa-desktop',
    // },
];

const Features = () => {
    return (
        <section className="bg-light-BG dark:bg-dark-BG py-20 animate-fade-in-up">
            <div className="max-w-5xl mx-auto px-6 lg:px-12">

                <h2 className="text-3xl sm:text-4xl md:text-5xl  font-pacifico text-center text-light-Purple dark:text-dark-Green mb-5">
                    Features
                </h2>

                <h3 className="text-lg sm:text-2lg md:text-3lg  text-center font-magra text-gray-700 dark:text-gray-300 mb-10">
                    Why Choose Clip Vault?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {featuresList.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-4">

                            <i className={`${feature.icon} text-light-Purple dark:text-dark-Green text-3xl`} aria-hidden="true"></i>

                            <div>
                                <h4 className="font-magra text-xl text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h4>
                                <p className="text-gray-700 dark:text-gray-400">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
