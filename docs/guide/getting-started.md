---
order: 1
title: 开始使用
nav:
  order: 1
  title: 教程
toc: menu
---

<a href="/form-render/">
  <img width="146" src="https://img.alicdn.com/tfs/TB17UtINiLaK1RjSZFxXXamPFXa-606-643.png">
</a>

# FormRender

[![npm](https://img.shields.io/npm/v/form-render.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/form-render?_blank)
[![GitHub last commit](https://img.shields.io/github/last-commit/alibaba/form-render.svg?style=flat-square)](https://github.com/alibaba/form-render/commits/dev)
[![NPM downloads](https://img.shields.io/npm/dm/form-render.svg?style=flat-square)](https://npmjs.org/package/form-render)
[![NPM all downloads](https://img.shields.io/npm/dt/form-render.svg?style=flat-square)](https://npmjs.org/package/form-render)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/alibaba/form-render.svg?style=flat-square)](https://github.com/alibaba/form-render/issues?utf8=%E2%9C%93&q=)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

> 通过 JSON Schema 生成标准 Form，常用于自定义搭建配置界面生成

## 了解

- [设计理念](/docs/guide/design.md)
- <a href="https://x-render.gitee.io/schema-generator/" target="_blank">Schema 编辑器</a>
- [Playground](/docs/playground) / <a href="https://codesandbox.io/s/form-renderjichudemo-8k1l5" target="_blank">Code Sandbox</a>
- [Typescript 支持](/docs/guide/others/faq.md)
- [常见场景](/docs/guide/others/usedBy.md)
- [新功能 Demo 展示](/docs/guide/new-feature.md)
- <a href="https://github.com/alibaba/form-render/projects/2" target="_blank">后期规划</a>

## 效果

<img src="https://gw.alipayobjects.com/mdn/feizhu_pla/afts/img/A*wyH4Rq-EqwQAAAAAAAAAAABkARQnAQ?raw=true" width="750px"/>

## 优势

<table><tr><td><img src="https://gw.alicdn.com/tfs/TB1f5TAJND1gK0jSZFsXXbldVXa-2152-1162.gif?raw=true" width="750px"/></td><td><img src="https://gw.alipayobjects.com/zos/demos_resources/5ay8d5/fr-flow-short-par2.gif?raw=true" width='750px' /></td></tr></table>

- 如上图，使用 [Schema 编辑器](https://form-render.github.io/schema-generator/) 快速生成可实现低上手成本、快速搭建
- 支持 Ant Design 和 Fusion Design 主流的视觉主题
- 使用 JSON Schema 标准协议描述表单配置，并搭配丰富类型且可扩展的组件
- 支持 1 排 N、横纵排、支持对象无限嵌套、自定义正则校验、自定义样式组件、列表拖拽等特性
- 已在阿里云、淘宝、天猫、飞猪、亚博科技、安全智能、新零售行业工作台、人工智能实验室等多 BU 多场景使用，简单使用同时支持复杂场景使用
- 使用上有详细文档，维护上有专人支持

## 安装

```shell
npm i form-render
# or
yarn add form-render
```

同时安装依赖的组件库 (依赖哪个装哪个，天然支持 antd 和 fusion 两套。其他的组件库可通过 widgets 的方式传入，见[自定义组件](/docs/guide/advanced/widget.md))

```shell
# 例如
yarn add antd
# 或者
yarn add @alifd/next
```

注：一般来说，想使用 form-render 的 antd 主题的项目，dependencies 里肯定装了 antd。这里强调一下这步，主要是针对想尝试写个 demo 玩玩的同学，记得要安装对应的 ui 组件库

## 快速使用

```jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// 使用 Ant Design 风格
import FormRender from 'form-render/lib/antd';
// 使用 Fusion 风格
// import FormRender from 'form-render/lib/fusion';
// import '@alifd/next/dist/next.min.css';

const schema = {
  type: 'object',
  properties: {
    string: {
      title: '字符串',
      type: 'string',
      maxLength: 12,
      'ui:disabled': true,
    },
    number: {
      title: '数字',
      type: 'number',
    },
    select: {
      title: '单选',
      type: 'string',
      enum: ['a', 'b', 'c'],
      enumNames: ['早', '中', '晚'],
      'ui:width': '50%', // uiSchema 合并到 schema 中（推荐写法，书写便捷）
    },
  },
};

function Demo() {
  const [formData, setData] = useState({});
  const [valid, setValid] = useState([]);
  const [showValidate, setShowValidate] = useState(false);

  const onSubmit = () => {
    // valid 是校验判断的数组，valid 长度为 0 代表校验全部通过
    setShowValidate(true);
    if (valid.length > 0) {
      alert(`校验未通过字段：${valid.toString()}`);
    } else {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <FormRender
        schema={schema}
        formData={formData}
        onChange={setData}
        onValidate={setValid}
        showValidate={showValidate}
        displayType="row" // 详细配置见下
      />
      <button onClick={onSubmit}>提交</button>
    </div>
  );
}

export default Demo;
```

### API

| Prop             |        Type         | Required | Default  |                                                                             Description                                                                             |
| ---------------- | :-----------------: | :------: | :------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| **schema**       |      `Object`       |    ✓     |    {}    |                                                                 详见 [schema 配置](/docs/config/schema.md)                                                                  |
| **uiSchema**     |      `Object`       |          |    {}    |                                               详见 [uiSchema 配置](/docs/config/uiSchema.md)（**一般建议合并到 `schema`**）                                                |
| **formData**     |      `Object`       |          |    {}    |                                                                            配置表单数据                                                                             |
| **onChange**     |     `Function`      |    ✓     | () => {} |                                                                          数据更改回调函数                                                                           |
| **onValidate**   |     `Function`      |          | () => {} |                                                                          表单输入校验回调                                                                           |
| **showValidate** |      `Boolean`      |          |   true   | 是否展示校验信息（默认 `true` 兼容旧版，但建议初始 `false`，然后在提交时改成 true）。`false`时只有触碰过的 field 会展示校验信息，`true`时展示整个表单所有的校验信息 |
| **displayType**  |      `String`       |          |  column  |                                                             设置表单横向排列或者纵向排序`column`/`row`                                                              |
| **showDescIcon** |      `Boolean`      |          |  false   |                                                   描述是否用 tooltip 展示。`displayType`为 `row`时建议设为 `true`                                                   |
| **readOnly**     |      `Boolean`      |          |  false   |                                                                         预览模式/可编辑模式                                                                         |
| **labelWidth**   | `Number` / `String` |          |   110    |                                               全局设置 label 长度(默认 110)。数字值单位为 px，也可使用'20%'/'2rem'等                                                |
| **widgets**      |      `Object`       |          |    {}    |                                                                             自定义组件                                                                              |

- **注 1：** `schema`这个字段就是老用户熟悉的`propsSchema`，由于 propsSchema 不好写也意义不明，所以现在推荐直接使用 schema 字段，但目前还是兼容的
- **注 2：** 设置表单 `displayType` 为 row 时候，请设置 `showDescIcon` 为 `true`，隐藏说明，效果会更好
- **注 3：** **onChange** 方法会用于初始化表单 data，如果不写会造成没有初始值的表单元素无法渲染（出现不报错也不显示的情况）
- **注 4：** FormRender 默认布局会占满它的父级元素，建议用一个`div`包裹 FormRender 用于表单布局样式调整

### 不常用 API

| Prop          |    Type    |   usage   |  Default  |                               Description                                |
| ------------- | :--------: | :-------: | :-------: | :----------------------------------------------------------------------: |
| **mapping**   |  `Object`  | sometimes | undefined | 用于修改默认组件映射表，一般用于让自定义组件作为默认选择(详见自定义组件) |
| **column**    |  `Number`  | sometimes |     1     |          **整体**布局 1 排 N，局部的 1 排 N 一般使用`ui:width`           |
| **useLogger** | `Boolean`  |   debug   |   false   |      当 useLogger 为 true 时，会在 console 展示所有的 formData 变化      |
| **name**      |  `String`  | very rare |  \$form   |                                表单的名称                                |
| **onMount**   | `Function` | very rare | undefined |                    onMount 在 formData 首次计算后触发                    |

[详见“不常用 props”](/docs/config/props2.md)

## 更多使用

- vscode 插件：快速准确书写 schema 一直是使用者的痛点，为此我们准备了 schema 书写利器： `form-render snippets`（vscode 插件），在 vscode 商店输入 ‘formrender’

- 支持 TypeScript：详见[如何在 TypeScript 项目中使用](/docs/guide/others/faq.md)

- **支持 Ant Design 自定义主题不被覆盖**

  - 安装 webpack 插件
    ```bash
    npm install webpack-plugin-fr-theme  --save-dev
    ```
  - 配置 webpack.config.js 文件

    ```js
    const WebpackPluginFrTheme = require('webpack-plugin-fr-theme');

    {
        ...
        plugins: [
          new WebpackPluginFrTheme(),
        ],
        ...
    }
    ```

## 调试

```shell
> git clone https://github.com/alibaba/form-render.git
> npm i
> npm start
```

## 支持

- 在公司或个人项目中使用 FormRender，关注 <a href="https://github.com/alibaba/form-render/blob/master/CHANGELOG.md" target="_blank">Changelog</a>
- 如果你觉得 FormRender 还不错，可以通过 Star 来表示你的喜欢
- 加入钉钉聊天群帮忙解答使用问题

<img src="https://img.alicdn.com/tfs/TB1CprJg5pE_u4jSZKbXXbCUVXa-894-1087.jpg" width="300px" />
