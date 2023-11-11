React202012 zhufeng

返回上一级 | 全部文件 >... >珠峰架构 >03-第三部分 核心课程：React全家桶 >React(202012)(架构)

课里面的版本
"react": "17.0.1",
"react-dom": "17.0.1",
"react-scripts": "4.0.1"·

遇到了个问题，不知道为啥不走自己写的React.createElement
修复，可使用旧版react，使用老的jsx编译方式
"react": "16.12.0",
"react-dom": "16.12.0",
"react-scripts": "4.0.3"

原因是，set DISABLE_NEW_JSX_TRANSFORM=true 没生效
跨平台，用 cross-env 就解决了
cross-env DISABLE_NEW_JSX_TRANSFORM=true

React 17
