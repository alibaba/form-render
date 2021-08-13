# Changelog

## 1.6.2

1. 一般来说用 watch 字段和动态表达式，能够解决大部分联动问题，但当联动关系复杂时并不适合使用表达式，当关联性存在列表中时，使用 watch 也不能很好实现
2. 书写自定义组件时，大伙儿经常想在自定义组件中获取全局的某个值，并根据那个值的变动来决定自定义组件的渲染。但是 FR 1.0 性能优化上已经避免了不必要的重复渲染，如果没有显式的指明，自定义组件是不会因为其他表单项的变动而重新渲染的，导致自定义组件内拿到的 formData 并不是最新的

为了解决上述两个问题，我们自然地引入了 dependencies 字段

- [+] 新增 dependencies 字段，当一个表单项的展示和数据依赖于另一个表单项的值时，可使用 dependencies 显式地注明。具体参见文档

## 1.6.1

- [!] 修复了 playground 内自定义组件语法没有更新到 1.x 的问题
- [!] 升级了 xlsx 依赖包的版本，解决安全报警问题
- [!] 修复了在 onMount 中使用 form.getValues 有时无效的问题
- [!] 修复了 bind 的字段为数组，且路径为原字段的子集时（例如 a: {bind: ['a.b', 'a.c']}）bind 会失效的问题

## 1.6.0

新增“度量”这个话题。FormRender 作为表单提效方案，对于用户填写一份表单现在需要多少时间，到底提效了多少这些问题并没有提供数据上的证明。无法被度量的事，改进也无从谈起。所以围绕这个主题，我们提供了新的 api 以及文档说明

- [+] 新增 logOnMount / logOnSubmit 两个 api，作为 useForm 的入参，用于在表单加载以及提交的时机给用户提供相关的度量信息

