import { Button, Chip, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'
// import { ProductSlideshow, SizeSelector } from '../../components/products'
// import { ItemCounter, LoadingScreen } from '../../components/ui'
// import { CartContext } from '../../context'
// import { dbProducts } from '../../database'
import { initialData } from '../../database/products';
// import { useProducts } from '../../hooks/useProducts'
import { ProductSlideshow, SizeSelector } from '@/components/products'
import { ShopLayout } from '@/components/layout'
import { ItemCounter } from '@/components/ui'
import { IProduct } from '@/interfaces'

interface Props{
    // product: IProduct
}
const product = initialData.products[0]

const ProductPage: FC<Props> = (/* { product } */) => {

    const router = useRouter();

    // const { addItem } = useContext(CartContext);

    const [tempCartProduct, setTempCartProduct] = useState({
        _id: 'asdfss',
        // _id: product._id,
        image: product.images[0],
        price: product.price,
        size: product.sizes[0],
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
    });

    const onSelectedSize = (size) => {
        setTempCartProduct( currentProduct => ({
            ...currentProduct,
            size
        }))
    };

    const updateQuantity = (quantity) => {
      setTempCartProduct( currentProduct => ({
        ...currentProduct,
        quantity
      }))
    }

    const onAddProduct = () => {
      
        //Todo: llamar la accion del context para agregar al carrito
        // addItem(tempCartProduct)
        console.log({tempCartProduct});
        router.push('/cart');
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
                            <ItemCounter maxValue={product.inStock} currentQuantity={tempCartProduct.quantity} updateQuantity={ updateQuantity } />
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

// getServerSideProps
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// * no usar Server Side Rendering
// export const getServerSideProps = async (ctx) => {
//     const { slug = '' } = ctx.params
//     const product = await dbProducts.getProductBySlug(slug)  // your fetch function here 

//    

//     if(!product) {
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

// gsp -> blocking

// gsprops -> revalidar cada 24 horas 

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
// export const getStaticPaths = async (ctx) => {
//     const slugs = await dbProducts.getAllProdctSlugs();
//     // console.log({slugs})  // your fetch function here 

//     return {
//         paths: slugs.map(({ slug }) => {
//             return {
//                 params: { slug }
//             }
//         }),
//         fallback: 'blocking'
//     }
// }

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
// export const getStaticProps = async (ctx) => {
//     const { slug } = ctx.params;
//     // console.log(ctx.params)
//     const product = await dbProducts.getProductBySlug(slug);

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
//         },
//         revalidate: 60 * 60 * 24
//     }
// }

export default ProductPage