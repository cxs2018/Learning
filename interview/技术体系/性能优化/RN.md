## 框架层面

1. 预加载 Bundle
以空间换时间，在app启动时候，将 ReactRootView 初始化出来，缓存起来，在用的时候直接从缓存中获取 ReactRootView 使用

2. 拆包
3. bundle包缓存、网络接口缓存

## 应用层面

1. 减少重新渲染 shouldComponentUpdate、React.memo、PureComponent
2. setNativeProps 可以直接修改原生视图组件的属性，而不会触发React组件的重新渲染、DOM Diff等
3. Animated useNativeDriver 使用原生驱动，但是只能用于非布局属性，如 transform、opacity
4. 数组遍历时候，key的使用，使得 React 框架在进行DOM Diff时准确知道哪些组件可以复用，提高Diff效率
5. 减少页面组件复杂度，组件层级过深会影响渲染时间，React.Fragment
6. 生产环境移除console.log语句 babel-plugin-transform-remove-console
7. 虚拟列表 FlatList、SectionList 的使用，getItemLayout、keyExtractor
8. Image => react-native-fast-image
9. 事件处理函数，避免使用内联的写法，虽然这个优化可能微不足道，但是算是一个好的代码习惯，性能问题往往就是不规范的代码习惯引起的，所以，从小事做起