// import { initialData } from '../database/products';
import { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '@/components/layout';
import { LoadingScreen } from '@/components/ui';
import { ProductList } from '@/components/products';
import { useProducts } from '@/hooks';

const Home: NextPage = () => {
  const { products, isLoading } = useProducts('/products');
  
  return (
    <ShopLayout title={'Home'} pageDescription='Encuentra los mejores productos de teslo'>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>Todos los productos</Typography>

      {
        isLoading
          ? <LoadingScreen />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default Home;