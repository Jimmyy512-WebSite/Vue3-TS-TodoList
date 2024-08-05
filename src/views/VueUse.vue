<template>
  <div class="m-auto w-fit">
    <h1>useTimeoutFn 示例</h1>
    <button @click="startTimer" :disabled="isPending">启动定时器</button>
    <button @click="cancelTimer" :disabled="!isPending">停止定时器</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
const countDownText = '定时器已執行,等待倒數結束';
const message = ref(countDownText);
const { start, stop, isPending } = useTimeoutFn(() => {
  message.value = '定时器已倒數结束';
}, 2000); // 2秒后执行回调

const startTimer = () => {
  message.value = countDownText;
  start();
};

const cancelTimer = () => {
  stop();
  message.value = '定时器中途取消';
};
</script>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px;
}
</style>
