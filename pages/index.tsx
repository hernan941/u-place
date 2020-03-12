import EXIF from "exif-js";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Button, useDisclosure } from "@chakra-ui/core";

import MyMap from "../src/client/components/Map";
import AddModal from "../src/client/components/Modals/AddModal";

const Index: NextPage = () => {
  let hiddenInput = null;
  //* temporal data *//
  const [file, setFile] = useState(null);
  const [pos, setPos] = useState(null);

  //* modal 1 *//
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("xs");
  const [markers, setMarkers] = useState([]);

  const saveImage = e => {
    setMarkers([...markers, e]);
  };

  const handlePhoto = file => {
    setFile(file);
    EXIF.getData(file, function() {
      // console.log(EXIF.getAllTags(this));
      // console.log(file);
    });
  };

  useEffect(() => {
    if (file) {
      onOpen();
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(pos => setPos(pos));
      } else {
        /* la geolocalización NO está disponible */
        console.log("no");
      }
    }
  }, [file]);

  return (
    <div className="index-page">
      <MyMap markers={markers} />
      <input
        hidden
        type="file"
        name="image"
        accept="image/*"
        ref={el => (hiddenInput = el)}
        onChange={e => handlePhoto(e.target.files[0])}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end"
        }}
      >
        <Button
          variantColor="gray"
          size="lg"
          m={2}
          textAlign="right"
          onClick={() => {
            hiddenInput.click();
          }}
        >
          Add Photo
        </Button>
      </div>
      <AddModal
        onClose={onClose}
        size={size}
        isOpen={isOpen}
        image={file !== null ? URL.createObjectURL(file) : null}
        position={pos}
        saveImage={saveImage}
      />
    </div>
  );
};

export default Index;
