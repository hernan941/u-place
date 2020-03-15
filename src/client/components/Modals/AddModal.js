import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Textarea,
    Button
  } from "@chakra-ui/core";


const AddModal = ({onClose, size, isOpen, image, position, saveImage}) =>{
  if(position) console.log(position.coords.latitude)
  let [value, setValue] = React.useState("");
  let [submit, setSubmit] = React.useState(null);

  React.useEffect(()=>{
    if(submit!== null){
      saveImage(submit);
    }
  }, [submit])

  let handleSubmit = async () =>{
      await setSubmit({
        error: "not",
        pos: [position.coords.latitude, position.coords.longitude],
        img: image, 
        description: value,
      })
      onClose();
  }  

  let handleInputChange = e => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

    return <Modal onClose={onClose} size={size} isOpen={isOpen}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Add Modal</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <img src ={image} alt = "upload photo" />
        <Textarea placeholder="enter a description" size="xs" resize="none" mt={3} value={value} onChange={handleInputChange}/>
      </ModalBody>
      <ModalFooter>
        {position !== null? <Button type="submit" onClick={handleSubmit}>Send</Button>: <Text>please allow geolocation</Text>}
      </ModalFooter>
    </ModalContent>
  </Modal>
}

export default AddModal;