import React, { useState } from 'react'
import Map from 'pigeon-maps';
import Marker from './Marker';

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
import { useDisclosure } from "@chakra-ui/core";
import MyForm from './MyForm';
import { useWindowDimensions } from '../WindowDimensions/context/index';


export default function MyMap() {
    const { width } = useWindowDimensions();
    const [count, setCount] = useState(0);
    const [myLL, setMyLL] = useState(0);
    const [todo, setTodo] = useState([[[-39.819588, -73.245209], -1, { name: 'start', category: 'start', description: 'start' }]]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onSubmit = (s) => {
        console.log(s);
        setTodo([...todo, [myLL, count, s]]);

    }

    const handleClick = ({ event, latLng, pixel }) => {
        setCount(count + 1);
        setMyLL(latLng);
        // setTodo([...todo, [latLng, count]]);
        console.log(todo);
        onOpen();
    }
    return (
        <div>
            <Map center={[-39.819588, -73.245209]} zoom={14} width={width / 2} height={400} onClick={(all) => handleClick(all)}>
                {todo.map(pos =>
                    <Marker key={pos[1]} anchor={pos[0]} payload={1} onClick={({ event, anchor, payload }) => { }} />
                )}
            </Map>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Notice</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <MyForm onSubmit={onSubmit} onClose={onClose} />
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Text fontSize="2xl" textAlign="center">Click on the Map</Text>
        </div>
    )
}

