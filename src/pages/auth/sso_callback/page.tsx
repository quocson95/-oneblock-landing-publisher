'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from 'next/navigation'
import { HostBackend, KeyTokenSession } from "@/libs/contanst";

const Page =()=>{
    const searchParams = useSearchParams()
    const router = useRouter()
    useEffect(()=>{
        const id = searchParams?.get('id')
        const errCode = searchParams?.get('errCode');
        if (errCode && errCode.length > 0 && parseInt(errCode)>0) {
            console.error('ErrorCode', errCode);
            return
        }
        console.log(id);
        if (!id) {
            console.error('Missing id in the query parameters');
            return;
          }
      
          // Call the server-side API to fetch the token
          fetch(`${HostBackend}/be/account/token`, {
            method: 'POST',
            body: id,
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.token) {
                // Store token in localStorage
                localStorage.setItem(KeyTokenSession, data.token);          
                // Redirect to dashboard
                // window.location.href = 'https://editor.oneblock.vn/dashboard';
                console.log('login success, go to dashboard')
                if (!router) {
                  console.log('router is null')
                }
                router?.push('/dashboard')

              } else {
                console.error('Token not found in response');
              }
            })
            .catch((error) => {
              console.error('Error in SSO callback:', error);
            });
    })
    
    return (
        <>OK</>
    )
}

export default Page;