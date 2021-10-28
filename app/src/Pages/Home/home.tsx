import { NavBar, FormContainer, Add } from './styles';
import { TableRow, TableContainer, Table, TableHead, TableCell, TableBody, styled, tableCellClasses, Button, ButtonGroup, Container, Modal, TextField, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import avatarm from '../CreateUser/avatarm.svg';
import avatarf from '../CreateUser/avatarf.svg';
import { IoPersonAdd } from "react-icons/io5";
import { useHistory } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


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

interface User {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F2E529",
    color: "#3D3D3D",
    fontSize: 17,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#3D3D3D",
    fontWeight: "bold",
    borderBottom: "1px solid #F2E529",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Home() {
  const history = useHistory();
  const [user, setUser] = useState<User[]>([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [abrir, setAbrir] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSucces, setOpenSucces] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const onDelete = (id: string) => {
    axios.delete(`https://6179b816aa7f340017404c34.mockapi.io/diazero/users/${id}`)
      .then((response) => {
        selectUsers();
        handleClose();
      })
  }

  function abrirModal(id: number) {
    setAbrir(true)
    axios.get(`https://6179b816aa7f340017404c34.mockapi.io/diazero/users/${id}`)
      .then((response) => {
        setId(response.data.id);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
      })
  };
  const openDialog = (id: number) => {
    setOpen(true);
    setId(String(id));
  };
  const fecharModal = () => setAbrir(false);
  const handleClose = () => setOpen(false);

  const selectUsers = () => {
    axios.get(`https://6179b816aa7f340017404c34.mockapi.io/diazero/users`)
      .then((response) => {
        setUser(response.data);
      })
  }

  const updateUsers = () => {
    if (name === "" || name === null || email === null || email === "" || gender === null || gender === "") {
      setOpenError(true);
    }
    else {
    axios.put(`https://6179b816aa7f340017404c34.mockapi.io/diazero/users/${id}`, {
      name,
      email,
      gender
    }).then((response) => {
      setAbrir(false);
      selectUsers();
      setOpenSucces(true);
    })
  }
  }

  const handleCloseSucces = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSucces(false);
  };

  const handleCloseError = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  useEffect(() => {
    selectUsers();
  }, [])
  return (
    <Container maxWidth="lg">
      <NavBar>
        Lista de Usuários Cadastrados
      </NavBar>
      <Add>
        <IconButton color="secondary" onClick={() => history.push('/create')}>
          <IoPersonAdd />
        </IconButton>
      </Add>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center" >
                ID
              </StyledTableCell>
              <StyledTableCell align="center" >
                Nome
              </StyledTableCell>
              <StyledTableCell align="center" >
                Email
              </StyledTableCell>
              <StyledTableCell align="center" >
                Gênero
              </StyledTableCell>
              <StyledTableCell align="center" >
                Opções
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {user.map((data) => {
              return (
                <StyledTableRow hover role="checkbox" tabIndex={-1} >
                  <StyledTableCell align="center" >
                    {data.id}
                  </StyledTableCell>
                  <StyledTableCell align="center" >
                    {data.name}
                  </StyledTableCell>
                  <StyledTableCell align="center" >
                    {data.email}
                  </StyledTableCell>
                  <StyledTableCell align="center" >
                    {data.gender}
                  </StyledTableCell>
                  <StyledTableCell align="center" >
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Button variant="contained" color="secondary" onClick={() => abrirModal(data.id)}>Editar</Button>
                      <Button variant="contained" color="secondary" onClick={() => openDialog(data.id)}>Excluir</Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        style={{ display: 'flex', justifyContent: 'center' }}
        open={abrir}
        onClose={fecharModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormContainer>
          {gender === "Feminino"
            // eslint-disable-next-line jsx-a11y/alt-text
            ? <img src={avatarf} />
            // eslint-disable-next-line jsx-a11y/alt-text
            : <img src={avatarm} />
          }

          <TextField onChange={(e) => setName(e.target.value)} value={name} label="Nome"required variant="standard" type="text" />
          <TextField onChange={(e) => setEmail(e.target.value)} value={email} label="Email" required variant="standard" type="email" />
          <TextField
            variant="standard"
            value={gender}
            select
            required
            onChange={(e) => setGender(e.target.value)}
            label="Género"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" type='submit' onClick={updateUsers}>Editar</Button>
        </FormContainer>
      </Modal>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: 'center' }}>Exclusão de Usuário</DialogTitle>
        <DialogContent style={{ display: 'flex', alignItems: 'center' }}>
          <DialogContentText style={{ fontWeight: "bold", color: "#3d3d3d" }}>
            Deseja realmente excluir este usuário?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" color="secondary" onClick={handleClose}>Não</Button>
          <Button variant="contained" color="primary" onClick={() => onDelete(id)}>Sim</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSucces} autoHideDuration={1500} anchorOrigin={{vertical:'top', horizontal:'center'}} onClose={handleCloseSucces}>
        <Alert onClose={handleCloseSucces} severity="success" >
          Usuário editado com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={1500} anchorOrigin={{vertical:'top', horizontal:'center'}} onClose={handleCloseError}>
      <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
        Por favor, preencha todos campos!
      </Alert>
    </Snackbar>
    </Container>
  );
}

export default Home;