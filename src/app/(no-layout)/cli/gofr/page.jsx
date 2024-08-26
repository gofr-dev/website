import React from 'react'
import Head from "next/head";
import {redirect} from "next/navigation";

const Page = () => {
  redirect("https://github.com/gofr-dev/gofr")
  return (
    <>
      <Head>
        <meta
          name="go-import"
          content="gofr.dev/cli/gofr git https://github.com/gofr-dev/gofr-cli"
        />
      </Head>
    </>
  )
}

export default Page
