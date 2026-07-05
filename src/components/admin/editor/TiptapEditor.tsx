"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Youtube from "@tiptap/extension-youtube";
import { Placeholder, CharacterCount } from "@tiptap/extensions";
import { createLowlight, common } from "lowlight";
import { useCallback, useEffect, useRef } from "react";

const lowlight = createLowlight(common);

type TiptapEditorProps = {
  content?: object | null;
  onChange?: (json: object, html: string) => void;
  placeholder?: string;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`ed-btn${active ? " ed-btn-active" : ""}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("Image URL");
    if (!url) return;
    const alt = window.prompt("Alt text (for SEO & accessibility)") || "";
    editor.chain().focus().setImage({ src: url, alt }).run();
  }, [editor]);

  const addVideo = useCallback(() => {
    const url = window.prompt("YouTube URL");
    if (!url) return;
    editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }, [editor]);

  return (
    <div className="ed-toolbar">
      <div className="ed-group">
        <select
          className="ed-select"
          value={
            editor.isActive("heading", { level: 1 }) ? "h1" :
            editor.isActive("heading", { level: 2 }) ? "h2" :
            editor.isActive("heading", { level: 3 }) ? "h3" :
            editor.isActive("heading", { level: 4 }) ? "h4" :
            editor.isActive("heading", { level: 5 }) ? "h5" :
            editor.isActive("heading", { level: 6 }) ? "h6" :
            "p"
          }
          onChange={(e) => {
            const v = e.target.value;
            if (v === "p") editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: parseInt(v[1], 10) as 1 | 2 | 3 | 4 | 5 | 6 }).run();
          }}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>
      </div>

      <div className="ed-group">
        <ToolbarButton title="Bold (⌘B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><b>B</b></ToolbarButton>
        <ToolbarButton title="Italic (⌘I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><i>I</i></ToolbarButton>
        <ToolbarButton title="Underline (⌘U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><u>U</u></ToolbarButton>
        <ToolbarButton title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><s>S</s></ToolbarButton>
        <ToolbarButton title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>{"</>"}</ToolbarButton>
      </div>

      <div className="ed-group">
        <ToolbarButton title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
        <ToolbarButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>
        <ToolbarButton title="Task list" active={editor.isActive("taskList")} onClick={() => editor.chain().focus().toggleTaskList().run()}>☑ Tasks</ToolbarButton>
        <ToolbarButton title="Blockquote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>❝ Quote</ToolbarButton>
        <ToolbarButton title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>{"{ }"}</ToolbarButton>
      </div>

      <div className="ed-group">
        <ToolbarButton title="Link" active={editor.isActive("link")} onClick={setLink}>🔗</ToolbarButton>
        <ToolbarButton title="Image" onClick={addImage}>🖼</ToolbarButton>
        <ToolbarButton title="YouTube video" onClick={addVideo}>▶</ToolbarButton>
        <ToolbarButton title="Table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>⊞ Table</ToolbarButton>
        <ToolbarButton title="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>—</ToolbarButton>
      </div>

      {editor.isActive("table") && (
        <div className="ed-group">
          <ToolbarButton title="Add row" onClick={() => editor.chain().focus().addRowAfter().run()}>+Row</ToolbarButton>
          <ToolbarButton title="Add column" onClick={() => editor.chain().focus().addColumnAfter().run()}>+Col</ToolbarButton>
          <ToolbarButton title="Delete row" onClick={() => editor.chain().focus().deleteRow().run()}>−Row</ToolbarButton>
          <ToolbarButton title="Delete column" onClick={() => editor.chain().focus().deleteColumn().run()}>−Col</ToolbarButton>
          <ToolbarButton title="Delete table" onClick={() => editor.chain().focus().deleteTable().run()}>✕ Table</ToolbarButton>
        </div>
      )}

      <div className="ed-group">
        <ToolbarButton title="Undo (⌘Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>↩</ToolbarButton>
        <ToolbarButton title="Redo (⌘⇧Z)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>↪</ToolbarButton>
      </div>
    </div>
  );
}

export default function TiptapEditor({ content, onChange, placeholder }: TiptapEditorProps) {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false, // replaced by CodeBlockLowlight
        link: { openOnClick: false },
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Image.configure({ inline: false, allowBase64: false }),
      TableKit.configure({ table: { resizable: true } }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Youtube.configure({ width: 640, height: 360 }),
      Placeholder.configure({ placeholder: placeholder || "Start writing your article…" }),
      CharacterCount,
    ],
    content: content || undefined,
    editorProps: {
      attributes: {
        class: "ed-content",
      },
      handleDrop(view, event, _slice, moved) {
        // Drag-and-drop image files → insert as base64 for now (media library upload comes via toolbar)
        if (moved || !event.dataTransfer?.files?.length) return false;
        const file = event.dataTransfer.files[0];
        if (!file.type.startsWith("image/")) return false;
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = () => {
          const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
          const node = view.state.schema.nodes.image.create({ src: reader.result as string });
          const tr = view.state.tr.insert(coords?.pos ?? view.state.selection.from, node);
          view.dispatch(tr);
        };
        reader.readAsDataURL(file);
        return true;
      },
    },
    onUpdate({ editor }) {
      onChangeRef.current?.(editor.getJSON(), editor.getHTML());
    },
  });

  // Keep editor content in sync when an external load happens (e.g. fetch completes)
  const loadedRef = useRef(false);
  useEffect(() => {
    if (editor && content && !loadedRef.current) {
      loadedRef.current = true;
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return <div className="ed-shell"><div className="ed-loading">Loading editor…</div></div>;
  }

  return (
    <div className="ed-shell">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <div className="ed-statusbar">
        {editor.storage.characterCount.words()} words · {editor.storage.characterCount.characters()} characters
      </div>
    </div>
  );
}
