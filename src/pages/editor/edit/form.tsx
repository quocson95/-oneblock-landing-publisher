"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MDXEditorProps } from "@mdxeditor/editor"


export type FrontMatterMdx = {
  heroImage: "",
  category: "",
  description: "",
  pubDate: "",
  tags: string[],
  tagsAsInput: string,
  title: ""
}

export type FormProps = {
  data: FrontMatterMdx | undefined,
  onSubmit(mdxForm: FrontMatterMdx): void
}

export default function FrontMatterMdxForm(props : FormProps) {
 
  const [formData, setFormData] = useState<FrontMatterMdx>({heroImage:"",category:"",description:"",pubDate:"",tags: [],title:"",  tagsAsInput: ""});
  useEffect(()=>{
    if (props.data) {
      props.data.tagsAsInput = props.data.tags.join(",");
      setFormData(props.data);
    }
  }, [props.data])
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log("Form submitted:", formData)
    // Add your form submission logic here
    formData.tags = formData.tagsAsInput.split(",")
    
    props.onSubmit(formData);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="heroImage">Thumpnail Image</Label>
            <Input
              id="heroImage"
              name="heroImage"
              type="text"
              placeholder="Enter url image"
              value={formData.heroImage}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tagsAsInput">Tags</Label>
            <Input
              id="tagsAsInput"
              name="tagsAsInput"
              placeholder="Enter tags"
              value={formData.tagsAsInput}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Category</Label>
            <Input
              id="category"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

