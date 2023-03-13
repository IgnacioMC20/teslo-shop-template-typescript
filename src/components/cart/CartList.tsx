import { Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { Box } from "@mui/system"
import NextLink from "next/link"
import { useContext } from "react"
import { CartContext } from "../../context"
import { initialData } from "../../database/products"
import { ItemCounter } from "../ui"

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export const CartList = ({ editable = false }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext);
    // console.log(cart);

    const updateQuantity = (product, newQuantity) => {
        product.quantity = newQuantity
        updateCartQuantity(product)
    }

    return (
        <>
            {
                cart.map((product) => (
                    <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink href={`/product/${product.slug}`} passHref>
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
                                        ? <ItemCounter currentQuantity={product.quantity} maxValue={product.inStock} updateQuantity={(value) => { updateQuantity(product, value) }} />
                                        : <Typography variant="h5">{ product.quantity } item{product.quantity > 1 && 's'}</Typography>

                                }
                            </Box>
                        </Grid>
                        <Grid item xs={3} display='flex' alignItems='center' justifyContent={'center'} flexDirection='column'>
                            <Typography variant="subtitle1" >{`$${product.price}`}</Typography>
                            {
                                editable && (
                                    <Button variant="text" color="secondary" onClick={ () => {removeCartProduct(product)} }>
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
