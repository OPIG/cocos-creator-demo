// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    // m_LoadingPrefab: cc.Node,
    // m_BackGround: cc.Node,

    m_Account: cc.EditBox,
    m_Pwd: cc.EditBox,
    m_RegisterPrefab: cc.Prefab,
    m_LoadingPrefab: cc.Prefab
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad () {
    // let self = this
    // if(cc.sys.isNative) {
    //   window.io = SocketIO
    // } else {
    //   window.io = require('socket.io')
    // }

    // var socket = window.io('http://localhost:3333')

    // socket.on('connected', function(msg){
    //   console.log(msg,'-----');
    // })
    require('jquery')

    // $.ajax({
    //   headers:{
    //     Accept: '*/*'
    //   },
    //   url: 'http://localhost:3004/products', // json server 支持跨域
    //   // url: 'http://localhost:3004/goods',

    //  })
  },

  handleLoginFunc: function () {
    var account = this.m_Account.string
    var pwd = this.m_Pwd.string
    this._validateForm({ account, pwd }).then(res => {
      console.log(account, pwd)
      this.m_loading = cc.instantiate(this.m_LoadingPrefab)
      this.node.parent.addChild(this.m_loading)

      // 加载进度条
      this.m_loading = this.m_loading.getComponent('loading')
      console.log(this.m_loading);
      this.m_loading.node.y = -200
      this.m_loading.setProgress(1)

      if(account === 'test' && pwd === '123') {
        console.log('login success')
      }

      this.m_loading.finishCallBack = function(){
        this.m_loading.node.active = false
      }.bind(this)

    }).catch(err => {
      console.log(err)
    })


  },

  _validateForm: function (data) {
    return new Promise((resolve, reject) => {
      let { account, pwd } = data
      if (!/^([a-zA-Z]|[\u4e00-\u9fa5]){1,}$/.test(account)) {
        reject('请输入账号')
      } else if (!/^\d+$/.test(pwd)) {
        reject('请输入密码')
      } else {
        resolve('success')
      }
    })
  },
  onClickClose: function () {
    this.node.active = false
  },

  onRegisterClick: function () {
    if (this.m_RegisterView == null) {
      this.m_RegisterView = cc.instantiate(this.m_RegisterPrefab)
      this.node.parent.addChild(this.m_RegisterView)
      this.m_RegisterView = this.m_RegisterView.getComponent('register')
    }
    this.m_RegisterView.show()
  },

  start () {

  },

  // update (dt) {},
});
