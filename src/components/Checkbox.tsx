import { forwardRef } from "react";
import { mergeClassesUtils } from "@/utils/mergeClassesUtils";

import { Checkbox, CheckboxIndicator } from "@radix-ui/react-checkbox";
import MarkIcon from "@/assets/images/markIcon.svg?react";
import { Icon } from "@/components/Icon";

const CheckboxItem = forwardRef<React.ElementRef<typeof Checkbox>, React.ComponentPropsWithoutRef<typeof Checkbox>>(
  ({ className, children, checked, ...props }, ref) => (
    <Checkbox
      className={mergeClassesUtils(
        "relative flex w-full cursor-default select-none items-center rounded-sm p-2 pr-8 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-blue-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ",
        className,
      )}
      {...props}
      ref={ref}
      checked={checked}
    >
      {children}
      <CheckboxIndicator className="absolute right-2 flex h-5 w-5 items-center justify-center">
        <Icon Svg={MarkIcon} className="fill-blue-900" />
      </CheckboxIndicator>
    </Checkbox>
  ),
);

export { CheckboxItem as Checkbox };
