cc.Class({
    extends: cc.Component,

    properties: {
       targetNode: cc.Node,
       knifeNode: cc.Node,
       knifePrefab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.canThrow = true
      this.targeRotation = 1

      this.knifeArr = []

      // 将目标显示在小刀上面
      this.targetNode.zIndex = 1

      this.node.on('touchstart', this.throwKnife, this)
    },

    changeSpeed() {
      let dir = Math.random() > 0.5 ? 1 : -1
      let speed = 1 + Math.random() * 2
      this.tragetRotation = dir * speed
    },

    throwKnife(){
      if(this.canThrow) {
        this.canThrow = false
        
        this.knifeNode.runAction(cc.sequence(
          cc.moveTo(0.15, cc.v2(this.knifeNode.x, this.targetNode.y - this.targetNode.width / 2)),
          cc.callFunc(() => {
            let isHit = false
            let gap = 5

            for(let knifeNode of this.knifeArr) {
              if(Math.abs(knifeNode.angle) < gap || Math.abs(360 - knifeNode.angle) < gap) {
                isHit = true
                break
              }
            }

            if(isHit) {
              this.knifeNode.runAction(cc.sequence(
                cc.spawn(
                  cc.moveTo(0.25, cc.v2(this.knifeNode.x, -cc.winSize.height)),
                  cc.rotateTo(0.25, Math.random() * 90)
                ),
                cc.callFunc(() => {
                  cc.director.loadScene('knife')
                })
              ))
            } else {
              let knife_node = cc.instantiate(this.knifePrefab)
              knife_node.setPosition(this.knifeNode.position.x, this.knifeNode.position.y)
              this.node.addChild(knife_node)
  
              this.knifeNode.setPosition(cc.v2(0, -196))
              this.knifeArr.push(knife_node)
  
              this.canThrow = true
            }
          })
        ))
      }
    },

    start () {

    },
    onDestroy(){
      this.node.off('touchstart', this.throwKnife, this)
    },

    update (dt) {
      // target 旋转
      this.targetNode.angle = (this.targetNode.angle + this.targeRotation) % 360

      for(let knifeNode of this.knifeArr) {
        knifeNode.angle = (knifeNode.angle + this.targeRotation) % 360

        let rad = Math.PI * (knifeNode.angle - 90) / 180
        let r = this.targetNode.width / 2
        knifeNode.x = this.targetNode.x + r * Math.cos(rad)
        knifeNode.y = this.targetNode.y + r * Math.sin(rad)
      }
    },
});
