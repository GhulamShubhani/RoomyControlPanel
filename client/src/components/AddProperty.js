import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import InputDropDown from "./postPropertyComponents/InputDropDown";
import TextInput from "./postPropertyComponents/TextInput";
import VideoInput from "./postPropertyComponents/VideoInput";
import { PropertyActions } from "../store/Property";
import ImageInput from "./postPropertyComponents/ImageInput";
import ImagesInput from "./postPropertyComponents/ImagesInput";

const PostProperty = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const toastOptions = {
    autoClose: 3000,
    closeButton: true,
    position: "bottom-right",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const {
    edit,
    id,
    type,
    quantity,
    quantityTaken,
    preferedRentType,
    monthlyPrice,
    weeklyPrice,
    dailyPrice,
    deposit,
    depositPrice,
    description,
    posterType,
    city,
    location,
    buildingName,
    appartmentNumber,
    floorNumber,
    firstName,
    lastName,
    email,
    phone,
    numberOfPeople,
    gender,
    grouping,
    nationality,
    smoking,
    drinking,
    visitors,
    poster,
    cooking,
  } = useSelector((state) => state.property);

  const EditProductHandler = async (id) => {
    if (validatioHandler()) {
      const address = {
        city,
        location,
        buildingName,
        appartmentNumber,
        floorNumber,
      };

      const agentInfo = {
        firstName,
        lastName,
        email,
        phone,
      };

      const socialPreferences = {
        numberOfPeople,
        gender,
        grouping,
        nationality,
        smoking,
        drinking,
        visitors,
        cooking,
      };
      const obj = {
        id,
        type,
        quantity: Number(quantity),
        quantityTaken: Number(quantityTaken),
        preferedRentType,
        monthlyPrice: Number(monthlyPrice),
        weeklyPrice: Number(weeklyPrice),
        dailyPrice: Number(dailyPrice),
        deposit,
        depositPrice: Number(depositPrice),
        description,
        posterType,
        address,
        agentInfo,
        socialPreferences,
        poster,
      };
      const { data } = await axios.post(
        "http://localhost:8000/editProperty",
        obj,
        { headers: { Authorization: token } }
      );
      navigate("/");
      console.log(data);
    }
  };

  const postProductHandler = async () => {
    if (validatioHandler()) {
      const address = {
        city,
        location,
        buildingName,
        appartmentNumber,
        floorNumber,
      };

      const agentInfo = {
        firstName,
        lastName,
        email,
        phone,
      };

      const socialPreferences = {
        numberOfPeople,
        gender,
        grouping,
        nationality,
        smoking,
        drinking,
        visitors,
        cooking,
      };
      const obj = {
        type,
        quantity: Number(quantity),
        quantityTaken: Number(quantityTaken),
        preferedRentType,
        monthlyPrice: Number(monthlyPrice),
        weeklyPrice: Number(weeklyPrice),
        dailyPrice: Number(dailyPrice),
        deposit,
        depositPrice: Number(depositPrice),
        description,
        posterType,
        address,
        agentInfo,
        socialPreferences,
      };
      const { data } = await axios.post(
        "http://localhost:8000/postProperty",
        obj,
        { headers: { Authorization: token } }
      );
      navigate("/");
      console.log(data);
    }
  };

  const validatioHandler = () => {
    if (!type) {
      toast.error("Type is required", toastOptions);
      return false;
    }
    if (!quantity) {
      toast.error("Quantity is required", toastOptions);
      return false;
    }
    // if (!quantityTaken) {
    //   toast.error("Quantity taken is required", toastOptions);
    //   return false;
    // }
    if (!preferedRentType) {
      toast.error("Prefered Rent Type is required", toastOptions);
      return false;
    }
    if (!monthlyPrice) {
      toast.error("Monthly Price is required", toastOptions);
      return false;
    }
    if (!weeklyPrice) {
      toast.error("Weekly Price is required", toastOptions);
      return false;
    }
    if (!dailyPrice) {
      toast.error("Daily Price is required", toastOptions);
      return false;
    }

    if (deposit === "") {
      toast.error("Deposit is required", toastOptions);
      return false;
    }
    if (deposit === true && !depositPrice) {
      toast.error("Deposit Price is required", toastOptions);
      return false;
    }
    if (!description) {
      toast.error("Description is required", toastOptions);
      return false;
    }
    if (!posterType) {
      toast.error("Poster Type is required", toastOptions);
      return false;
    }
    if (!city) {
      toast.error("City is required", toastOptions);
      return false;
    }
    if (!location) {
      toast.error("Location is required", toastOptions);
      return false;
    }
    if (!buildingName) {
      toast.error("Building Name is required", toastOptions);
      return false;
    }
    if (!appartmentNumber) {
      toast.error("Appartment Number is required", toastOptions);
      return false;
    }

    if (!floorNumber) {
      toast.error("Floor Number is required", toastOptions);
      return false;
    }
    if (!firstName) {
      toast.error("First Name is required", toastOptions);
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required", toastOptions);
      return false;
    }
    if (!email) {
      toast.error("Email is required", toastOptions);
      return false;
    }
    if (!phone) {
      toast.error("Phone is required", toastOptions);
      return false;
    }
    if (!numberOfPeople) {
      toast.error("Number Of Peoples is required", toastOptions);
      return false;
    }
    if (!gender) {
      toast.error("Gender is required", toastOptions);
      return false;
    }
    if (!grouping) {
      toast.error("Grouping is required", toastOptions);
      return false;
    }
    if (!nationality) {
      toast.error("Nationality is required", toastOptions);
      return false;
    }

    if (!smoking) {
      toast.error("Smoking is required", toastOptions);
      return false;
    }
    if (!drinking) {
      toast.error("Drinking is required", toastOptions);
      return false;
    }
    if (!visitors) {
      toast.error("Visitors is required", toastOptions);
      return false;
    }
    if (!cooking) {
      toast.error("Cooking is required", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} container justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
              Please fill the following information to post your property
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6} md={4}>
                <InputDropDown
                  label="Property Type"
                  name="type"
                  values={["Bed", "Room", "Master Room", "Partition"]}
                  value={type}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextInput label="How Many?" name="quantity" value={quantity} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextInput
                  label="How Many Occupied?"
                  name="quantityTaken"
                  value={quantityTaken}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <InputDropDown
                  label="Preferred Rent Type"
                  name="preferedRentType"
                  values={["Monthly", "Weekly", "Daily"]}
                  value={preferedRentType}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextInput
                  label="Monthly Price"
                  name="monthlyPrice"
                  value={monthlyPrice}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextInput
                  label="Weekly Price"
                  name="weeklyPrice"
                  value={weeklyPrice}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextInput
                  label="Daily Price"
                  name="dailyPrice"
                  value={dailyPrice}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <InputDropDown
                  label="Deposit"
                  name="deposit"
                  value={deposit}
                  values={["true", "false"]}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextInput
                  label="How Much Deposit ?"
                  name="depositPrice"
                  value={depositPrice}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextInput
                  label="Description"
                  name="description"
                  value={description}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <InputDropDown
                  label="Are you ?"
                  name="posterType"
                  values={["Landlord", "Agent/Broker"]}
                  value={posterType}
                />
              </Grid>
            </Grid>
            <Grid>
              <Typography
                sx={{ fontSize: "15px", fontWeight: "bolder", mt: 5 }}
              >
                Property Address
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput label="City" name="city" value={city} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput
                    label="Location"
                    name="location"
                    value={location}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput
                    label="Building Name"
                    name="buildingName"
                    value={buildingName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput
                    label="Apartment Number"
                    name="appartmentNumber"
                    value={appartmentNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput
                    label="Floor Number"
                    name="floorNumber"
                    value={floorNumber}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Typography
                sx={{ fontSize: "15px", fontWeight: "bolder", mt: 5 }}
              >
                Help everyone imagine What it's like to live at your property
                upload clear photos and videos of your property
              </Typography>
              <Grid item xs={12} sm={6} md={4}>
                <VideoInput />
                <ImageInput />
                <ImagesInput />
              </Grid>
            </Grid>
            <Grid>
              <Typography
                sx={{ fontSize: "15px", fontWeight: "bolder", mt: 5 }}
              >
                Agent Information
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput
                    label="First Name"
                    name="firstName"
                    value={firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput label="Email" name="email" value={email} />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextInput label="Phone" name="phone" value={phone} />
                </Grid>
              </Grid>
            </Grid>
            <Grid>
              <Typography
                sx={{ fontSize: "15px", fontWeight: "bolder", mt: 5 }}
              >
                About Your Property
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <InputDropDown
                    label="How many peoples in your property"
                    name="numberOfPeople"
                    values={["0-1", "1-5", "5-10", "10-15", "15-20", "+20"]}
                    value={numberOfPeople}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputDropDown
                    label="Gender of the people who live in your property"
                    name="gender"
                    values={["Male", "Female", "Mix"]}
                    value={gender}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputDropDown
                    label="Grouping"
                    name="grouping"
                    values={["Single", "Couple"]}
                    value={grouping}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputDropDown
                    label="The nationality of the people who live on your property"
                    name="nationality"
                    values={[
                      "Mix",
                      "African",
                      "American",
                      "Arab",
                      "Asian",
                      "Australian",
                      "Bengali",
                      "Eastern European",
                      "European",
                      "Filipino",
                      "Indian",
                      "Latino",
                      "Nepali",
                      "Pakistani",
                      "Russian",
                      "Turkish",
                    ]}
                    value={nationality}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputDropDown
                    label="Smoking Allowed"
                    name="smoking"
                    values={["yes", "no"]}
                    value={smoking}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputDropDown
                    label="Drinking Allowed"
                    name="drinking"
                    values={["yes", "no"]}
                    value={drinking}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputDropDown
                    label="Visitors Allowed"
                    name="visitors"
                    values={["yes", "no"]}
                    value={visitors}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <InputDropDown
                    label="Cooking Allowed"
                    name="cooking"
                    values={["yes", "no"]}
                    value={cooking}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          sx={{ mt: 5, mb: 3 }}
        >
          {!edit && (
            <Button
              color="success"
              variant="contained"
              onClick={postProductHandler}
            >
              Add Property
            </Button>
          )}
          {edit && (
            <Button
              color="success"
              variant="contained"
              onClick={() => EditProductHandler(id)}
            >
              Edit Property
            </Button>
          )}
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button color="info" variant="outlined" onClick={() => navigate("/")}>
            Back To Panel
          </Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default PostProperty;
