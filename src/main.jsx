import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage,eventLoader as EventLoader } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import {
  AddEventPage,
  loader as AddEventLoader,
} from "./pages/AddEventPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: EventLoader,
      },
      {
        path: "/event/add",
        element: <AddEventPage />,
        loader: AddEventLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
