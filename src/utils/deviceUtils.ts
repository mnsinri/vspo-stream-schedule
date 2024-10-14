/// <reference types="user-agent-data-types" />

export const checkMobile = (): boolean => {
  if (navigator.userAgentData) {
    return navigator.userAgentData.mobile;
  } else {
    return (
      /android|ipod|ipad|iphone/.test(navigator.userAgent.toLowerCase()) &&
      "ontouchend" in document
    );
  }
};
