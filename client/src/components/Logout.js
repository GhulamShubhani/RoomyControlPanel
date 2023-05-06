import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { LoginActions } from "../store/userLogin";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(LoginActions.isLoggedIn(false));
    navigate("/login");
  };
  return (
    <Box>
      <Button
        variant="contained"
        color="error"
        fullWidth
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Logout;
