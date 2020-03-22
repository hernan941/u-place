import useAxios from "axios-hooks";
import axios from "axios";
import EXIF from "exif-js";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { Button, Spinner } from "@chakra-ui/core";

import MyMap from "../src/client/components/Map";
import {
  TheModal,
  HelloModal,
  DetailsModal
} from "../src/client/components/Modals";

const Index: NextPage = () => {
  let hiddenInput = null;
  const [file, setFile] = useState(null);
  const [latLng, setLatLng] = useState(null);
  const [base64, setBase64] = useState(null);
  const [markers, setMarkers] = useState([]);
  /*modal gates*/
  const [modal, setModal] = useState(false);
  const [hello, setHello] = useState(true);
  const [modalDetails, setModalDetails] = useState(false);
  /*          */
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    author: "",
    desc: "",
    img: ""
  });

  const [
    { data: dataAllMarkers, loading: loadingAllMarkers },
    refetchAllMarkers
  ] = useAxios({
    url: "/api/getAllMarkers"
  });

  const handleClickMarker = key => {
    setLoading(true);

    const obj = markers.find(e => e.key === key);
    console.log(obj);
    if (key.includes("temp")) {
      setDetails({
        author: obj.author,
        desc: obj.desc ? obj.desc : "",
        img: URL.createObjectURL(file)
      });
      setModalDetails(true);
      setLoading(false);
      return;
    }
    axios
      .get(`api/image/${obj.img}`)
      .then(res => {
        setDetails({
          author: obj.author,
          desc: obj.desc ? obj.desc : "",
          img: res.config.url
        });

        setModalDetails(true);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  const setData = data => {
    const tempData = [];
    data.map(
      e =>
        tempData.push({
          key: e._id,
          pos: e.position,
          author: e.author,
          desc: e.desc,
          img: e.imageFilename
        }),
      setMarkers(tempData)
    );
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
    console.log("file", file);

    const imageBase64 = await toBase64(file);
    setBase64(imageBase64);
  };

  const setSubmit = async (author, desc) => {
    saveImage({
      author: author,
      error: "not",
      pos: latLng,
      img: file,
      desc: desc,
      key: `tempKey${author}`
    });

    await axios
      .post("/api/createMarker", {
        author: author,
        desc: desc,
        image: base64,
        imageFilename: file.name,
        position: latLng
      })
      .then(r => console.log(r))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (dataAllMarkers) {
      setData(dataAllMarkers);
    }
  }, [dataAllMarkers]);

  useEffect(() => {
    if (file) {
      requestGeo();
    }
  }, [file]);

  return (
    <div className="index-page">
      {loadingAllMarkers || loading ? <Spinner className="spinner" /> : null}

      <MyMap markers={markers} handleClickMarker={handleClickMarker} />
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
      <DetailsModal
        isOpen={modalDetails}
        onClose={() => {
          setModalDetails(false);
        }}
        author={details.author}
        desc={details.desc}
        img={details.img}
      />
    </div>
  );
};

export default Index;
