import React from "react";
import { FaGithub } from "react-icons/fa";
import { BaseButton } from "./BaseButton";

export const GithubLinkButton: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ ...props }) => {
  const url = "https://github.com/mnsinri/vspo-stream-schedule";

  return (
    <BaseButton onClickHandler={() => window.open(url)} {...props}>
      <FaGithub />
    </BaseButton>
  );
};
