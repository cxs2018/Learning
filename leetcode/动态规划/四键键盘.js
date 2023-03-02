// 剩余的按键次数 n，当前屏幕上字符的数量 a_num，剪切板中字符A的数量 copy
function maxA(N) {
	function dp(n, a_num, copy) {
		if (n <= 0) {
			return a_num
		}
		return Math.max(dp(n - 1, a_num + 1, copy), dp(n - 1, a_num + copy, copy), dp(n - 2, a_num, a_num))
	}
	return dp(N, 0, 0)
}

// dp(n - 1, a_num + 1, copy) 按下a，屏幕上加一个字符，消耗一个字符，缓冲区不变
// dp(n - 1, a_num + copy, copy) 按下c-v，屏幕上加缓冲区数量
// dp(n-1, a_num, copy) 按下c-a，不变
// dp(n-1, a_num, a_num) 按下c-c，缓冲区数量和屏幕一致

// wrong
function maxADetail(N) {
	function dp(n, a_num, copy) {
		if (n <= 0) {
			return a_num
		}
		return Math.max(dp(n - 1, a_num + 1, copy), dp(n - 1, a_num + copy, copy), dp(n - 1, a_num, copy), dp(n - 1, a_num, a_num))
	}
	return dp(N, 0, 0)
}

// 备忘录
function maxAMemo(N) {
	var memo = new Map();
	function dp(n, a_num, copy) {
		if (n <= 0) {
			return a_num;
		}
		var key = n + '_' + a_num + '_' + copy;
		if (memo.get(key)) {
			return memo.get(key);
		}
		var value = Math.max(dp(n - 1, a_num + 1, copy), dp(n - 1, a_num + copy, copy), dp(n - 2, a_num, a_num));
		memo.set(key, value);
		return value;
	}
	return dp(N, 0, 0)
}

/**
 * DP table
 */
function maxADpTable(N) {
	// dp[i] 表示 i 次操作后最多能显示多少个 A
	var dp = new Array(N + 1);
	dp[0] = 0;
	for (var i = 1; i <= N; i++) {
		// 按A键
		dp[i] = dp[i - 1] + 1;
		for (var j = 2; j < i; j++) {
			// 全选 & 复制 dp[j-2]，连续粘贴i-j次
			// 屏幕上共有 dp[j-2] * (i-j+1)
			dp[i] = Math.max(dp[i], dp[j - 2] * (i - j + 1))
		}
	}
	// N次按键之后最多有几个A？
	return dp[N]
}

console.log(maxADpTable(14), maxA(14))