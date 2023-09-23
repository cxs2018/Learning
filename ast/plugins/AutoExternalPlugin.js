const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExternalModule = require("webpack/lib/ExternalModule");

class AutoExternalPlugin {
  constructor(options) {
    this.options = options;
    this.usedExternalModules = new Set();
  }

  apply(compiler) {
    let _this = this; // 插件类的实例
    let { options, usedExternalModules } = this;

    // webpack module NormalModule 普通模块、普通JS模块 <=  由工厂创建
    compiler.hooks.normalModuleFactory.tap(
      "AutoExternalPlugin",
      (normalModuleFactory) => {
        normalModuleFactory.hooks.parser
          .for("javascript/auto")
          .tap("AutoExternalPlugin", (parser) => {
            parser.hooks.import.tap(
              "AutoExteralPlugin",
              (statement, source) => {
                if (options[source]) {
                  usedExternalModules.add(source);
                }
              }
            );
            parser.hooks.call
              .for("require")
              .tap("AutoExternalPlugin", (expression) => {
                let value = expression.arguments[0].value;
                if (options[value]) {
                  usedExternalModules.add(value);
                }
              });
          });
        // get normal module factory
        // has a factory hook
        console.log(normalModuleFactory.hooks);
        // webpack5 里面不能用了，factory钩子删掉了
        normalModuleFactory.hooks.factory.tap(
          "AutoExternalPlugin",
          (factory) => (data, callback) => {
            // 正常来说，把 data传给factory，会创建对应的模块，并把模块传给callback
            console.log("data", data);
            let request = data.request; // 要加载的模块名字
            if (options[request]) {
              let { variable } = options[request]; // $ _
              // 创建一个外部模块并返回
              callback(null, new ExternalModule(variable, "window", request));
            } else {
              factory(data, callback);
            }
          }
        );
      }
    );

    // 自动向产出的html中插入script标签
    compiler.hooks.compilation.tap("AutoExternalPlugin", (compilation) => {
      // 插件 HtmlWebpackPlugin 向 compilation 上增加额外的钩子，供其他插件使用
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tapAsync(
        "AutoExternalPlugin",
        (htmlPluginData, callback) => {
          let scriptUrls = Object.keys(options)
            .filter((key) => usedExternalModules.has(key))
            .map((key) => options[key].url);
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
        }
      );
    });
  }
}

module.exports = AutoExternalPlugin;
