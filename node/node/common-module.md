# 常用模块库

```js
const fs = require('fs');
const path = require("path");
const http = require('http');
const EventEmitter = require("events").EventEmitter;

const program = require('commander') // 命令行工具
const sh = require('shelljs')
const crypto = require('crypto')
const readline = require("readline");
const { spawn } = require('child_process'); // 执行命令
const {promisify} = require('util') // callback 转 promise
program.version(require('../package').version) // 直接读取package.json
const figlet = promisify(require('figlet')) // 字符画
const clear = require('clear') // 清屏
const chalk = require('chalk') // 粉笔 给输出内容加颜色
const download = promisify(require('download-git-repo')) // 下载git仓库代码
const ora = require('ora') // loading效果
const open = require("open") // 打开浏览器
const handlebars = require('handlebars') // 模板解析

const router = require('koa-router')() // 路由
const session = require('koa-session') // session
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const jwt = require("jsonwebtoken")
const jwtAuth = require("koa-jwt")
const static = require('koa-static')
const axios = require('axios')
const querystring = require('querystring')

const express = require('express');
const proxy = require('http-proxy-middleware') // 代理
const bodyParser = require('body-parser'); // body转换

const net = require('net') // Net模块提供⼀一个异步API能够创建基于流的TCP服务器器 实现 socket
const request = require("request"); // 请求
const cheerio = require("cheerio"); // node版 jquery
const iconv = require("iconv-lite"); // 解决编码问题

const mysql = require("mysql");
const mysql = require('mysql2/promise');
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const redis = require('redis');
const redisStore = require('koa-redis');
const wrapper = require('co-redis');
const Sequelize = require("sequelize");

const schedule = require("node-schedule");

const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const download = require('image-downloader')

const cluster = require('cluster');
const os = require('os'); // 获取CPU 的数量量
const process = require('process')

const createHandler = require('github-webhook-handler')
```
