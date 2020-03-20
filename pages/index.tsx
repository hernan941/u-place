import useAxios from "axios-hooks";
import axios from "axios";
import EXIF from "exif-js";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Button, Spinner } from "@chakra-ui/core";

import MyMap from "../src/client/components/Map";
import { TheModal, HelloModal } from "../src/client/components/Modals";

const Index: NextPage = () => {
  let hiddenInput = null;
  const [file, setFile] = useState(null);
  const [latLng, setLatLng] = useState(null);
  const [base64, setBase64] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [modal, setModal] = useState(false);
  const [hello, setHello] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMarkers = async () => {
    setLoading(true);
    const response = await axios.get("/api/getAllMarkers");
    const data = await response.data;
    setData(data);
    setLoading(false);
  };

  const requestGeo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        setLatLng([coords.latitude, coords.longitude])
      );
    }
  };

  const openCamera = hiddenInput => {
    hiddenInput.click();
  };

  const saveImage = e => {
    setMarkers([...markers, e]);
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.toString());
      reader.onerror = error => reject(error);
    });

  const handlePhoto = async file => {
    setFile(file);
    if (file) {
      setModal(true);
    }

    const imageBase64 = await toBase64(file);
    setBase64(imageBase64);
  };

  const setSubmit = async (author, desc) => {
    saveImage({
      error: "not",
      pos: latLng,
      img: file,
      description: desc,
      key: `tempKey${author}`
    });

    await axios
      .post("/api/createMarker", {
        author: author,
        image: base64,
        desc: desc,
        position: latLng,
        imageFilename: file.name
      })
      .then(r => console.log(r))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  const setData = data => {
    const tempData = [];
    data.map(
      e => tempData.push({ key: e._id, pos: e.position, author: e.author }),
      setMarkers(tempData)
    );
  };

  useEffect(() => {
    if (file) {
      requestGeo();
    }
  }, [file]);

  const [
    { data: dataAllMarkers, loading: loadingAllMarkers },
    refetchAllMarkers
  ] = useAxios({
    url: "/api/getAllMarkers"
  });

  return (
    <div className="index-page">
      {loading ? <Spinner className="spinner" /> : null}

      <MyMap markers={markers} />
      <input
        hidden
        type="file"
        name="image"
        accept="image/*"
        ref={el => (hiddenInput = el)}
        onChange={e => handlePhoto(e.target.files[0])}
      />
      <Button
        style={{ position: "fixed", bottom: 20, right: 20 }}
        variantColor="gray"
        size="lg"
        onClick={() => {
          openCamera(hiddenInput);
        }}
      >
        Add Photo
      </Button>
      <TheModal
        isOpen={modal}
        onClose={() => setModal(false)}
        setSubmit={setSubmit}
        position={latLng}
        requestGeo={() => requestGeo()}
      />
      <HelloModal
        isOpen={hello}
        onClose={() => {
          setHello(false);
        }}
      />
      {/* {!loadingAllMarkers && JSON.stringify(dataAllMarkers, null, 2)} */}
    </div>
  );
};

export default Index;
