import React, { useEffect, useState } from "react";
import { CategoryContext } from "../Contexts";
import { Box, Flex, Text, Input, Checkbox, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { EventList } from "../components/EventList";
import { useDisclosure } from "@chakra-ui/react";

export const EventsPage = () => {
  const [eventsList, setEventsList] = useState([]);
  const [searchField, setSearchField] = useState("");

  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function fetchEvents() {
      const response = await fetch("http://localhost:3000/events");
      const events = await response.json();
      console.log("events:" + events.length);
      setEventsList(events);
    }
    async function fetchCategories() {
      const response = await fetch("http://localhost:3000/categories");
      const categories = await response.json();
      setCategories(categories);
      console.log(categories.find(({ id }) => Number(id) === 2).name);
    }
    fetchCategories();
    fetchEvents();
  }, []);

  const uniqueCategories = [
    ...new Set(eventsList.flatMap((obj) => obj.categoryIds)),
  ];

  const [selectedFilters, setSelectedFilters] = useState([]);

  const matchedEvents = eventsList.filter((event) => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });

  const filteredObjects = matchedEvents.filter((obj) =>
    selectedFilters.every((filter) => obj.categoryIds.includes(filter))
  );

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleFilterChange = (categoryId) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(categoryId)
        ? prevFilters.filter((filter) => filter !== categoryId)
        : [...prevFilters, categoryId]
    );
  };

  return (
    <Box align="center">
      <Flex mb={10} justify="center" align="center">
        <Text pr="3">Search for events :</Text>
        <Input variant="filled" onChange={handleSearchChange} w={400} />
      </Flex>
      <Flex mb="5" justify="center" align="center">
        <Text>Filter by category :</Text>
        <Flex direction="row">
          {uniqueCategories.map((categoryId) => (
            <Checkbox
              ml={5}
              textTransform="capitalize"
              key={categoryId}
              isChecked={selectedFilters.includes(categoryId)}
              onChange={() => handleFilterChange(categoryId)}
            >
              {categories.find(({ id }) => Number(id) === categoryId).name}
            </Checkbox>
          ))}
        </Flex>
      </Flex>
      <Box justify="right" align="right" maxWidth={"90%"}>
        <Link to={`/event/add`}>
          <Button color="white" colorScheme="blue">
            Add Event
          </Button>
        </Link>
      </Box>
      <CategoryContext.Provider value={categories}>
        <EventList events={filteredObjects} />
      </CategoryContext.Provider>
    </Box>
  );
};
