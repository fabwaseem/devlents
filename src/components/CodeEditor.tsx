"use client";
import React, { useEffect, useRef, useState } from "react";
import "allotment/dist/style.css";
import Editor from "@monaco-editor/react";
import { Icons } from "./Icons";
import type monaco from "monaco-editor";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";
import { CheckCircle, Copy } from "lucide-react";

interface CodeEditorProps {
  code: {
    html?: string | null;
    css?: string | null;
  };
  onChange?: ({ language, value }: { language: string; value: string }) => void;
}

const CodeEditor = ({ code, onChange }: CodeEditorProps) => {
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
  ];

  const files = [
    {
      name: "index.html",
      language: "html",
      value: code.html ?? "",
    },
    {
      name: "style.css",
      language: "css",
      value: code.css ?? "",
    },
  ];
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const [state, setState] = useState({
    html: code.html ?? "",
    css: code.css ?? "",
  });

  useEffect(() => {
    // check if code.html and code.css are empty
    if (code.html === "" && code.css === "") {
      setState({
        html: "",
        css: "",
      });
    }
  }, [code]);
  const [copied, setCopied] = useState(false);

  const [currentTab, setCurrentTab] = useState(0);
  const [file, setFile] = useState<{
    name: string;
    language: string;
    value: string;
  } | null>(null);

  const handleOnChange = ({
    language,
    value,
  }: {
    language: string;
    value: string;
  }) => {
    setState((prev) => ({ ...prev, [language]: value }));
    setCopied(false);
    onChange && onChange({ language, value });
  };

  useEffect(() => {
    setFile(files[currentTab] ?? null);
  }, [currentTab]);
  useEffect(() => {
    editorRef.current?.focus();
    setCopied(false);
  }, [file?.name]);

  const { theme } = useTheme();

  const handleCopy = async () => {
    const code = state[file?.language as "html" | "css"];
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(code);
    } else {
      document.execCommand("copy", true, code);
    }
    setCopied(true);
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="bg-dark-500 flex items-center px-4 pt-2 ">
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

      <div className="group relative h-full w-full">
        <Editor
          path={file?.name}
          defaultLanguage={file?.language}
          value={state[file?.language as "html" | "css"]}
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
        {/* copy button if there is code*/}
        {state[file?.language as "html" | "css"]?.length > 0 && (
          <Button
            variant={"icon"}
            size={"icon"}
            className="absolute right-5 top-5 border opacity-0 transition-opacity group-hover:opacity-100"
            onClick={handleCopy}
          >
            {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
