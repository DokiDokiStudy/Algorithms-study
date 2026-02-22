import sys

def to_min(s):
    h, m = map(int, s.split(":"))
    return h * 60 + m

def solution(plans):
    answer = []
    waiting_plans = []
    plans = [(name, to_min(start), int(playtime)) for name, start, playtime in plans]
    plans.sort(key=lambda x: x[1])

    for i in range(len(plans)):
        name, start, playtime = plans[i]

        if i + 1 < len(plans):
            available = plans[i+1][1] - start

            if playtime <= available:
                answer.append(name)
                remaining = available - playtime
                while waiting_plans and remaining > 0:
                    w_name, w_time = waiting_plans.pop()
                    if w_time <= remaining:
                        answer.append(w_name)
                        remaining -= w_time
                    else:
                        waiting_plans.append((w_name, w_time - remaining))
                        break
            else:
                waiting_plans.append((name, playtime - available))
        else:
            answer.append(name)
            while waiting_plans:
                answer.append(waiting_plans.pop()[0])
    return answer