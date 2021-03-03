// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    m_Account: cc.EditBox,
    m_Pwd: cc.EditBox,
    m_ConfirmPwd: cc.EditBox,
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start () {

  },

  // update (dt) {},
  show: function () {
    this.node.active = true
  },
  onClickClose: function () {
    this.node.active = false
  },

  handleRegister () {
    var account = this.m_Account.string
    var pwd = this.m_Pwd.string
    var confirm_pwd = this.m_ConfirmPwd.string
    this._validateForm({ account, pwd, confirm_pwd }).then(res => {
      let user = {
        "account": account,
        "pwd": pwd,
        "games":
        {
          "knife": {
            "level": 0,
            "score": 0
          },
          "bird": {
            "level": 0,
            "score": 0
          }
        }
      }
      api.registerAccount(user).then(res => {
        console.log(res, 'register result success');
      }).catch(err => {
        console.log(err, 'register result error');
      })
    }).catch(err => {
      console.log(err)
    })
  },

  _validateForm: function (data) {
    return new Promise((resolve, reject) => {
      let { account, pwd, confirm_pwd } = data
      if (!/^([a-zA-Z]|[\u4e00-\u9fa5]){1,}$/.test(account)) {
        reject('请输入账号')
      } else if (!/^\d+$/.test(pwd)) {
        reject('请输入密码')
      } else if (!/^\d+$/.test(confirm_pwd)) {
        reject('请输入确认密码')
      } else if (confirm_pwd !== pwd) {
        reject('密码不一致')
      } else {
        resolve('success')
      }
    })
  },
});
