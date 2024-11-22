import { useState, useEffect, useRef } from 'react';

const useTabIndicator = (initialTab) => {
    const [activeTab, setActiveTab] = useState(initialTab);
    const indicatorRef = useRef(null);
    const tabRefs = {
        youtube: useRef(null),
        reddit: useRef(null),
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const updateIndicator = () => {
            const activeElement = tabRefs[activeTab].current;
            if (indicatorRef.current && activeElement) {
                const width = activeElement.offsetWidth;
                const left = activeElement.offsetLeft;

                indicatorRef.current.style.width = `${width}px`;
                indicatorRef.current.style.transform = `translateX(${left}px)`;
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);

        return () => {
            window.removeEventListener('resize', updateIndicator);
        };
    }, [activeTab]);

    return { activeTab, handleTabClick, indicatorRef, tabRefs };
};

export default useTabIndicator;
