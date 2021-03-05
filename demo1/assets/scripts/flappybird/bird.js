cc.Class({
  extends: cc.Component,

  properties: {
    bgNode: cc.Node,
    pipeLayerNode: cc.Node,
    btnLayerNode: cc.Node,
    birdNode: cc.Node,
    landNode: cc.Node,
    scoreNode: cc.Node,
    // 小鸟上升，平飞，下降三种状态
    birdStatusList: {
      default: [],
      type: cc.SpriteFrame
    },

    // 音乐列表
    musicList: {
      default: [],
      type: cc.AudioClip
    },

    upPower: 0, // 小鸟升力
    gravitySpeed: -0.3, // 小鸟自身重力
    isPlay: true,
    score: 0
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    cc.director.getPhysicsManager(this.birdNode).enabled = true
  },

  // 背景移动
  moveBg () {
    let bgList = this.bgNode.children
    for (let i = 0; i < bgList.length; i++) {
      bgList[i].x -= 2
      if (bgList[i].x <= -960) {
        bgList[i].x = 960
      }
    }
  },

  // 管道移动
  movePipe () {
    let pipeList = this.pipeLayerNode.children
    for (let i = 0; i < pipeList.length; i++) {
      let pipe = pipeList[i]
      pipe.x -= 3
      if (pipe.x <= -600) {
        pipe.x = 600
        pipe.y = this.randomNum()
        pipe.active = true
      }
    }
  },

  randomNum () {
    return Math.floor(Math.random() * 200 - 100)
  },

  // 点击屏幕
  clickScreen () {
    this.btnLayerNode.on('touchstart', () => {
      // 点击屏幕改变小鸟的上移量
      this.birdFly()
    })
  },
  birdFly () {
    // 上移量
    this.upPower = 7.5
    if (this.isPlay) {
      cc.audioEngine.play(this.musicList[1], false, 0.3)
    }
  },
  moveBird () {
    // 重力跟上移量之和等于最终的上移量
    this.upPower += this.gravitySpeed
    // 改变小鸟y轴实现小鸟上下移动
    this.birdNode.y += this.upPower

    // 获取组件的方法： node.getComponent
    let bird = this.birdNode.getComponent(cc.Sprite)
    // 获取节点的角度 node.angle = value

    if (this.upPower === 0) {
      bird.spriteFrame = this.birdStatusList[0]
      this.birdNode.angle = this.upPower
    } else if (this.upPower > 0) {
      bird.spriteFrame = this.birdStatusList[1]
      this.birdNode.angle = this.upPower * 2
    } else {
      bird.spriteFrame = this.birdStatusList[2]
      this.birdNode.angle = this.upPower
    }

    this.checkGameOver()
  },

  checkGameOver () {
    let birdTop = this.birdNode.y + this.birdNode.height / 2
    let birdBottom = this.birdNode.y - this.birdNode.height / 2
    let birdRight = this.birdNode.x + this.birdNode.width / 2
    let birdLeft = this.birdNode.x - this.birdNode.width / 2

    if (birdTop >= cc.winSize.height / 2 || birdBottom <= -cc.winSize.height / 2 + this.landNode.height) {
      this.isPlay = false
      if (birdBottom > -cc.winSize.height / 2 + this.landNode.height) {
        cc.tween(this.birdNode)
          .to(1, { position: cc.v2(0, -cc.winSize.height / 2 + this.landNode.height), angle: -20 })
          .start()
      }

      // 0: static  2: dynamic
      this.birdNode.getComponent(cc.RigidBody).type = 0
    }

    // 小鸟与钢管碰撞
    let pipeList = this.pipeLayerNode.children
    for (let i = 0; i < pipeList.length; i++) {
      let pipe = pipeList[i]
      let topPipe = pipe.getChildByName('top')
      let bottomPipe = pipe.getChildByName('bottom')

      let collisionTop = pipe.y + topPipe.y - topPipe.height / 2
      let collisionBottom = pipe.y + bottomPipe.y + bottomPipe.height / 2
      let collisionLeft = pipe.x - bottomPipe.width / 2
      let collisionRight = pipe.x + bottomPipe.width / 2

      if (pipe.active) {
        if (birdRight >= collisionLeft && birdLeft <= collisionRight) {
          if (birdTop >= collisionTop || birdBottom <= collisionBottom) {
            this.isPlay = false
            if (birdBottom > -cc.winSize.height / 2 + this.landNode.height) {
              cc.tween(this.birdNode)
                .to(1, { position: cc.v2(0, -cc.winSize.height / 2 + this.landNode.height), angle: -20 })
                .start()
            }
          }
        }

        if(birdLeft > collisionRight) {
          this.addScore()
        }

      }

    }

  },
  addScore(){
    let scoreLabel = this.scoreNode.getComponent(cc.Label)
    this.score +=1
    scoreLabel.string = this.score
  },
  start () {
    // 或者在cocos creator中给btnLayerNode拖拽一个点击
    this.clickScreen()

    if (this.isPlay) {
      // cc.audioEngine.play(this.musicList[0], true, 0.03)
    }
  },

  update (dt) {
    if (this.isPlay) {
      this.moveBg()
      this.movePipe()
      this.moveBird()
    }
  },
});
