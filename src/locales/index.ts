import { createI18n } from 'vue-i18n';
import en from './en.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';
import ja from './ja.json';
import ko from './ko.json';
import vi from './vi.json';
import es from './es.json';

const i18n = createI18n({
  legacy: false, // 禁用傳統模式
  locale: 'zh-TW',
  fallbackLocale: 'en', // 用於指定當當前語言的翻譯缺失時應該使用的後備語言。
  messages: {
    en, // 英文
    ja, // 日本
    ko, // 韓國
    vi, // 越南
    es, // 西班牙
    'zh-CN': zhCN, // 简体中文
    'zh-TW': zhTW, // 繁体中文
  },
});

export default i18n;
