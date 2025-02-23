import ReactPlayer from 'react-player';

const MusicPlayer = ({ shouldPlay = true }) => {
  return (
    <div>
      <ReactPlayer
        url="/Haxophone/haxophoneBackground.mp3"  // Replace with your actual GitHub Pages URL
        playing={shouldPlay}  // Automatically start playing
        controls={false} // Hide controls (no UI elements)
        volume={0.8}     // Adjust volume (0 to 1)
        width="0"        // Set width to 0 to hide the player visually
        height="0"       // Set height to 0 to hide the player visually
        muted={false}    // Ensure it's not muted
        loop={true}      // Loop the audio
      />
    </div>
  );
};

export default MusicPlayer;

