import React, { useState } from 'react'
import Map from 'pigeon-maps';
import Marker from './Marker';

import { useDisclosure } from "@chakra-ui/core";
import { useWindowDimensions } from '../WindowDimensions/context/index';
import ShowModal from '../Modals/ShowModal';

export default function MyMap({markers}) {
    console.log(markers);
    const { width, height } = useWindowDimensions();
    const [details, setDetails] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClickMarker = (element) => {
        setDetails(element);
        onOpen();
    }

    return (
        <div className="map-container">
            <Map center={[-39.819588, -73.245209]} zoom={14} width={width - 20} height={height - 150}>
                {markers.map(e =>
                    <Marker key="here" anchor={e.pos} payload={1} onClick={({ event, anchor, payload, }) => {handleClickMarker(e)}} />
                )}
            </Map>
            <ShowModal 
            onClose={onClose}
            size={"xs"}
            isOpen={isOpen}
            details={details} />
        </div>
    )
}
