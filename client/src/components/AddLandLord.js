import React from "react";
import { Grid, Button, Box, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { LandlordActions } from "../store/Landlords.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddLandLord = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    phone,
    country,
    edit,
    editedData,
    id,
  } = useSelector((state) => state.landlord);

  const handleInputChange = (e, name) => {
    if (edit && editedData[name]) {
      const newData = e.target.value + editedData[name];
      dispatch(LandlordActions[name](newData));
    } else {
      dispatch(LandlordActions[name](e.target.value));
    }
  };

  const toastOptions = {
    autoClose: 3000,
    closeButton: true,
    position: "bottom-right",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const AddLandlordHandler = async () => {
    if (validatioHandler()) {
      try {
        const { data } = await axios.post("http://localhost:8000/addLandLord", {
          firstName,
          lastName,
          email,
          password,
          gender,
          phone,
          country,
          fcmToken: "123",
        });
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error("Landlord with this email is already exists", toastOptions);
      }
    }
  };

  const editLandlordHandler = async (id) => {
    const obj = {
      id,
      firstName,
      lastName,
      email,
      password,
      gender,
      phone,
      country,
      fcmToken: "123",
    };
    if (validatioHandler()) {
      try {
        const { data } = await axios.post(
          "http://localhost:8000/editLandlord",
          obj
        );

        console.log(data);
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error(
          "Not able to edit this time please try again later",
          toastOptions
        );
      }
    }
  };

  const validatioHandler = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName) {
      toast.error("First name is required", toastOptions);
      return false;
    }
    if (firstName.length < 3 || firstName.length > 20) {
      toast.error("Please enter valid first name", toastOptions);
      return false;
    }
    if (!lastName) {
      toast.error("Last name is required", toastOptions);
      return false;
    }
    if (lastName.length < 3 || lastName.length > 20) {
      toast.error("Please enter valid last name", toastOptions);
      return false;
    }
    if (!gender) {
      toast.error("Please enter gender", toastOptions);
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
    if (!edit && !password) {
      toast.error("Password is required", toastOptions);
      return false;
    }
    if (!edit && password.length < 8) {
      toast.error("Password must be 8 characters");
      return false;
    }
    if (!phone) {
      toast.error("Please enter phone", toastOptions);
      return false;
    }
    if (!country) {
      toast.error("Please enter country", toastOptions);
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
                label="firstName"
                variant="outlined"
                value={firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
                fullWidth
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="lastName"
                variant="outlined"
                value={lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
                fullWidth
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="gender"
                variant="outlined"
                value={gender}
                onChange={(e) => handleInputChange(e, "gender")}
                fullWidth
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="email"
                variant="outlined"
                value={email}
                onChange={(e) => handleInputChange(e, "email")}
                fullWidth
              />
            </Box>
            {!edit && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  label="password"
                  variant="outlined"
                  onChange={(e) => handleInputChange(e, "password")}
                  fullWidth
                />
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <TextField
                label="phone"
                variant="outlined"
                value={phone}
                onChange={(e) => handleInputChange(e, "phone")}
                fullWidth
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="country"
                variant="outlined"
                value={country}
                onChange={(e) => handleInputChange(e, "country")}
                fullWidth
              />
            </Box>

            {!edit && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={AddLandlordHandler}
                >
                  Add Landlord
                </Button>
              </Box>
            )}
            {edit && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => editLandlordHandler(id)}
                >
                  Edit Landlord
                </Button>
              </Box>
            )}
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

export default AddLandLord;
