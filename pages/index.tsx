import type { NextPage } from 'next'

import Navbar from '@components/Navbar'
import Cover from '@components/Cover'
import Footer from '@components/Footer'

const Home: NextPage = () => {
    return (
        <>
            <Navbar />
            <div className="w-full min-h-screen h-auto py-6 md:py-12">
                <Cover />
            </div>
            <Footer />
        </>
    )
}

export default Home
