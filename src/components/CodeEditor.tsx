"use client";
import React, { useEffect, useRef, useState } from "react";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Editor from "@monaco-editor/react";
import { Icons } from "./Icons";
import type monaco from "monaco-editor";
import { useTheme } from "next-themes";
import parse from "html-react-parser";
import ReactShadowRoot from "react-shadow-root";

interface CodeEditorProps {
  code: {
    html?: string;
    css?: string;
  };
  onChange: ({ language, value }: { language: string; value: string }) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
  const [currentTab, setCurrentTab] = useState(0);
  const handleOnChange = ({
    language,
    value,
  }: {
    language: string;
    value: string;
  }) => {
    onChange({ language, value });
  };

  const tabs = [
    {
      value: "html",
      label: "HTML",
      icon: Icons.html,
    },
    {
      value: "css",
      label: "CSS",
      icon: Icons.css,
    },
    // {
    //   value: "js",
    //   label: "JS",
    //   icon: Icons.css,
    // },
  ];

  const files = [
    {
      name: "index.html",
      language: "html",
      value: code.html,
    },
    {
      name: "style.css",
      language: "css",
      value: code.css,
    },
    // {
    //   name: "script.js",
    //   language: "javascript",
    //   value: codeState.javascript,
    // },
  ];

  const file = files[currentTab];

  useEffect(() => {
    editorRef.current?.focus();
  }, [file?.name]);

  const { theme } = useTheme();

  return (
    <div className="min-h-[500px] flex-1 overflow-hidden rounded-xl border dark:border-gray">
      <Allotment>
        <Allotment.Pane minSize={300}>
          <div className="h-full">
            <div className="bg-dark-500 flex items-center px-4 pt-2">
              {tabs.map((item, index) => (
                <button
                  key={index}
                  className={`flex w-full max-w-[170px] items-center gap-2 rounded-lg rounded-b-none  px-4 py-2 pl-3 font-sans text-base font-semibold transition-colors  ${currentTab === index ? "bg-dark-200 text-white" : "bg-gray hover:bg-gray-100 dark:bg-dark"}`}
                  onClick={() => setCurrentTab(index)}
                >
                  <item.icon />
                  {item.label}
                </button>
              ))}
            </div>

            <Editor
              path={file?.name}
              defaultLanguage={file?.language}
              defaultValue={file?.value}
              className="py-2"
              theme={theme === "dark" ? "vs-dark" : "vs"}
              onMount={(editor) => (editorRef.current = editor)}
              onChange={(value) => {
                file &&
                  handleOnChange({
                    language: file?.language,
                    value: "" + value,
                  });
              }}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
            />
          </div>
        </Allotment.Pane>
        <Allotment.Pane minSize={300}>
          <div className="relative z-[1] flex h-full w-full  items-center  justify-center bg-gray dark:bg-dark-200">
            <ReactShadowRoot>
              <style>{code.css}</style>
              {parse(code.html + "")}
            </ReactShadowRoot>
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default CodeEditor;
