import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ShopLayout } from '../components/layout/ShopLayout';

const Custom404 = () => {
    return (
        <ShopLayout title={'404 | Page not found'} pageDescription={'Page Not Found'}>
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                height='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <Typography variant='h1' component='h1' fontSize={80} fontWeight={200}> 404 </Typography>
                <Typography variant='h1' component='h1' fontSize={80} fontWeight={200} sx={{ display: { xs: 'none', sm: 'block' } }} marginLeft={3}>|</Typography>
                <Typography marginLeft={2}>This page could not be found</Typography>
            </Box>
        </ShopLayout>
    )
}

export default Custom404