import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AdminActions } from "../store/admins";
import axios from "axios";

const Admin = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin.admins);

  const fetchAdmins = async () => {
    const { data } = await axios.get("http://localhost:8000/allAdmins");
    console.log(data);
    dispatch(AdminActions.admins(data));
  };
  console.log(admins.admins);
  useEffect(() => {
    fetchAdmins();
  }, []);

  const adminsData = admins?.admins?.map((admin, index) => {
    return (
      <>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <Typography sx={{ marginRight: "16px" }}>{admin.name}</Typography>
          <Typography>{admin.email}</Typography>
        </Box>
      </>
    );
  });

  console.log(adminsData);
  return <div>{adminsData}</div>;
};

export default Admin;
