import { useState, useEffect } from "react";

// sm: 640px, md: 768pxm lg: 1024px, xl: 1280px
const useScreenSize = (breakpoint = 640) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsSmallScreen(window.innerWidth < breakpoint);
        };

        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [breakpoint]);

    return isSmallScreen;
};

export default useScreenSize;
