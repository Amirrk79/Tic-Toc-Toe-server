let queue = []

exports.MatchQueue = function MatchQueue(data) {
    if(data) {
        let matchIdIndex = queue.findIndex(match => match.matchId === data.matchId)
        if(matchIdIndex === -1) {
            queue.push({ matchId: data.matchId , player1: {name : data.playerName , id: data.playerId} ,
                 player2: {name: null , id: null}})
        } else if (queue[matchIdIndex].player1.id === data.playerId) {
            return
        } else {
            queue[matchIdIndex].player2 = {name: data.playerName , id: data.playerId}
        }
    }
    
    return queue
}

exports.RemoveQueue = function RemoveQueue(matchId) {
     queue.filter(match => match.matchId !== matchId)
    return queue
}