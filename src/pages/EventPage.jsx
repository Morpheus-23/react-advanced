import React from "react";
import {
  Button,
  Text,
  VStack,
  Box,
  Flex,
  Image,
  Center,
  HStack,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { DeleteEventModal } from "../components/DeleteEventModal";
import { EditEventModal } from "../components/EditEventModal";
import { useState } from "react";
import moment from "moment";

const formatEventDate = (date) => {
  return moment(date).format("lll");
};

const filterCategories = (categories, eventCategoryIds) => {
  const filtered = categories.filter((category) => {
    return eventCategoryIds.indexOf(Number(category.id)) >= 0;
  });
  return filtered;
};

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
    <Center>
      <Box
        align="center"
        justify="center"
        maxWidth="60%"
        maxHeight="100%"
        overflow="hidden"
      >
        <HStack mb={5}>
          <Box align="left">
            <Link to={`/`}>
              <Button color="white" colorScheme="blue">
                Back
              </Button>
            </Link>
          </Box>
          <Box width="100%" align="center" justify="center">
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
        </HStack>
        <Image
          src={event.image}
          borderRadius={"lg"}
          boxSize={"100%"}
          objectFit={"cover"}
          objectPosition={"center"}
        />
        <Text fontSize="xl" mt="3" fontWeight="semibold" align="center">
          {event.title}
        </Text>
        <Text fontWeight="semibold" mt="3" align="center">
          {event.description}
        </Text>

        <Flex direction="row" justify="center" flexWrap="wrap" mt={3}>
          <Text>Start time :</Text>
          <Text fontWeight="semibold" ml={3}>
            {formatEventDate(event.startTime)}
          </Text>
        </Flex>
        <Flex direction="row" justify="center" flexWrap="wrap" mt={3}>
          <Text>End time :</Text>
          <Text fontWeight="semibold" ml={3}>
            {formatEventDate(event.endTime)}
          </Text>
        </Flex>

        <Flex direction="row" justify="center" flexWrap="wrap" mt={3}>
          <Text>Categories :</Text>
          {filterCategories(categories, event.categoryIds).map((cat) => (
            <Text
              fontWeight="semibold"
              textTransform="capitalize"
              ml={3}
              key={cat.id}
            >
              {cat.name}
            </Text>
          ))}
        </Flex>

        <Center mt={3}>
          <Text mr={3}>Created by:</Text>
          {users
            .filter((user) => user.id == currentEvent.createdBy)
            .map((user) => (
              <VStack key={user.id}>
                <Image
                  borderRadius={"lg"}
                  key={() => user.name + user.id}
                  src={user.image}
                  alt={user.name}
                  boxSize={"80px"}
                  objectFit={"cover"}
                  position={"relative"}
                ></Image>
                <Text key={user.id} fontWeight={"semibold"}>
                  {user.name}
                </Text>
              </VStack>
            ))}
        </Center>

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
    </Center>
  );
};
