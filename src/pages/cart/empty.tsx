
import { ArrowBack, RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import NextLink from 'next/link'

import { ShopLayout } from '@/components/layout'

const EmptyPage: NextPage = () => {
    return (
        <ShopLayout title={'Empty Cart'} pageDescription={'No products in Cart'}>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                height='calc(100vh - 200px)'
                sx={{ flexDirection: 'column' }}
            >
                <Box display='flex' flexDirection='column' alignItems='center' width='100%'>
                    <RemoveShoppingCartOutlined sx={{ fontSize: 300 }} />
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <Typography fontSize={25}>Cart is empty</Typography>
                    </Box>
                </Box>

                <Box display='flex' flexDirection='row' alignItems='center' sx={{ mt: 20 }}>
                    <NextLink href='/' passHref legacyBehavior>
                        <Link typography='h3' display={'flex'} flexDirection='row'>
                            <ArrowBack />
                            <Typography>Home</Typography>
                        </Link>
                    </NextLink>
                </Box>

            </Box>
        </ShopLayout>
    )
}

export default EmptyPage
