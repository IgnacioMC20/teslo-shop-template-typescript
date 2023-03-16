import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { LoadingScreen } from '@/components/ui';
import { useProducts } from '@/hooks';
import { Typography } from '@mui/material';

const KidsPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid');

  return (
    <ShopLayout title={'Niños'} pageDescription={'Esta es una pagina con productos para niños'}>

      <Typography variant='h1' component='h1'>Niños</Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>Productos para ellos y ellas</Typography>

      {
        isLoading
          ? <LoadingScreen />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default KidsPage