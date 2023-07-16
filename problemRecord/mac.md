## adb 命令不存在

在当前目录用户下创建 .zshenv、.bash_profile 文件

export ANDROID_HOME=/Users/cuixuesen/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools
export PATH=${PATH}:${ANDROID_HOME}/platform-tools

重启终端