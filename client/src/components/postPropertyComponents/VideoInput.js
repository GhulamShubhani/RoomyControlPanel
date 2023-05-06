import React, { useState } from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import { VideoCameraFront } from "@mui/icons-material";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const VideoInput = () => {
  const [videoSrc, setVideoSrc] = useState(null);

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `videos/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await storageRef.getDownloadURL();
    console.log(url);
    setVideoSrc(url);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <IconButton component="label">
          <VideoCameraFront />
          <input
            type="file"
            accept="video/*"
            style={{ display: "none" }}
            onChange={handleVideoChange}
          />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>{videoSrc ? "Video selected" : "Select video"}</Typography>
      </Grid>
    </Grid>
  );
};

export default VideoInput;
