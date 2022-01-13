import { defineStore } from 'pinia';

interface baseState {
  token: undefined;
  name: String;
}
defineStore({
  id: 'base',
  state: (): baseState => {
    return {
      token: undefined,
      name: 'jim',
    };
  },
});
