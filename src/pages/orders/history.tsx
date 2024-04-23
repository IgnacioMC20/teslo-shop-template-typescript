import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { NextPage, GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { getSession } from 'next-auth/react'

import { ShopLayout } from '@/components/layout'
import { dbOrders } from '@/database'
import { IOrder, IUser } from '@/interfaces'
import { showFirstName } from '@/utils'

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    renderCell: (params: any) => `Order ${params.row.id.slice(0, 5)}`,
  },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Paid',
    description: 'Shows the status of the order',
    width: 200,
    renderCell: (params: any) => {
      return params.row.paid ? (
        <Chip color="primary" label="Paid" variant="outlined" />
      ) : (
        <Chip color="primary" label="Not Paid" variant="outlined" />
      )
    },
  },
  {
    field: 'link',
    headerName: 'Order',
    description: 'Go to order',
    width: 200,
    sortable: false,
    renderCell: (params: any) => (
      <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
        <Link underline="hover">
          {/* {`View ${params.row.id.slice(0, 5)}`} */}
          View
        </Link>
      </NextLink>
    ),
  },
]

const mapRows = (orders: IOrder[], user: IUser) =>
  orders.map((order) => {
    return {
      id: order._id,
      paid: order.isPaid,
      fullname: user.name,
      order: order._id,
    }
  })

interface Props {
  user: IUser;
  orders: IOrder[] | [];
}

const HistoryPage: NextPage<Props> = ({ user, orders }: Props) => {
  console.log({ orders, user })
  const rows = mapRows(orders, user)

  return (
    <ShopLayout title="History" pageDescription="Order History">
      <Typography variant="h1" component="h1">
        Ordenes de {showFirstName(user?.name!)}
      </Typography>
      <Grid container sx={{ my: 5 }}>
        <Grid item sx={{ height: 650, width: '100%' }}>
          {orders.length === 0 ? (
            <Typography variant="h2" component="h2">
              No hay ordenes
            </Typography>
          ) : (
            <DataGrid rows={rows} columns={columns} />
          )}
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    }
  }

  const orders = (await dbOrders.getOrdersByUser(session.user._id)) ?? []

  return {
    props: {
      user: session.user,
      orders,
    },
  }
}

export default HistoryPage
