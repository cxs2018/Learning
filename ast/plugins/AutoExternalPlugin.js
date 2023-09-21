const HtmlWebpackPlugin = require("html-webpack-plugin");

class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    let _this = this; // 插件类的实例

    // webpack module NormalModule 普通模块、普通JS模块 <=  由工厂创建
    compiler.hooks.normalModuleFactory.tap(
      "AutoExternalPlugin",
      (normalModuleFactory) => {
        // get normal module factory
        // has a factory hook
        console.log(normalModuleFactory.hooks);
        normalModuleFactory.hooks.module.tap(
          "AutoExternalPlugin",
          // (factory) => (data, callback) => {
          //   // 正常来说，把 data传给factory，会创建对应的模块，并把模块传给callback
          //   console.log("data", data);
          //   factory(data, callback);
          // },
          function () {
            console.log("factory", arguments);
          },
        );
      },
    );

    let { options } = this;
    // 自动向产出的html中插入script标签
    compiler.hooks.compilation.tap("AutoExternalPlugin", (compilation) => {
      // 插件 HtmlWebpackPlugin 向 compilation 上增加额外的钩子，供其他插件使用
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        "AutoExternalPlugin",
        (htmlPluginData, callback) => {
          let scriptUrls = Object.values(options).map((item) => item.url);
          scriptUrls.forEach((url) => {
            htmlPluginData.assetTags.scripts.unshift({
              tagName: "script",
              voidTag: false,
              meta: {
                plugin: "html-webpack-plugin-custom",
              },
              attributes: {
                defer: false,
                src: url,
              },
            });
          });
          // 这是一个异步串行瀑布钩子
          callback(null, htmlPluginData);
        },
      );
    });
  }
}

module.exports = AutoExternalPlugin;
