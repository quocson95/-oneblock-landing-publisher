'use client';
// You can use this code in a separate component that's imported in your pages.
import { AdmonitionDirectiveDescriptor, BoldItalicUnderlineToggles, ChangeAdmonitionType, ChangeCodeMirrorLanguage, codeMirrorPlugin, CodeToggle, ConditionalContents, diffSourcePlugin, DiffSourceToggleWrapper, DirectiveDescriptor, directivesPlugin, frontmatterPlugin, GenericDirectiveEditor, imagePlugin, InsertCodeBlock, InsertFrontmatter, InsertImage, InsertSandpack, InsertTable, InsertThematicBreak, KitchenSinkToolbar, linkDialogPlugin, ListsToggle, MDXEditorMethods, ShowSandpackInfo, tablePlugin, UndoRedo, type CodeBlockEditorDescriptor, type SandpackConfig } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import React from 'react';
import { MDXEditor , codeBlockPlugin, headingsPlugin, listsPlugin, 
  linkPlugin, quotePlugin, markdownShortcutPlugin, 
  useCodeBlockEditorContext,
  toolbarPlugin,
  sandpackPlugin,
  thematicBreakPlugin,
 }  from '@mdxeditor/editor';
import {imageUpload,imagePreview} from './Upload';

const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: ``
    },
  ]
}


const simpleToolbarPlug =  toolbarPlugin({
  // toolbarClassName: 'my-classname',
  toolbarContents: () => (
    <>
        <KitchenSinkToolbar/>

    </>
  )
})


const CalloutDirectiveDescriptor: DirectiveDescriptor = {
  name: 'callout',
  testNode(node) {
    return node.name === 'callout'
  },
  // set some attribute names to have the editor display a property editor popup.
  attributes: [],
  // used by the generic editor to determine whether or not to render a nested editor.
  hasChildren: true,
  Editor: GenericDirectiveEditor
}

type StringProps = {
  content: string; // Replace 'string' with the actual type of 'content'
  onContentChange: (mdxEditor: React.RefObject<MDXEditorMethods | null>) => void;
};


const EditorComp: React.FC<StringProps> = ({content, onContentChange}) => {
  const mdxEditorRef = React.useRef<MDXEditorMethods>(null)
  // mdxEditorRef.current?.setMarkdown(content);
  onContentChange(mdxEditorRef);
    return (<div>
      <MDXEditor     
      contentEditableClassName="prose"
      markdown={content} 
      ref={mdxEditorRef}
      // onChange={console.log}
      // markdown={content}
      plugins={[
        headingsPlugin(),
        // listsPlugin(),
        linkPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        tablePlugin(),
        markdownShortcutPlugin(),
        simpleToolbarPlug,
        codeBlockPlugin({defaultCodeBlockLanguage:'js'}),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),        
        directivesPlugin({directiveDescriptors: [AdmonitionDirectiveDescriptor]}),
        diffSourcePlugin({
          diffMarkdown: 'An older version',
          viewMode: 'rich-text',
          readOnlyDiff: true
        }),
        imagePlugin({
          imageUploadHandler: imageUpload,
          imagePreviewHandler: imagePreview,
          imageAutocompleteSuggestions: ['https://api.oneblock.vn/be/s3?bucket=cms-images&name=OneBlock-Logo-Black-RGB%401x.png'],
        }),
        frontmatterPlugin(),
      ]}
    />
    </div>)
}

export default EditorComp
