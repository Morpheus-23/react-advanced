import React, { useEffect, useState } from "react";
import { Text, Input, Flex, Box } from "@chakra-ui/react";
import { EventList } from "../components/EventList";

//fetch from server - use query??????????
//display events
//make clickable
//add event page or modal
//add event to server
//search - done
//filter

export const EventsPage = () => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3000/events");
      const events = await response.json();
      console.log("fetching :" + events);
      setEventsList(events);
    }
    fetchData();
  }, []);

  const [searchField, setSearchField] = useState("");

  const matchedEvents = eventsList.filter((event) => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <>
      <Box align="center">
        <Flex justify="center" align="center">
          <Text pr="3">Search for events:</Text>
          <Input variant="filled" onChange={handleChange} w={400} />
        </Flex>
        <EventList events={matchedEvents} />
      </Box>
    </>
  );
};
