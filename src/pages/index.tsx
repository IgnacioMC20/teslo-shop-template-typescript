import { Typography } from '@mui/material'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { ShopLayout } from '@/components/layout'
import { ProductList } from '@/components/products'
import { FabButton, LoadingScreen } from '@/components/ui'
import { useFabButton, useProducts } from '@/hooks'

const Home: NextPage = () => {
  const { products, isLoading } = useProducts('/products')
  const { showButton } = useFabButton()

  return (
    <ShopLayout title={'Home'} pageDescription='Encuentra los mejores productos de teslo'>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>Todos los productos</Typography>
      {
        isLoading
          ? <LoadingScreen />
          : <ProductList products={products} />
      }
      {
        showButton && <FabButton /> 
      }
    </ShopLayout>
  )
}

export default Home