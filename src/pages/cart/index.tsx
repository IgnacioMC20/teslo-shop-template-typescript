import { useContext, useEffect } from 'react';
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"

import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layout";
import { CartContext } from "@/context";
import { LoadingScreen } from "@/components/ui";

const index: NextPage = () => {

    const router = useRouter()
    const { isLoaded, cart} = useContext(CartContext)

    useEffect(() => {
      if(isLoaded && cart.length === 0){
        router.replace('/cart/empty')
      }
    }, [isLoaded, cart, router])

    if(!isLoaded || cart.length === 0){
        return (<></>);
    } 

    return (
        <ShopLayout title={`Carrito - (3)`} pageDescription={'Carrito de compra'}>
            <Typography variant='h1' component='h1'>Carrito</Typography>
            <Grid container columns={12}>
                <Grid item xs={12} sm={7} >
                    {/* Cartlist */}
                    <CartList editable/>
                </Grid>
                <Grid item xs={12} sm={5} >
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{ my: 1 }} />
                            {/* order summary */}
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button color="primary" fullWidth onClick={() => router.push('/checkout/summary')}>
                                    Checkouts
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default index