import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { PanelActions } from "../../store/panel";

const Buttons = ({ title }) => {
  const dispatch = useDispatch();
  const handleClicked = () => {
    dispatch(PanelActions.current(title));
  };
  return (
    <Button variant="contained" size="small" onClick={handleClicked}>
      {title}
    </Button>
  );
};

export default Buttons;
