import { useState, useEffect } from 'react'

const useWindowSize = () => {
    const initialWidth = window.innerWidth
    const [windowWidth, setWindowWidth] = useState(initialWidth)
    const handleResize = () => {
        setWindowWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize);
          };
    }, [])
    return windowWidth
}

export {
    useWindowSize
}