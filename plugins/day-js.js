import Vue from 'vue'
import DayJs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

export default function () {
  DayJs.locale('zh-cn')
  DayJs.extend(relativeTime)
  DayJs.extend(calendar)
  Vue.prototype.$time = DayJs
}
