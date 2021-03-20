class Rover {
  constructor (position, mode = "NORMAL", generatorWatts = 110) {
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
   }
   receiveMessage(messageReceived) {
     let receivedMessage = {
       message: messageReceived.name,
       results: []
     }

      for (let i=0; i < messageReceived.commands.length; i++) {
       let myCommand = messageReceived.commands[i]
       let response = {completed:true,roverStatus:""}

       if (myCommand.commandType === `MOVE`) {
         if(this.mode === `NORMAL`) {
          response.completed = true
          receivedMessage.results.push(response)
          this.position = myCommand.value
          
         } else if (this.mode === `LOW_POWER`) {
           response.completed = false
           receivedMessage.results.push(response)
         }

       } else if (myCommand.commandType === `STATUS_CHECK`) {
         response.completed = true
         response.roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
        receivedMessage.results.push(response)

       } else if (myCommand.commandType === `MODE_CHANGE`) {
         if (myCommand.value === `LOW_POWER` || myCommand.value === `NORMAL`) {
          this.mode = myCommand.value
         }

         response.completed = true
         receivedMessage.results.push(response)
       } else {
         response.completed = false
         receivedMessage.results.push(response)
       }
     }

     return receivedMessage;
   }
};
     
module.exports = Rover;