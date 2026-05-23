import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  List,
  BlockQuote,
  Alignment,
  FontColor,
  FontBackgroundColor,
  FontSize,
  Image,
  ImageUpload,
  ImageCaption,
  ImageStyle,
  ImageResize,
  ImageToolbar,
  Table,
  TableToolbar,
  Undo
} from 'ckeditor5';
import { getUploadAdapterPlugin } from '../Util/CkeditorUtils.js';
import './PostEditor.css'; 


const PostEditor = ({ content, setContent, setImageUrls }) => {

  const uploadPlugin = getUploadAdapterPlugin(setImageUrls);

  return (
    <div className="editor-container">
      <CKEditor
        editor={ClassicEditor}
        data={content} // 초기 데이터
        config={{
          placeholder: "내용을 입력하세요.",
          toolbar: [
              'undo', 'redo', '|',
              'heading', '|',
              'bold', 'italic', 'underline', 'strikethrough', '|',
              'fontSize', 'fontColor', 'fontBackgroundColor', '|',
              'alignment', '|',
              'link', 'blockQuote', '|',
              'bulletedList', 'numberedList', '|',
              'insertTable', 'uploadImage'
            ]
          ,
          image: {
            styles: [
              'full',
              'alignLeft',
              'alignRight'
            
            ],
            resizeOptions: [
              {
                name: 'resizeImage:original',
                label: 'Original',
                value: null
              },
              {
                name: 'imageResize:50',
                label: '50%',
                value: '50'
              },
              {
                name: 'imageResize:75',
                label: '75%',
                value: '75'
              }
            ],
            toolbar: [
              'imageTextAlternative',
              'toggleImageCaption',
              '|',
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
              '|',
              'resizeImage'
            ]
          },
          table:{
            contentToolbar: [
              'tableColumn',
              'tableRow',
              'mergeTableCells'
            ] 
          },
          extraPlugins: [uploadPlugin] // 커스텀 업로드 어댑터
        }}

        onChange={(event, editor) => {
          const data = editor.getData(); 
          setContent(data);
        }}

        onBlur={(event, editor) => {
            const data = editor.getData();
            setContent(data);
        }}
      />
    </div>
  );
};

export default PostEditor;