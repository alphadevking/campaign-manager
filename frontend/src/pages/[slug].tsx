import React from 'react'
import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next';

const Campaign = () => {

    const { query: { slug } } = useRouter()

    console.log('slug', slug)

    return (
        <div>
            <h1>Campaign</h1>
        </div>
    )
}

// export async function getStaticPaths() {

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`)

//     const data = await response.json()

//     console.log("data :>>" + data)

// }


export default Campaign