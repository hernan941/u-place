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
              (user ? <Button  variantColor="green" onClick = {()=>{setSubmit(user, desc); onClose()}}>Submit</Button>:
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
      <ModalHeader ><Emoji symbol={`\u{1F30D}`} />&nbsp; Bienvenido! <br />a PlaceHolders</ModalHeader>
      <ModalCloseButton />
      <ModalBody textAlign="justify">
          <span className="brand">PH</span> se encarga de recopilar y visibilizar arte urbano a traves de la <span className="comunidad">comunidad</span>. Unete y suma el arte que encuentres en tu camino.
          &emsp;
          <Emoji symbol={'\u{1F64C}'}/>
          &emsp;
          <Emoji symbol={'\u{1F64C}'}/>
          &emsp;
          <Emoji symbol={'\u{1F64C}'}/>
      </ModalBody>
      <ModalFooter textAlign="center">
        <Button left variantColor="green" mr={3} onClick={()=>{
            onClose();
        }}>
          Be Community
        </Button>
        
      </ModalFooter>
    </ModalContent>
  </Modal>
}

const Emoji = props => (
  <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
  >
      {props.symbol}
  </span>);

export {TheModal, HelloModal}