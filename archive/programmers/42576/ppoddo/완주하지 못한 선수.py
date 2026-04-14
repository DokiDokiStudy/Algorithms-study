from collections import Counter

def solution(participant, completion):
    count = Counter(participant) - Counter(completion)
    # count = Counter({'leo': 1})
    return list(count.keys())[0]