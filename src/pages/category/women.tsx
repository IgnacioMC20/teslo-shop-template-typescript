import { Typography } from '@mui/material'
import { NextPage } from 'next'

import { ShopLayout } from '@/components/layout'
import { ProductList } from '@/components/products'
import { FabButton, LoadingScreen } from '@/components/ui'
import { useFabButton, useProducts } from '@/hooks'

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women')
  const { showButton } = useFabButton()

  return (
    <ShopLayout title={'Mujeres'} pageDescription={'Esta es una pagina con productos para mujeres'}>
      <Typography variant='h1' component='h1'>Mujeres</Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>Productos para ellas</Typography>

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

export default WomenPage