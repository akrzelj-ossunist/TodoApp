import axios from "axios";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

interface Todo {
  id: string;
  task: string;
  priority: string;
  status: string;
}

const MyTodos: React.FC = () => {
  const uid = localStorage.getItem("UID");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserTodos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/tasks/user/${uid}`
      );
      setTodos(response.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const markAsDone = async (id: string) => {
    try {
      await axios.put(`http://localhost:8000/tasks/${id}`, { status: "done" });
      getUserTodos(); // Refresh the list
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}`);
      getUserTodos(); // Refresh the list
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserTodos();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: "60px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Todos
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((todo, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {todo.task}
                </TableCell>
                <TableCell align="right">{todo.priority}</TableCell>
                <TableCell align="right">{todo.status}</TableCell>
                <TableCell align="right">
                  {todo.status === "inProgress" && (
                    <IconButton
                      color="primary"
                      onClick={() => markAsDone(todo._id)}>
                      <CheckIcon />
                    </IconButton>
                  )}
                  <IconButton
                    color="secondary"
                    onClick={() => deleteTask(todo._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyTodos;
