# knex-demo
- KOA 环境操作Oracle数据库

- koa-orm using knex提供的工具来进行数据库的迁移。


## Getting Started

```zxl
$ git clone url
$ cd your-project-name
$ rm -rf .git && git init
```

```zxl
$ yarn
$ yarn start
```

## Commands

### Run

```zsh
# Run normally
$ yarn start
# Run the application with nodemon for development
$ yarn dev
```

### Test

```zxl
# Test
$ yarn test                           # Run all test
$ yarn test:unit                      # Run only unit test
$ yarn test:integration               # Run only integration test
# Test (Watch Mode for development)
$ yarn test:watch                     # Run all test with watch mode
$ yarn test:watch:unit                # Run only unit test with watch mode
$ yarn test:watch:integration         # Run only integration test with watch mode
# Test Coverage
$ yarn test:coverage                  # Calculate the coverage of all test
$ yarn test:coverage:unit             # Calculate the coverage of unit test
$ yarn test:coverage:integration      # Calculate the coverage of integration test
# Test consistent coding style (Lint)
$ yarn lint                           # Lint all sourcecode
$ yarn lint:app                       # Lint app sourcecode
$ yarn lint:test                      # Lint test sourcecode
```

### 生产环境
```zxl
$ npm run start:production # 生产环境启动服务
$ npm run stop:production # 生产环境停止服务
```

```zxl
$ yarn pack
```
