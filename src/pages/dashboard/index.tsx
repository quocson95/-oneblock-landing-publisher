import Mdxs from "../editor"

export default function Page({
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
    
    // return <Tabs></Tabs>
    return <Mdxs></Mdxs>
  }