import Head from 'next/head'
import React, { FC } from 'react'

import { Navbar, SideMenu } from '../ui'

interface Props {
    children: React.ReactNode
    title: string
    pageDescription: string
    imageFullUrl?: string
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{`Teslo | ${title}`}</title>
                <meta name='description' content={pageDescription} />

                <meta name='og:title' content={`Teslo | ${title}`} />
                <meta name='og:description' content={pageDescription} />
                {/* {
                    imageFullUrl && (
                        <meta name='og:image' content={imageFullUrl} />
                    )
                } */}
            </Head>
            <nav>
                <Navbar />
            </nav>

            <SideMenu />

            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                {children}
            </main>

            <footer>

            </footer>
        </>
    )
}
