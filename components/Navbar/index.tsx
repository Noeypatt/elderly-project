import { FC, ReactElement, useState } from 'react'
import Link from 'next/link'
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Slide,
    Typography,
    Toolbar,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

interface Props {
    window?: () => Window
}

interface NavItem {
    name: string
    href: string
}

const drawerWidth: number = 240
const navItems: NavItem[] = [
    { name: 'เกี่ยวกับเรา', href: '/about' },
    { name: 'สังคมผู้สูงอายุ', href: '/society' },
    { name: 'เบี้ยยังชีพ', href: '/allowance' },
    { name: 'ติดต่อ', href: '/contact' },
    { name: 'เข้าสู่หน้าหลัก', href: '/main' },
]

const Navbar: FC<Props> = ({ window }) => {
    const appName = process.env.NEXT_PUBLIC_APP_NAME
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <Box onClick={handleDrawerToggle}>
            <Typography variant="h6" sx={{ p: 2 }}>
                {appName}
            </Typography>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <Link href={item.href} passHref>
                            <ListItemButton>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    const container =
        window !== undefined ? () => window().document.body : undefined

    return (
        <Box>
            <AppBar
                position="relative"
                className="bg-transparent text-black shadow-none"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        {appName}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item, index) => (
                            <Link key={index} href={item.href} passHref>
                                <Button className="text-black">
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}
export default Navbar
