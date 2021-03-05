cc.Class({
  extends: cc.Component,

  properties: {
    bgNode: cc.Node,
    pipeLayerNode: cc.Node,
    btnLayerNode: cc.Node,
    birdNode: cc.Node,
    landNode: cc.Node,
    scoreNode: cc.Node,
    addScoreNode: cc.Node, // 加分
    // 小鸟上升，平飞，下降三种状态
    birdStatusList: {
      default: [],
      type: cc.SpriteFrame
    },
    skinLayer: cc.Node,
    startGameLayer: cc.Node,
    // 音乐列表
    musicList: {
      default: [],
      type: cc.AudioClip
    },

    upPower: 0, // 小鸟升力
    gravitySpeed: -0.3, // 小鸟自身重力
    isPlay: true,
    score: 0,
    isCollisionLast: false, // 上一次是否经过碰撞检测区
    isGameOver: false
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    cc.director.getPhysicsManager(this.birdNode).enabled = true

    this.isPlay = false

    this.skinLayer.active = false
    this.addScoreNode.active = false
    this.startGameLayer.getChildByName('game_over').active = false
    this.startGameLayer.getChildByName('finalscore').active = false
    this.startGameLayer.getChildByName('playbtn').x = 0
    this.startGameLayer.getChildByName('playbtn').y = 0
    this.startGameSpritFrame = this.startGameLayer.getComponent(cc.Sprite).spriteFrame
    this.startGameLayer.getComponent(cc.Sprite).spriteFrame = 0

  },

  // 背景移动
  moveBg() {
    let bgList = this.bgNode.children
    for (let i = 0; i < bgList.length; i++) {
      bgList[i].x -= 2
      if (bgList[i].x <= -960) {
        bgList[i].x = 960
      }
    }
  },

  // 管道移动
  movePipe() {
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

  randomNum() {
    return Math.floor(Math.random() * 200 - 100)
  },

  // 点击屏幕
  bindClickEvent() {
    this.btnLayerNode.on('touchstart', () => {
      // 点击屏幕改变小鸟的上移量
      this.birdFly()
    })

    this.skinLayer.on('touchstart', () => {
      this.skinLayer.active = false
      if (!this.isGameOver) {
        this.isPlay = true
      }
    })

    let skinBtnList = this.skinLayer.children[0].children
    for (let i = 0; i < skinBtnList.length; i++) {
      skinBtnList[i].on('touchstart', () => {
        this.changeSkin(i)
      })
    }

    this.startGameLayer.getChildByName('playbtn').on('touchstart', () => {
      this.startGame()
    })

  },
  initGame() {
    this.isPlay = true
    this.isGameOver = false
    this.isCollisionLast = false
    this.upPower = 0
    this.score = 0
    this.scoreNode.getComponent(cc.Label).string = 0
    let pipeList = this.pipeLayerNode.children
    for (let i = 0; i < pipeList.length; i++) {
      let pipe = pipeList[i]
      pipe.active = false
    }
    this.birdNode.x = -180
    this.birdNode.y = 0

    this.startGameLayer.getChildByName('game_over').active = true
    this.startGameLayer.getChildByName('finalscore').active = true
    this.startGameLayer.getChildByName('playbtn').x = 0
    this.startGameLayer.getChildByName('playbtn').y = -70
    this.startGameLayer.getComponent(cc.Sprite).spriteFrame = this.startGameSpritFrame 
    this.startGameLayer.getChildByName('finalscore').getComponent(cc.Label).string = '得分0'
    this.startGameLayer.active = false
  },
  startGame() {
    this.initGame()
  },
  birdFly() {
    // 上移量
    this.upPower = 7.5
    if (this.isPlay) {
      cc.audioEngine.play(this.musicList[1], false, 0.3)
    }
  },
  moveBird() {
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

  gameOver(){
    this.isPlay = false
    this.isGameOver = true
  },
  showFinalScore(){
    this.startGameLayer.active = true
    
  },
  checkGameOver() {
    let birdTop = this.birdNode.y + this.birdNode.height / 2
    let birdBottom = this.birdNode.y - this.birdNode.height / 2
    let birdRight = this.birdNode.x + this.birdNode.width / 2
    let birdLeft = this.birdNode.x - this.birdNode.width / 2

    if (birdTop >= cc.winSize.height / 2 || birdBottom <= -cc.winSize.height / 2 + this.landNode.height) {
      this.gameOver()
      cc.audioEngine.play(this.musicList[3], false, 0.3)
      this.showFinalScore()
      // this.isGameOver = true
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
    let isCollision = false
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
          // 进入碰撞检测区域
          isCollision = true

          if (birdTop >= collisionTop || birdBottom <= collisionBottom) {
            this.gameOver()
            cc.audioEngine.play(this.musicList[3], false, 0.3)
            this.showFinalScore()
            if (birdBottom > -cc.winSize.height / 2 + this.landNode.height) {
              cc.tween(this.birdNode)
                .to(1, { position: cc.v2(0, -cc.winSize.height / 2 + this.landNode.height), angle: -20 })
                .start()
            }
          }
        }
      }
    }

    if (isCollision && !this.isCollisionLast) {
      this.addScore()
    }

    this.isCollisionLast = isCollision

  },
  addScore() {
    let scoreLabel = this.scoreNode.getComponent(cc.Label)
    this.score += 1
    scoreLabel.string = this.score
    this.startGameLayer.getChildByName('finalscore').getComponent(cc.Label).string = '得分'+this.score

    // 播放加分音乐
    cc.audioEngine.play(this.musicList[2], false, 0.3)

    this.addScoreNode.setPosition(this.birdNode.x, this.birdNode.y + this.birdNode.height / 2)
    this.addScoreNode.active = true

    // 动画
    this.addScoreNode.runAction(
      cc.sequence(
        cc.spawn(
          cc.moveBy(0.3, 0, 50),
          cc.fadeOut(0.3)
        ),
        cc.callFunc(() => {
          this.addScoreNode.active = false
          this.addScoreNode.opacity = 255
        })
      )
    )
  },
  start() {
    // 或者在cocos creator中给btnLayerNode拖拽一个点击
    this.bindClickEvent()

    this.addScoreNode.active = false
    this.skinLayer.active = false

    if (this.isPlay) {
      cc.audioEngine.play(this.musicList[0], true, 0.03)
    }
  },

  update(dt) {
    if (this.isPlay) {
      this.moveBg()
      this.movePipe()
      this.moveBird()
    }
  },
  backToMain() {
    cc.director.loadScene('main')
  },
  changeSkin(i) {

    let skinColorList = [
      [156, 207, 158],
      [90, 97, 77],
      [110, 124, 124],
      [255, 255, 255]
    ]

    let bgList = this.bgNode.children
    for (let j = 0; j < bgList.length; j++) {
      bgList[j].getChildByName('sky').runAction(
        cc.tintTo(0, skinColorList[i][0], skinColorList[i][1], skinColorList[i][2])
      )
    }
  },
  changeSkinBtnClick() {
    this.skinLayer.active = true
    this.isPlay = false
  }
});
