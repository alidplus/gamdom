import { isServer } from "@tanstack/react-query";

export const getApiBase = () => {
  const origin = isServer ? "http://nginx" : window.location.origin;

  return origin + "/api";
};
