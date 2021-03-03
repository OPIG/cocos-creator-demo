cc.Class({
    extends: cc.Component,

    properties: {
      bgNode: cc.Node,
      pipeLayerNode: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      
    },

    moveBg(){
      let bgList = this.bgNode.children
      for(let i=0; i< bgList.length; i++) {
        bgList[i].x -= 2
        if(bgList[i].x <= -960) {
          bgList[i].x = 960
        }
      }
    },

    movePipe(){
      let pipeList = this.pipeLayerNode.children
      for(let i=0; i< pipeList.length; i++) {
        let pipe = pipeList[i]
        pipe.x -= 3
        if(pipe.x <= -600) {
          pipe.x = 600
          pipe.y = this.randomNum()
          pipe.active = true
        }
      }
    },

    randomNum(){
      return Math.floor(Math.random() * 200 - 100)
    },

    start () {

    },

    update (dt) {
      this.moveBg()
      this.movePipe()
    },
});
