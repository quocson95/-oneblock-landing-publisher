'use client'

import Button from "@/components/Button";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";
import React, {  Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { HostBackend } from "@/libs/contanst";
import { getCookie } from "cookies-next";
import Tabs from "@/components/Tabs";
import { ConvertToNameFormat, ToNonAccentVietnamese } from "@/libs/ nonAccentVietnamese";
import { AdmonitionDirectiveDescriptor, BoldItalicUnderlineToggles, ChangeAdmonitionType, ChangeCodeMirrorLanguage, codeMirrorPlugin, CodeToggle, ConditionalContents, diffSourcePlugin, DiffSourceToggleWrapper, DirectiveDescriptor, directivesPlugin, frontmatterPlugin, GenericDirectiveEditor, imagePlugin, InsertCodeBlock, InsertFrontmatter, InsertImage, InsertSandpack, InsertTable, InsertThematicBreak, KitchenSinkToolbar, linkDialogPlugin, ListsToggle, MDXEditorMethods, ShowSandpackInfo, tablePlugin, UndoRedo, type CodeBlockEditorDescriptor, type SandpackConfig } from '@mdxeditor/editor';
import FrontMatterMdxForm, { FrontMatterMdx } from "./form";

const EditorComp = dynamic(() => import("../../../components/Editor"), { ssr: false });

const Editor =  () =>{
    const [mdxContent, setMdxContent] = useState<string>();
    const [mdxFrontMatter, setMdxFrontMatter] = useState<FrontMatterMdx>();
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const[saveStatus, setSaveStatus] = useState('')
    const router = useRouter();
    const slug = useRef('');
    let mdxEditorRef = React.useRef<MDXEditorMethods>(null)
    

    const saveMdx = async (id: number) => {
      if (!mdxEditorRef ||!mdxEditorRef.current) {
        console.log('mdxEditorRef is null');
        return;
      }
      setMdxContent(mdxEditorRef.current.getMarkdown());
      const dispName = name;
      let saveName = fixNameOfMdx(name.replaceAll('.mdx', ''));
      if (!saveName.endsWith(".mdx")) {
        saveName += ".mdx"
      }
      const cookie = await getCookie("session")?.toString();
      const res = await fetch(`${HostBackend}/be/admin/mdx/?name=${saveName}&id=${id}&dispName=${dispName}`,
         {method: "put", body: mdxEditorRef.current.getMarkdown(), headers: {          Authorization: `${cookie}`,
      }} )
      console.log(res);
      if (res.status == 200) {
        setSaveStatus('Save success!'); // Displays a success message
      } else {
        setSaveStatus('Save failed!'+ res.status); // Displays a success message
      }
    }

    const fixNameOfMdx = (name: string) =>  {
      name = name.trim().toLowerCase().substring(0, 80);
      name = ToNonAccentVietnamese(name);
      name = ConvertToNameFormat(name);
      return name
    }

    const frontmatterMarkdown = (mdx: string) => {
      // console.log(mdx)
      setMdxContent(mdx);
    }

    const submitForm = async (data: FrontMatterMdx) => {
      console.log(data)
      if (!mdxEditorRef ||!mdxEditorRef.current) {
        console.log('mdxEditorRef is null');
        return;
      }
      setMdxContent(mdxEditorRef.current.getMarkdown());
      const dispName = name;
      let saveName = fixNameOfMdx(name.replaceAll('.mdx', ''));
      if (!saveName.endsWith(".mdx")) {
        saveName += ".mdx"
      }
      const id = parseInt(slug.current);
      // pubDate: "2025-03-06T10:24:16.94622Z"
      const formData = new FormData();
      formData.set("title",data.title);
      formData.set("category",data.category);
      formData.set("description",data.description);
      formData.set("heroImage",data.heroImage);
      formData.set("tags",data.tagsAsInput);
      formData.set("dispName", dispName);
      formData.set("content", mdxEditorRef.current.getMarkdown())
      formData.set("pubDate",new Date().toISOString());
      formData.set("name", saveName);
      const cookie = await getCookie("session")?.toString();
      const res = await fetch(`${HostBackend}/be/admin/mdx/?name=${saveName}&id=${id}&dispName=${dispName}`,
         {method: "put", body: formData, headers: {          Authorization: `${cookie}`,
      }} )

      console.log(res);
      if (res.status == 200) {
        setSaveStatus('Save success!'); // Displays a success message
      } else {
        setSaveStatus('Save failed!'+ res.status); // Displays a success message
      }
    } 
    

    useEffect(() => {
      const { id } = router.query;
      // console.log(id);
      if (id as string[]) {
        slug.current = id?.toString() || '';
      }
      const fetchPosts = async () =>{      
        if (!slug.current || slug.current.length <= 0 || slug.current =='' || slug.current=='0') {
          setMdxContent(' ');
          setLoading(false);
          return;
        }
        {
          console.log('load mdx', slug.current);
          const res = await fetch(`${HostBackend}/be/mdx/${slug.current}?loadContent=1`)
          const bodyJson = await res.json();      
          setMdxContent(bodyJson.content);
          setMdxFrontMatter(bodyJson.frontMatter);
          mdxEditorRef.current?.setMarkdown(bodyJson.content)
          setName(bodyJson.display_name.replaceAll('.mdx', ''));
        }
        setLoading(false);
      };
      fetchPosts();
    }, [router])

    if (loading) {
      return <Loading></Loading>
    }


    
    return(
      <>
        {/* <Button><Link href="/dashboard">Home</Link></Button> */}
        <Tabs></Tabs>
        { saveStatus.length > 0 &&
        <button type="button" className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"> {saveStatus}</button>
        }
        
        {!loading && <FrontMatterMdxForm data={mdxFrontMatter} onSubmit={submitForm} ></FrontMatterMdxForm>}
        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Name</label>
              <input onChange={(e)=>{ setName(e.target.value)}}              
              value={name}
              maxLength={80}
                type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          </div>
        </form>        
       
        <Suspense fallback={<Loading />}>
        {mdxContent && mdxContent.length > 0 && <EditorComp content={mdxContent} onContentChange={(x)=>{mdxEditorRef=x}}/> }       
        </Suspense>
      </>
    )
}

export default  Editor;