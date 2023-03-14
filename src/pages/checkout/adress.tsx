import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import { ShopLayout } from '@/components/layout';

const AdressPage: NextPage = () => {
  return (
    <ShopLayout title={'Adress'} pageDescription={'Confirm your adress'}>
    <Typography variant='h1' component='h1'>Adress</Typography>
    <Grid container spacing={2} sx={{mt: 5}}>
      <Grid item xs={12} sm={6}>
        <TextField label='Nombre' variant='outlined' fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label='LastName' variant='outlined' fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label='Adress' variant='outlined' fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label='Zip Code' variant='outlined' fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label='City' variant='outlined' fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Country</InputLabel>
          <Select variant='outlined' label='country' value={1}>
            <MenuItem value={1}>Costa Rica</MenuItem>
            <MenuItem value={2}>El Salvador</MenuItem>
            <MenuItem value={3}>Guatemala</MenuItem>
            <MenuItem value={4}>Honduras</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label='Phone number' variant='outlined' fullWidth />
      </Grid>
      
      <Grid item xs={12} display='flex' justifyContent='center' sx={{my: 3}}>
        <Button color='secondary' sx={{padding: 2}} size='large'>
          <Typography variant='body1'>Realizar pedido</Typography>
        </Button>
      </Grid>

    </Grid>
  </ShopLayout>
  )
}

export default AdressPage