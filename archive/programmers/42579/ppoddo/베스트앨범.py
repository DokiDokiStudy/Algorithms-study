from collections import Counter, defaultdict

def solution(genres, plays):
    answer = []
    # 같은 인덱스번호에 있는 장르와 재생횟수는 하나의 노래
    genre_total = Counter()
    genre_songs = {}
    
    for i, (g, p) in enumerate(zip(genres, plays)):
        genre_total[g] += p
        genre_songs.setdefault(g, []).append((i, p))
    
    answer = []
    # 많이 재생된 장르 먼저 정렬해서 뽑기
    for genre, _ in genre_total.most_common():
        # 장르 내 노래를 재생횟수가 많거나, 같으면 고유번호 기준으로 낮은순으로 정렬
        sorted_songs = sorted(genre_songs[genre], key=lambda x: (-x[1], x[0]))
        # 장르당 최대 2곡
        answer.extend([i for i, _ in sorted_songs[:2]])
    
    return answer