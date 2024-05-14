import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import cloudinary from "./cloudinary";
import streamifier from "streamifier";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface UrlQueryParams {
  params: string;
  key?: string;
  value?: string | null;
  keysToRemove?: string[];
}

export function formUrlQuery({
  params,
  key,
  value,
  keysToRemove,
}: UrlQueryParams) {
  const currentUrl = qs.parse(params);
  if (keysToRemove) {
    keysToRemove.forEach((keyToRemove) => {
      delete currentUrl[keyToRemove];
    });
  } else if (key && value) {
    currentUrl[key] = value;
  }
  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true },
  );
}

export const formatNumber = (number: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumSignificantDigits: 2,
  });

  return formatter.format(number);
};

export const handleDownload = ({
  html,
  css,
  filename,
}: {
  html?: string | null;
  css?: string | null;
  filename: string;
}) => {
  // wrap html with a basic html template and include css in a style tag
  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${filename}</title>
<link rel="stylesheet" href="styles.css" />
</head>
<body>
${html}
</body>
</html>`;
  const zip = new JSZip();
  zip.file("index.html", htmlTemplate);
  zip.file("styles.css", css ?? "");
  zip
    .generateAsync({ type: "blob" })
    .then((content) => {
      saveAs(content, `${filename}.zip`);
    })
    .catch((error) => {
      console.error(error);
    });
};

