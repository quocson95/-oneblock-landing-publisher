import { PropsWithChildren } from "react";

type StringProps = {
    content: string; // Replace 'string' with the actual type of 'content'
  };

const Button = ({
    content,
    onClick,
    children,
   ...props
  }: {
    children?: React.ReactNode
    onClick?: any,
    content?:string,
    
  }) => {
    return (
       
<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
onClick={onClick}
>
<section className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {children}
        </section>
</button>
        
    )
}
export  default Button;