import { Grid, Typography } from '@mui/material'
import { FC, useContext } from 'react'

import { CartContext } from '@/context'
import { currency } from '@/utils'

export const OrderSummary: FC = () => {

    const { total, tax, subTotal, numberOfItems } = useContext(CartContext)
    // const numberOfItems = 4, subTotal = 5, tax = 10, total = 102
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ numberOfItems } item{numberOfItems > 0 && 's'}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(subTotal)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestsos( {Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}% )</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{currency.format(tax)}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt:2}} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{currency.format(total)}</Typography>
        </Grid>
    </Grid>
  )
}
