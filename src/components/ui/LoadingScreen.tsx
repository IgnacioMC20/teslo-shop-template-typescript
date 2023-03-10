import { Box, CircularProgress } from '@mui/material'
import React from 'react'

export const LoadingScreen = () => {

    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            {/* <Typography> Cargando </Typography> */}
            <CircularProgress thickness={3}/>
        </Box>
    )
}
