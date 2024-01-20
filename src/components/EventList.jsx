import { EventItem } from "./EventItem";
import { Box, SimpleGrid } from "@chakra-ui/react";

export const EventList = ({ events, clickFn }) => {
  return (
    <Box margin={{ base: "1rem", md: "3rem auto" }} maxWidth={"90%"}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="40px">
        {events.map((event) => (
          <EventItem
            key={event.id}
            event={event}
            clickFn={clickFn}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};
