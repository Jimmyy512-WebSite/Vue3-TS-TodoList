import { defineStore } from 'pinia';
interface DemoStore {
  testNum: number;
}
export const useDemoStore = defineStore('demoStore', {
  state: (): DemoStore => ({
    testNum: 0,
  }),
  getters: {
    formatTestNum(): string {
      return `金額:${this.testNum + 1000}`;
    },
  },
  actions: {
    addNum() {
      ++(this.testNum as number);
    },
    minNum() {
      --(this.testNum as number);
    },
    setNum(num: number) {
      this.testNum = num;
    },
  },
});
