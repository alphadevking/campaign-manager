import * as React from "react"
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/src/styles/Home.module.css'
// import { useEffect } from 'react'
import useCustomDate from "../hooks/useCustomDate"
import Link from "next/link"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ['latin'] })

export default function Home({
  data,
  error,
}: any) {

  const router = useRouter()

  // console.log('data :>> ', data)
  // console.log('error :>> ', error)

  // useEffect(() => {
  //   console.log('process.env.NEXT_PUBLIC_BASE_URL :>> ', process.env.NEXT_PUBLIC_BASE_URL)
  // }, [])

  const handleNavigation = ({ slug }: any) => {
    router.push("/" + slug)
  }

  return (
    <>

      <Head>
        <title>Campaign Manager | Home</title>
        <meta name='description' content='A site for campaigns' />
      </Head>

      <main className={`${styles.main}`}>

        <div className={`${styles.innerContent}`}>

          <div className='text-3xl font-bold py-2'>Available Campaigns</div>

          {
            error && <p> {JSON.stringify(error)} </p>
          }
          {
            data.map((element: any) => {

              const formattedDate = useCustomDate({ localeDate: element.created_at });

              return (
                <div key={element.slug}>

                  <div className={`${styles.item}`} onClick={() => handleNavigation(element)}>

                    <div className={`${styles.imgContainer}`}>
                      <Image
                        src={"https://res.cloudinary.com/dt22yd0pd/" + element.logo} alt='Cloudinary Image'
                        height={120}
                        width={120}
                        className={`${styles.img}`}
                      />
                    </div>

                    <div className={`${styles.rightItems}`}>
                      <Link href={"/" + element.slug} className='text-2xl font-bold py-2'>{element.title}</Link>
                      <div className='text-base py-1'>{element.description}</div>
                      <div className='text-base py-1'>{formattedDate}</div>
                    </div>

                  </div>

                </div>
              );
            })
          }

        </div>

      </main>

    </>
  )
}

export async function getStaticProps() {

  let data = []
  let error = null

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/campaigns`)

    data = await response.json()

  } catch (err) {

    console.log("err :>> ", err)
    error = err && err ? err : "Something went wrong";
  }

  // if (!data.length) {
  //   return {
  //     notFound: true
  //   }
  // }

  return {
    props: {
      data,
      error,
    }
  }
}
