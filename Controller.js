
var boardSize=15

var board = new Array(boardSize) // initialize 2 dim array with 0
for(var i = 0; i< boardSize;i++){
  board[i] = new Array(boardSize)
  for(var j = 0; j< boardSize;j++){
    board[i][j]=-1;
  }
}
var flag = 1
// cell status{
//   -1: blank,
//   0: white,
//   1: black
// }
// start from black


var blackChess = document.createElement("div")
blackChess.className +="black-chess"
var whiteChess = document.createElement("div")
whiteChess.className +="white-chess"

init()


var chessboard = document.getElementsByClassName('chessboard')[0]
var list = chessboard.children

function init(){
  var app = document.getElementById("app")
  var cb = document.createElement("div")
  cb.className="chessboard"
  var cell = document.createElement("div")
  for(var i =0; i<225;i++){
   setTimeout(function(){
     var cell = document.createElement("div")
     cell.onclick=Tap
     cb.appendChild(cell)},0)
  }
  app.appendChild(cb)
  console.log(app)
}



function Tap(event){
  var rowId
  var colId
  var currentNode = event.target
  for(var i = 0; i <list.length;i++){
    if(list.item(i)==currentNode){
      id=i
      break;
    }
  }
  rowId = Math.floor(id/15)   //Math.floor() = (int)
  colId = id%15
  console.log(rowId,colId)
  if(tetsuki(rowId,colId)){    //tetsuki means playing a chess on the board in Japanese
    updateView(currentNode,flag)
    if(check(rowId,colId,flag)){
      victory(flag);
      flag=1
      return;
    }
    flag=flag^1   //switch
  }else{  // the cell is unavailale
    alert("Please play in an available cell.")
  }
  // console.log("id:"+id)

  console.log(list)
}

function tetsuki(rowId,colId) {
  console.log(rowId,colId)
  console.log(board)
  if(board[rowId][colId]!=-1){ //unavailale
    return false;
  }
  board[rowId][colId] = flag
  return true;
}

function check(rowId, colId, flag){
  var cnt=0;
  for(var i =0;i<boardSize;i++){  //check horizontally
    if(board[rowId][i]==flag){
      cnt++;
      if(cnt==5){
        return true;
      }
    }else{
      cnt=0;
    }
  }
  cnt=0

  for(var i =0;i<boardSize;i++){  //check vertically
    if(board[i][colId]==flag){
      cnt++;
      if(cnt==5){
        return true;
      }
    }else{
      cnt=0;
    }
  }
  cnt=0

  diagonalidx = rowId+colId
  idx = 14-diagonalidx
  console.log(diagonalidx,idx)

  if(idx>=0){
    for(var i = 0;i<diagonalidx+1;i++){  //check diagonally
      if(board[0+i][diagonalidx-i]==flag){
        cnt++;
        if(cnt==5){
          return true;
        }
      }else{
        cnt=0;
      }
    }
  }else{
    idx*=-1
    for(var i = 0;i<29-diagonalidx;i++){  //over diagonal
      if(board[idx+i][14-i]==flag){
        cnt++;
        if(cnt==5){
          return true;
        }
      }else{
        cnt=0;
      }
    }
  }
  cnt=0

  diagonalidx = rowId+14-colId
  idx = 14-diagonalidx
  if(idx>=0){
    for(var i = 0;i<diagonalidx+1;i++){  //check diagonally - turnover
      if(board[0+i][14-diagonalidx+i]==flag){
        cnt++;
        if(cnt==5){
          return true;
        }
      }else{
        cnt=0;
      }
    }
  }else{
    idx*=-1
    for(var i = 0;i<29-diagonalidx;i++){  //over diagonal
      if(board[idx+i][0+i]==flag){
        cnt++;
        if(cnt==5){
          return true;
        }
      }else{
        cnt=0;
      }
    }
  }
  cnt=0
  return false;
}

function updateView(obj,flag){
  var chess;
  if(flag==1){
    chess = blackChess
  }else{
    chess = whiteChess
  }
  obj.appendChild(chess.cloneNode(true))
  console.log(obj)
}

function victory(flag){
  if(flag==1){
    winner = "black"
  }else{
    winner = "white"
  }
  alert("Congratulation, "+winner+" win.Click and start a new game.")
  cleanChess()
}

function cleanChess() {
  for(var i =0; i< list.length;i++) {
    list.item(i).innerHTML=""
  }
  for(var i = 0; i< boardSize;i++){
    for(var j = 0; j< boardSize;j++){
      board[i][j]=-1;
    }
  }
}
