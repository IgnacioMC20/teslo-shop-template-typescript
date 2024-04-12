import { Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layout'
import { CartContext } from '@/context'

const SummaryPage: NextPage = () => {

    const { isLoaded, cart, shippingAddress, numberOfItems, createOrder } = useContext(CartContext)
    const router = useRouter()
    const [isPosting, setIsPosting] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address')
        }
    }, [router])

    const onCreateOrder = async () => {

        setIsPosting(true)
        const { hasError, message } = await createOrder()

        if (!message) {
            setErrorMessage('Error al crear la orden')
            setIsPosting(false)
            return
        }

        if (hasError) {
            setErrorMessage(message)
            setIsPosting(false)
            return
        }
        // console.log(message)
        router.replace(`/orders/${message}`)

    }

    if (!isLoaded || cart.length === 0 || !shippingAddress) {
        return (<></>)
    }

    return (
        <ShopLayout title={'Summary'} pageDescription={'Summary'}>
            <Typography variant='h1' component='h1'>Resumen de la orden</Typography>
            <Grid container columns={12}>
                <Grid item xs={12} sm={7} >
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5} >
                    <Card className='summary-card' sx={{ padding: '5px 20px', boxShadow: '20px 20px 10px grey' }}>
                        <CardContent>
                            <Box display='flex' justifyContent='space-between' sx={{ my: 2 }}>
                                <Typography variant='h2'>Dirección de envío</Typography>

                                <NextLink href='/checkout/address' passHref legacyBehavior>
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
                            <Typography>{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</Typography>
                            <Typography>{shippingAddress?.address}</Typography>
                            <Typography>{`${shippingAddress?.city}, ${shippingAddress?.department}`}</Typography>
                            <Typography>{`(502) ${shippingAddress?.phone}`}</Typography>

                            <Divider sx={{ my: 3 }} light />

                            <Box display='flex' justifyContent='space-between' sx={{ my: 2 }}>
                                <Typography variant='h2'>Resumen ({numberOfItems})</Typography>
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline="hover">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3 }} display={'flex'} flexDirection={'column'}>
                                <Button color="primary" onClick={onCreateOrder} disabled={isPosting} fullWidth>
                                    Confirm
                                </Button>

                                <Chip color='error' label={errorMessage} sx={{ display: errorMessage ? 'felx' : 'none', marginTop: '25px' }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage