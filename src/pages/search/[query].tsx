import { Typography } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'

import { ShopLayout } from '@/components/layout'
import { ProductList } from '@/components/products'
import { FabButton } from '@/components/ui'
import { dbProducts } from '@/database'
import { useFabButton } from '@/hooks'
import { IProduct } from '@/interfaces'

interface Props{
    products: IProduct[]
    query: string
    foundProducts: boolean
}

const SearchPage: NextPage<Props> = ({ products, query, foundProducts }) => {
    const { showButton } = useFabButton()

    return (
        <ShopLayout title={'Search'} pageDescription='Encuentra los mejores productos de teslo'>
            <Typography variant='h1' component='h1'>Tienda</Typography>
            <Typography variant='h2' sx={{ marginBottom: 1 }}>Todos los productos</Typography>
            {

                foundProducts
                    ? <Typography variant='h2' textTransform={'capitalize'} sx={{ marginBottom: 1 }}>Busqueda: {query}</Typography>
                    : <>
                        <Typography variant='h5' sx={{ marginBottom: 1 }}>No encontramos ningun producto</Typography>
                        <Typography variant='h6' textTransform={'capitalize'} sx={{ marginBottom: 1 }}>Busqueda: {query}</Typography>
                    </>
            }
            <ProductList products={products} />
            {
                showButton && <FabButton />
            }
        </ShopLayout>
    )
}

export default SearchPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { query = '' } = ctx.params as { query: string }

    if (query.length === 0) {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            }
        }
    }

    let products = await dbProducts.getProductsByTerm(query)
    const foundProducts = products.length > 0

    if (!foundProducts) {
        products = await dbProducts.getAllProducts()
    }

    return {
        props: {
            products, query, foundProducts
        }
    }
}