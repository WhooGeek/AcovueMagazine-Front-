import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './PostEditor.css'; 

const PostEditor = ({ content, setContent }) => {
  return (
    <div className="editor-container">
      <CKEditor
        editor={ClassicEditor}
        data={content} // 초기 데이터
        config={{
          placeholder: "내용을 입력하세요.",
          toolbar: [
            'heading', '|',
            'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
            'undo', 'redo'
          ],
          // 이미지 업로드 기능은 별도 설정 필요 (일단 텍스트 위주)
        }}
        onChange={(event, editor) => {
          const data = editor.getData(); 
          setContent(data);
        }}
      />
    </div>
  );
};

export default PostEditor;