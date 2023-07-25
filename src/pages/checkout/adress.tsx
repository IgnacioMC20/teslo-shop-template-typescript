import { NextPage } from 'next'

import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'

import { ShopLayout } from '@/components/layout';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { IDepartment } from '@/interfaces';
import { tesloApi } from '@/api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { CartContext } from '@/context';

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

const getAdressFromCookies = () => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    adress: Cookies.get('adress') || '',
    zipCode: Cookies.get('zipCode') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || 'GT',
    department: Cookies.get('department') || '',
    phone: Cookies.get('phone') || '',
  }
}

const AdressPage: NextPage = () => {

  const router = useRouter();
  const { updateAdress } = useContext(CartContext);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: getAdressFromCookies()
  });
  const [departments, setDepartments] = useState<IDepartment[]>([
    {
      title: 'Guatemala',
      code: 'GT'
    }
  ])

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
    updateAdress(data)
    router.push('/checkout/summary')
  }

  return (
    <ShopLayout title={'Adress'} pageDescription={'Confirm your adress'}>
      <Typography variant='h1' component='h1'>Direccción de envío</Typography>
      <form onSubmit={handleSubmit(onSendAdress)} noValidate>
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
                }
                error={!!errors.adress}
                helperText={errors.adress?.message}
              />
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
              <TextField label='País' variant='outlined' value={'Guatemala'} disabled fullWidth
                {
                  ...register('country',{
                    required: 'Este campo es requerido'
                  })
                }
                error={!!errors.country}
                helperText={errors.country?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Departamento</InputLabel>
                <Select variant='outlined' label='Departamento' defaultValue='Guatemala'
                  {
                    ...register('department',{
                      required: 'Este campo es requerido'
                    })
                  }
                >
                    {
                      departments.map( department => (
                        <MenuItem key={department.code} value={department.title}>{department.title}</MenuItem>
                        ))
                    }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label='Municipio' variant='outlined' fullWidth
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

export default AdressPage;