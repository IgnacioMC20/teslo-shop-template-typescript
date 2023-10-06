import { useEffect, useState } from 'react'

interface FabButton {
    showButton: boolean
}

export const useFabButton = (): FabButton => {
    const [showButton, setShowButton] = useState<boolean>(false)

    function handleScroll(): void {
        if (window.scrollY > 0) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return {
        showButton
    }
}
