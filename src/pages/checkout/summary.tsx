import { useContext, useEffect } from 'react';
import { NextPage } from 'next';
import NextLink from "next/link"

import { Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"

import { ShopLayout } from "@/components/layout"
import { CartList, OrderSummary } from "@/components/cart"
import { CartContext } from '@/context';
import { useRouter } from 'next/router';

const SummaryPage: NextPage = () => {

    const { isLoaded, cart, shippingAdress, numberOfItems} = useContext(CartContext)
    const router = useRouter();

    useEffect(() => {
      if(isLoaded && cart.length === 0){
        router.replace('/cart')
      }
    }, [isLoaded, cart, router])

    if(!isLoaded || cart.length === 0 || !shippingAdress){
        return (<></>);
    } 

    return (
        <ShopLayout title={`Summary`} pageDescription={'Summary'}>
            <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
            <Grid container columns={12}>
                <Grid item xs={12} sm={7} >
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5} >
                    <Card className='summary-card' sx={{padding: '5px 20px', boxShadow: '20px 20px 10px grey' }}>
                        <CardContent>
                            <Box display='flex' justifyContent='space-between' sx={{my:2}}>
                            <Typography variant='h2'>Dirección de envío</Typography>

                                <NextLink href='/checkout/adress' passHref legacyBehavior>
                                    <Link underline="hover">
                                        Editar
                                    </Link>
                                    {/* para evitar errores con el link de next 13 y el link de mui */}
                                    {/* <Link underline="hover" component={'span'}>
                                        Edit
                                    </Link> */}
                                </NextLink>
                            </Box>

                            <Typography variant='subtitle1'>Dirección</Typography>
                            <Typography>{`${shippingAdress?.firstName} ${shippingAdress?.lastName}` }</Typography>
                            <Typography>{shippingAdress?.adress}</Typography>
                            <Typography>{`${shippingAdress?.city}, ${shippingAdress?.department}`}</Typography>
                            <Typography>{`(502) ${shippingAdress?.phone}`}</Typography>

                            <Divider sx={{ my: 3 }} light />

                            <Box display='flex' justifyContent='space-between' sx={{my:2}}>
                            <Typography variant='h2'>Resumen ({numberOfItems})</Typography>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline="hover">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button color="primary" fullWidth>
                                    Confirm
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage