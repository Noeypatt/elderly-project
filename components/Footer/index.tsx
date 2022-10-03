import { FC } from 'react'
import { Typography } from '@mui/material'

const Footer: FC = () => {
    return (
        <div className="absolute w-full flex justify-center bg-[#f8f3f3]">
            <Typography className="m-2">
                © 2019 Elderly Database and Infographics.
            </Typography>
        </div>
    )
}
export default Footer
