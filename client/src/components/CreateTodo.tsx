import React, { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";

const priorities = [
  { value: "high", label: "High" },
  { value: "mid", label: "Mid" },
  { value: "low", label: "Low" },
];

const statuses = [
  { value: "done", label: "Done" },
  { value: "inProgress", label: "In Progress" },
];

const CreateTodo: React.FC = () => {
  const uid = localStorage.getItem("UID");
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("mid");
  const [status, setStatus] = useState("inProgress");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/tasks", {
        task,
        priority,
        status,
        userId: uid,
      });
      console.log(await response.data);
      setPriority("mid");
      setStatus("inProgress");
      setTask("");
    } catch (error) {
      console.error(error);
    }
    console.log({ task, priority, status });
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
        }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Todo
        </Typography>
        <TextField
          label="Task"
          variant="outlined"
          fullWidth
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          variant="outlined"
          fullWidth
          required>
          {priorities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          variant="outlined"
          fullWidth
          required>
          {statuses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Create Todo
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTodo;
