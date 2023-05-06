import React from "react";
import { Grid, Button, Box, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AdminActions } from "../store/admins";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, email, password } = useSelector((state) => state.admin);

  const handleInputChange = (e, name) => {
    dispatch(AdminActions[name](e.target.value));
  };

  const toastOptions = {
    autoClose: 3000,
    closeButton: true,
    position: "bottom-right",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const AddAdminHandler = async () => {
    if (validatioHandler()) {
      try {
        const { data } = await axios.post("http://localhost:8000/adminSignup", {
          name,
          email,
          password,
          fcmToken: "123",
        });
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error("Admin with this email is already exists", toastOptions);
      }
    }
  };

  const validatioHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
      toast.error("Name is required", toastOptions);
      return false;
    }
    if (!email) {
      toast.error("Email is required", toastOptions);
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter valid email", toastOptions);
      return false;
    }
    if (!password) {
      toast.error("Password is required", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <div>
      <Grid container justifyContent="center" alignItems="center" height="50vh">
        <Grid item xs={12} sm={6} md={4}>
          <Box sx={{ px: 4, py: 3, bgcolor: "white", borderRadius: 1 }}>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="name"
                variant="outlined"
                onChange={(e) => handleInputChange(e, "name")}
                fullWidth
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextField
                label="email"
                variant="outlined"
                onChange={(e) => handleInputChange(e, "email")}
                fullWidth
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="password"
                variant="outlined"
                onChange={(e) => handleInputChange(e, "password")}
                fullWidth
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={AddAdminHandler}
              >
                Add Admin
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="success"
                fullWidth
                onClick={() => navigate("/")}
              >
                back to panel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default AddAdmin;
