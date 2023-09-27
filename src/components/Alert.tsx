import { memo } from "react";
import { Icon } from "./Icon";
import ErrorIcon from "@/assets/images/errorIcon.svg?react";
import NotFoundIcon from "@/assets/images/questionIcon.svg?react";
import LoadingIcon from "@/assets/images/loadingIcon.svg?react";
import { mergeClassesUtils } from "@/utils/mergeClassesUtils";

enum AlertVariants {
  Error,
  Loading,
  NotFound,
}

interface AlertProps {
  type: AlertVariants;
}

const alertConfig = {
  [AlertVariants.Error]: {
    text: "Oops, something went wrong",
    icon: ErrorIcon,
    additionClass: "bg-rose",
    isRotating: false,
  },
  [AlertVariants.Loading]: {
    text: "Loading Page",
    icon: LoadingIcon,
    additionClass: "bg-green",
    isRotating: true,
  },
  [AlertVariants.NotFound]: {
    text: "Not found",
    icon: NotFoundIcon,
    additionClass: "bg-yellow",
    isRotating: false,
  },
};

const Alert = memo(({ type }: AlertProps) => {
  const config = alertConfig[type];

  if (!config) return null;

  const { text, icon, additionClass, isRotating } = config;

  return (
    <div className="flex grow flex-col items-center justify-center gap-2.5 text-xl font-semibold">
      <div
        className={mergeClassesUtils(
          "flex h-[70px] w-[70px] flex-col items-center justify-center rounded-full border border-black",
          additionClass,
        )}
      >
        <Icon Svg={icon} className={mergeClassesUtils("h-8 w-8", isRotating && "animate-spin")} />
      </div>
      <div>{text}</div>
    </div>
  );
});

export { Alert, AlertVariants as alertVariants };
