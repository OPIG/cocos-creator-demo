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
        m_Pwd: cc.EditBox
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

    handleLoginFunc: function() {
      var account = this.m_Account.string
      var pwd = this.m_Pwd.string
      console.log(account, pwd)
      // this.m_loading = cc.instantiate(this.node.parent.m_LoadingPrefab)
      // this.node.parent.m_BackGround.addChild(this.m_loading)

      //  加载进度条
      // this.m_loading = this.m_loading.getComponent('loading')
      // this.m_loading.setProgress(1)
    },

    start () {

    },

    // update (dt) {},
});
