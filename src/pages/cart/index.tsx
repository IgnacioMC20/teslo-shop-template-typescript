import { Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { ShopLayout } from '../../components/layout/ShopLayout';
import { CartList, OrderSummary } from "@/components/cart";

const index = () => {
    return (
        <ShopLayout title={`Carrito - (3)`} pageDescription={'Carrito de compra'}>
            <Typography variant='h1' component='h1'>Carrito</Typography>
            <Grid container columns={12}>
                <Grid item xs={12} sm={7} >
                    {/* Cartlist */}
                    {/* <CartList editable/> */}
                </Grid>
                <Grid item xs={12} sm={5} >
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{ my: 1 }} />
                            {/* order summary */}
                            {/* <OrderSummary /> */}
                            <Box sx={{ mt: 3 }}>
                                <Button color="primary" fullWidth>
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