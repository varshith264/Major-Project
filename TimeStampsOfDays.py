from datetime import datetime

timeStamps = []
year = 2021
months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
print(sum(months))

for i in range(9):
    for j in range(months[i]):
        now = datetime(year, i+1, j+1)
        timeStamps.append(datetime.timestamp(now))

print(timeStamps)
print(len(timeStamps))

# print(datetime.fromtimestamp(1502735400.0))



# now = datetime(2021, 1, 7)
# timestamp = datetime.timestamp(now)
# print("timestamp =", timestamp)
