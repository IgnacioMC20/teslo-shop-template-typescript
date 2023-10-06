
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage } from 'next'
import NextLink from 'next/link'

import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layout'

const OrderPage: NextPage = () => {
    return (
        <ShopLayout title={'Order 123abc'} pageDescription={'Order 123abc'}>
            <Typography variant='h1' component='h1'>Order: 123abc</Typography>

            <Chip
                sx={{ my: 2, padding: '5px 5px' }}
                label='Pending'
                variant='outlined'
                color='primary'
                icon={<CreditCardOffOutlined />}
            />

            <Chip
                sx={{ my: 2, padding: '5px 5px' }}
                label='Completed'
                variant='outlined'
                color='primary'
                icon={<CreditScoreOutlined />}
            />

            <Grid container columns={12} sx={{ mt: 5 }}>
                <Grid item xs={12} sm={7} >
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5} >
                    <Card className='summary-card' sx={{ padding: '5px 20px', boxShadow: '20px 20px 10px grey' }}>
                        <CardContent>
                            <Box display='flex' justifyContent='space-between' sx={{ my: 2 }}>
                                <Typography variant='h2'>Address</Typography>

                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline="hover">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography variant='subtitle1'>Address</Typography>
                            <Typography>Fernando Herrera</Typography>
                            <Typography>323 Somewhere</Typography>
                            <Typography>Antigua Guatemala, Guatemala</Typography>
                            <Typography>+502 45454545</Typography>

                            <Divider sx={{ my: 3 }} light />

                            <Box display='flex' justifyContent='space-between' sx={{ my: 2 }}>
                                <Typography variant='h2'>Summary (3)</Typography>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline="hover">
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                <Button color="primary" fullWidth>
                                    Pagar
                                </Button>
                            </Box>
                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                <Chip
                                    sx={{ my: 2, padding: '5px 5px' }}
                                    label='Completed'
                                    variant='outlined'
                                    color='primary'
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default OrderPage