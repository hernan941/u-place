import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text
  } from "@chakra-ui/core";


const ShowModal = ({onClose, size, isOpen, details}) =>{
    return <Modal onClose={onClose} size={size} isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Show Modal</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <img src={details.img} alt="image null" />
        <Text>
         {details.description} 
        </Text>
      </ModalBody>
      <ModalFooter>
        <Text>
            Ok
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
}

export default ShowModal;