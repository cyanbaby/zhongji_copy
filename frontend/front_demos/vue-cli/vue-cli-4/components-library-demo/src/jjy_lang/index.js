
import Vue from "vue";
import VueI18n from 'vue-i18n'
// import ElementUI from 'element-ui'
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en' //引入el自带得国际化语言包,防止内部插件出现乱码
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'//引入el自带得国际化语言包,防止内部插件出现乱码
import fmEnLocale from './lang/en-US.js'  //引入formMaking英文国际化语言包
import fmZhLocale from './lang/zh-CN.js'  //引入formMaking中文国际化语言包
import jjyZh from './zh'  //引入继教云中文国际化语言包
import jjyEn from './en'  //引入继教云英文国际化语言包

// Vue.use(ElementUI, { enLocale });

Vue.use(VueI18n);   // 全局注册国际化包

// 准备翻译的语言环境信息
const i18n = new VueI18n({
  // locale: localStorage.getItem('locale') || "zh", // 从cookie中获取语言类型 获取不到就是中文
  locale: "zh", // 从cookie中获取语言类型 获取不到就是中文
  messages: {
    'zh': Object.assign(jjyZh, fmZhLocale, zhLocale),   // 中文语言包
    'en': Object.assign(jjyEn, fmEnLocale, enLocale),  // 英文语言包
    // 'ko': require('./ko.js'),    // 韩语文语言包
    // 'ru': require('./ru.js'),    // 俄语语言包
    // 'ja': require('./ja.js'),    // 日文语言包
    // 'fr': require('./fr.js')    // 法语语言包
  }
});
ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n
