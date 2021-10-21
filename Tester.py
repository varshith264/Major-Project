import csv
f = open("people.csv", "a", newline="")
tup1 = [1,2,3,4]
writer = csv.writer(f)
writer.writerow(tup1)
tup2 = [1, 2, 3, 4]
writer.writerow(tup2)
f.close()
