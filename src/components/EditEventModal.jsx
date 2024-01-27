import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

export const EditEventModal = ({
  isOpen,
  onClose,
  mainEvent,
  setMainEvent,
  categories,
}) => {
  const toast = useToast();
  const toastId = "edit-event-toast";

  const [title, setTitle] = useState(mainEvent.title);
  const [description, setDescription] = useState(mainEvent.description);
  const [imageUrl, setImageUrl] = useState(mainEvent.image);
  const [categoryIds, setCategoryIds] = useState(mainEvent.categoryIds);
  const [location, setLocation] = useState(mainEvent.location);
  const [startDateTime, setStartDateTime] = useState(mainEvent.startTime);
  const [endDateTime, setEndDateTime] = useState(mainEvent.endTime);
  const [loading, setLoading] = useState(false);

  const convertUTCToLocal = (utcDateString) => {
    if (utcDateString === "") {
      return (utcDateString = "0001-01-01T00:00:00.000Z");
    }
    let date = new Date(utcDateString);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  const convertLocalToUTC = (localDateString) => {
    let date = new Date(localDateString);
    return new Date(date.getTime()).toISOString();
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setCategoryIds([...categoryIds, Number(e.target.id)]);
    } else {
      setCategoryIds(categoryIds.filter((id) => id != e.target.id));
    }
  };

  const handleCancel = () => {
    setTitle(mainEvent.title);
    setDescription(mainEvent.description);
    setImageUrl(mainEvent.image);
    setCategoryIds(mainEvent.categoryIds);
    setLocation(mainEvent.location);
    setStartDateTime(mainEvent.startTime);
    setEndDateTime(mainEvent.endTime);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryIds.length < 1) {
      window.alert("Please select at least one category");
      return;
    }
    if (endDateTime <= startDateTime) {
      window.alert("The end date/time must be after the start date/time !");
      return;
    }

    setLoading(true);
    const startDateTimeUTC = convertLocalToUTC(startDateTime);
    const endDateTimeUTC = convertLocalToUTC(endDateTime);
    const eventData = {
      id: mainEvent.id,
      createdBy: mainEvent.createdBy,
      title: title,
      description: description,
      image: imageUrl,
      categoryIds: categoryIds,
      location: location,
      startTime: startDateTimeUTC,
      endTime: endDateTimeUTC,
    };

    const response = await fetch(
      `http://localhost:3000/events/${mainEvent.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      }
    );

    setLoading(false);
    if (response.ok) {
      setMainEvent(eventData);
      onClose();
      toast({
        toastId,
        title: "Update successful",
        description: "the event has been successfully updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      console.error(`Error updating event: ${response.statusText}`);
      onClose();
      toast({
        toastId,
        title: "Update failed",
        description: "An error occurred during the update",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent backgroundColor={"grey.50"}>
          <ModalHeader
            align={"center"}
            fontSize="xl"
            fontWeight="medium"
            color="blue.600"
          >
            Edit Event
          </ModalHeader>

          <ModalBody>
            <form id="form-edit-event" onSubmit={handleSubmit}>
              <FormControl isRequired mb="5">
                <FormLabel>Event title</FormLabel>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  variant="filled"
                  textColor={"black"}
                  value={title}
                />
              </FormControl>

              <FormControl isRequired mb="5">
                <FormLabel>Description</FormLabel>
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  required
                  variant="filled"
                  value={description}
                />
              </FormControl>

              <FormControl isRequired mb="5">
                <FormLabel>Image URL</FormLabel>
                <Input
                  onChange={(e) => setImage(e.target.value)}
                  required
                  rows={1}
                  variant="filled"
                  value={imageUrl}
                />
              </FormControl>

              <FormControl isRequired mb="5">
                <FormLabel>Location</FormLabel>
                <Input
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  rows={1}
                  variant="filled"
                  value={location}
                ></Input>
              </FormControl>
              <FormControl isRequired mb="5">
                <FormLabel>Start date & time</FormLabel>
                <Input
                  type="datetime-local"
                  required
                  size="md"
                  onChange={(e) => setStartDateTime(e.target.value)}
                  variant="filled"
                  value={convertUTCToLocal(startDateTime)}
                />
              </FormControl>
              <FormControl isRequired mb="5">
                <FormLabel>Start date & time</FormLabel>
                <Input
                  type="datetime-local"
                  required
                  size="md"
                  onChange={(e) => setEndDateTime(e.target.value)}
                  variant="filled"
                  value={convertUTCToLocal(endDateTime)}
                />
              </FormControl>

              <FormLabel ml={1}>Categories:</FormLabel>
              <Stack spacing={7} direction={"row"}>
                {categories.map((category) => (
                  <Checkbox
                    textTransform="capitalize"
                    key={category.id}
                    textColor={"gray.900"}
                    onChange={(e) => handleCheckBox(e)}
                    name={category.name}
                    id={category.id}
                    value={category.name}
                    isChecked={categoryIds.includes(Number(category.id))}
                  >
                    {category.id}
                  </Checkbox>
                ))}
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="white"
              colorScheme="blue"
              type="submit"
              form="form-edit-event"
              isLoading={loading}
            >
              Submit
            </Button>

            <Button
              ml="5"
              color="white"
              colorScheme="blue"
              type="button"
              form="form-edit-event"
              onClick={handleCancel}
              isLoading={loading}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
