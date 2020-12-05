// Styles
import './styles/app.scss';
// Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Navigation from './components/Navigation';
// Util
import data from './data';
import { useRef, useState } from 'react';

function App() {
  // Ref
  const audioRef = useRef(null);
  // State
  const [ songs, setSongs ] = useState(data());
  const [ currentSong, setCurrentSong ] = useState(songs[0]);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ songInfo, setSongInfo ] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  })
  const [ libraryStatus, setLibraryStatus ] = useState(false);
  // Event Handlers
  const timeUpdateHandler = (event) => {
    const current = event.target.currentTime;
    const duration = event.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log(animation);
    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage:animation})
  }
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if (isPlaying) audioRef.current.play();
  }

  return (
    <div className="App">
      <Navigation libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
      audioRef={audioRef}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      currentSong={currentSong}
      setCurrentSong={setCurrentSong}
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      songs={songs}
      setSongs={setSongs} />
      <Library
      audioRef={audioRef}
      songs={songs}
      setSongs={setSongs}
      setCurrentSong={setCurrentSong}
      isPlaying={isPlaying} 
      libraryStatus={libraryStatus} />
      <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          onEnded={songEndHandler}
          ref={audioRef}
          src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
