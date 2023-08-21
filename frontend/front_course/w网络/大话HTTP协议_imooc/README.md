# [编程必备基础－大话HTTP协议](https://coding.imooc.com/class/chapter/395.html#Anchor)
[YouTube](https://www.youtube.com/watch?v=0NkUcKZt7mg&list=PL1BidmU3YWyhD9ij5OAzCW7T9wpBEShRQ&index=12)
不看视频看目录把知识学了 => 其他文章，书籍，视频

哔哩哔哩没有就去YouTube

[网络技能树 - 内测版](https://edu.csdn.net/skill/network/network-8afe66fc4e1e4f539061de800a0a23bf?category=797)

从面试题出发学习

D:\zhongji\frontend\front_books\图解 HTTP 彩色版

D:\zhongji\frontend\front_books\HTTP权威指南

## 第1章 课程介绍【整体介绍http的恋爱路线】

## 第2章 HTTP初相识--了解HTTP协议
本章从HTTP协议的背景开始，了解HTTP协议的前世今生、理解HTTP整体事务处理过程，并通过实例分析HTTP工作原理、过程和HTTP协议与TCP/IP、DNS的关系，做到对HTTP协议有所认识。

### 2-1 浏览器背后的故事 (15:10)
* todo 浏览器地址栏输入URL到网页出现发生了什么？
* => img_2_1_1_DNS解析.png
* => img_2_1_2_HTTP.png
* => img_2_1_3_WEB与HTTP.png
* 
### 2-2 HTTP协议的前世今生 (19:04)
* Tim Berners-Lee（蒂姆·伯纳斯-李） 在  [ CERN（欧洲核子研究组织）](https://zhuanlan.zhihu.com/p/330627820) 希望在CERN内部建立网络，满足内部信息交换需求
，1989提案HTTP  1990提出了HTTP协议
* 1991年HTTP0.9诞生
* 1996年5月 HTTP1.0发布
* 1997年1月 HTTP1.1发布
* 2005年5月 HTTP2.0提出
* HTTP3.0 QUIC协议
* => img_2_2_1_HTTP发展史.png

### 2-3 透过TCPIP看HTTP (19:38)
* HTTP协议是构建在TCP/IP协议至善的，是TCP/IP协议的一个子集
* => img_2_3_2_TCPIP_分层管理
* => img_2_3_3_TCPIP_四层.png
  * => img_2_3_4_TCPIP_应用层.png
  * => img_2_3_5_TCPIP_传输层.png
  * => img_2_3_6_TCPIP_网络层.png
  * => img_2_3_7_TCPIP_链路层.png
* => img_2_3_8_TCPIP_数据包的封装过程.png
* => img_2_3_9_TCPIP_HTTP数据传输过程.png
* => img_2_3_10_TCPIP_传输层_三次握手.png
  * => img_2_3_11_TCPIP_第一次握手.png
  * => img_2_3_12_TCPIP_第二次握手.png
  * => img_2_3_13_TCPIP_第三次握手.png
* todo 网络分层？网络协议分层？
* todo 三次握手的SYN和seq和ACK和ack

### 2-4 “你是如何访问慕课的”--DNS域名解析 (12:12)
* => img_2_4_1_TCPIP_访问慕课_DNS域名解析.png
  * => img_2_4_1_TCPIP_简要过程.png
  * todo 微观上DNS解析有一个就近原则
  * todo CDN他是物理距离就近的原理，DNS服务器挂载CDN，由CDN内容分发，根据地区分配服务器

### 2-5 回溯HTTP事务处理过程 (03:54)
* => img_2_5_1_回溯HTTP事务处理过程.png
  * => img_2_5_2_更细致回溯.png
  * todo HTTP协议特点（横向对比）

### 2-6 【讨论题】浏览器输入地址到页面展示，中间总共经历了什么？
缺省

### 2-7 实验：与HTTP请求的第一次亲密接触 (10:23)
缺省

## 第3章 HTTP再邂逅--熟悉HTTP协议结构和通讯原理
本章从HTTP协议的特点、请求和相应的模式、报文结构入手，详细了解http协议的规则和方法。

### 3-1 HTTP协议特点 (12:45)
* => img_3_1_1_HTTP支持客户端_服务器模式.png
* => img_3_1_2_简单快速.png
* => img_3_1_3_灵活.png
* => img_3_1_4_无连接.png  
  * todo keep-alive 保持存活
  * todo 长链接短链接
* => img_3_1_5_无状态.png  
  * 优缺点
  * cookie和session

### 3-2 详解URL与URI的区别与联系 (11:41)
todo 迷之兄弟——URI与URL
todo 浏览器输入的Web地址应该叫URL还是URI？
* => img_3_2_1_URI与URL.png
  * todo URN
  * => img_3_2_1_维基百科.png
  * => img_3_2_3_URI与URL.png
  * => img_3_2_4_区分URL和URI.png
* => img_3_2_5_URI与URL.png
  * todo URL和URI哪个更准确 => URI => ftp://www.imooc.com 和 http://www.imooc.com得到不同内容

### 3-3 HTTP报文结构分析 (22:05)
* => img_3_3_1_HTTP_接口分析_请求报文.png
  * => GET请求可以有报文体吗？
* => img_3_3_2_HTTP_报文头.png
  * => img_3_3_3_HTTP_通用报文头.png
  * => img_3_3_4_HTTP_请求报文头.png
  * => img_3_3_5_HTTP_响应报文头.png
  * => img_3_3_6_HTTP_实体报文头.png
* 分析几个字段
  * => img_3_3_7_ACCEPT.png
    * => img_3_3_8_ACCEPT_权重值.png
  * => img_3_3_9_Accept_Encoding.png
  * => img_3_3_10_Accept_Language.png
  * => img_3_3_11_Connection.png
  * => img_3_3_12_Host.png
  * => img_3_3_13_Referer.png
  * => img_3_3_14_User_Agent.png
  * => img_3_3_15_Content_Type_text.png
  * => img_3_3_15_Content_Type_application.png
* => img_3_3_17_响应报文.png
  * 和请求大同小异


### 3-4 HTTP请求方法剖析 (18:50)
缺省
### 3-5 HTTP响应状态码拆解 (17:23)
缺省
### 3-6 实验：用telnet分析http协议的通讯过程 (10:37)
缺省
### 3-7 HTTP状态管理：Cookie与Session (26:34)
缺省


### 3-4 HTTP请求方法剖析 (18:50)
缺省
### 3-5 HTTP响应状态码拆解 (17:23)
缺省
### 3-6 实验：用telnet分析http协议的通讯过程 (10:37)
缺省
### 3-7 HTTP状态管理：Cookie与Session (26:34)
缺省


## 第4章 HTTP渐相知--深入认识HTTP协议不为人知的特性和使用方法
本章深入了解HTTP各项特性，为未来的开发、运维工作做准备，包括HTTP的编码、连接方式、中介、缓存、内容协商机制、Range等细节。

### 4-1 聊聊HTTP协议中的编码和解码（上） (21:18)
《计算机图形学》 计算机能够显示文字..
编码过程  可以造成乱码
解码过程  可以造成乱码

* => img_4_1_1_URL的编码与解码.png
* => img_4_1_2_URL的编码与解码.png

### 4-2 聊聊HTTP协议中的编码和解码（下） (03:40)
Fiddler 抓包工具 => 自动给浏览器添加代理
* chrome设置 => 
  * 打开代理设置
    * 连接
      * 设置
        * 局域网(LAN)设置
          * 高级
            * 代理设置
* 访问自己电脑的服务（hp笔记本电脑的服务）
  * Fiddler就能抓到访问了，复制我们的url的参数，继续访问，浏览器不会继续对非Ascii继续加密

### 4-3 HTTP协议之基本认证 (14:35)
缺省
### 4-4 HTTP中长连接与短连接 (11:08)
长连接模式 可以省去较多的TCP连接和关闭的时间
client一般不会主动关闭长连接，server端要有一些策略，长时间没有读写事件的连接

=> img_4_4_1_HTTP长连接和短连接.png
=> img_4_4_2_HTTP长连接和短连接.png
=> img_4_4_3_keep_alive.png
=> img_4_4_4_HTTP长连接和短连接.png

### 4-5 【面试题】关于持久连接相关问题
缺省

### 4-6 HTTP中介之代理 (08:19)
* => img_4_6_1_HTTP中介之代理.png  => 既是客户端又是服务端
* => img_4_6_2_典型代理服务器_Fiddler.png
* => img_4_6_3_代理的作用.png
  * todo VPN看起来和代理很像，隧道技术是VPN的关键技术（网关啊，过户啊..，封装加密，利用隧道协议实现  大部分是链路层实现，小部分网络层实现）
  * => img_4_6_4_代理的作用.png


### 4-7 HTTP中介之网关 (08:09)
* => img_4_7_1_中介之网关.png       (网关协议转换器的角色)
  * => img_4_7_2_WEB网关.png       (发邮件例子)
  * => img_4_7_3_常见的网关类型.png  (微服务的关键词 => 安全网关)

### 4-8 HTTP缓存 (26:50)
* 为什么要使用HTTP缓存？
  * 浪费流量
  * 浪费服务器资源
  * 损耗客户端浏览器性能
  * 用户体验差
* 缓存的内容又是什么？
  * 样式文件，JS文件，图片文件..一些静态资源文件
* => img_4_8_1_HTTP缓存头部字段.png
  * => img_4_8_2_Expires.png
  * => img_4_8_3_LastModified_ifModifiedSince.png
  * => img_4_8_4_Etag_ifNoneMatch.png

HTTP缓存工作方式
* => img_4_8_5_缓存场景一.png
  * 约定：Expires， 服务器返回了 f.js以及过期时间Expires
  * 问题：假设，Expires已经过期，f.js再次请求（f.js并没有改动），如何避免这次请求？
* => img_4_8_6_缓存场景二.png
  * 场景一的基础上，加上一个文件最新修改时间的对比—— Last-Modified 与 if-Modified-Since
  * 就会有几种情况了：
  * 第一种情况：Expires没过期 => 浏览器机制就使用了本地缓存
  * 第二种情况：Expires过期，浏览器请求服务器的时候，就带上了文件最新修改时间，就在请求头里面加上了 if-Modified-Since, （其实这个时间就是上次服务器返回的Last-Modified），服务器会把if-Modified-Since（请求头里面的文件最新修改时间）和服务器上文件的最新修改时间（Last-Modified）对比：如果不相等，查找最新f.js同时再次返回 f.js, Expires，Last-Modified。如果相等，服务器返回304，告诉浏览器文件没修改过
    * 浏览器可以随意修改Expires，Expires这个字段不太稳定
    * 极端情况 Last-Modified 只能精确到秒，假设我在1秒内改变文件，Last-Modified 无法感知文件变化。浏览器永远拿不到最新文件
* => img_4_8_7_缓存场景三.png
  * => todo 看流程分支图，注意字段权重
  * 问题：不过期，浏览器没办法主动感知浏览器变化了  => img_4_8_8_缓存改进方案.png
  * => img_4_8_9_CDN缓存工作方式.png  => CDN提供了登录平台，支持用户手动更新缓存哒
  * => img_4_8_10_CDN缓存后续请求.png 
* => img_4_8_11_浏览器对HTTP缓存的影响.png


### 4-9 HTTP内容协商机制 (10:38)
同一个网站，国内访问是中文的，国外访问是英文的

* => img_4_9_1_内容协商机制.png
* => img_4_9_2_内容协商方式.png
* => img_4_9_3_服务器驱动_请求首部集.png
  * => img_4_9_3_服务器驱动_请求首部集.png
* => img_4_9_5_q机制.png

todo mp3和视频和直播 http是怎么传递的？
todo vue-element-admin 国际化写进简历

### 4-10 HTTP的断点续传与多线程下载 (07:08)
* => img_4_10_1_断电续传_多线程下载.png
  * => img_4_10_2_Range.png
  * => img_4_10_3_Range.png
* => img_4_10_4_断电续传_多线程下载.png
* => img_4_10_5_Content_Range.png
* => img_4_10_6_断电续传过程.png
todo 文件分片上传？

## 第5章 HTTP紧相伴--实验使用HTTP协议构建应用

### 5-1 HTTP请求服务器的简单实现（开发篇）-上 (28:32)
什么是服务器中间件？
中间件就是在 操作系统，网络，数据库之上，在应用软件的下层，总的作用是为处理自己上层的应用软件提供运行和开发的环境，帮助用户能够灵活高效的开发和集成复杂的应用软件。
或者说：
  中间件是一种独立的系统软件或者是服务器程序，分布式应用软件借助中间件不同的技术之间共享资源。
  中间件位于客户机服务器的操作系统之上，管理计算资源和网络通信
简单书：
  中间件能让我们写好的程序代码运行起来被使用的人看到并且使用
  常见的：nginx，阿帕奇，tomcat

### 5-2 HTTP请求服务器的简单实现（开发篇）-下 (19:11)
### 5-4 HTTP抓包分析实践 (03:16)
### 5-5 HTTP请求客户端实验 (07:59)

## 第6章 HTTP静相依--安全的HTTPS

### 6-1 趣解HTTP与HTTPS (15:50)
### 6-2 HTTPS协议概述 (12:31)
### 6-3 HTTPS使用成本 (04:27)
### 6-4 HTTPS对性能的影响 (11:03)
### 6-5 HTTPS常见问题 (06:39)
### 6-6 实验：从HTTP到HTTPS-设计属于自己的安全请求服务 (27:10)


## 第7章 HTTP长相随--基于 HTTP 的功能追加协议

### 7-1 HTTP协议的瓶颈 (14:28)
### 7-2 双工通信的WebScocket (22:49)
### 7-3 探索式的实践-SPDY (11:45)
### 7-4 期盼已久的HTTP2.0 (15:48)
### 7-5 实验：HTTP1.1升级HTTP2.0那些事 (25:32)
### 7-6 管理WEB服务器文件的WebDAV协议 (08:58)
### 7-7 HTTP的大跃进--QUIC与HTTP3.0 (13:11)
### 7-8 【知识扩展&amp;面试题】TCP与UDP的区别



## 第8章 HTTP终相守--Web安全威胁解析

### 8-1 Web安全攻击概述 (14:36)
### 8-2 验证机制安全 (24:35)
### 8-3 会话管理机制 (15:53)
### 8-4 SQL注入攻击 (07:56)
### 8-5 跨站脚本攻击 (22:23)
### 8-6 CSRF攻击 (11:32)


## 第9章 课程总结

### 9-1 【脑洞题】如何制定HTTP/4.0协议规范
### 9-2 课程总结 (23:21)