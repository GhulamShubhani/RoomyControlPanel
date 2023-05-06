import React, { useState } from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const ImageInput = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const urls = [];

    const storage = getStorage();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await storageRef.getDownloadURL();
      urls.push(url);
    }

    setImageUrls(urls);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <IconButton component="label">
          <AddAPhoto />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            multiple
            onChange={handleImageChange}
          />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>{imageUrls.length} images selected</Typography>
      </Grid>
    </Grid>
  );
};

export default ImageInput;
