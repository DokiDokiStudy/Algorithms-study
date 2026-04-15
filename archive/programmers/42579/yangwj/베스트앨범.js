function solution(genres, plays) {
  const genreMap = new Map();

  genres.forEach((genre, i) => {
    genreMap.set(genre, {
      sum: (genreMap.get(genre)?.sum || 0) + plays[i],
      info: [...(genreMap.get(genre)?.info || []), { id: i, play: plays[i] }],
    });
  });

  return [...genreMap]
    .sort((a, b) => b[1].sum - a[1].sum)
    .flatMap((item) => {
      const info = item[1].info;
      return info
        .sort((a, b) => b.play - a.play || a.id - b.id)
        .slice(0, 2)
        .map((i) => i.id);
    });
}