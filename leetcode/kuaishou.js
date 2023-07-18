function createPlayer(totalDuration) {
    let currentTimer = 0;
    const listener = [];
    let isPause = false;
  
    const nextTimeout = (callback) => {
      setTimeout(() => {
        const ret = callback();
        if (ret === false) return;
        nextTimeout(callback);
      }, 1000);
    };
  
    const playing = () => {
        if (isPause) {
            return false
        }
      currentTimer = currentTimer + 1000;
      listener.forEach((fn) => {
        fn(Math.floor(currentTimer / totalDuration) * 100);
      });
      return currentTimer < totalDuration;
    };
  
    return {
      play() {
        // write code here
        isPause = false;
        nextTimeout(playing)
      },
      on(callback) {
        listener.push(callback);
      },
      pause() {
        // write code here
        isPause = true;
      },
      stop() {
        currentTimer = 0;
      }
    };
  }
  
  // 使下面的测试代码按要求输出结果
  const player = createPlayer(10 * 1000); // 播放 10s 的歌曲
  let start = Date.now();
  let getTimeSpan = () => Math.floor((Date.now() - start) / 1000);
  player.on((progress) => {
    console.log(`${getTimeSpan()}s: ${progress}%`);
  });
  player.play();
  setTimeout(() => {
    player.pause();
  }, 2000);
  
  setTimeout(() => {
    player.play();
  }, 4000);
  
  setTimeout(() => {
    player.stop();
  }, 6000);
  
  // output
  // 开始后，输出:   0s: 0%
  // 1s 后，输出:   1s: 10%
  // 2s 后，输出:   2s: 20%
  // 3s 后，没有任何输出
  // 4s 后，输出:   4s: 20%
  // 5s 后，输出:   5s: 30%
  // 6s 后，输出:   6s: 0%