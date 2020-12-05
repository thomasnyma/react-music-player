import LibrarySong from './LibrarySong';

const Library = ({songs, setSongs, setCurrentSong, audioRef, isPlaying, libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => (
                    <LibrarySong
                    isPlaying={isPlaying}
                    audioRef={audioRef}
                    songs={songs}
                    song={song}
                    setSongs={setSongs}
                    setCurrentSong={setCurrentSong}
                    id={song.id}
                    key={song.id} />
                ))}
            </div>
        </div>
    )
}

export default Library;