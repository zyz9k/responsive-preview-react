import React, { useEffect } from "react";

const YouTubeVideoLoop = () => {
  useEffect(() => {
    // Load the YouTube API script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    // Create the YouTube Player when API is ready
    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("youtube-player", {
        videoId: "OdNYJjJ-Vwk", // Replace with your video ID
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          modestbranding: 1,
          fs: 0,
          rel: 0,
          start: 0,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(0); // Replay video seamlessly
            }
          },
        },
      });
    };

    return () => {
      // Cleanup script if the component unmounts
      document.body.removeChild(tag);
    };
  }, []);

  return (
    <div>
      <div
        id="youtube-player"
        style={{ width: "485px", height: "862px" }}
      ></div>
    </div>
  );
};

export default YouTubeVideoLoop;
