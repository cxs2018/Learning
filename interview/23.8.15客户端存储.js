// cookie是与特定域绑定的
class CookieUtil {
  static get(name) {
    let cookieName = `${encodeURIComponent(name)}=`, cookieStart = document.cookie.indexOf(cookieName), cookieValue = null;

    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(";", cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
    }

    return cookieValue
  }

  static set(name, value, expires, path, domain, secure) {
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toUTCString()}`
    }

    if (path) {
      cookieText += `; path=${path}`
    }

    if (domain) {
      cookieText += `; domain=${domain}`
    }

    if (secure) {
      cookieText += `; secure`
    }

    document.cookie = cookieText
  }

  static unset(name, path, domain, secure) {
    CookieUtil.set(name, "", new Date(0), path, domain, secure)
  }
}

// 设置 cookie
CookieUtil.set("name", "Nicholas");
CookieUtil.set("book", "Professional JavaScript");
// 读取 cookie
alert(CookieUtil.get("name")); // "Nicholas"
alert(CookieUtil.get("book")); // "Professional JavaScript"
// 删除 cookie
CookieUtil.unset("name");
CookieUtil.unset("book");
// 设置有路径、域和过期时间的 cookie
CookieUtil.set("name", "Nicholas", "/books/projs/", "www.wrox.com",
  new Date("January 1, 2010"));
// 删除刚刚设置的 cookie
CookieUtil.unset("name", "/books/projs/", "www.wrox.com");
// 设置安全 cookie
CookieUtil.set("name", "Nicholas", null, null, null, true);

// 子Cookie name=name1=value1&name2=value2&name5=value5
class SubCookieUtil {
  static get(name, subName) {
    let subCookies = SubCookieUtil.getAll(name);
    return subCookies ? subCookies[subName] : null
  }

  static getAll(name) {
    let cookieName = encodeURIComponent(name) + "=", cookieStart = document.cookie.indexOf(cookieName), cookieValue = null, cookieEnd, subCookies, parts, result = {}

    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(";", cookieStart)
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length
      }
      cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd)

      if (cookieValue.length > 0) {
        subCookies = cookieValue.split("&")

        for (let i = 0, len = subCookies.length; i < len; i++) {
          parts = subCookies[i].split("=")
          result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
        }

        return result
      }
    }
    return null
  }

  static set(name, subName, value, expires, path, domain, secure) {
    let subcookies = SubCookieUtil.getAll(name) || {}
    subcookies[subName] = value;
    SubCookieUtil.setAll(name, subcookies, expires, path, domain, secure)
  }

  static setAll(name, subcookies, expires, path, domain, secure) {
    let cookieText = encodeURIComponent(name) + '=', subcookiesParts = new Array(), subName;
    for (subName in subcookies) {
      if (subName.length > 0 && subcookies.hasOwnProperty(subName)) {
        subcookiesParts.push(`${encodeURIComponent(subName)}=${encodeURIComponent(subcookies[subName])}`);
      }
    }

    if (subcookiesParts.length > 0) {
      cookieText += subcookiesParts.join('&')

      if (expires instanceof Date) {
        cookieText += `; expires=${expires.toUTCString()}`
      }

      if (path) {
        cookieText += `; path=${path}`
      }

      if (domain) {
        cookieText += `; domain=${domain}`
      }

      if (secure) {
        cookieText += `; secure`
      }
    } else {
      cookieText += `; expires=${(new Date(0)).toUTCString()}`
    }
    document.cookie = cookieText
  }

  static unset(name, subName, path, domain, secure) {
    let subcookies = SubCookieUtil.getAll(name)
    if (subcookies) {
      delete subcookies[subName]
      SubCookieUtil.setAll(name, subcookies, null, path, domain, secure)
    }
  }

  static unsetAll(name, path, domain, secure) {
    SubCookieUtil.setAll(name, null, new Date(0), path, domain, secure)
  }
}