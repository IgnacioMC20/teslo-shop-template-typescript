import { Button, Chip, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { ShopLayout } from '@/components/layout'
import { ProductSlideshow, SizeSelector } from '@/components/products'
import { ItemCounter } from '@/components/ui'
import { CartContext } from '@/context'
import { dbProducts } from '@/database'
import { IProduct } from '@/interfaces'

interface Props {
    product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
    const { addProductToCart } = useContext(CartContext)

    const [tempCartProduct, setTempCartProduct] = useState({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: product.sizes[0],
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        inStock: product.inStock,
        quantity: 1,
    })

    const onSelectedSize = (size: any) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            size
        }))
    }

    const updateQuantity = (quantity: number) => {
        setTempCartProduct(currentProduct => ({
            ...currentProduct,
            quantity
        }))
    }

    const onAddProduct = () => {

        //Todo: llamar la accion del context para agregar al carrito
        addProductToCart(tempCartProduct)
        toast('producto agregado al carrito',{
            position: 'top-right',
            pauseOnFocusLoss: false,
            pauseOnHover: false,
            autoClose: 2000,
            closeOnClick: false,
            closeButton: false,
            style: {
                maxWidth: '90vw',
                width: 'auto',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
            }
              
        })
        //todo: agregar react toastify
        // router.push('/cart')
    }

    return (
        <ShopLayout title={product.title} pageDescription={product.description}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={7}>
                    {/* Slideshow */}
                    <Box>
                        <ProductSlideshow images={product.images} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5} >
                    <Box flexDirection='column' display='flex' sx={{ padding: 10 }}>
                        {/* titulos */}
                        <Typography variant='h1' component='h1'>{product.title}</Typography>
                        <Typography variant='subtitle1' component='h2'>${product.price}</Typography>
                        {/* cantidad */}
                        <Box sx={{ my: 2 }} display='flex' alignItems='center' justifyContent='center'>
                            <ItemCounter maxValue={product.inStock} currentQuantity={tempCartProduct.quantity} updateQuantity={updateQuantity} />
                        </Box>
                        <Box sx={{ mb: 2 }} display='flex' alignItems='center' justifyContent='center'>
                            <SizeSelector sizes={product.sizes} selectedSize={tempCartProduct.size} onSelectedSize={onSelectedSize} />
                        </Box>
                        {/* agregar al carrito */}
                        {
                            product.inStock === 0
                                ? (<Chip label='No hay disponibles' color='secondary' variant='outlined' />)
                                : (
                                    <Button
                                        color='secondary'
                                        disabled={tempCartProduct.size ? false : true}
                                        onClick={onAddProduct}
                                    >
                                        {tempCartProduct.size ? 'Agregar al carrito' : 'Seleccione una talla'}
                                    </Button>
                                )
                        }
                        <Box sx={{ mt: 2 }}>
                            <Typography variant='subtitle2'>Description</Typography>
                            <Typography variant='body2'>{product.description}</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug = '' } = ctx.params as { slug: string }
    const product = await dbProducts.getProductBySlug(slug)
    
    if (!product) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    
    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = await dbProducts.getAllProductsSlug()
    return {
        paths: slugs.map(({slug}) => {
            return{
                params: { slug }
            }
        }),
        fallback: 'blocking'
    }
}

export default ProductPage

// * no usar Server Side Rendering
// export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
//     const { slug = '' } = ctx.params as { slug: string }
//     console.log(slug)
//     const product = await dbProducts.getProductBySlug(slug)

//     if (!product) {
//         return {
//             redirect: {
//                 destination: '/',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props: {
//             product
//         }
//     }
// }