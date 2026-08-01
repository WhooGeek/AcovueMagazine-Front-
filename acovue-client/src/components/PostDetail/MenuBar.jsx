import {
  Bold,
  Code2,
  Highlighter,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Minus,
  Palette,
  Plus,
  Quote,
  Redo2,
  Strikethrough,
  Table2,
  Undo2,
} from "lucide-react";
import { useState } from "react";

const iconSize = 17;
const textColorPalette = ["#111827", "#6B7280", "#EF4444", "#F97316", "#EAB308", "#22C55E", "#14B8A6", "#3B82F6", "#8B5CF6", "#EC4899"];
const highlightColorPalette = ["#FEF08A", "#FECACA", "#FED7AA", "#BBF7D0", "#BFDBFE"];

export const MenuBar = ({ editor, onImageUpload }) => {
  const [openPalette, setOpenPalette] = useState(null);

  if (!editor) {
    return null;
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    onImageUpload(file);
    event.target.value = "";
  };

  const handleHeadingChange = (event) => {
    const level = Number(event.target.value);
    const chain = editor.chain().focus();

    if (level) {
      chain.toggleHeading({ level }).run();
      return;
    }

    chain.setParagraph().run();
  };

  const applyColor = (color) => {
    editor.chain().focus().setColor(color).run();
    setOpenPalette(null);
  };

  const applyHighlight = (color) => {
    editor.chain().focus().toggleHighlight({ color }).run();
    setOpenPalette(null);
  };

  return (
    <div className="control-group" aria-label="글 편집 도구">
      <div className="button-group">
        <div className="toolbar-group">
          <button type="button" title="실행 취소" aria-label="실행 취소" onClick={() => editor.chain().focus().undo().run()}>
            <Undo2 size={iconSize} />
          </button>
          <button type="button" title="다시 실행" aria-label="다시 실행" onClick={() => editor.chain().focus().redo().run()}>
            <Redo2 size={iconSize} />
          </button>
        </div>

        <span className="toolbar-divider" />

        <div className="toolbar-group">
          <select title="문단 스타일" aria-label="문단 스타일" defaultValue="" onChange={handleHeadingChange}>
            <option value="">본문</option>
            <option value="1">제목 1</option>
            <option value="2">제목 2</option>
            <option value="3">제목 3</option>
          </select>
        </div>

        <span className="toolbar-divider" />

        <div className="toolbar-group">
          <button type="button" title="굵게" aria-label="굵게" onClick={() => editor.chain().focus().toggleBold().run()}>
            <Bold size={iconSize} />
          </button>
          <button type="button" title="기울임" aria-label="기울임" onClick={() => editor.chain().focus().toggleItalic().run()}>
            <Italic size={iconSize} />
          </button>
          <button type="button" title="취소선" aria-label="취소선" onClick={() => editor.chain().focus().toggleStrike().run()}>
            <Strikethrough size={iconSize} />
          </button>
        </div>

        <span className="toolbar-divider" />

        <div className="toolbar-group">
          <button type="button" title="글머리 목록" aria-label="글머리 목록" onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <List size={iconSize} />
          </button>
          <button type="button" title="번호 목록" aria-label="번호 목록" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
            <ListOrdered size={iconSize} />
          </button>
          <button type="button" title="인용구" aria-label="인용구" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <Quote size={iconSize} />
          </button>
          <button type="button" title="코드 블록" aria-label="코드 블록" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
            <Code2 size={iconSize} />
          </button>
          <button type="button" title="가로줄" aria-label="가로줄" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Minus size={iconSize} />
          </button>
        </div>

        <span className="toolbar-divider" />

        <div className="toolbar-group">
          <div className="toolbar-palette-control">
            <button
              type="button"
              title="글자 색상"
              aria-label="글자 색상"
              aria-expanded={openPalette === "text"}
              onClick={() => setOpenPalette(openPalette === "text" ? null : "text")}
            >
              <Palette size={iconSize} />
            </button>
            {openPalette === "text" && (
              <div className="toolbar-palette" role="dialog" aria-label="글자 색상 선택">
                <div className="toolbar-swatch-list">
                  {textColorPalette.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className="toolbar-swatch"
                      style={{ backgroundColor: color }}
                      title={color}
                      aria-label={`${color} 글자 색상 적용`}
                      onClick={() => applyColor(color)}
                    />
                  ))}
                </div>
                <label className="toolbar-custom-color">
                  <Plus size={15} /> 사용자 색상
                  <input type="color" onChange={(event) => applyColor(event.target.value)} />
                </label>
                <button type="button" className="toolbar-palette-reset" onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setOpenPalette(null);
                }}>
                  색상 지우기
                </button>
              </div>
            )}
          </div>

          <div className="toolbar-palette-control">
            <button
              type="button"
              title="하이라이트 색상"
              aria-label="하이라이트 색상"
              aria-expanded={openPalette === "highlight"}
              onClick={() => setOpenPalette(openPalette === "highlight" ? null : "highlight")}
            >
              <Highlighter size={iconSize} />
            </button>
            {openPalette === "highlight" && (
              <div className="toolbar-palette" role="dialog" aria-label="하이라이트 색상 선택">
                <div className="toolbar-swatch-list">
                  {highlightColorPalette.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className="toolbar-swatch"
                      style={{ backgroundColor: color }}
                      title={color}
                      aria-label={`${color} 하이라이트 적용`}
                      onClick={() => applyHighlight(color)}
                    />
                  ))}
                </div>
                <label className="toolbar-custom-color">
                  <Plus size={15} /> 사용자 색상
                  <input type="color" onChange={(event) => applyHighlight(event.target.value)} />
                </label>
                <button type="button" className="toolbar-palette-reset" onClick={() => {
                  editor.chain().focus().unsetHighlight().run();
                  setOpenPalette(null);
                }}>
                  하이라이트 지우기
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            title="표 삽입"
            aria-label="표 삽입"
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          >
            <Table2 size={iconSize} />
          </button>
          <label className="toolbar-image-button" title="이미지 추가" aria-label="이미지 추가">
            <ImagePlus size={iconSize} />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>
      </div>
    </div>
  );
};
