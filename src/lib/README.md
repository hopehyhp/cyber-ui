# Cyber UI 组件库

可发布 npm 包源码，仅包含组件与图标，不含文档 Demo。

## 目录

```
src/lib/
├── index.js           # 统一导出入口
├── icons/             # 图标注册表
└── components/        # CButton、CInput、CIcon…
```

## 约定

- 样式使用 CSS 变量（`var(--accent)` 等），主题定义在 `src/styles/`
- 组件命名以 `C` 前缀区分
- 文档 Demo 放在 `src/demos/`，不要放入本目录

## 对外使用

```js
// 按需引入（tree-shaking）
import { CButton, CIcon } from 'cyber-ui'

// 全量注册
import CyberUI from 'cyber-ui'
app.use(CyberUI)

// 路径级按需
import CButton from 'cyber-ui/components/CButton.vue.js'

// 主题样式（必需）
import 'cyber-ui/styles'
```

## 构建

```bash
npm run build:lib
```

产物输出到 `dist/lib/`。
