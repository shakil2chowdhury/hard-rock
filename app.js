const search = async () => {
    const songInput = document.getElementById('song-input').value;
    const url = `https://api.lyrics.ovh/suggest/${songInput}`;
    const res = await fetch(url);
    const datas = await res.json();
    getSongs(datas.data);
}

const getSongs = songs => {
    document.getElementById('song-container').innerHTML = '';
    document.getElementById('lyrics-container').innerText = '';
    const songContainer = document.getElementById('song-container');
    songs.forEach(song => {
        console.log(song.title);
        const songDiv = document.createElement('div');
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                        <source src="${song.preview}" type="audio/mpeg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `
        songContainer.append(songDiv);
    });
}

const getLyrics = async (artist, title) => {
    url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const res = await fetch(url);
    const datas = await res.json();
    displayLyrics(datas.lyrics);
}

const displayLyrics = lyrics => {
    document.getElementById('lyrics-container').innerText = '';
    const lyricsContainer = document.getElementById('lyrics-container');
    console.log(lyrics);
    lyricsContainer.innerText = lyrics;
}