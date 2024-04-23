import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from '@mui/icons-material'
import { Chip } from '@mui/material'

interface Props {
  isPaid: boolean;
}

export const IsOrderPaid = ({ isPaid }: Props) => {
  return (
    <>
      {!isPaid ? (
        <Chip
          sx={{ my: 2, padding: '5px 5px' }}
          label="Pending"
          variant="outlined"
          color="primary"
          icon={<CreditCardOffOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2, padding: '5px 5px' }}
          label="Orden pagada"
          variant="outlined"
          color="primary"
          icon={<CreditScoreOutlined />}
        />
      )}
    </>
  )
}