- [+] 新增[“度量”文档](https://x-render.gitee.io/form-render/measure)

功能优化

- [+] url 组件现在支持自定义 btn 文案，自定义 prefix、suffix

文档翻新

- [!] 文档/git issue 模板等翻新
- [!] 翻新了 bug/feature report 的模板
- [!] 考虑到表单编辑器的重要性，在文档中的位置变动到
- [!] 修复了联动/自定义组件等多处文档 demo 的 bug
- [!] 为旧版 form-render 的用户提供了 schema 装换器，一键转换成新版 schema

### 1.5.8

- [!] 修复了上个版本引入的校验信息无法展示的问题

### 1.5.7 (showValidate 造成校验没有展示，请勿使用本版本)

- [!] 修复了 connectForm 上的 ref 没有透传的问题
- [!] 提供了“折中升级方案”，适用于旧版 FormRender 项目快速大面积升级，虽然不能享受 100%的新功能

### 1.5.6

- [!] 修复了所有涉及 range 组件的校验问题（从源头上把几个奇异 case 处理了）

### 1.5.5

- [+] 将一系列有用的 form 方法也挂在了自定义组件的 addons props 上，能够取到使用
- [+] 提供了能够同时修改多个 key 值的 schema 的 setSchema 方法

### 1.5.4

- [!] 修复了 upload 等多元素组件的 xxprops 没有透传的问题
- [!] 修复了涉及到数组 bind 的场景下，外部更新表单数据后，range 元素会通过必填校验的问题

### 1.5.3

- [+] Form 的 props 添加 `removeHiddenData` 用于选择提交的时候是否去掉已经被隐藏的元素的数据，默认 false 不隐藏

### 1.5.2

- [+] 展示是 table 的 list 类组件（list2，list3，list4）的 props 和 itemProps 分别透传 table 的 props 和 columns 的 props 到 antd，便于用户定制化配置
- [!] 优化了异步加载，只有需要异步加载的部分 Suspense 渲染，且分析并只异步加载体积大的组件
- [!] 修复了只读模式下 range 组件数据未展示的问题

### 1.5.1

- [!] 修复了 1.5.0 切换打包方式到 babel 引入的安装报错问题，以及 less -> css 转换未开启的问题

### 1.5.0 (这个版本有问题，请勿安装)

- [+] 内部使用了 tree-shaking，减少首次加载，避免未用到的组件被加载
- [+] 全新的 playground，类似 vscode 的更好的体验，以及代码输入提示等
- [!] 修复了 hideDelete 会隐藏整个操作栏的问题（list2）
- [!] 解决了 schema 不存在的字段会在初始化中被去掉的问题
- [!] 添加了旧版 schema 到新 schema 的转换器
- [!] list 的复制按钮可以单独隐藏，使用 `hideCopy`

### 1.4.4

- [!] 修复了 hidden = true 是做了多余的对类型的判断的问题

### 1.4.3

- [!] 修复了 range 元素的校验，清空后不再会通不过校验
- [!] 修复了 hidden 是表达式时，即使隐藏也还是会被校验的问题
- [!] 修复了复制后的元素与原元素值同步的问题

### 1.4.2

- [!] 修复日期使用 props/format 造成校验不通过的问题

### 1.4.1

- [!] 去掉了 1.4.0 版本带来的一堆 error 的 console.log
- [!] antd 升级 4.16.0 Collapse.Panel 样式变更导致对象展示奇怪，修复兼容性
- [!] 日期组件的 format 可以在 props 里自定义设置，例如 props: {format: 'YY/MM/DD'}
- [!] 修复了几个声明文件上的类型注释错误

### 1.4.0

#### 新功能

- [+] 区别了不写 title（不占位） 和 title = '' （占位）的展示，给展示带来灵活性
- [+] 列表添加了上下移动 item 的功能，同时新增 hideMove 字段用于隐藏上下移动
- [+] 列表添加了 `addBtnProps` 属性，用于自定义“新增一条”按钮的样式和文案
- [+] 新增 extra 字段，用于描述补充文案，类似于 antd form 的 extra，详见“协议/schema 规范”
- [+] list2 组件增加了复制功能

#### 校验

- [!] fix 了列表元素上下移动后校验信息展示有误的问题（一个简单 fix，还需后续优化）
- [!] fix 了列表中非 string 类型的元素类型校验一直不通过的问题
- [!] fix 了 min = 0 时，校验信息错误的问题

#### 其他

- [!] fix 了 watch 的声明类型错误的问题
- [!] fix 了部分情况 disabled 状态变化后展示无反馈的问题

### 1.3.4

- [!] 修复复杂（带数组方法）的表达式解析错误的问题
- [!] 修复了列表展示过于挤的问题
- [!] 修复文档 errorFields 说明错误

### 1.3.3

- [+] Form 添加全局的 disabled 属性，用于全局禁用
- [+] Form 添加全局的 allCollapsed 属性，用于全局控制对象的展开/收起
- [+] 新增虚拟列表展示，对应 widget: list4，可无限滚动代替了翻页
- [+] 列表组件现在放开了页码配置支持
- [+] 列表支持隐藏“复制”、“新增”、“删除”等按钮（hideAdd/hideDelete）
- [+] 列表组件新增 props/button 属性，用于添加更多的操作按钮
- [!] 修复了 range 组件的必填校验无效的问题
- [!] 修复了 onMount 时，bind 字段无效的问题
- [!] 新增 readOnlyWidget 字段，用于定制化只读模式的组件渲染
- [!] 修复了 onMount/getValues 等 TS 声明有误的问题

### 1.3.2

- [!] playground 完全翻新
- [!] 文档补充了更多的使用方
- [!] 修复了 onValuesChange 在声明文件里声明成必填的问题
- [!] 修复了文档链接带锚点不会自动滚动到的问题
- [!] 修复了 `addons.getValues` 返回错误的问题
- [!] 修复上一个版本不慎引入的了 `getValues` 返回错误的问题

### 1.3.1

- [+] 列表支持 props/buttons 属性，用于添加更多的自定义操作按钮 ([#343](https://github.com/alibaba/x-render/issues/343))
- [+] 添加了 `onValuesChange` 方法，用于时时更新的钩子，暂时不放文档，内部试验一下性能
- [+] 添加了 `className` 这个基础属性，用于样式覆盖特定的表单元素
- [!] 解决包体积大小问题 lodash -> lodash-es ([#341](https://github.com/alibaba/x-render/issues/341))
- [!] 修复颜色选择器无法选中透明度的问题 ([#349](https://github.com/alibaba/x-render/issues/349))
- [!] 列表的 min/max 属性能正常被校验
- [!] 修复了隐藏的字段（hidden = true），还是会去执行校验的 bug ([#348](https://github.com/alibaba/x-render/issues/348))
- [!] 在 React profiler 的帮助下，减少了重复渲染，提升性能 ([#344](https://github.com/alibaba/x-render/issues/344))
- [!] 修复了 number 类型 0 无法通过必填校验的 bug ([#347](https://github.com/alibaba/x-render/issues/347))

### 1.3.0

- [+] 新增了 onMount 的生命周期，在表单首次加载后触发
- [+] 新增了 setSchemaByPath 方法，方便用户快速根据路径修改 schema
- [+] 文档新增了生命周期。表单监听和表单方法文档大幅更新
- [!] range 组件的校验和展示问题修复
- [!] getValues 获取的值现在与 submit 时拿到的一致了
- [!] 对是否是 checkbox 的 schema 的判断更为严格，避免误伤

### 1.2.0

- [+] form-render 现在能完美支持 vite 等新的基于 esm 的开发工具了！
- [+] `watch` 支持了 immediate 参数，且首次加载默认不会被调用，用法与 vue.js 完全相同
- [+] 做了简单的 hidden = true 的元素提交时去掉的处理
- [!] 修复了 typesript 没有声明新 api `watch` 的问题
- [!] 修复了 image 的判断过于严格的问题
- [!] 优化了表达式计算逻辑，进一步减少计算
- [!] submit 返回的数据中，所有的 undefined 的值会自动刨去
- [!] 修复了元素 hidden 时，出现空白占位的问题
- [!] 修复了 type 书写错误直接导致程序 crash 的问题，现在会给出一个提示
- [!] 修复了 slider 组件对 min/max 支持有误的问题

### 1.1.3

- [+] html 组件支持多选的展示，更好支持 readOnly 下的展示
- [!] beforeFinish 的入参为 object，现在能获取 {data, errors,schema} 三个入参, 更多入参可以通过 config 传入
- [!] 修复了 object 和 list 的展示，并能正确的去判断 schema 使用了自定义组件 ([#319](https://github.com/alibaba/x-render/issues/319))
- [!] 修复了 description 的展示兼容性 ([#323](https://github.com/alibaba/x-render/issues/323))
- [!] 修复了 readOnly 判断优先级低于 widget 字段导致自定义组件在 readOnly 模式下展示无效的问题 ([#327](https://github.com/alibaba/x-render/issues/327))
- [!] 修复了 html 组件报错的问题 ([#331](https://github.com/alibaba/x-render/issues/331))
- [!] 修复了 resetFields 没有清除“用户是否触摸”的状态，导致校验展示的问题

### 1.1.2

- [!] 修复 list 的删除无效的问题，并做了展示上的优化

### 1.1.1

- [+] 更新 npm 包的文档信息以及补全对应的 package 信息

### 1.1.0

- [+] 新增 watch 方法，用于监听表单值变化，触发 callback
- [+] 新增 form.resetFields 方法，用于重置表单（值和内部状态）([#315](https://github.com/alibaba/x-render/issues/315))
- [+] list1 展示优化，且支持了 hideTitle 模式
- [+] date 组件的 format 支持了 year、quarter、week、month 等
- [+] 更新了 props 的使用规范文档
- [!] fix 了自定义组件 type=boolean 时，没有显示 title 的问题 ([#313](https://github.com/alibaba/x-render/issues/313))
- [!] 修复了 list2 展示没有明确的必填提示的问题
- [!] 修复了 list2 展示没有填满 table 单元格的问题

### 1.0.5

- [+] 新增 `validateMessages` 字段，用于覆盖默认的校验信息，详见[文档](https://x-render.gitee.io/form-render#validatemessages) ([#306](https://github.com/alibaba/x-render/issues/306))
- [!] rules 字段无法生效的问题 ([#305](https://github.com/alibaba/x-render/issues/305))
- [!] 修复了下拉多选框在 value = null 时会展示一个空标签的问题
- [!] 说明（description）的 tooltip 展示气泡位置确保对齐

### 1.0.4

- [+] 新增时间区间组件 timeRange。通过`{type: 'range', format: 'time'}` 渲染
- [!] 完善 ts 声明文件。([#302](https://github.com/alibaba/x-render/pull/302))
- [!] fix 了 rules 校验和 image 校验的冲突
- [!] 修复了 tooltip、checkbox 等样式的问题

### 1.0.3

- [!] fix 列表的 bind 无效的问题
- [!] fix format: image 未校验的问题
- [!] 默认列表样式微调

### 1.0.2

- [+] 新增默认列表展示 card list。widget: list0
- [+] 列表添加了“复制”的功能
- [!] 对象标题、以及列表的样式更加紧凑
- [!] 智能渲染的规则与 form-render 0.x 的习惯靠拢。单选 enum 长度 2 以上的使用下拉选择，多选 enum 长度 6 以上的使用下拉选择
- [!] 解决了由于闭包造成的对表单元素是否被 touch 的判断偶然不更新的问题

### 1.0.1

- [+] 自定义组件参数增加了 formData、getValue，用于获取其他表单元素的值
- [!] fix 了表单销毁后校验状态等表单状态没有消失的问题（内置了 destroyForm 方法，在组件销毁时触发）
- [!] 解决了由于闭包造成的 formData 偶然不更新的问题
- [!] fix 了 image、url 类型的输入框 value 没有代入的问题
- [!] 使用 radio 的自动判断从 enum 长度为 3 变为 2
- [!] 迁移文档更新

### 1.0.0

- [+] form-render 1.0 正式发版
