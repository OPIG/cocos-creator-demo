// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        m_LoadingPrefab: cc.Node,
        m_BackGround: cc.Node
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

      $.ajax({
        headers:{
          Accept: '*/*'
        },
        url: 'http://localhost:3004/products', // json server 支持跨域
        // url: 'http://localhost:3004/goods',

       })
    },

    handleLoginFunc: function() {
      this.m_loading = cc.instantiate(this.m_LoadingPrefab)
      this.m_BackGround.addChild(this.m_loading)

       // 加载进度条
      this.m_loading = this.m_loading.getComponent('loading')
      this.m_loading.setProgress(1)
    },

    start () {

    },

    // update (dt) {},
});
