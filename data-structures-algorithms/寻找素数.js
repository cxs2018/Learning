/**
 * 素数：只能被1和自身整除的数
 * 素数又叫质数
 */
{
  // 直观写法
  function countPrimes(n) {
    if (n === 1 || n === 2) {
      return n - 1;
    }
    function isPrime(n) {
      for (let i = 2; i < n; i++) {
        if (n % i === 0) {
          return false;
        }
      }
      return true;
    }
    let count = 0;
    for (let i = 2; i < n; i++) {
      if (isPrime(i)) {
        count++;
      }
    }
    return count;
  }
}
{
  /**
   * 遍历到 n 的平方根处即可，12 = 6 * 2 = 2 * 6
   * @param n
   * @returns {number}
   */
  function countPrimes(n) {
    if (n === 1 || n === 2) {
      return n - 1;
    }
    function isPrime(n) {
      for (let i = 2; i * i < n; i++) {
        if (n % i === 0) {
          return false;
        }
      }
      return true;
    }
    let count = 0;
    for (let i = 2; i < n; i++) {
      if (isPrime(i)) {
        count++;
      }
    }
    return count;
  }
}
{
  /**
   * 筛数法优化 Sieve of Eratosthenes
   * @param n
   * @returns {number}
   */
  function countPrimes(n) {
    if (n === 1 || n === 2) {
      return n - 1;
    }
    const isPrime = new Array(n).fill(true);
    // 平方根
    for (let i = 2; i * i < n; i++) {
      if (isPrime[i]) {
        // 从 i * i 开始，因为之前会被小于 i 的给标记
        for (let j = i * i; j < n; j += i) {
          isPrime[j] = false;
        }
      }
    }
    let count = 0;
    for (let i = 2; i < n; i++) {
      if (isPrime[i]) {
        count++;
      }
    }
    return count;
  }

  console.log(countPrimes(5));
}
