import { FC, useContext } from "react"
import NextLink from "next/link"

import { Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"

import { CartContext } from "@/context"
import { ICartProduct } from "@/interfaces"
import { ItemCounter } from "../ui"

interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

    const updateQuantity = (product: ICartProduct, newQuantity: number) => {
        product.quantity = newQuantity
        updateCartQuantity(product)
    }

    return (
        <>
            {
                cart.map((product) => (
                    <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={6}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant="body1"> {product.title} </Typography>
                                <Typography variant="body1"> Talla: <strong>{product.size}</strong> </Typography>
                                {/* condicional */}
                                {
                                    editable
                                        ? <ItemCounter currentQuantity={product.quantity} maxValue={product.inStock} updateQuantity={(value) => updateQuantity(product, value) } />
                                        : <Typography variant="h5">{product.quantity} item{product.quantity > 1 && 's'}</Typography>

                                }
                            </Box>
                        </Grid>
                        <Grid item xs={3} display='flex' alignItems='center' justifyContent={'center'} flexDirection='column'>
                            <Typography variant="subtitle1" >{`Q ${product.price}`}</Typography>
                            {
                                editable && (
                                    <Button variant="text" color="secondary" onClick={() => removeCartProduct(product)}>
                                        Remover
                                    </Button>
                                )
                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
