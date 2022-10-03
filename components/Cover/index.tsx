import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Button } from '@mui/material'

import ImgCover from '../../public/images/cover.png'

const Cover = () => {
    return (
        <div className="flex text-center md:text-start justify-center md:justify-between items-center w-full md:w-4/5 lg:w-3/5 m-auto">
            <div className="flex flex-col justify-start">
                <div className="font-bold text-3xl lg:text-4xl leading-normal">
                    เว็บฐานข้อมูลผู้สูงอายุ <br />
                    และอินโฟกราฟิก
                </div>
                <br />
                <div className="font-medium text-lg">
                    ElderlyDB เป็นการนำข้อมูลทางสถิติเกี่ยวกับผู้สูงอายุ
                    <br />
                    มาเเสดงผลในรูปของอินโฟกราฟฟิก
                    <br />
                    รูปแบบต่าง ๆ
                </div>
                <div className="py-6">
                    <Link href="/main" passHref>
                        <Button variant="contained">เข้าสู่หน้าหลัก</Button>
                    </Link>
                </div>
            </div>
            <div className="hidden md:flex justify-start">
                <Image
                    src={ImgCover}
                    alt="cover"
                    width={'420px'}
                    height={'300px'}
                />
            </div>
        </div>
    )
}
export default Cover
