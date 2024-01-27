import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  Input,
  Select,
  VStack,
  Stack,
  Textarea,
  Box,
  useToast,
} from "@chakra-ui/react";

export const loader = async () => {
  const categories = await fetch("http://localhost:3000/categories");
  if (!categories.ok) {
    throw new Error(
      `Error while retrieving the categories: ${categories.status} ${categories.statusText}`
    );
  }
  const users = await fetch("http://localhost:3000/users");
  if (!users.ok) {
    throw new Error(
      `Error while retrieving the users: ${users.status} ${users.statusText}`
    );
  }
  return {
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const AddEventPage = () => {
  const { categories, users } = useLoaderData();

  const navigate = useNavigate();
  const toast = useToast();
  const toastId = "addevent-tosti";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [userId, setUserId] = useState("");

  const [loading, setLoading] = useState(false);
  const [keyForm, setKeyForm] = useState(0);

  const getCurrentDateTime = () => {
    let date = new Date();
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const convertLocalToUTC = (localDateString) => {
    let date = new Date(localDateString);
    return new Date(date.getTime()).toISOString();
  };

  const handleCheckBox = (event) => {
    if (event.target.checked) {
      setCategoryIds([...categoryIds, Number(event.target.id)]);
    } else {
      setCategoryIds(categoryIds.filter((id) => id != event.target.id));
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const addEvent = async (event) => {
    event.preventDefault();
    if (categoryIds.length < 1) {
      window.alert("Select at least one category");
      return;
    }

    setLoading(true);
    const startDateTimeUTC = convertLocalToUTC(startDateTime);
    const endDateTimeUTC = convertLocalToUTC(endDateTime);
    const newEvent = {
      createdBy: userId,
      title: title,
      description: description,
      image: image,
      categoryIds: categoryIds,
      location: location,
      startTime: startDateTimeUTC,
      endTime: endDateTimeUTC,
    };

    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);
    if (response.ok) {
      toast({
        toastId,
        title: "Added successfully",
        description: "Event added",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      const newEventId = (await response.json()).id;
      navigate(`/event/${newEventId}`);
    } else {
      console.error(`Error updating event: ${response.statusText}`);
      toast({
        toastId,
        title: "Error",
        description: "Event not added.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Center
        color="blue.600"
        fontSize={"3xl"}
        fontWeight={"medium"}
        pt={1}
        pb={2}
      >
        Add event
      </Center>

      <form id="form-add-event" key={keyForm} onSubmit={addEvent}>
        <VStack justify="center" align="center">
          <Flex direction="column">
            <FormControl isRequired mb="5">
              <FormLabel>Event title</FormLabel>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                variant="filled"
                textColor={"black"}
              />
            </FormControl>
            <FormControl isRequired mb="5">
              <FormLabel>Description</FormLabel>
              <Textarea
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                variant="filled"
              />
            </FormControl>
            <FormControl isRequired mb="5">
              <FormLabel>Image URL</FormLabel>
              <Input
                onChange={(e) => setImage(e.target.value)}
                required
                rows={1}
                variant="filled"
              />
            </FormControl>
            <FormControl isRequired mb="5">
              <FormLabel>Location</FormLabel>
              <Input
                onChange={(e) => setLocation(e.target.value)}
                required
                rows={1}
                variant="filled"
              ></Input>
            </FormControl>
            <FormControl isRequired mb="5">
              <FormLabel>Start date & time</FormLabel>
              <Input
                type="datetime-local"
                required
                size="md"
                onChange={(e) => setStartDateTime(e.target.value)}
                min={getCurrentDateTime()}
                variant="filled"
              />
            </FormControl>
            <FormControl isRequired mb="5">
              <FormLabel>Start date & time</FormLabel>
              <Input
                type="datetime-local"
                required
                size="md"
                onChange={(e) => setEndDateTime(e.target.value)}
                min={getCurrentDateTime()}
                variant="filled"
              />
            </FormControl>
            <Flex direction="column" mb={5}>
              <Box>Select categories</Box>
              <CheckboxGroup colorScheme="blue" isRequired>
                <Stack spacing={7} direction={"row"} ml={2}>
                  {categories.map((category) => (
                    <Checkbox
                      key={category.id}
                      textTransform="capitalize"
                      ml={5}
                      textColor={"gray.700"}
                      onChange={handleCheckBox}
                      name={category.name}
                      id={category.id}
                      value={category.name}
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </Flex>
            <Flex direction="column" mb={5}>
              <Box>Select user</Box>
              <Select
                variant="filled"
                onChange={(e) => setUserId(Number(e.target.value))}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>

          <Center>
            <Button
              type="submit"
              id="form-add-event"
              mt={10}
              mb={5}
              color="white"
              colorScheme="blue"
              isLoading={loading}
            >
              Submit
            </Button>

            <Button
              type="button"
              form="form-add-event"
              onClick={handleCancel}
              mt={10}
              mb={5}
              ml={5}
              color="white"
              colorScheme="blue"
              isLoading={loading}
            >
              Cancel
            </Button>
          </Center>
        </VStack>
      </form>
    </>
  );
};
