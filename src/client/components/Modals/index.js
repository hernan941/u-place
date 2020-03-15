import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text
  } from "@chakra-ui/core";


  import {
      Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from "@chakra-ui/core";
import React, {useState} from 'react';

const TheModal = ({isOpen, onClose, setSubmit, position, requestGeo}) => {
    const [user, setUser] = useState("");
    const [desc, setDesc] = useState("");
    return (
        <Modal isOpen={isOpen} onClose={onClose} size = {"xs"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Graffiti</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl isRequired>
                    <FormLabel htmlFor="user">Your user</FormLabel>
                    <Input id="user" placeholder="enter user" onChange={e => setUser(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="description">Description</FormLabel>
                        <Input type="text" id="desc" aria-describedby="description of picture" onChange={e => setDesc(e.target.value)}/>
                        <FormHelperText id="desc help">
                            you are so close
                        </FormHelperText>
                </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button variantColor="gray" mr={3} onClick={onClose}>
                Cancel
              </Button>
              {position? 
              (user ? <Button  variantColor="green" onClick = {()=>setSubmit(user, desc)}>Submit</Button>:
               <Button variantColor="red">Add User</Button>):
               <Button variantColor="red" onClick={()=>requestGeo()}>allow geo</Button>}
            </ModalFooter>
          </ModalContent>
        </Modal>)
}

const HelloModal = ({isOpen, onClose}) => {
    return <Modal isOpen={isOpen} onClose={onClose} size = {"xs"}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Hello ma friend</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
          Esta es una aplicacion para subir imagenes de graffiti en la ciudad de valdivia, por el momento :)
      </ModalBody>
      <ModalFooter>
        <Button variantColor="blue" mr={3} onClick={()=>{
            onClose();
        }}>
          Ok
        </Button>
        
      </ModalFooter>
    </ModalContent>
  </Modal>
}

export {TheModal, HelloModal}