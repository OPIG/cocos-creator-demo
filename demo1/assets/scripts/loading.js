// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_ProImage: cc.Node,
        m_MaxLength: {
          type: cc.Inetger,
          default: 690
        },
        speed: {
          type: cc.Inetger,
          default: 350
        },
        m_Progress: {
          type: cc.Inetger,
          default: 10,
          slide: true,
          step: 1,
          min: 0,
          max: 700,
          notify(){
            this._setProgress()
          }
        }
    },
    ctor: function () {
      // 构造函数
      this.m_progressIng = false
    },
    _setProgress: function(){
      this.m_ProImage.width = this.m_Progress
    },
    setProgress: function(pro){
      if(pro>1 || pro <0){
        return
      }

      var width = pro*this.m_MaxLength
      if(width < this.setMaxWidth) {
        return
      }
      this.setMaxWidth = pro*this.m_MaxLength
      this.m_progressIng = true
    },

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.m_ProImage.width = 0
    },

    start () {

    },

    update (dt) {
      if (this.m_progressIng) {
        if(this.m_ProImage.width < this.setMaxWidth){
          this.m_ProImage.width += this.speed*dt
        }
        if(this.m_ProImage.width >= this.m_MaxLength) {
          this.m_progressIng = false
          if(this.finishCallBack != null) {
            this.finishCallBack()
          }
        }
      }
    },
});
