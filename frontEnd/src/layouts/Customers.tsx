import {NetworkRequests} from "../network/NetWorkRequests";
import {useEffect, useState} from "react";
import {CREATE_CUSTOMER_PATH, LIST_CLIENTS, SHOW_CUSTOMER_PATH} from "../Constants";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Button, Stack, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

function Customers(props: any) {
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [clients, setClients] = useState([]);
    let navigate = useNavigate();

    let apiObject = new NetworkRequests();
    const getClients = () => {
        setError(null)
        apiObject.get(LIST_CLIENTS)
            .then((response: any) => {
                setIsFetching(false)
                if (response?.data) {
                    setClients(response?.data);
                }
            }).catch((error: any) => {
            setIsFetching(false);
            setError(error);
        })
    }
    useEffect(() =>{
        setIsFetching(true)
        getClients()
    },[])
    if (isFetching){
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }
    if (error){
        return (
            <Box sx={{ display: 'flex' }}>
                {error}
            </Box>
        )
    }
    return (
        <Stack
        sx={{
            marginTop: "5%",
            width: "70%",
            marginX: "auto"
        }}>
            <Stack direction="row"
            sx={{
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Typography>
                    Customers
                </Typography>
            <Button
                sx={{width: "200px", marginY: "10px"}}
                variant="contained"
                onClick={() => {
                    navigate(CREATE_CUSTOMER_PATH,
                        {replace: true})
                }}
            >Create</Button>
            </Stack>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Gender</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((row: any) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.first_name}
                                </TableCell>
                                <TableCell align="left">{row.last_name}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.gender}</TableCell>
                                <TableCell align="left">
                                    <Avatar alt= {row.first_name} src={row.image}/></TableCell>
                                <TableCell align="left">
                                    <Button
                                        variant="outlined"
                                        onClick={() => {
                                            navigate(SHOW_CUSTOMER_PATH.replace(":id", row.id),
                                                {replace: true})
                                        }}
                                    >View</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Stack>


    )
}

export default Customers