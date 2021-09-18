let games = []
exports.createMatch = function createMatch(match) {
    let matchIndex = games.findIndex(game => game.matchId === match.matchId)
    if(matchIndex === -1) {
        let game = { matchId: match.matchId , 
            users: {
                user1: JSON.stringify(match.player1) ,
                user2: JSON.stringify(match.player2)
            } ,
            game: Array(9).fill(null) ,
            currentUser: null 
        }
        games.push(game)
    }
    return
}
exports.calculateGame = function calculateGame(matchId , user , moveIndex) {
    let currentGame = games.find(game => matchId === game.matchId)
    let currentGameIndex = games.findIndex(game => game.matchId === matchId)
    let userTurnMapper = {
        user1 : 'X',
        user2 : 'O'
    }
    let users = [
         {
             name: JSON.parse(currentGame.users.user1).name ,
             id: JSON.parse(currentGame.users.user1).id ,
             turn: userTurnMapper.user1
         } , 
         {
             name: JSON.parse(currentGame.users.user2).name ,
             id: JSON.parse(currentGame.users.user2).id ,
             turn: userTurnMapper.user2
         }
        ]
    let currentUser = users.find(player => player.id === user.id)
    
    let winner = null;
    
    games[currentGameIndex].game[moveIndex] = currentUser.turn;
    
    let winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i in winPatterns) {
        let [a  , b , c] = winPatterns[i]
        if (currentGame.game[a] && currentGame.game[a] === currentGame.game[b] && currentGame.game[a] === currentGame.game[c]) {
            winner = currentUser
        }
    }
    
    
    currentGame.currentUser = currentUser
    return {
        currentGame , winner , currentUser
    }
}

exports.RemoveMatch = function RemoveMatch(matchId) {
     games.filter(game => game.matchId !== matchId)
    return games
}

exports.ResetMatch = function ResetMatch(matchId) {
   let indexOfGame = games.findIndex(game => game.matchId === matchId)
   games[indexOfGame].game = Array(9).fill(null)
   return games
}


exports.FindMatch = function FindMatch(matchId) {
    let matchIndex = games.findIndex(game => game.matchId === matchId)

    return games[matchIndex]
}

