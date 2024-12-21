import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Tabs = () =>{
    const router = useRouter();
    const [tabActive,setTabActive] =useState(0);
    const cssActive="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-blue-500"
    const cssDeactive="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
    useEffect(()=>{
        const asPath = router.asPath;
        if (asPath.startsWith("/editor/edit/13")) {
            setTabActive(1);
        } else if (asPath.startsWith("/eventcraw")) {
            setTabActive(2);
        } else {
            setTabActive(0);
        }
        window.document.getElementById("landing")?.ariaSetSize
    },[])
    return (
        <>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">            
            <li className="me-2">
                <Link href="/editor" aria-current="page" id="landing" className={` ${tabActive==0 ? cssActive : cssDeactive}`}>
                Edit Landing Page
                </Link>
            </li>
            <li className="me-2">
                <Link  href="/editor/edit/13" id="about" className={` ${tabActive==1 ? cssActive : cssDeactive}`}>Edit About Page</Link>
            </li>
            <li className="me-2">
                <Link  href="/eventcraw" id="crawl" className={` ${tabActive==2 ? cssActive : cssDeactive}`}>Event</Link>
            </li>
        </ul>
        </>
    )
}

export default Tabs;