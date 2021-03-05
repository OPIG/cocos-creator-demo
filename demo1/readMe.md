跨域：https://segmentfault.com/a/1190000012469713

[jQuery Ajax跨域问题简易解决方案] https://www.cnblogs.com/wangwust/p/6401760.html

[飞刀大战] https://www.youtube.com/watch?v=R8dKcU9UfXU

[Cocos Creator游戏源码完整工程分享] https://www.jianshu.com/p/675aa031b3d2?from=singlemessage

Cocos Creator入门基础教程：https://edu.51cto.com/course/19642.html

Cocos Creator入门实例教程: https://study.163.com/course/courseMain.htm?courseId=1211133811

Cocos tutorial(devga.me) https://devga.me/tutorials/cocos-creator-crash-course-tutorial-series/

Creator开源游戏、插件、教程、视频汇总：https://forum.cocos.org/t/creator/44782

creator1.x 升级到 creator2.x 的一些常见升级问题：
  cc.pLength(向量) 改成 向量.mag();
  cc.pSub(dst, src) 改成了 dst.sub(src);
  cc.p(x, y)改为cc.v2(x, y);


### 查阅博客

  [合成大西瓜博客]<https://developer.51cto.com/art/202102/644352.htm#topx>
  [cocoscreator前台与后台服务对接]<https://blog.csdn.net/lck898989/article/details/79834292>
  [俄罗斯方块]<https://blog.csdn.net/xiao_dou_ya_cool/article/details/102785962>




  buid相关：
  [Cocos Creator 去除或更改默认启动页（Web端）]<https://blog.csdn.net/qq_38269366/article/details/84994586>


  常用方法：
  播放音乐： cc.audioEngine.play(音频文件, 是否循环播放[true/false], 音量[0-1])

  获取组件的方法： node.getComponent(), ie. let bird = this.birdNode.getComponent(cc.Sprite)  

 点击触发：this.node.on('touchstart',回调方法, this)  


 实例化prefab：  cc.instantiate([prefab元素])

 修改元素位置： node.setPosition(x, y)

 增加子元素： node.addChild(元素)

 删除所有子元素： node.removeAllChildren()

 切换场景： cc.director.loadScene(场景文件名['main'])

 获取屏幕相关数据：cc.winSize  
  > 屏幕高度： cc.winSize.height  
  > 屏幕宽度： cc.winSize.width

``` javascript
node.runAction(cc.sequence(
  cc.spawn(
    cc.moveTo(时间[0.25], cc.v2(x, y)),
    cc.rotateTo(时间[0.25], 度数[90])
  ),
  cc.callFunc(() => {
  })
))

```

[使用cc.tween(缓动系统)代替runAction]<https://blog.tttal.com/?p=137>
[cocoscreator官网文档-使用cc.tween]<https://docs.cocos.com/creator/manual/zh/scripting/tween.html?h=%E7%BC%93%E5%8A%A8%E7%B3%BB%E7%BB%9F>
```
cc.tween(node)
    .to(time, { 属性: 值, 属性: 值 })
    .start();

  cc.tween 提供了两个设置属性的 API：

to：对属性进行绝对值计算，最终的运行结果即是设置的属性值
by：对属性进行相对值计算，最终的运行结果是设置的属性值加上开始运行时节点的属性值

cc.Action：this.node.runAction( cc.sequence( cc.spawn( cc.moveTo(1, 100, 100), cc.rotateTo(1, 360), ), cc.scale(1, 2) ) )
cc.tween：cc.tween(this.node) .to(1, { position: cc.v2(100, 100), rotation: 360 }) .to(1, { scale: 2 }) .start()

```
node.runAction("action对象"); //执行一个action动作对象 [动作篇]<https://blog.csdn.net/u010604695/article/details/22292177>


getActionByTag()： 通过目标对象和标签获取一个动作。<https://blog.csdn.net/LIYIFRED/article/details/86704199>
举例：监听node节点，每触碰一次 1秒钟让其旋转90度，如果在 动作执行的1秒内重复点击，就会发生多次旋转且角度不对，这是因为，在动作执行中，节点角度已发生变化，此时在点击，就是在变化的基础上再旋转90度
```
  // 改善后的旋转方法
    rotateNode:function(){
      var rota1 = cc.rotateBy(1,90);
      rota1.setTag(1);  // 给动作设置标签
      console.log("动作返回 ",this.node.getActionByTag(1));
      if(this.node.getActionByTag(1)){ 
          return;
      }
      this.node.runAction(rota1);
    }

```


Node.runAction // node节点执行一系列动作
cc.sequence(action1, action2, ...) // 串行 
cc.spawn(action1, action2, ...) // 并行  同时执行
cc.moveTo(durtime, x, y) // 绝对位移
cc.moveBy(durtime, x, y) // 相对位移
cc.scaleTo(durtime, x, y) // 绝对缩放
cc.scaleBy(durtime, x, y) // 相对缩放
cc.rotateTo(durtime, 角度) // 绝对旋转
cc.rotateBy(durtime, 角度) // 相对旋转
cc.fadeOut(durtime) // 淡出， 修改opacity属性 0-255
cc.fadeTo(durtime) // 淡入
cc.callFunc(()=>{}) // 回调函数
