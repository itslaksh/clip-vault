import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light-Purple dark:bg-dark-Green py-8 mt-12 animate-fade-in-up">
            <div className="container mx-auto text-center px-4">
                <div className='flex justify-center items-center'>

                    <h2 className='text-white dark:text-black text-3xl font-semibold font-snippet'>clip</h2>
                    <h2 className="font-pacifico text-white dark:text-black text-3xl">Vault</h2>
                </div>

                <div className="mt-4 space-x-6">
                    <span className="text-white dark:text-black">
                        Made with
                        <i
                            className="fas fa-heart ml-1 mr-1 transition-colors duration-300 text-white dark:text-black"
                        ></i>
                        by
                        <a
                            href="https://github.com/itslaksh"
                            className="ml-1 underline-offset-4 hover:underline text-white font-semibold dark:text-black"
                        >
                            Lakshay
                        </a>
                    </span>                    {/* <a href="/about" className="text-white dark:hover:text-dark-HoverGreen dark:text-black hover:text-light-Purple transition-all">About</a>
                    <a href="/contact" className="text-white dark:hover:text-dark-HoverGreen dark:text-black hover:text-light-Purple transition-all">Contact</a>
                    <a href="/privacy" className="text-white dark:hover:text-dark-HoverGreen dark:text-black hover:text-light-Purple transition-all">Privacy Policy</a>
                    <a href="/terms" className="text-white dark:hover:text-dark-HoverGreen dark:text-black hover:text-light-Purple transition-all">Terms of Service</a> */}
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                    {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook text-white text-xl dark:text-black hover:text-dark-HoverGreen transition-all"></i>
                    </a> */}
                    <a href="https://github.com/itslaksh" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github text-white text-xl dark:text-black hover:text-dark-HoverGreen transition-all"></i>
                    </a>
                    {/* <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter text-white text-xl dark:text-black hover:text-dark-HoverGreen transition-all"></i>
                    </a> */}
                    <a href="https://www.instagram.com/yugen._.san/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram text-white text-xl dark:text-black hover:text-dark-HoverGreen transition-all"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/itslaksh/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin text-white text-xl dark:text-black hover:text-dark-HoverGreen transition-all"></i>
                    </a>
                </div>

                {/* <p className="text-sm text-white mt-6 font-magra dark:text-black">
                    clipVault &copy; {new Date().getFullYear()}  All rights reserved.
                </p> */}
            </div>
        </footer>
    );
};

export default Footer;
