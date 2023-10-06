
import { ArrowUpward } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { useState } from 'react'

export const FabButton = () => {
    const [showButton, setShowButton] = useState(false)

    function handleScroll() {
        if (window.pageYOffset > 0) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }
    return (
        <Fab variant="circular" color='primary' sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px'
        }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowUpward />
        </Fab>
    )
}
