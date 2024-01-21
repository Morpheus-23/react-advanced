import { useContext } from "react";
import { Image, Text, Box, Flex } from "@chakra-ui/react";
import moment from "moment";
import { CategoryContext } from "../Contexts";

const formatEventDate = (date) => {
  return moment(date).format("lll");
};

export const EventItem = ({ event, clickFn }) => {
  const categories = useContext(CategoryContext);
  // console.log("categories from context in item:" + categories);

  const filterCategories = (categories, eventCategoryIds) => {
    const filtered = categories.filter((category) => {
      console.log(categories);
      console.log(eventCategoryIds);
      return eventCategoryIds.indexOf(Number(category.id)) >= 0;
    });
    console.log(filtered);
    return filtered;
  };

  return (
    <Box
      onClick={() => clickFn(event)}
      align="center"
      bg={"gray.100"}
      borderRadius={"xl"}
      height="480px"
      overflow="hidden"
    >
      <Image src={event.image} w={"100%"} h={200} />

      <Text mt="3" fontWeight="semibold" align="center">
        {event.title}
      </Text>
      <Text mt="3" align="center">
        {event.description}
      </Text>

      <Flex direction="row" justify="center" flexWrap="wrap" mt={3}>
        <Text>Start time :</Text>
        <Text ml={3}>{formatEventDate(event.startTime)}</Text>
      </Flex>
      <Flex direction="row" justify="center" flexWrap="wrap" mt={3}>
        <Text>End time :</Text>
        <Text ml={3}>{formatEventDate(event.endTime)}</Text>
      </Flex>

      <Flex direction="row" justify="center" flexWrap="wrap" mt={3}>
        <Text>Categories :</Text>
        {filterCategories(categories, event.categoryIds).map((cat) => (
          <Text textTransform="capitalize" ml={3} key={cat.id}>
            {cat.name}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};
