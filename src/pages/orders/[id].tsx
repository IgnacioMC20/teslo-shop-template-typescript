import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material'
import {
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { NextPage, GetServerSideProps } from 'next'
import NextLink from 'next/link'
import { getSession } from 'next-auth/react'

import { CartList, OrderSummary } from '@/components/cart'
import { ShopLayout } from '@/components/layout'
import { IsOrderPaid } from '@/components/orders'
import { dbOrders } from '@/database'
import { IOrder } from '@/interfaces'

const OrderPage: NextPage<{ order: IOrder }> = ({ order }) => {
  console.log({ order })

  const { _id, isPaid, numberOfItems, shippingAddress } = order
  return (
    <ShopLayout title={'Order'} pageDescription={'Order'}>
      <Typography variant="h1" component="h1">
        Order: {_id}
      </Typography>

      <IsOrderPaid isPaid={isPaid} />

      <Grid container columns={12} sx={{ mt: 5 }}>
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card
            className="summary-card"
            sx={{ padding: '5px 20px', boxShadow: '20px 20px 10px grey' }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" sx={{ my: 2 }}>
                <Typography variant="h2">Address</Typography>

                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="hover">Edit</Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Address</Typography>
              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>{shippingAddress.address}</Typography>
              <Typography>
                {shippingAddress.city}, {shippingAddress.country}
              </Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 3 }} light />

              <Box display="flex" justifyContent="space-between" sx={{ my: 2 }}>
                <Typography variant="h2">Summary ({numberOfItems})</Typography>
              </Box>
              <OrderSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  tax: order.tax,
                  total: order.total,
                }}
              />
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <IsOrderPaid isPaid={isPaid} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = '' } = query

  const session: any = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    }
  }

  const order = await dbOrders.getOrderById(id.toString())

  if (!order || order.user !== session.user._id) {
    return {
      redirect: {
        destination: '/orders/history',
        permanent: false,
      },
    }
  }

  return {
    props: {
      order,
    },
  }
}

export default OrderPage
