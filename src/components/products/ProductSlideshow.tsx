import { FC } from 'react'
import { Slide } from 'react-slideshow-image'

import styles from './ProductSlideshow.module.css'

interface Props {
    images: string[]
}

export const ProductSlideshow: FC<Props> = ({ images }) => {

    return (
        <div className="slide-container">
            <Slide
                easing='ease'
                duration={5000}
                indicators
            >
                {images.map(image => {
                    const url = `/products/${image}`
                    return (
                        <div className={styles['each-slide']} key={image}>
                            <div style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover', }}>
                                {/* <span>{slideImage.caption}</span> */}
                            </div>
                        </div>
                    )
                })}
                {/* {slideImages.map((slideImage, index) => (
                    <div className={ styles['each-slide']} key={index}>
                        <div style={{ backgroundImage: `url(${slideImage.url})`, backgroundSize: 'cover',  }}>
                            /* <span>{slideImage.caption}</span> 
                        </div>
                    </div>
                ))} */}
            </Slide>
        </div>
    )
}
