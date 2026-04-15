function solution(genres, plays) {
  // map 생성: map[장르] = [[인덱스, 플레이 횟수], ..., [...]]
  // map2 생성: counting
  const result = [];

  const infoMap = {};
  const countMap = {};

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const play = plays[i];

    if (!infoMap[genre]) {
      infoMap[genre] = [];
      countMap[genre] = 0;
    }
    infoMap[genre].push([i, play]);
    countMap[genre] += play;
  }

  const sortedCount = Object.entries(countMap).sort((a, b) => b[1] - a[1]);

  for (const [genre, count] of sortedCount) {
    const info = infoMap[genre];

    info.sort((a, b) => b[1] - a[1] || a[0] - b[0]);

    info.length === 1
      ? result.push(info[0][0])
      : result.push(info[0][0], info[1][0]);
  }
  return result;
}
