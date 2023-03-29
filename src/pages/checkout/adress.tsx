import { NextPage } from 'next'

import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

import { ShopLayout } from '@/components/layout';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { IDepartment } from '@/interfaces';
import { tesloApi } from '@/api';
import { toast } from 'react-toastify';

type FormData = {
  firstName: string;
  lastName: string;
  adress: string;
  zipCode: string;
  city: string;
  country: string;
  department: string;
  phone: string;
}

const AdressPage: NextPage = () => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [departments, setDepartments] = useState<IDepartment[]>([
    {
      title: 'Guatemala',
      code: 'GT'
    }
  ])

  console.log(departments);

  useEffect(() => {
    getDepartments();
  }, [])

  //todo: use staticprops to get departments
  const getDepartments = async() => {
      const data = await tesloApi({ url: '/departments' });
      const { message, departments } = await data.json();
      if (message) {
        toast(message,{
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          theme: "light",
          type: 'error',
          closeButton: false
        })
        return;
      }
      setDepartments(departments);
  }
  

  const onSendAdress = (data: FormData) => {
    console.log(data)
  }

  return (
    <ShopLayout title={'Adress'} pageDescription={'Confirm your adress'}>
    <Typography variant='h1' component='h1'>Direccción de envío</Typography>
      <form onSubmit={handleSubmit(onSendAdress)}>
    <Grid container spacing={2} sx={{mt: 5}}>
        <Grid item xs={12} sm={6}>
          <TextField label='Nombres' variant='outlined' fullWidth
          {
            ...register('firstName',{
              required: 'Este campo es requerido'
            })
          }
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Apellidos' variant='outlined' fullWidth
          {
            ...register('lastName',{
              required: 'Este campo es requerido'
            })
          }
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Dirección' variant='outlined' fullWidth
          {
            ...register('adress',{
              required: 'Este campo es requerido'
            })
          } />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Codigo postal' variant='outlined' fullWidth
          {
            ...register('zipCode',{
              required: 'Este campo es requerido'
            })
          }
          error={!!errors.zipCode}
          helperText={errors.zipCode?.message}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField label='País' variant='outlined' value={'Guatemala'} disabled fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Departamento</InputLabel>
            <Select variant='outlined' label='Departamento' defaultValue='GT'>
              {/* <MenuItem value={'GT'}>Guatemala</MenuItem> */}
              {
                departments.map( department => (
                  <MenuItem key={department.code} value={department.code}>{department.title}</MenuItem>
                  ))
              }
        
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Ciudad' variant='outlined' fullWidth
          {
            ...register('city',{
              required: 'Este campo es requerido'
            })
          }
          error={!!errors.city}
          helperText={errors.city?.message}
          />
        </Grid>
       
        <Grid item xs={12} sm={6}>
          <TextField label='Número de Teléfono' variant='outlined' fullWidth
          {
            ...register('phone',{
              required: 'Este campo es requerido',
               minLength: { value: 8, message: 'No es un numero de telefono válido'}
            })
          }
          InputProps={{
              startAdornment: <InputAdornment position="start">+502</InputAdornment>,
          }}
          error={!!errors.phone}
          helperText={errors.phone?.message}  
          />
        </Grid>
        
        <Grid item xs={12} display='flex' justifyContent='center' sx={{my: 3}}>
          <Button color='secondary' type='submit' sx={{padding: 2}} size='large'>
            <Typography variant='body1'>Realizar pedido</Typography>
          </Button>
        </Grid>

    </Grid>
      </form>
  </ShopLayout>
  )
}

export default AdressPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({req}) => {
//   const { token = '' } = req.cookies;
//   let userId = '', isValidToken = false;

//   try {
//     userId = await jwt.isValidtoken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if(!isValidToken){
//     return {
//       redirect: {
//         destination: '/auth/login?p=/checkout/adress',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
      
//     }
//   }
// }