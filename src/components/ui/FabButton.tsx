
import { ArrowUpward } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { useEffect, useState } from 'react'

export const FabButton = () => {
    const [showButton, setShowButton] = useState(false)

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 0) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        // Agrega un listener de scroll cuando el componente se monta
        window.addEventListener('scroll', handleScroll)

        // Limpia el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, []) // El segundo argumento del useEffect vacío garantiza que solo se suscriba una vez
    return (
        <Fab variant="circular" color='primary' sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            visibility: showButton ? 'visible' : 'hidden',
        }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowUpward />
        </Fab>
    )
}
