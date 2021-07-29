#include <bits/stdc++.h>

#define ll long long int
#define ld long long double

#define pro(i, a, b) for(auto i=(a);i<(b);++i)
#define reg(i, a, b) for(auto i=(b);i>(a);--i)
#define testcases int tcses;cin>>tcses;while(tcses--)

const int INF=1e9,MOD=1e9+7;
using namespace std;
map<ll,vector<int>> dp1,dp2;

int calculatewinner(vector<int> squares){
    vector<vector<int>> lines = {
        {0,1,2},
        {3,4,5},
        {6,7,8},
        {0,3,6},
        {1,4,7},
        {2,5,8},
        {0,4,8},
        {2,4,6},
    };
    for(int i=0;i<8;++i){
        if(squares[lines[i][0]] && squares[lines[i][1]]==squares[lines[i][0]] && squares[lines[i][2]]==squares[lines[i][0]]){
        return squares[lines[i][0]];
        }
    }
    return 0;
}

vector<int> backtracking(vector<int>squares,int player){
    ll id=0,p=1;
    pro(i,0,9){
        id+=p*squares[i];
        p*=3;
    }
    if(player==1 && dp1.find(id)!=dp1.end()){
        return dp1[id];
    }
    else if(player==2 && dp2.find(id)!=dp2.end()){
        return dp2[id];
    }
    int isover=calculatewinner(squares);
    if(isover){
        return {isover,-1,-INF};
    }
    vector<int> possiblemoves;
    pro(i,0,9){
        if(squares[i]==0)
            possiblemoves.push_back(i);
    }
    int nxt = (player==1)?2:1,wincnt=0,move;
    vector<int> bestmove={0,-1,INF};
    for(auto i:possiblemoves){
        squares[i]=player;
        vector<int> state = backtracking(squares,nxt);
        if(state[0]==player){
            wincnt++;
            if(bestmove[0]!=player || state[2]<bestmove[2]){
                bestmove=state;move=i;
            }
        }
        else if(state[0]==nxt){
            if(bestmove[2]==INF){
                bestmove=state;move=i;
            }
            wincnt--;
        }
        else{
            if(bestmove[0]==nxt || (bestmove[0]==0 && state[2]<bestmove[2])){
                bestmove=state;move=i;
            }
        }
        squares[i]=0;
    }
    if(player==1)
        dp1[id]={bestmove[0],move,wincnt};
    else
        dp2[id]={bestmove[0],move,wincnt};
    return {bestmove[0],move,wincnt};
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);
    vector<int> squares(9,0);
    backtracking(squares,2);
    for(int i=0;i<9;i++){
        squares[i]=1;
        vector<int> tmp=backtracking(squares,2);
        squares[i]=0;
    }
    bool play=true;
    vector<int> board(9,0);
    while(play){
        bool draw=false;
        vector<int>comp=backtracking(board,2);
        if(comp[1]>=0){
            board[comp[1]]=2;
        }
        else{
            draw=true;
            play=false;
        }
        int i=0;
        while(i<9){
            cout<<board[i]<<" "<<board[i+1]<<" "<<board[i+2]<<"\n";
            i+=3;
        }cout.flush();
        if(draw){
            cout<<"DRAW\n";
            break;
        }
        int winner=calculatewinner(board);
        if(winner){
            cout<<winner<<" has won";
            play=false;
            break;
        }
        int tmp;
        cin>>tmp;
        board[tmp]=1;
    }
    return 0;
}