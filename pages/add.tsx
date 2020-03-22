import Map from "pigeon-maps";
import { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  FormLabel
} from "@chakra-ui/core";

const Index: NextPage = () => {
  const [modal, setModal] = useState(false);
  const [pos, setPos] = useState(null);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState("");
  const [filename, setFilename] = useState("");
  const [desc, setDesc] = useState("");

  const handleClick = latLng => {
    setPos(latLng);
    setModal(true);
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    });

  const sendSubmit = async () => {
    console.log(filename);

    if (user !== "" && file && filename !== "" && desc !== "") {
      await axios
        .post("/api/createMarker", {
          author: user,
          image: file,
          desc: desc,
          position: pos,
          imageFilename: filename
        })
        .then(r => {
          console.log(r);
          setUser("");
          setFile(null);
          setFilename("");
          setDesc("");
        })
        .catch(err => console.log(err));
    } else {
      console.log("falto algo, user-img-filename");
    }
    setModal(false);
  };

  const handlePhoto = async e => {
    setFilename(e.name);
    const imageBase64 = await toBase64(e);
    setFile(imageBase64);
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Map
        center={[-39.819588, -73.245209]}
        zoom={14}
        onClick={({ event, latLng, pixel }) => {
          handleClick(latLng);
        }}
      ></Map>
      <Modal isOpen={modal} onClose={() => setModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subir marcador</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Posicion seleccionada:{" "}
            {pos
              ? pos[0] + " " + pos[1]
              : "extrañamente no selecciono ninguna posicion"}
            <input
              type="file"
              accept="image/*;capture=camera"
              onChange={e => handlePhoto(e.target.files[0])}
            />
            <FormControl isRequired>
              <FormLabel htmlFor="user">Your user</FormLabel>
              <Input
                id="user"
                placeholder="enter user"
                onChange={e => setUser(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="desc">Your user</FormLabel>
              <Input
                id="desc"
                placeholder="enter desc"
                onChange={e => setDesc(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={() => setModal(false)}>
              Close
            </Button>
            <Button variant="ghost" onClick={sendSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Index;
