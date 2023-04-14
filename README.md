# tauri-gpt-box

该项目是使用 tauri 实现的一个 chatGPT 聊天客户端，会话记录存储在 sqlite 中，使用 rust 端写接口的做的，性能相当不错。tauri 本身特性，打的包比较小，只有 6M。因为第一次写 tauri，所有代码尽可能使用简单易理解的方式来组织，因此**非常适合初学者入门 tauri**

[效果](https://github.com/bravekingzhang/tauri-chat-box/blob/main/art/20230414_103659.gif)

### 推荐

rust 部分的源码需要有一定的 rust 基础才可以看，很简单，几乎是 1 天就可以上手看，直接去 [官网](https://www.rust-lang.org/zh-CN/)

新手可以通过阅读他们提供的[书籍](https://doc.rust-lang.org/book/)，是免费的 还代中文翻译。

建议掌握：通读一遍就够啦

- 基本数据类型
- 结构体
- 所有权
- 闭包
- 枚举
- Optional
- Crates

然后应该读懂 rust 源码部分，甚至可以上手写。

### 注意

tauri 目前仅支持桌面端，而且因操作系统而已，UI 层面的展现可能有些不太一样，可以自行按照下面方式打包到对应平台，dmg 目录下提供 macOS 版本打包。可能有些电脑需要到是用命令行启动

```shell
/Applications/tarui-gpt-box.app/Contents/MacOS/tarui-gpt-box
```

如果需要移动端版本，可以是用我的 [flutter 版本](https://github.com/bravekingzhang/flutter_chat_box)

### 技术栈

- Tauri + Vue 3 + TypeScript
- rust
- sqlite
- markdown syntax highlighting
- pinia
- vuetify

### 快速开始

- 环境准备，[参考 tauri 官网](https://tauri.app/zh-cn/v1/guides/getting-started/prerequisites)
- yarn && yarn tauri dev

### 构建安装包

yarn tauri build

### 请我喝咖啡环节

如果你觉得对你有用，打赏我一杯咖啡。

<img src="https://github.com/bravekingzhang/utools-code2flow-official/blob/main/shoukuanma.png" alt="收款码" style="width: 40%;" />

# License

MIT license
