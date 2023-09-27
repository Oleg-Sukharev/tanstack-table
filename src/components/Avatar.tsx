import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { mergeClassesUtils } from "@/utils/mergeClassesUtils";
import { memo } from "react";

type AvatarProps = {
  url: string;
  className?: string;
  text?: string;
};

export const Avatar = memo(({ url, text, className }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root
      className={mergeClassesUtils(
        "relative inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-full shadow-sm after:absolute after:h-full after:w-full after:rounded-full after:border after:border-black after:border-opacity-30",
        className,
      )}
    >
      <AvatarPrimitive.Image src={url} alt="avatar" className="h-full w-full object-cover" />
      <AvatarPrimitive.Fallback
        className="flex h-full w-full items-center justify-center bg-state-900 text-sm font-medium uppercase text-gray-300"
        delayMs={500}
      >
        {text?.trim() ? text.slice(0, 2) : "AV"}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
});
