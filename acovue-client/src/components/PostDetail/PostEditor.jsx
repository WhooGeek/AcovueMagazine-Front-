import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import { TableKit } from '@tiptap/extension-table'
import { MenuBar } from './MenuBar.jsx'
import Image from '@tiptap/extension-image'
import { postImageUpload } from '../../api/Post.api';
import FileHandler from '@tiptap/extension-file-handler'
import './PostEditor.css'; 


const PostEditor = ({ content, setContent, setImageUrls }) => {

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await postImageUpload(formData);
    const imageUrl = response.data.data.imageUrl;

    setImageUrls?.((previousUrls) => [...previousUrls, imageUrl]);

    return imageUrl;
  }

  const editor = useEditor({
    extensions: [
    StarterKit,
    TextStyleKit,
    Highlight.configure({ multicolor: true }),
    TableKit,
    Image.configure({ allowBase64: false }),
    FileHandler.configure({
      allowedMimeTypes: ["image/jpeg", "image/png",
      "image/gif", "image/webp"],
      onDrop: async (editor, files, position) => {
        const imageFile = files.find((file) =>
          file.type.startsWith("image/")
        );

        if (!imageFile) return;

        const imageUrl = await uploadImage(imageFile);

        editor
          .chain()
          .focus()
          .insertContentAt(position, {
            type: "image",
            attrs: { src: imageUrl, alt:
            imageFile.name },
          })
          .run();
      },
    }),
  ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  })

  const handleImageUpload = async (file) => {
    try {
      const imageUrl = await uploadImage(file);

      editor
        .chain()
        .focus()
        .setImage({ src: imageUrl, alt: file.name })
        .run();
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  return (
    <div className="editor-container">
      <MenuBar editor={editor} onImageUpload={handleImageUpload} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default PostEditor;
