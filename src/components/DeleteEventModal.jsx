import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DeleteEventModal = ({ isOpen, onClose, event }) => {
  const cancelRef = useRef();
  const toast = useToast();
  const id = "delete-event-toast";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const deleteEvent = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });
      toast({
        id,
        title: "Event has been deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        id,
        description: "Error while deleting the event.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent backgroundColor={"grey.200"}>
            <AlertDialogHeader
              align={"center"}
              fontSize="xl"

     
              textColor={"blue.600"}
            >
              {"Delete event"}
            </AlertDialogHeader>

            <AlertDialogBody >
              Are you sure you want to delete this event ?{" "}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                onClick={deleteEvent}
                ml={3}
                mt={3}
                w="100px"
                mr={5}
                fontWeight={"bold"}
                fontSize={"lg"}
            
            
             
                isLoading={loading}
              >
                Delete
              </Button>
              <Button
            
                ref={cancelRef}
                onClick={onClose}
                mt={3}
                w="100px"
                fontWeight={"bold"}
                fontSize={"lg"}
           
                backgroundColor={"grey.600"}
            
           
                isLoading={loading}
              >
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
