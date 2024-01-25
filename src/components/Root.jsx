import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { AppTitleBanner } from "./AppTitleBanner";

export const Root = () => {
  return (
    <Box>
      <AppTitleBanner />
      <Navigation />
      <Outlet />
    </Box>
  );
};
