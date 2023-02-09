import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  Image,
  Box,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../Components/Pagination";

function UserDetails() {
const [loading,setLoading]= useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(10);
  async function getUsers(page,filter) {
    let res = await axios.get(
      `https://erin-talented-butterfly.cyclic.app/userDetails?page=${page}&limit=10&filter=${filter}`
    );
    return res;
  }

  const handleChangepage = (val) => {
    setPage(val);
  };
  const handleFilter=(e)=>{
  setFilter(e.target.value);
  console.log(filter)
  }
  useEffect(() => {
    setLoading(true)
    getUsers(page,filter).then((res) => {
    //   console.log(res.data.data)
        setData(res.data.data);
      setTotalPages(res.data.totalPages);
    });
    setLoading(false)
}, [page,filter]);

if(loading){
    return <Box>.....Loading</Box>
}
return (
    <>
      <Heading>UserDetails</Heading>
      <Box pt={'2rem'} alignContent='left'>
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        handlePageChange={handleChangepage}
      />
      </Box>
      <Select placeholder='Select option' value={filter} onChange={handleFilter}>
  <option value='male'>Male</option>
  <option value='female'>Female</option>
</Select>
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
              {console.log(data)}
            {
                data && data?.map((user,i)=>{
                    return <Tr key={user.email}>
                        <Td>{user.name.first} {user.name.last}</Td>
                        <Td>{user.location.country}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.gender}</Td>
                        <Td><Image src={user.picture.medium} alt={user.name} /></Td>
                    </Tr>
                })
            }
          </Tbody>
        </Table>
      </TableContainer>

    </>
  );
}

export default UserDetails;
