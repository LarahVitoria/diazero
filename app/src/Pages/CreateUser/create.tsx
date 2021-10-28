/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import { useHistory } from 'react-router';
import { Add, ContainerForm, Form, FormContainer, Vector } from './styles';
import { Button, Container, IconButton, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { NavBar } from '../Home/styles';
import vector from './vector.svg';
import avatarf from './avatarf.svg';
import avatarm from './avatarm.svg';
import { BsArrowLeftCircleFill } from "react-icons/bs";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const currencies = [
  {
    value: 1,
    label: 'Feminino',
  },
  {
    value: 2,
    label: 'Masculino',
  },
];

function CreateUsers() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [openSucces, setOpenSucces] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const RegisterUsers = () => {
    if (name === "" || name === null || email === null || email === "" || gender === null || gender === "") {
      setOpen(true);
    }
    else {
      axios.post(`https://6179b816aa7f340017404c34.mockapi.io/diazero/users`, {
        name,
        email,
        gender
      }).then((response) => {
        setOpenSucces(true);
        history.push('/');

      })
    }
  }

  const handleCloseSucces = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSucces(false);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <NavBar>
        Cadastrar Usuários
      </NavBar>
      <Add>
        <IconButton color="secondary" onClick={() => history.push('/')}>
          <BsArrowLeftCircleFill />
        </IconButton>
      </Add>
      <ContainerForm>
        <Vector>
          <img src={vector} />
        </Vector>

        <Form>
          <FormContainer>
            {gender === "Feminino"
              ? <img src={avatarf} />
              : <img src={avatarm} />
            }
            <TextField onChange={(e) => setName(e.target.value)} label="Nome" required variant="standard" type="text" />
            <TextField onChange={(e) => setEmail(e.target.value)} label="Email" required variant="standard" type="email" />
            <TextField onChange={(e) => setGender(e.target.value)} label="Género" required variant="standard" select >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button type='submit' variant="outlined" onClick={RegisterUsers}>Cadastrar</Button>
          </FormContainer>
        </Form>
      </ContainerForm>
      <Snackbar open={openSucces} autoHideDuration={1500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleCloseSucces}>
        <Alert onClose={handleCloseSucces} severity="success" >
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={open} autoHideDuration={1500} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Por favor, preencha todos campos!
        </Alert>
      </Snackbar>
    </Container >

  );
}

export default CreateUsers;