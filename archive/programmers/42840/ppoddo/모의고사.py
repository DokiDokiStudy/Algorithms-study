def solution(answers):
    
    pattern1 = [1, 2, 3, 4, 5]
    pattern2 = [2, 1, 2, 3, 2, 4, 2, 5]
    pattern3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]

    counts = [0] * 3
    result = []

    for i in range(len(answers)):
        answer = answers[i]
        if answer == pattern1[i % len(pattern1)]:
            counts[0] += 1

        if answer == pattern2[i % len(pattern2)]:
            counts[1] += 1

        if answer == pattern3[i % len(pattern3)]:
            counts[2] += 1

    max_count = max(counts)
    for i in range(3):
        if counts[i] == max_count:
            result.append(i + 1)

    return result