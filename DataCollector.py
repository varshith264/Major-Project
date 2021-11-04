import requests
from TimeStamps import year2017
import csv
import pandas as pd


coins = ['ETH', 'ADA', 'XRP', 'SOL', 'MATIC', 'LTC', 'BNB', 'ALGO', 'DOT']
for coinName in coins:
    f = open("5minDataSets/"+coinName+".csv", "a", newline="")
    writer = csv.writer(f)
    for i in range(0,len(year2017),3):
        if i+3 < len(year2017):
            print(year2017[i], year2017[i+3], i, coinName)
            response = requests.get(
                "https://api2.binance.com/api/v3/klines?symbol="+coinName+"USDT&interval=5m&startTime="+str(int(year2017[i])) + "000" + "&endTime=" + str(int(year2017[i+3])) + "000"+"&limit=864")
            for j in response.json():
                writer.writerow(j[:-1])
    f.close()


