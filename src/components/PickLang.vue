<template>
  <div>
    <el-select v-model="currentLocale" placeholder="Select Language" @change="changeLanguage">
      <el-option
        v-for="(label, key) in availableLanguages"
        :key="key"
        :label="label"
        :value="key"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
// 使用 vue-i18n composable 函數
const { locale, messages } = useI18n();

// 當前語言設定
const currentLocale = ref(locale.value);

// 可用語言列表，動態從 i18n messages 中提取
const availableLanguages = computed(() => {
  return Object.keys(messages.value).reduce((acc, key) => {
    acc[key] = messages.value[key].LanguageName; // 直接從 messages 中取得 languageName
    return acc;
  }, {});
});

// 切換語言方法
const changeLanguage = (newLocale) => {
  locale.value = newLocale;
};
</script>

<style scoped>
.el-select {
  width: 200px;
}
</style>
