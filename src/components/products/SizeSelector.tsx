
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'

import { ISize } from '@/interfaces'

interface Props {
    selectedSize: ISize
    sizes: ISize[]
    onSelectedSize: ( arg: string ) => void
}

export const SizeSelector: FC<Props> = ({selectedSize, sizes, onSelectedSize}) => {
  return (
    <Box>
        {
            sizes.map( size => (
                <Button
                    key={size}
                    size='small'
                    color={selectedSize === size ? 'secondary' : 'info'}
                    onClick={() => onSelectedSize(size)}
                >
                    {size}
                </Button>
            ))
        }
    </Box>
  )
}
