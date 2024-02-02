import myAudio from "../assets/OnlyCats.mp3";

const MyAudioComponent = () => {
  return (
    <div>
      <audio controls>
        <source src={myAudio} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MyAudioComponent;
