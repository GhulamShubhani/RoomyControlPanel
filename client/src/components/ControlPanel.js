import React from "react";
import { Box, Grid, Button } from "@mui/material";
import Logout from "./Logout";
import Buttons from "./controlPanelComponents/Button";
import { useSelector, useDispatch } from "react-redux";
import Admin from "./Admin";
import Landlords from "./Landlords";
import Properties from "./Properties";
import { LandlordActions } from "../store/Landlords";
import { PropertyActions } from "../store/Property";

import { useNavigate } from "react-router-dom";

const ControlPanel = () => {
  const currentState = useSelector((state) => state.panel.current);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addEventHandler = () => {
    if (currentState === "Landlord") {
      dispatch(LandlordActions.edit(false));
      dispatch(LandlordActions.clearEditedData());
      navigate(`/${currentState}`);
    } else if (currentState === "Properties") {
      dispatch(PropertyActions.edit(false));
      dispatch(PropertyActions.clearEditedData());
      navigate(`/${currentState}`);
    } else if (currentState === "Admins") {
      navigate(`/${currentState}`);
    }
  };
  return (
    <Grid>
      <Grid item style={{ padding: "16px", border: "1px solid #ccc" }}>
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Logout />
        </Box>
      </Grid>
      <Grid item sx={{ mt: 2 }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Buttons title={"Landlord"} />
          </Grid>
          <Grid item>
            <Buttons title={"Properties"} />
          </Grid>
          <Grid item>
            <Buttons title={"Admins"} />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="end" alignItems="center">
          <Grid item>
            <Button variant="contained" size="small" onClick={addEventHandler}>
              +Add {currentState}
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          style={{
            marginTop: "10px",
            padding: "16px",
            border: "1px solid #ccc",
          }}
        >
          {currentState === "Admins" && <Admin />}
          {currentState === "Properties" && <Properties />}
          {currentState === "Landlord" && <Landlords />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ControlPanel;
