import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { PropertyActions } from "../store/Property";
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
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const properties = useSelector((state) => state.property.properties);
  const [expandedLandlordId, setExpandedLandlordId] = useState(null);

  const fetchLandlords = async () => {
    const { data } = await axios.get("http://localhost:8000/allProperties");
    console.log(data.properties);

    dispatch(PropertyActions.properties(data.properties));
  };

  const EditButton = ({ onClick, id }) => {
    return (
      <Button variant="outlined" onClick={() => editProperty(id)}>
        Edit
      </Button>
    );
  };

  const editProperty = async (id) => {
    dispatch(PropertyActions.edit(true));
    const { data } = await axios.post("http://localhost:8000/getProperty", {
      id,
    });
    dispatch(PropertyActions.editedData(data.property));
    navigate("/Properties");
  };

  useEffect(() => {
    fetchLandlords();
  }, []);

  const handleExpandClick = (id) => {
    setExpandedLandlordId(id === expandedLandlordId ? null : id);
  };

  const propertiesData = properties?.map((landlord) => {
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
          <Box mr={1}>{landlord.type} to rent</Box>
          <Box mr={1}>{landlord.monthlyPrice} AED</Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            {landlord.address.appartmentNumber},{landlord.address.buildingName},{" "}
            {landlord.address.floorNumber},{landlord.address.location},{" "}
            {landlord.address.city},{" "}
          </Box>
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
              <Box>Monthly Price: {landlord.monthlyPrice}</Box>
              <Box>Weekly Price: {landlord.weeklyPrice}</Box>
              <Box>Daily Price: {landlord.dailyPrice}</Box>
              {landlord.deposit ? (
                <Box>Deposit Price: {landlord.dailyPrice}</Box>
              ) : (
                ""
              )}
              <Box>
                Agent Information:
                <Box>
                  {landlord.agentInfo.firstName} {"  "}{" "}
                  {landlord.agentInfo.lastName}
                </Box>
                <Box></Box>
                <Box>email: {landlord.agentInfo.email}</Box>
                <Box>phone: {landlord.agentInfo.phone}</Box>
              </Box>

              <Box>
                Preferences:
                <Box>People: {landlord.socialPreferences.numberOfPeople}</Box>
                <Box>Nationality: {landlord.socialPreferences.nationality}</Box>
                <Box>
                  Visitors allowed:{" "}
                  {landlord.socialPreferences.visitors ? "Yes" : "No"}
                </Box>
                <Box>
                  Drinking Allowed:{" "}
                  {landlord.socialPreferences.drinking ? "Yes" : "No"}
                </Box>
                <Box>
                  Smoking Allowed:{" "}
                  {landlord.socialPreferences.smoking ? "Yes" : "No"}
                </Box>
                <Box>Gender Preferred: {landlord.socialPreferences.gender}</Box>
              </Box>
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

  return <div>{propertiesData}</div>;
};

export default Properties;
