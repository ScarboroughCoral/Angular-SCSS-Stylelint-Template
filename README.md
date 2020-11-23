# AngularScssStylelintTemplate

## Quick Started

```bash
npm install husky --save-dev
npm install lint-staged --save-dev
npm install stylelint --save-dev
npm install stylelint-order --save-dev
```

- package.json
  ```json
  {
    "scripts": {
      "lint-staged": "lint-staged"
    },
    "husky": {
      "hooks": {
        "pre-commit": "npm run lint-staged"
      }
    }
  }
  ```
- .lintstagedrc.js
  ```js
  #!/usr/bin/env node
  module.exports = {
    "**/*.{css,scss,sass}": ["stylelint"],
  };
  ```
- stylelintrc.base.js
  > 参考[项目文件](./stylelintrc.base.js)
- .stylelintrc.js
  > 参考[项目文件](./.stylelintrc.js)
