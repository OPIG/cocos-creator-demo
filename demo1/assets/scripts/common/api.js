// var t = require('jquery')
// console.log($,'jquery');


let baseUrl = 'http://172.25.156.76:3333/'
// let baseUrl = 'http://localhost:3333/'
let contentType = 'application/json;charset=utf-8'

function _ajax (data) {
  $.ajax({
    headers: {
      Accept: '*/*'
    },
    url: 'http://localhost:3333/users', // json server 支持跨域
  })
}

window.api = {
  getAllUsers: function () {
    return new Promise((resolve, rej) => {
      $.ajax({
        type: 'get',
        contentType,
        url: baseUrl + 'users',
        success: function (res) {
          resolve(res)
        },
        error: function (xhr, type, error) {
          rej(error)
        }
      })
    })
  },
  getUserByAccount: function (user) {
    return new Promise((resolve, rej) => {
      $.ajax({
        type: 'get',
        contentType,
        url: baseUrl + 'users?account=' + user.account,
        success: function (res) {
          resolve(res)
        },
        error: function (xhr, type, error) {
          rej(error)
        }
      })
    })
  },
  registerAccount: function (user) {
    return new Promise((resolve, rej) => {
      $.ajax({
        type: 'post',
        contentType,
        data: JSON.stringify(user),
        url: baseUrl + 'users',
        success: function (res) {
          resolve(res)
        },
        error: function (xhr, type, error) {
          rej(error)
        }
      })
    })
  },
  updateScoreByAccount: function (data) {
    return new Promise((resolve, rej) => {
      $.ajax({
        type: 'patch',
        contentType,
        data: JSON.stringify(data),
        url: baseUrl + 'users/' + data.id,
        success: function (res) {
          resolve(res)
        },
        error: function (xhr, type, error) {
          rej(error)
        }
      })
    })
  }
}
