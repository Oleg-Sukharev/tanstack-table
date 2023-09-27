import { memo, SVGProps, FC } from "react";
import { mergeClassesUtils } from "@/utils/mergeClassesUtils";

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  Svg: FC<SVGProps<SVGSVGElement>>;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, ...otherProps } = props;

  return (
    <Svg aria-hidden="true" focusable="false" className={mergeClassesUtils("h-5 w-5", className)} {...otherProps} />
  );
});
