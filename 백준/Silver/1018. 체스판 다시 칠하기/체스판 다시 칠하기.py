n,m=map(int,input().split())

cnt=[]
arr= [input() for _ in range(n)]
    
for row in range(n-7):
    for low in range(m-7):

        w_index=0 
        b_index=0 

        for i in range(row,row+8):
            for j in range(low,low+8):

                if (i+j)%2==0:
                    if arr[i][j]!='W':
                        w_index+=1
                    else:
                        b_index+=1
                else:
                    if arr[i][j]!='W':
                        b_index+=1
                    else:
                        w_index+=1
                        
        cnt.append(w_index) 
        cnt.append(b_index) 

print(min(cnt))