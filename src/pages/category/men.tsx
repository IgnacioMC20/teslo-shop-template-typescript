import { Typography } from '@mui/material';

import { ShopLayout } from '@/components/layout';
import { ProductList } from '@/components/products';
import { FabButton, LoadingScreen } from '@/components/ui';
import { useFabButton, useProducts } from '@/hooks';

const MenPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');
  const { showButton } = useFabButton()

  return (
    <ShopLayout title={'Hombres'} pageDescription={'Esta es una pagina con productos para hombres'}>
      <Typography variant='h1' component='h1'>Hombres</Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>Productos para ellos</Typography>

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

export default MenPage