import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {NetworkRequests} from "../network/NetWorkRequests";
import {LIST_CLIENTS, SHOW_CLIENT} from "../Constants";
import {Stack} from "@mui/material";

interface ClientTypes {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    image: string,
}

function ShowCustomers(props: any) {
    const {id} = useParams();
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [client, setClient] = useState<ClientTypes>();
    let navigate = useNavigate();
    let apiObject = new NetworkRequests();
    const getClient = () => {
        setError(null)
        apiObject.get(SHOW_CLIENT.replace(":id", id!.toString()))
            .then((response: any) => {
                setIsFetching(false)
                if (response?.data) {
                    setClient(response?.data);
                }
            }).catch((error: any) => {
            setIsFetching(false);
            setError(error);
        })
    }
    useEffect(() => {
        setIsFetching(true)
        getClient()
    }, [])

    if (isFetching) {
        return (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        )
    }
    if (error) {
        return (
            <Box sx={{display: 'flex'}}>
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
            }}
            spacing={2} direction="row">
            <Avatar alt= {client?.first_name} src={client?.image}/>
            <Stack spacing={2} direction="column">
                <Typography
                    sx={{display: 'inline'}}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {`${client?.first_name} ${client?.last_name}`}
                </Typography>
                <Typography
                    sx={{display: 'inline'}}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {client?.email}
                </Typography>
                <Typography
                    sx={{display: 'inline'}}
                    component="span"
                    variant="body2"
                    color="text.primary"
                >
                    {client?.gender}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default ShowCustomers