import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { LoadingScreen } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';

const MenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout title={'Hombres'} pageDescription={'Esta es una pagina con productos para hombres'}>

      <Typography variant='h1' component='h1'>Hombres</Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>Productos para ellos</Typography>

      {
        isLoading
          ? <LoadingScreen />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default MenPage