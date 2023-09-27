import { FC, ButtonHTMLAttributes, SVGProps, forwardRef } from "react";
import { Icon as IconWrapper } from "./Icon";
import { mergeClassesUtils } from "@/utils/mergeClassesUtils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Svg: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(({ Svg, className, ...rest }, ref) => (
  <button
    ref={ref}
    className={mergeClassesUtils(
      `inline-flex h-[36px] w-[36px] items-center justify-center text-state-700 focus-visible:text-blue-900 disabled:cursor-not-allowed disabled:text-gray-700`,
      className,
    )}
    {...rest}
  >
    <IconWrapper Svg={Svg} />
  </button>
));
