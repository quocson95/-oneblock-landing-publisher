'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Button from '../../components/Button';
import Tabs from '../../components/Tabs';
import Loading from '@/components/loading';
 
export function Mdxs() {
  const [mdxs, setData] = useState([])
  const didInit = useRef(false);
  const loading = useRef(true);
  useEffect(() => {
    async function fetchPosts() {
      if (didInit.current) {
        return;
      }
      didInit.current = true;
      const res = await fetch('https://api.oneblock.vn/be/mdx?type_doc=-1')
      const data = await res.json()
      console.log(data);
      setData(data);
      loading.current = false;
    }
    fetchPosts()
  }, [])
  

   // Handle delete
   const handleDelete = async (id:number) => {
    try {
      await fetch(`http://103.82.133.178:8080/be/mdx/1/${id}`, {
        method: "delete",
        cache: "no-store"
      });
      // Remove the deleted item from the state
      setData((mdxs) => mdxs.filter((item: any) => {
        return item.id !== id;
      }));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle edit
  const handleEdit = (id:number) => {
    alert(`Edit item with ID: ${id}`);
    // Implement edit functionality here
  };
 
  if (loading.current) return (
    <>
      <Tabs></Tabs>
      <Loading></Loading>
    </>
  )
  if (mdxs.length === 0) return (
  <>
    <Tabs></Tabs>
    <Button><Link href={`/editor/edit/0`}>Add New</Link></Button>
    <div>No data</div>
    
  </>)
 
  return (
    <div>
    <Tabs></Tabs>
    <Button><Link href={`/editor/edit/0`}>Add New</Link></Button>

    <h1>Posts in landing page</h1>
    <table id="customers">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
          <th>CreateAt</th>
        </tr>
      </thead>
      <tbody>
        {mdxs.map((item: any) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              {/* <button onClick={() => handleEdit(item.id)}>Edit</button> */}
              {/* <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><Link href={`/editor/${item.id}`} className='text-white' style{"}>Edit</Link></button> */}
              <Button><Link href={`/editor/edit/${item.id}`}>Edit</Link></Button>
            </td>
            {/* <td><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button></td> */}
            <td>{item.created_at}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default Mdxs;