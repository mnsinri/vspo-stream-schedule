import React from "react";
import { Button } from "./styles";
import { useSettingInterface } from "src/hooks";

export const DisplayHistoryButton = () => {
  const { isDisplayHistory } = useSettingInterface();

  return (
    <Button
      state={isDisplayHistory.state}
      onClick={() => isDisplayHistory.onChange(!isDisplayHistory.state)}
    >
      <isDisplayHistory.icon size={24} />
    </Button>
  );
};
