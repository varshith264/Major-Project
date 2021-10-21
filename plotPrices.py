import pandas as pd
import matplotlib.pyplot as plt

filePath = "CSVDatasets/Ethereum Historical Data - Investing.com India.csv"

data = pd.read_csv(filepath_or_buffer=filePath)

highValues = data["High"]
lowValues = data["Low"]
dates = data["Date"]
averageCost = []
index = []

for i in range(len(highValues)):
    averageCost.append(
        (float(highValues[i].replace(",", "")) +
         float(lowValues[i].replace(",", "")))/2
    )
    index.append(i+1)
averageCost = averageCost[::-1]

plt.plot(index, averageCost)
plt.ylabel('cost in dollars')
plt.xlabel("since " + dates[len(dates)-1])


# filePath = "/content/drive/MyDrive/S7 Project/Crypto dataset/CSVDatasets/Bitcoin Historical Data - Investing.com India.csv"

# data = pd.read_csv(filepath_or_buffer=filePath)

# highValues = data["High"]
# lowValues = data["Low"]
# averageCost = []
# index = []

# for i in range(len(highValues)):
#     averageCost.append(
#         (float(highValues[i].replace(",", "")) +
#          float(lowValues[i].replace(",", "")))/2
#     )
#     index.append(i+1)
# averageCost = averageCost[::-1]

# # plt.plot(index, averageCost)
# plt.plot(index[2500:], averageCost[2500:])
# plt.ylabel('cost in dollars')
# plt.xlabel('since 2016')
