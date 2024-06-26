import {
    AccountCircleOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined,
    LogoutOutlined, MaleOutlined, ShoppingBagOutlined, CheckroomOutlined, AdminPanelSettingsOutlined, SearchOutlined
} from '@mui/icons-material'
import {
    Box, Divider, Drawer, IconButton, Input, InputAdornment,
    List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader
} from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

import { AuthContext, UIContext } from '@/context'

export const SideMenu = () => {

    const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
    const { user, isLoggedIn, logoutUser } = useContext(AuthContext)
    const router = useRouter()
    const navigateTo = (url: string) => {
        toggleSideMenu()
        router.push(url)
    }

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        navigateTo(`/search/${searchTerm}`)
    }

    const [searchTerm, setSearchTerm] = useState('')

    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 300, paddingTop: 5, height: '100%' }}>

                <List >

                    <ListItem>

                        {/* <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        /> */}

                        <Input
                            sx={{ display: { xs: '', sm: 'none' } }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            autoFocus
                            placeholder="Buscar"
                            endAdornment={
                                <InputAdornment position="start">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    {
                        isLoggedIn && (
                            <>
                                <ListItemButton >
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItemButton>

                                <ListItemButton onClick={() => navigateTo('/orders/history')}>
                                    <ListItemIcon>
                                        <ShoppingBagOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItemButton>

                            </>
                        )
                    }

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/men')}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/women')}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/kids')}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItemButton>
                    {
                        isLoggedIn ? (
                            <ListItemButton onClick={logoutUser}>
                                <ListItemIcon>
                                    <LogoutOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItemButton>
                        ) : (
                            <ListItemButton onClick={ () => navigateTo(`/auth/login?p=${router.asPath}`)}>
                                <ListItemIcon>
                                    <LoginOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'} />
                            </ListItemButton>
                        )
                    }
                    {
                        user?.role === 'admin' && (
                            <>
                                <Divider />
                                <ListSubheader>Admin Panel</ListSubheader>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <CheckroomOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Productos'} />
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemIcon onClick={() => navigateTo('/orders/history')}>
                                        <ShoppingBagOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Ordenes'} />
                                </ListItemButton>

                                <ListItemButton>
                                    <ListItemIcon>
                                        <AdminPanelSettingsOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Usuarios'} />
                                </ListItemButton>
                            </>
                        )
                    }

                </List>
            </Box>
        </Drawer>
    )
}