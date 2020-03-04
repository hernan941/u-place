import React, { useState } from 'react'

import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    RadioGroup,
    Radio,
    Button

} from "@chakra-ui/core";

const MyForm = (props) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState("Itachi");
    const [description, setDescription] = useState('');

    const { onSubmit, onClose } = props;

    const nameChange = (e) => {
        setName(e.target.value);
    }

    const categoryChange = (e) => {
        setCategory(e.target.value)
    }

    const descriptionChange = (e) => {
        setDescription(e.target.value)
    }

    return (
        <FormControl>
            <FormControl>
                <FormLabel>First name</FormLabel>
                <Input placeholder="First name" value={name} onChange={nameChange} />
            </FormControl>

            <FormControl mt={4} as="fieldset">
                <FormLabel as="legend">Category</FormLabel>
                <RadioGroup defaultValue={category} onChange={categoryChange}>
                    <Radio value="A">A</Radio>
                    <Radio value="B">B</Radio>
                    <Radio value="C">C</Radio>
                </RadioGroup>
                <FormHelperText id="email-helper-text">
                    Select only if you're a fan.
                </FormHelperText>
            </FormControl>

            <FormControl mt={4} mb={2}>
                <FormLabel>Description</FormLabel>
                <Input placeholder="Description" value={description} onChange={descriptionChange} />
            </FormControl>
            <Button variantColor="blue" mr={3} onClick={() => {
                onClose(); onSubmit({ name, category, description });
            }}>
                Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>cancel</Button>
        </FormControl>
    )
}

export default MyForm
