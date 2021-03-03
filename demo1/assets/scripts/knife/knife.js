cc.Class({
  extends: cc.Component,

  properties: {
    targetNode: cc.Node,
    knifeNode: cc.Node,
    knifePrefab: cc.Prefab,
    newGameNode: cc.Node,
    msgNode: cc.Node,
    time_score: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    this.isStart = false
    console.log(window.account, 'account knife');
    this.level = window.account ? +window.account.games.knife.level : 0
    let score = window.account ? +window.account.games.knife.score : 0
    if (this.msgNode) {
      this.msgNode = this.msgNode.getComponent(cc.Label)
      if (this.level == 0) {
        this.msgNode.string = '开始您的第一次挑战'
      } else {
        this.msgNode.string = '当前处于第' + this.level + '关，得分为：' + score
      }
    }
  },
  init () {
    this.node.removeAllChildren()
    this.node.addChild(this.targetNode)
    this.node.addChild(this.knifeNode)
    this.node.addChild(this.newGameNode)
    this.node.addChild(this.time_score)
    this.knifeNode.setPosition(cc.v2(0, -196))
    this.knifeNode.angle = 0
  },
  startGame () {
    this.canThrow = true
    this.tragetRotation = 1
    this.currentScore = 0

    this.init()

    this.knifeArr = []

    // 将目标显示在小刀上面
    this.targetNode.zIndex = 1

    this.node.on('touchstart', this.throwKnife, this)

    for (let i = 1; i <= this.level; i++) {
      let knifeNode = cc.instantiate(this.knifePrefab)
      this.knifeArr.push(knifeNode)
      knifeNode.angle = (knifeNode.angle + this.tragetRotation) * i * Math.random() * 180 % 360
      this.node.addChild(knifeNode)

      let rad = Math.PI * (knifeNode.angle - 90) / 180
      let r = this.targetNode.width / 2
      knifeNode.x = this.targetNode.x + r * Math.cos(rad)
      knifeNode.y = this.targetNode.y + r * Math.sin(rad)
    }

    let interval = setInterval(() => {
      this.changeSpeed()
    }, 5000 * Math.random() - this.level)

    this.currentTime = 60
    this.timeInterval = setInterval(() => {
      this.currentTime--
      if (this.currentTime <= 0) {
        clearInterval(this.timeInterval)
      }
      console.log(this.time_score, 'time_score')
      this.time_score.children[0].getComponent(cc.Label).string = this.currentTime
    }, 1000)
  },

  changeSpeed () {
    let dir = Math.random() * 100 > 30 ? 1 : -1
    let speed = 1 + Math.random() * this.level
    this.tragetRotation = dir * speed
  },

  throwKnife () {
    if (this.canThrow) {
      this.canThrow = false

      this.knifeNode.runAction(cc.sequence(
        cc.moveTo(0.15, cc.v2(this.knifeNode.x, this.targetNode.y - this.targetNode.width / 2)),
        cc.callFunc(() => {
          let isHit = false
          let gap = 8

          for (let knifeNode of this.knifeArr) {
            if (Math.abs(knifeNode.angle) < gap || Math.abs(360 - knifeNode.angle) < gap) {
              isHit = true
              break
            }
          }

          if (isHit || this.currentTime <= 0) {
            clearInterval(this.timeInterval)

            this.knifeNode.runAction(cc.sequence(
              cc.spawn(
                cc.moveTo(0.25, cc.v2(this.knifeNode.x, -cc.winSize.height)),
                cc.rotateTo(0.25, Math.random() * 90)
              ),
              cc.callFunc(() => {
                this.newGameNode.active = true
                this.newGameNode.zIndex = 2
                this.isStart = false
                if (this.msgNode) {
                  this.msgNode = this.msgNode.getComponent(cc.Label)
                  this.msgNode.string = '当前处于第' + this.level + '关，得分为：' + this.currentScore
                }

                if (window.account) {
                  let { account, id } = window.account
                  let data = {
                    "id": id,
                    "account": account,
                    "games":
                    {
                      "knife": {
                        "level": this.level,
                        "score": this.currentScore
                      }
                    }
                  }
                  api.updateScoreByAccount(data).then(res => {
                    console.log(res, 'update score success');
                  }).catch(err => {
                    console.log(err, 'err');
                  })
                }
              })
            ))
          } else {
            let knife_node = cc.instantiate(this.knifePrefab)
            knife_node.setPosition(this.knifeNode.position.x, this.knifeNode.position.y)
            this.node.addChild(knife_node)
            this.currentScore += (Math.floor(10 * Math.random()) + this.level + this.knifeArr.length)

            this.knifeNode.setPosition(cc.v2(0, -196))
            this.knifeArr.push(knife_node)

            this.canThrow = true
          }
        })
      ))
    }
  },

  changeLevel (target, data) {

    // 0: 第一个  1:当前  2:下一关
    if (data == '0') {
      this.level = 0
    } else if (data == '2') {
      this.level = this.level + 1
    }

    this.isStart = true
    this.newGameNode.active = false
    this.startGame()
  },

  start () {

  },
  onDestroy () {
    this.node.off('touchstart', this.throwKnife, this)
  },

  update (dt) {
    if (this.isStart) {
      // target 旋转
      this.targetNode.angle = (this.targetNode.angle + this.tragetRotation) % 360

      for (let knifeNode of this.knifeArr) {
        knifeNode.angle = (knifeNode.angle + this.tragetRotation) % 360

        let rad = Math.PI * (knifeNode.angle - 90) / 180
        let r = this.targetNode.width / 2
        knifeNode.x = this.targetNode.x + r * Math.cos(rad)
        knifeNode.y = this.targetNode.y + r * Math.sin(rad)
      }

      this.time_score.children[1].getComponent(cc.Label).string = this.currentScore
    }
  },

  logout () {
    cc.director.loadScene('main')
  }
});
