const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 匹配的是 <xxx  第一个分组就是开始标签的名字
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// 匹配的是 </xxxx>  第一个分组就是结束标签的名字
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
// 分组1: 属性的key 分组2: =  分组3/分组4/分组5: value值
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性
const startTagClose = /^\s*(\/?)>/; // 匹配开始标签的结束 > 或 />  <div id = 'app' >  <br/>

function createAstElement(tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    parent: null,
    attrs,
  };
}

let root = null;
let stack = [];

export function parserHTML(html) {
  function start(tagName, attributes) {
    let parent = stack[stack.length - 1];
    let element = createAstElement(tagName, attributes);
    if (!root) {
      root = element;
    }
    element.parent = parent;
    if (parent) {
      parent.children.push(element);
    }
    stack.push(element);
  }
  function end(tagName) {
    let last = stack.pop();
    if (last.tag !== tagName) {
      throw new Error("标签有误");
    }
  }
  function chars(text) {
    text = text.replace(/\s/g, "");
    let parent = stack[stack.length - 1];
    if (text) {
      parent.children.push({
        type: 3,
        text,
      });
    }
  }
  function advance(len) {
    html = html.substring(len);
  }
  function parseStartTag() {
    const start = html.match(startTagOpen);
    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      advance(start[0].length);
      let end;
      let attr;
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        advance(attr[0].length);
      }
      if (end) {
        advance(end[0].length);
      }
      return match;
    }
    return false; // 不是开始标签
  }
  while (html) {
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      const startTagMatch = parseStartTag(); // 解析开始标签
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        end(endTagMatch[1]);
        advance(endTagMatch[0].length);
      }
    }
    let text;
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      chars(text);
      advance(text.length);
    }
  }
  return root;
}
