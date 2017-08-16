# React-Music-Player
Learn from imooc
### 功能与设计
* 布局采用Bootstrap（因为懒，懒得设计了）
* 完成了imooc视频上所有功能
* 播放时间是顺序的，不是视频中的倒数
* 完成了随机、顺序、单曲循环等功能
* 声音的bug未解（暂停时，音量不可调，会有延迟，待播放按钮切换后，音量才会被控制）
### 说明
* build 里面是已经打包好的文件，直接可运行
* 初始化请用npm install --save-dev
* 运行 npm start 
* 服务器是在 loaclhost:8080
* 视频有个巨坑：react-router用的是2.0.0 ，现在版本都4以上了，所以npm install react-router 要指定版本，否则就去啃新版本的react-router开发文档吧
* [webpack](https://coding.net/u/Dcison/p/webpack/git) 采用自己配的脚手架，外加视频上用到的一些东东，比如Pubsub.js之类的
