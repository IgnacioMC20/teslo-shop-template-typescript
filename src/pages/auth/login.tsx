import { AuthLayout } from '@/components/layout'
import { Button, Card, Grid, Link, TextField, Typography } from '@mui/material'
import { NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'

const LoginPage: NextPage = () => {
    return (
        <AuthLayout title={'Login'}>
            <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                    <Card sx={{ width: '25%', padding: '25px 25px', backgroundColor: 'rgba(255,255,255)' }}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} display='flex' justifyContent='center'>
                                <Typography color='primary' variant='h1' component='h1'>Iniciar Sesión</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label='Correo' variant='outlined' fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label='Contraseña' type='password' variant='outlined' fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button size='large' fullWidth>Ingresar</Button>
                            </Grid>
                            <Grid item xs={12} display='flex' justifyContent='end'>
                                <NextLink href='/auth/register' passHref legacyBehavior>
                                    <Link underline='hover'>
                                        No tienes cuenta?
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

export default LoginPage