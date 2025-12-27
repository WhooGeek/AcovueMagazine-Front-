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
          // 이미지 업로드 기능 추가 예정
        }}

        onReady={(editor) => {
            // 에디터가 처음 켜질 때 초기값이 잘 들어갔는지 확인
            console.log("Editor Ready. Initial data:", editor.getData());
        }}

        onChange={(event, editor) => {
          const data = editor.getData(); 
          console.log("작성 중인 내용:", data);
          setContent(data);
        }}

        onBlur={(event, editor) => {
            const data = editor.getData();
            console.log("Blur (저장 확정):", data);
            setContent(data);
        }}
      />
    </div>
  );
};

export default PostEditor;