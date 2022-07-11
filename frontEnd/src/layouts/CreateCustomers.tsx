import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from "react";
import {Alert, Button, CircularProgress, Grid, Snackbar, Typography} from "@mui/material";
import {CREATE_CLIENT_URL, CREATE_CUSTOMER_PATH, LIST_CLIENTS} from "../Constants";
import {NetworkRequests} from "../network/NetWorkRequests";

const initState = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    image: "",
}

function CreateCustomers(props: any) {
    const [state, setState] = useState(initState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = React.useState(false);

    let apiObject = new NetworkRequests();
    const addClient = () => {
        setError(null)
        apiObject.post(CREATE_CLIENT_URL, state)
            .then((response: any) => {
                setIsSubmitting(false)
                setOpen(true)
                setState(initState)
            }).catch((error: any) => {
            setIsSubmitting(false);
            setError(error);
        })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true)
        addClient()
    }
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Box
            component="form"
            sx={{
                marginTop: "5%",
                width: "50%",
                marginX: "auto"
            }}

            autoComplete="off"
            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleFormSubmit(e)}
        >
            <Typography>
                Create Customers
            </Typography>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={error ? "error" : "success"} sx={{width: '100%'}}>
                    {error || " Added successfully"}.
                </Alert>
            </Snackbar>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        required={true}
                        fullWidth={true}
                        id="outlined-name"
                        label="First Name"
                        name="first_name"
                        value={state.first_name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required={true}
                        fullWidth={true}
                        id="outlined-name"
                        label="Last Name"
                        name="last_name"
                        value={state.last_name}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required={true}
                        fullWidth={true}
                        id="outlined-name"
                        label="Email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        required={true}
                        fullWidth={true}
                        id="outlined-name"
                        label="Gender"
                        name="gender"
                        value={state.gender}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>

                    <TextField
                        required={true}
                        fullWidth={true}
                        id="outlined-name"
                        label="Image"
                        name="image"
                        value={state.image}
                        onChange={handleChange}
                    />
                </Grid>

            </Grid>

            <Button
                type="submit"
                sx={{width: "200px", marginY: "10px"}}
                variant="contained"
                disabled={isSubmitting}>
                {isSubmitting && <CircularProgress size={14}/>}
                {!isSubmitting && 'Create'}

            </Button>

        </Box>
    );
}

export default CreateCustomers;