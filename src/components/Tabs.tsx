import Link from "next/link";
import { useRouter } from "next/router";

const Tabs = () =>{
    const router = useRouter();
    console.log(router.basePath);
    return (
        <>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">            
            <li className="me-2">
                <Link href="/editor" aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">
                OneBlock Editor
                </Link>
            </li>
            <li className="me-2">
                <Link  href="/eventcraw" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Event</Link>
            </li>
        </ul>
        </>
    )
}

export default Tabs;