import React, { useState, useEffect } from 'react';
import MainLayout from '../../Layouts/Index';
import Seo from '../../Utils/Seo';
import {
  Box,
  Button,
  Container,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Input,
  Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Country, State } from 'country-state-city';

const ViewAllEstate = () => {
  const initialEstates = [
    { id: 1, name: 'Lyly Estate', country: 'Nigeria', state: 'Lagos', createdAt: '2024-02-01' },
    { id: 2, name: 'Evergreen Estate', country: 'Nigeria', state: 'Lagos', createdAt: '2024-06-08' },
    { id: 3, name: 'Greenbox Demo', country: 'Nigeria', state: 'Lagos', createdAt: '2024-09-10' },
    { id: 4, name: 'Glendale Pearl', country: 'Nigeria', state: 'Lagos', createdAt: '2024-12-06' },
    { id: 5, name: 'Canal Estate', country: 'Nigeria', state: 'Lagos', createdAt: '2024-01-01' },
  ];

  const [estates, setEstates] = useState(initialEstates);
  const [showMore, setShowMore] = useState(false);
  const [selectedEstate, setSelectedEstate] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalMode, setModalMode] = useState('edit');
  const [newName, setNewName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [availableStates, setAvailableStates] = useState([]);

  useEffect(() => {
    const savedEstates = localStorage.getItem('estates');
    if (savedEstates) {
        setEstates(JSON.parse(savedEstates));
    }
}, []);

  useEffect(() => {
    localStorage.setItem('estates', JSON.stringify(estates));
  }, [estates]);

  const handleEdit = (estate) => {
    setSelectedEstate(estate);
    setNewName(estate.name);
    setSelectedCountry(estate.country || '');
    setSelectedState(estate.state || '');
    setModalMode('edit');
    onOpen();
  };

  const handleDelete = (estate) => {
    setSelectedEstate(estate);
    setModalMode('delete');
    onOpen();
  };

  const nav = useNavigate();

  const handleSave = () => {
    if (modalMode === 'edit') {
        setEstates(estates =>
            estates.map(e =>
                e.id === selectedEstate.id
                    ? { ...e, name: newName, country: selectedCountry, state: selectedState }
                    : e
            )
        );
    } else if (modalMode === 'delete') {
        const updatedEstates = estates.filter(e => e.id !== selectedEstate.id);
        setEstates(updatedEstates);
        
        localStorage.setItem('estates', JSON.stringify(updatedEstates));
    }
    onClose();
};
  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);

    const countryCode = Country.getAllCountries().find(country => country.name === selectedCountry)?.isoCode || '';
    const states = State.getAllStates().filter(state => state.countryCode === countryCode);
    setAvailableStates(states);
    setSelectedState('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const displayedEstates = showMore ? estates : estates.slice(0, 3);

  return (
    <MainLayout>
      <Box mx={["6%", "10%"]}>
        <Container maxW="container.xl" p={4}>
          <Button backgroundColor='red' color='white' marginBottom='32px' onClick={() => nav("/superAdmin/newOffice")}>Create new estate</Button>
          <Heading mb={8} textAlign='center'>Estates Table</Heading>
          <Table variant="simple" size="md" width="full">
            <Thead>
              <Tr>
                <Th>S/N</Th>
                <Th>Name</Th>
                <Th>Country</Th>
                <Th>State</Th>
                <Th>Date of Creation</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {displayedEstates.map((estate, index) => (
                <Tr key={estate.id}>
                  <Td>{index + 1}</Td>
                  <Td>{estate.name}</Td>
                  <Td>{estate.country}</Td>
                  <Td>{estate.state}</Td>
                  <Td>{estate.createdAt}</Td>
                  <Td>
                  <Button colorScheme="blue" onClick={() => handleEdit(estate)}>Edit</Button>
                  <Button colorScheme="red" ml={2} onClick={() => handleDelete(estate)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{modalMode === 'edit' ? 'Edit Estate' : 'Delete Estate'}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {modalMode === 'edit' && (
                  <>
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter new name"
                      mb={3}
                    />
                    <Select
                      placeholder="Select Country"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      mb={3}
                    >
                      {Country.getAllCountries().map((country, i) => (
                        <option key={i} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </Select>
                    <Select
                      placeholder="Select State"
                      value={selectedState}
                      onChange={handleStateChange}
                      mb={3}
                      isDisabled={!selectedCountry}
                    >
                      {availableStates.map((state, i) => (
                        <option key={i} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
                {modalMode === 'delete' && (
                  <Box>
                    Are you sure you want to delete "{selectedEstate?.name}"?
                  </Box>
                )}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSave}>
                  {modalMode === 'edit' ? 'Save' : 'Delete'}
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Box textAlign="center" mt={4}>
            <Button
              onClick={() => setShowMore(!showMore)}
              transition="all 0.3s ease-in-out"
              bgColor='red'
              textColor='white'
            >
              {showMore ? "See less" : "See more"}
            </Button>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default ViewAllEstate;
