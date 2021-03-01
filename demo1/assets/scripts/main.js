// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    m_LoadingPrefab: cc.Prefab,
    m_LoginPrefab: cc.Prefab,
    m_BackGround: cc.Node
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    this.m_loading = cc.instantiate(this.m_LoadingPrefab)

    this.m_BackGround.addChild(this.m_loading)

    // 加载进度条
    this.m_loading = this.m_loading.getComponent('loading')
    this.m_loading.setProgress(1)
    let self = this
    this.m_loading.finishCallBack = function () {
      this.m_loading.node.active = false

      this.m_login = cc.instantiate(this.m_LoginPrefab)
      this.m_BackGround.addChild(this.m_login)
      // this.m_login = this.m_login.getComponent('login')

    }.bind(this)
  },

  start () {

  },

  // update (dt) {},
});
