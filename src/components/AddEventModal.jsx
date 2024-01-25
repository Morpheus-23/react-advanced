import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";



export const AddEventModal = ({ isOpen, onClose }) => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState("");

  const { mutate } = useQuery("submitData");
  // const { mutate } = useQuery("submitData", () => submitData(), {
  //   onSuccess: () => {
  //     setEventTitle(""); 
  //     eventDescription(""); 
  //     eventImage(""); 
  //     eventLocation(""); 
  //     eventStartTime(""); 
  //     eventEndTime(""); 
  //     onClose(); // Close the modal
  //   },
  //   onError: () => {
  //     // Handle error display if needed
  //   },
  // });

  const submitData = async () => {
    const formObj = {
      createdBy: "2",
      title: eventTitle,
      description: eventDescription,
      image: eventImage,
      categoryIds: [3],
      location: eventLocation,
      startTime: eventStartTime,
      endTime: eventEndTime
    };
  
    try {
      console.log("submitData");
      const response = await axios.post("http://localhost:3000/events", formObj);
      return response.data;
    } catch (error) {
      throw new Error("Failed to submit the form");
    }
  };

  const handleSubmit = async () => {

    await mutate(submitData());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="eventTitle"
            placeholder="EventTitle"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <Input
            name="eventDescription"
            placeholder="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <Input
            name="eventImage"
            placeholder="eventImage"
            value={eventImage}
            onChange={(e) => setEventImage(e.target.value)}
          />
          <Input
            name="eventLocation"
            placeholder="eventLocation"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
          <Input
            name="eventStartTime"
            placeholder="eventStartTime"
            value={eventStartTime}
            onChange={(e) => setEventStartTime(e.target.value)}
          />
          <Input
            name="eventEndTime"
            placeholder="eventEndTime"
            value={eventEndTime}
            onChange={(e) => setEventEndTime(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEventModal;
