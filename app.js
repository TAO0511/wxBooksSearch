//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  //请求函数
  request:function(obj){
    // 测试情况
    // var host = "http://localhost:8081/copyright/";
    // 正式情况
    var host = "http://booksnet.cn/copyright/";
    obj.url = obj.url || "";
    wx.request({
        url: host+obj.url, 
        data: obj.postData || "",
        header: {
            'content-type': 'application/json'
        },
        method:obj.method || 'post',
        dataType:obj.dataType || 'json',
        success: function(res) {
          if(typeof obj.doSuccess=="function"){
            doSuccess(res)
          }
          console.log(res.data)
        },
        fail: function() {
          if(typeof obj.doFail=="function"){
            doFail()
          }
        },
        complete: function() {
          if(typeof obj.doComplete=="function"){
            doComplete()
          }
        }
      })
    },
  globalData:{
    userInfo:null
  }
})