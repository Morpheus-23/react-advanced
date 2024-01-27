import React from "react";
import { Button, VStack, Text, Flex, Box } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { DeleteEventModal } from "../components/DeleteEventModal";
import { EditEventModal } from "../components/EditEventModal";
import { useState } from "react";

export const eventLoader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  if (!event.ok) {
    throw new Error(`Error fetching event id ${params.eventId}`);
  }
  const categories = await fetch("http://localhost:3000/categories");
  if (!categories.ok) {
    throw new Error("Error while fetching categories.");
  }
  const users = await fetch("http://localhost:3000/users");
  if (!users.ok) {
    throw new Error("Error while fetching users.");
  }
  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  const [alertDeleteOpen, setAlertDeleteOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(event);

  return (
    <Box>
      <Link to={`/`}>
        <Button color="white" colorScheme="blue">
          Back
        </Button>
      </Link>

      <Box align="center" justify="center" mb="10">
        <Button
          color="white"
          colorScheme="blue"
          onClick={() => setModalEditOpen(true)}
        >
          Edit
        </Button>

        <Button
          ml="5"
          color="white"
          colorScheme="blue"
          onClick={() => setAlertDeleteOpen(true)}
        >
          Delete
        </Button>
      </Box>

      <VStack>
        <Text>{event.title}</Text>
      </VStack>
      <EditEventModal
          isOpen={modalEditOpen}
          onClose={() => {
            setModalEditOpen(false);
          }}
          mainEvent={event}
          setMainEvent={setCurrentEvent}
          categories={categories}
        />
      <DeleteEventModal
        isOpen={alertDeleteOpen}
        onClose={() => {
          setAlertDeleteOpen(false);
        }}
        event={event}
      />
    </Box>
  );
};
