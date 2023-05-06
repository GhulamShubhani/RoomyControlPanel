import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LandlordActions } from "../store/Landlords";
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Landlords = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const landlords = useSelector((state) => state.landlord.landlords);
  const [expandedLandlordId, setExpandedLandlordId] = useState(null);

  const editLandlord = async (id) => {
    const { data } = await axios.post("http://localhost:8000/getLandlord", {
      id,
    });
    dispatch(LandlordActions.edit(true));
    dispatch(LandlordActions.editedData(data.landlord));
    navigate("/Landlord");
  };

  const EditButton = ({ onClick, id }) => {
    return (
      <Button variant="outlined" onClick={() => editLandlord(id)}>
        Edit
      </Button>
    );
  };

  const fetchLandlords = async () => {
    const { data } = await axios.get("http://localhost:8000/allLandLords");
    dispatch(LandlordActions.landlords(data.landLords));
  };

  useEffect(() => {
    fetchLandlords();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedLandlordId(id === expandedLandlordId ? null : id);
  };

  const landlordsData = landlords?.map((landlord) => {
    const isExpanded = landlord._id === expandedLandlordId;

    return (
      <Grid
        key={landlord.id}
        sx={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <Box display="flex" alignItems="center">
          <Box mr={1}>{landlord.firstName}</Box>
          <Box mr={1}>{landlord.lastName}</Box>
          <Box>({landlord.gender})</Box>
        </Box>
        <Box>
          <Typography
            variant="subtitle2"
            color="primary"
            onClick={() => handleExpandClick(landlord._id)}
            sx={{ cursor: "pointer" }}
          >
            {isExpanded ? "Hide details" : "Show details"}
          </Typography>
          <Accordion
            expanded={isExpanded}
            sx={{ boxShadow: "none", margin: "0" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${landlord._id}-content`}
              id={`panel-${landlord._id}-header`}
              sx={{
                "&.Mui-expanded": {
                  minHeight: "0",
                },
              }}
            >
              <Divider sx={{ marginRight: "10px" }} />
              <Typography variant="subtitle2">Details</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ flexDirection: "column" }}>
              <Box>Email: {landlord.email}</Box>
              <Box>Country: {landlord.country}</Box>
              <Box>Phone no: {landlord.phone}</Box>
              <Box>{landlord.address1}</Box>
              <Box>{landlord.address2}</Box>
              <Box>{landlord.city}</Box>
              <Box>{landlord.state}</Box>
              <Box>{landlord.zip}</Box>
              <EditButton id={landlord._id} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Grid>
    );
  });

  return <div>{landlordsData}</div>;
};

export default Landlords;
