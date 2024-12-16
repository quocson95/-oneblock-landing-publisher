import { Mdxs } from "@/components/Mdx"

export default function Page({
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) {
    return <Mdxs></Mdxs>
  }