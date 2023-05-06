import React, { useState } from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const ImageInput = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle errors
        console.error(error);
      },
      async () => {
        // Handle successful upload
        const url = await storageRef.getDownloadURL();
        console.log(url);
        setImageUrl(url);
      }
    );
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <IconButton component="label">
          <PhotoCamera />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>{imageUrl ? "Image selected" : "Select image"}</Typography>
      </Grid>
    </Grid>
  );
};

export default ImageInput;
