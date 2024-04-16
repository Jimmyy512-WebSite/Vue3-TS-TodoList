# Todo List(代辦清單) with Vue 3 + Typescript + Vite

## 線上 Demo

[http://vue3-todolist.jimmy512.com/#/todolist](http://vue3-todolist.jimmy512.com/#/todolist)

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 簡介

```
參考vue-vben-admin的架構
嘗試自己也試著做出Todo List的功能
未來會持續更新此專案做練習
```

## 主要套件

- NodeJS 18.20.2
- TypeScript
- vite
- pinia
- element-plus
- axios
- json-server

## 已實作功能

- Vue3 Setup 寫法
- Vue3 組件父子溝通寫法
- Vue3 v-model 寫法
- Proxy API (解決開發時,打 API 跨域問題)
- env 環境檔案變數 (並且能讓 TS 正確讀到型別)
- 使用 pinia 來代替 vuex 的功能 (並且參考 vben-admin 的寫法對 API 做封裝)
- 打 API 能正確吃到 TS 型別
- 全局 loading 效果(透過 pinia 控制)

# 本機開發

## 第一次安裝

```sh=
npm i
```

## 運行開發

```sh=
npm run dev
```

## 運行打包

```sh=
npm run build
```

# Docker 開發

```sh=
docker-compose up --build
```
