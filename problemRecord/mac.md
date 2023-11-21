## adb 命令不存在

在当前目录用户下创建 .zshenv、.bash_profile 文件

export ANDROID_HOME=/Users/cuixuesen/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools

重启终端

## android 高德地图SDK 引起app crash

Exception thrown during dispatchAppVisibility Window{456f3de u0 com.xiaomi.retail.tangram/com.xiaomi.retail.tangram.MainActivity EXITING}
android.os.DeadObjectException

Failed to deliver inset state change to w=Window{456f3de u0 com.xiaomi.retail.tangram/com.xiaomi.retail.tangram.MainActivity EXITING}
android.os.DeadObjectException

https://github.com/qiuxiang/react-native-amap3d/issues/742

https://juejin.cn/post/7234407587118530597

https://juejin.cn/post/7113884049491378184

android:allowNativeHeapPointerTagging="false"

https://lbs.amap.com/faq/android/navi-sdk/1000108216/1061016771/

## android 签名密钥

keytool -genkeypair -v -storetype PKCS12 -keystore ./my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

可生成两个版本，release、debug

查看签名SHA1

keystore -list -v -keystore ./my-release-key.keystore

配置项参考：https://reactnative.cn/docs/signed-apk-android

## nvm use 全局不生效
nvm ls
nvm alias default vX.X.X
nvm use 默认的版本 才会全局生效