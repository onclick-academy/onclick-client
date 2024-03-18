import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const Video = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "absolute", top: "45%", left: "46%" }}>
      {/* Play button icon */}
      <PlayArrowIcon
        onClick={handleOpen}
        sx={{
          color: "#553CDF",
          cursor: "pointer",
          fontSize: "70px",
          backgroundColor: "white",
          borderRadius: "50%",
          "&:hover": {
            color: "#2e1f85",
          },
        }}
      />

      {/* Dialog to display YouTube video */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {/* Embed the YouTube video here */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ezbJwaLmOeM"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Video;
