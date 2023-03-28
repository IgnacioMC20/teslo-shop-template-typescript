import { NextPage } from 'next'
import NextLink from 'next/link'

import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

import { ShopLayout } from '@/components/layout'

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Paid',
        description: 'Shows the status of the order',
        width: 200,
        renderCell: (params: any) => {
            return params.row.paid
                ? <Chip color='primary' label='Paid' variant='outlined' />
                : <Chip color='primary' label='Not Paid' variant='outlined' />
        }
    },
    {
        field: 'link',
        headerName: 'Order',
        description: 'Go to order',
        width: 200,
        sortable: false,
        renderCell: (params: any) => (
            <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                <Link underline='hover'>
                    {`View ${params.row.id}`}
                </Link>
            </NextLink>
        )

    }

]

const rows = [
    { id: 1, paid: true, fullname: 'Fernando Herrera', order: 1 },
    { id: 2, paid: false, fullname: 'Ignacio Cuyun', order: 2 },
    { id: 3, paid: true, fullname: 'Cielo Sagastume', order: 3 },
    { id: 4, paid: false, fullname: 'Isabel Cuyun', order: 4 },
    { id: 5, paid: true, fullname: 'Adrian Martinez', order: 5 },
    { id: 6, paid: false, fullname: 'Marcos Ballena', order: 6 },
    { id: 11, paid: true, fullname: 'Fernando Herrera', order: 1 },
    { id: 21, paid: false, fullname: 'Ignacio Cuyun', order: 2 },
    { id: 31, paid: true, fullname: 'Cielo Sagastume', order: 3 },
    { id: 41, paid: false, fullname: 'Isabel Cuyun', order: 4 },
    { id: 51, paid: true, fullname: 'Adrian Martinez', order: 5 },
    { id: 61, paid: false, fullname: 'Marcos Ballena', order: 6 },
    { id: 12, paid: true, fullname: 'Fernando Herrera', order: 1 },
    { id: 22, paid: false, fullname: 'Ignacio Cuyun', order: 2 },
    { id: 32, paid: true, fullname: 'Cielo Sagastume', order: 3 },
    { id: 42, paid: false, fullname: 'Isabel Cuyun', order: 4 },
    { id: 52, paid: true, fullname: 'Adrian Martinez', order: 5 },
    { id: 62, paid: false, fullname: 'Marcos Ballena', order: 6 },
    { id: 13, paid: true, fullname: 'Fernando Herrera', order: 1 },
    { id: 23, paid: false, fullname: 'Ignacio Cuyun', order: 2 },
    { id: 33, paid: true, fullname: 'Cielo Sagastume', order: 3 },
    { id: 43, paid: false, fullname: 'Isabel Cuyun', order: 4 },
    { id: 53, paid: true, fullname: 'Adrian Martinez', order: 5 },
    { id: 63, paid: false, fullname: 'Marcos Ballena', order: 6 },
    { id: 14, paid: true, fullname: 'Fernando Herrera', order: 1 },
    { id: 24, paid: false, fullname: 'Ignacio Cuyun', order: 2 },
    { id: 34, paid: true, fullname: 'Cielo Sagastume', order: 3 },
    { id: 44, paid: false, fullname: 'Isabel Cuyun', order: 4 },
    { id: 54, paid: true, fullname: 'Adrian Martinez', order: 5 },
    { id: 64, paid: false, fullname: 'Marcos Ballena', order: 6 },
]

const HistoryPage: NextPage = () => {
    return (
        <ShopLayout title='History' pageDescription='Order History'>
            <Typography variant='h1' component='h1'>History</Typography>

            <Grid container sx={{ my: 5 }}>
                <Grid item sx={{ height: 650, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} />
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default HistoryPage