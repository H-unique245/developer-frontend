import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Image,
  Box,
  Select,
  FormLabel,
  HStack,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Components/Loading";
import Pagination from "../Components/Pagination";

function UserDetails() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(10);
  async function getUsers(page, filter) {
    let res = await axios.get(
      `https://erin-talented-butterfly.cyclic.app/userDetails?page=${page}&limit=10&filter=${filter}`
    );
    return res;
  }

  const handleChangepage = (val) => {
    setPage(val);
  };
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    setLoading(true);
    getUsers(page, filter).then((res) => {
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
    });
    setLoading(false);
  }, [page, filter]);

  if (loading) {
    return <Loading />
  }
  return (
    <>
      <Heading>UserDetails</Heading>
      <Button><Link to="/" >Go to Home</Link></Button>
      {data.length === 0 ? (
        <Box mt={"-2rem"}>
          <Image w="60%" m="auto" src="./No_data.svg" />
        </Box>
      ) : (
        <>
          <Box pt={"2rem"} alignContent="left">
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              handlePageChange={handleChangepage}
            />
          </Box>
          <HStack m={4}>
            <FormLabel>Filter By</FormLabel>
            <Select
              placeholder="Select Gender"
              value={filter}
              w="150px"
              onChange={handleFilter}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </HStack>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Location</Th>
                  <Th>Email</Th>
                  <Th>Gender</Th>
                  <Th>Picture</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data &&
                  data?.map((user, i) => {
                    return (
                      <Tr key={user.email}>
                        <Td>
                          {user.name.first} {user.name.last}
                        </Td>
                        <Td>{user.location.country}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.gender}</Td>
                        <Td>
                          <Image src={user.picture.medium} alt={user.name} />
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

export default UserDetails;
