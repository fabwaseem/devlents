import * as React from "react";

import { cn } from "@/lib/utils";

export interface TagsInputProps {
  label?: string;
  tags?: string[];
  onChange?: (tags: string[]) => void;
  minTags?: number;
  maxTags?: number;
  className?: string;
  id?: string;
}

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  ({ className, label, tags = [], onChange, maxTags = 5, ...props }, ref) => {
    const [currentTag, setCurrentTag] = React.useState("");
    const [allTags, setAllTags] = React.useState(tags);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTag(event.target.value);
    };

    const handleTagCreation = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
      if (
        (event.key === "Enter" || event.key === ",") &&
        currentTag.trim() &&
        !allTags.includes(currentTag.trim())
      ) {
        event.preventDefault();
        if (allTags.length < maxTags) {
          setAllTags([...allTags, currentTag.trim()]);
          setCurrentTag("");
          onChange?.([...allTags, currentTag.trim()]); // Call onChange with updated tags
        } else {
          console.log("Maximum number of tags reached.");
        }
      }
      if (event.key === "Backspace" && !currentTag.trim() && allTags.length) {
        const lastTag = allTags[allTags.length - 1];
        const otherTags = allTags.slice(0, -1);
        setAllTags([...otherTags]);
        setCurrentTag("" + lastTag);
        onChange?.([...(allTags.pop() ?? [])]); // Call onChange with updated tags
      }
    };

    const handleTagRemoval = (tagToRemove: string) => {
      setAllTags(allTags.filter((tag) => tag !== tagToRemove));
      onChange?.(allTags.filter((tag) => tag !== tagToRemove)); // Call onChange with filtered tags
    };

    const renderTags = () => {
      return allTags.map((tag) => (
        <span
          key={tag}
          className="inline-block cursor-pointer rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700"
          onMouseDown={() => handleTagRemoval(tag)}
        >
          {tag}
        </span>
      ));
    };

    return (
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white"
          >
            {label}
          </label>
        )}
        <div className="focus-within:ring-ring  w-full  transition-colors relative mb-1.5 flex flex-wrap gap-1 rounded-[25px]  border border-borderColour bg-white px-5 py-3 text-sm text-paragraph-light shadow-sm duration-300 focus-within:border-primary focus-within:ring-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-borderColour-dark dark:bg-dark-200">
          {renderTags()}
          <input
            {...props}
            ref={ref}
            className={cn("bg-transparent outline-none ", className)}
            type={"text"}
            value={currentTag}
            onChange={handleInputChange}
            onKeyDown={handleTagCreation}
            placeholder="Enter a tag..."
          />
        </div>
      </div>
    );
  },
);

TagsInput.displayName = "TagsInput";

export { TagsInput };
