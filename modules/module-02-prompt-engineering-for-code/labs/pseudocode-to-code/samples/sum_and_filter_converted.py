numbers = [3, 8, 12, 5, 20]
threshold = 10
total = 0

for value in numbers:
    if value >= threshold:
        total += value

print("Filtered sum:")
print(total)
