1. 打开微信、charles 预约页面
2. 抓包看看 要预约日期的 subscribeCalendarId 62679 进入页面会请求
3. 提前准备好 JSESSIONID
4. 早上7点准时，调用景区两个预约接口

// 查询要预约日期的 subscribeCalendarId
curl -H "Host: tongpiao.cn" -H "Cache-Control: max-age=0" -H "Upgrade-Insecure-Requests: 1" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309080f) XWEB/8461 Flue" -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9" -H "Referer: http://tongpiao.cn/ITS/itsApp/goSubscribeList.action" -H "Accept-Language: zh-CN,zh;q=0.9" -H "Cookie: JSESSIONID=54B97135C00952869A4C117AE94A1FCD" --compressed "http://tongpiao.cn/ITS/itsApp/goSubscribe.action?subscribeId=49"

// 准备预约
curl -H "Host: tongpiao.cn" -H "Accept: text/plain, */*; q=0.01" -H "X-Requested-With: XMLHttpRequest" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309080f) XWEB/8461 Flue" -H "Content-Type: application/x-www-form-urlencoded; charset=UTF-8" -H "Origin: http://tongpiao.cn" -H "Referer: http://tongpiao.cn/ITS/itsApp/goSubscribe.action?subscribeId=49" -H "Accept-Language: zh-CN,zh;q=0.9" -H "Cookie: JSESSIONID=54B97135C00952869A4C117AE94A1FCD" --data-binary "subscribeId=49&subscribeCalendarId=62679&noPayCardNos=&payCardNos=&selectCards=871899%23202499045764%23412824199909223534%230%230%23174%2C" --compressed "http://tongpiao.cn/ITS/itsApp/subscribeCardRestriction.action"

// 保存预约
curl -H "Host: tongpiao.cn" -H "Cache-Control: max-age=0" -H "Upgrade-Insecure-Requests: 1" -H "Origin: http://tongpiao.cn" -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6309080f) XWEB/8461" -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9" -H "Referer: http://tongpiao.cn/ITS/itsApp/goSubscribe.action?subscribeId=27" -H "Accept-Language: zh-CN,zh;q=0.9" -H "Cookie: JSESSIONID=54B97135C00952869A4C117AE94A1FCD" --data "subscribeId=49&subscribeCalendarId=62679&cardNo_871899=202499045764&cardType_871899=2&userIdCard_871899=412824199909223534&cardId=871899%23202499045764%23412824199909223534%230%230%23174" --compressed "http://tongpiao.cn/ITS/itsApp/saveUserSubscribeInfo.action"