const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');


describe("Rover class", function() {

  it(`constructor sets position and default values for mode and generatorWatts`, function () {
    let rover2 = new Rover(44321)
    expect(rover2.generatorWatts).toEqual(110)
    expect(rover2.position).toEqual(44321)
    expect(rover2.mode).toEqual(`NORMAL`)
  })

  it(`response returned by receiveMessage contains name of message`, function() {
    let rover2 = new Rover(89754)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('STATUS_CHECK')]
    let testMessage =  new Message(`test message`, commands)
    let response = rover2.receiveMessage(testMessage)
    expect(response.message).toEqual(testMessage.name)
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
    let rover2 = new Rover(89754)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('STATUS_CHECK')]
    let testMessage =  new Message(`test message`, commands)
    let response = rover2.receiveMessage(testMessage)
    expect(response.results.length).toEqual(2)
  })

  it("responds correctly to status check command",function(){
     let rover2 = new Rover(89754)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('STATUS_CHECK')]
    let testMessage =  new Message(`test message`, commands)
    let response = rover2.receiveMessage(testMessage)
    expect(response.results[1].roverStatus.mode).toEqual('LOW_POWER')
    expect(response.results[1].roverStatus.generatorWatts).toEqual(110)
    expect(response.results[1].roverStatus.position).toEqual(89754)
  })

  it("responds correctly to mode change command",function(){
     let rover2 = new Rover(89754)
    expect(rover2.mode).toEqual("NORMAL")
  })

  it("responds with false completed value when attempting to move in LOW_POWER mode",function(){
     let rover2 = new Rover(432567)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('MOVE',432567)]
    let testMessage =  new Message(`test message`, commands)
    let response = rover2.receiveMessage(testMessage)
    expect(response.results[1].completed).toEqual(false)
  })

  it("responds with position for move command",function(){
     let rover2 = new Rover(432567)
    expect(rover2.position).toEqual(432567)
  })
}) 
