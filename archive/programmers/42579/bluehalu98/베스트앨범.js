function solution(genres, plays) {
 const totalLength = genres.length;
  const songInfo = new Map();
  const result = [];
  for (let i = 0; i < totalLength; i++) {
    if (songInfo.has(genres[i])) {
      const stored = songInfo.get(genres[i]);
      stored[i] = plays[i];
      stored.total += plays[i];
      songInfo.set(genres[i], stored);
    } else {
      songInfo.set(genres[i], { [i]: plays[i], total: plays[i] });
    }
  }

  const sortedGenres = [...songInfo].sort((a, b) => b[1].total - a[1].total);
  sortedGenres.forEach((genre) => {
    const songs = Object.entries(genre[1]);
    songs.pop();
    const sorted = Object.entries(songs)
      .map((e) => e[1])
      .sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < 2; i++) {
      if (sorted[i]) {
        result.push(+sorted[i][0]);
      }
    }
  });

  return result;
}