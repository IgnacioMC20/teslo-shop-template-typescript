import { AuthLayout } from '@/components/layout'
import { Button, Card, Grid, Link, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'

const RegisterPage: NextPage = () => {
    return (
        <AuthLayout title={'Registro'}>
            <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Card sx={{ width: '25%', padding: '25px 25px', backgroundColor: 'rgba(255,255,255)' }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} display='flex' justifyContent='center'>
                                <Typography color='primary' variant='h1' component='h1'>Crear Cuenta</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label='Nombres' variant='outlined' fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label='Apellidos' variant='outlined' fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label='Correo' variant='outlined' fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label='Contraseña' type='password' variant='outlined' fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label='Confirmar Contraseña' type='password' variant='outlined' fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <Button size='large' fullWidth>Crear</Button>
                            </Grid>
                            <Grid item xs={12} display='flex' justifyContent='end'>
                                <NextLink href='/auth/login' passHref legacyBehavior>
                                    <Link underline='hover'>
                                        Ya tienes cuenta?
                                    </Link>
                                </NextLink>
                            </Grid>
                        </Grid>

                    </Card>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}

export default RegisterPage