import { NextPage } from "next";

import { Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"

import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layout";
import { useRouter } from "next/router";

const index: NextPage = () => {

    const router = useRouter()
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