import { memo, SVGProps } from "react";
import { mergeClassesUtils } from "@/utils/mergeClassesUtils";

interface LinkProps extends SVGProps<SVGSVGElement> {
  url: string;
  text: string;
  className?: string;
  disabled?: boolean;
}

export const Link = memo(({ url, text, className }: LinkProps) => {
  return (
    <a
      className={mergeClassesUtils(
        "font-medium text-blue-800 underline hover:text-blue-900 focus-visible:text-blue-900 active:text-blue-900",
        { disabled: "pointer-events-none text-state-800 no-underline" },
        className,
      )}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
});
