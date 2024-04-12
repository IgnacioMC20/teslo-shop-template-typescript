
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { tesloApi } from '@/api'
import { ShopLayout } from '@/components/layout'
import { CartContext } from '@/context'
import { IDepartment } from '@/interfaces'

type FormData = {
  firstName: string
  lastName: string
  address: string
  zipCode: string
  city: string
  country: string
  department: string
  phone: string
}

const getAddressFromCookies = () => {
  return {
    firstName: Cookies.get('firstName') || '',
    lastName: Cookies.get('lastName') || '',
    address: Cookies.get('address') || '',
    zipCode: Cookies.get('zipCode') || '',
    city: Cookies.get('city') || '',
    country: Cookies.get('country') || 'GT',
    department: Cookies.get('department') || '',
    phone: Cookies.get('phone') || '',
  }
}

const AddressPage: NextPage = () => {

  const router = useRouter()
  const { updateAddress, cart } = useContext(CartContext)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: getAddressFromCookies()
  })
  const [departments, setDepartments] = useState<IDepartment[]>([
    {
      title: 'Guatemala',
      code: 'GT'
    }
  ])

  useEffect(() => {
    if (cart.length === 0) {
      router.replace('/cart')
    }
    getDepartments()
  }, [])

  //todo: use staticprops to get departments
  const getDepartments = async () => {
    const data = await tesloApi({ url: '/departments' })
    const { message, departments } = await data.json()
    if (message) {
      toast(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
        type: 'error',
        closeButton: false
      })
      return
    }
    setDepartments(departments)
  }

  const onSendAddress = (data: FormData) => {
    console.log(data)
    updateAddress(data)
    router.push('/checkout/summary')
  }

  return (
    <ShopLayout title={'Address'} pageDescription={'Confirm your address'}>
      <Typography variant='h1' component='h1'>Direccción de envío</Typography>
      <form onSubmit={handleSubmit(onSendAddress)} noValidate>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={12} sm={6}>
            <TextField label='Nombres' variant='outlined' fullWidth
              {
              ...register('firstName', {
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
              ...register('lastName', {
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
              ...register('address', {
                required: 'Este campo es requerido'
              })
              }
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Codigo postal' variant='outlined' fullWidth
              {
              ...register('zipCode', {
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
              ...register('country', {
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
                ...register('department', {
                  required: 'Este campo es requerido'
                })
                }
              >
                {
                  departments.map(department => (
                    <MenuItem key={department.code} value={department.title}>{department.title}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label='Municipio' variant='outlined' fullWidth
              {
              ...register('city', {
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
              ...register('phone', {
                required: 'Este campo es requerido',
                minLength: { value: 8, message: 'No es un numero de telefono válido' }
              })
              }
              InputProps={{
                startAdornment: <InputAdornment position="start">+502</InputAdornment>,
              }}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='center' sx={{ my: 3 }}>
            <Button color='secondary' type='submit' sx={{ padding: 2 }} size='large'>
              <Typography variant='body1'>Realizar pedido</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </ShopLayout>
  )
}

export default AddressPage