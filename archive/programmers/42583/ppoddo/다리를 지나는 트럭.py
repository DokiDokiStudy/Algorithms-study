from collections import deque

def solution(bridge_length, weight, truck_weights):
    bridge = deque([0] * bridge_length)
    trucks = deque(truck_weights)
    current_bridge_weight = 0
    current_time = 0

    while trucks or current_bridge_weight > 0:
        current_time += 1
        out = bridge.popleft()
        current_bridge_weight -= out
        if trucks and current_bridge_weight + trucks[0] <= weight:
            t = trucks.popleft()
            bridge.append(t)
            current_bridge_weight += t
        else:
            bridge.append(0)

    return current_time