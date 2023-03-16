import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { LoadingScreen } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';

const WomenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout title={'Mujeres'} pageDescription={'Esta es una pagina con productos para mujeres'}>

      <Typography variant='h1' component='h1'>Mujeres</Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>Productos para ellas</Typography>

      {
        isLoading
          ? <LoadingScreen />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default WomenPage