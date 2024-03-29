import { NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'

import { Button, Card, Grid, Link, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { AuthLayout } from '@/components/layout'
import { validations } from '@/utils';
import { useContext } from 'react';
import { AuthContext } from '@/context'
import { useRouter } from 'next/router';

type FormData = {
    email: string,
    password: string,
};

const LoginPage: NextPage = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const { loginUser } = useContext(AuthContext);
    const router = useRouter();

    const onLoginUser = async ({ email, password }: FormData) => {
        const isValidLogin = await loginUser(email, password);

        const destination = router.query.p?.toString() || '/';
        if (isValidLogin) router.replace(destination)
    }

    return (
        <AuthLayout title={'Login'}>
            <Grid container sx={{ height: '100%' }} display='flex' justifyContent='center' alignItems='center'>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Card sx={{ width: '25%', padding: '25px 25px', backgroundColor: 'rgba(255,255,255)' }}>
                        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                            <Grid container spacing={4}>
                                <Grid item xs={12} display='flex' justifyContent='center'>
                                    <Typography color='primary' variant='h1' component='h1'>Iniciar Sesión</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Correo'
                                        type='email'
                                        variant='outlined'
                                        fullWidth
                                        {...register('email', {
                                            required: 'Este campo es requerido',
                                            validate: (value) => validations.isEmail(value)
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        autoComplete='false' />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label='Contraseña'
                                        type='password'
                                        variant='outlined'
                                        fullWidth
                                        {...register('password', {
                                            required: 'Este campo es requerido',
                                            minLength: { value: 6, message: 'Minimo de 6 caracteres' }
                                        })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        autoComplete='false' />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' size='large' fullWidth>Ingresar</Button>
                                </Grid>
                                <Grid item xs={12} display='flex' justifyContent='end'>
                                    <NextLink href={router.query.p ? `/auth/register?p=${router.query.p.toString()}` : '/auth/register'} passHref legacyBehavior>
                                        <Link underline='hover'>
                                            No tienes cuenta?
                                        </Link>
                                    </NextLink>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid >
        </AuthLayout >
    )
}

export default LoginPage