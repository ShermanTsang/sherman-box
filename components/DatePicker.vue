<template>
  <div class="datepicker flex flex-row items-center justify-between text-[#666] text-md <md:(flex-wrap)">
    <div class="px-2 py-4 <md:(order-1) cursor-pointer flex-shrink-0" @click="goToPrevMonth">
      <Icon name="angle-left" size=".8em" />
      上月
    </div>
    <div class="px-2 py-4 <md:(order-first w-full text-center mb-4)">
      <select id="year" v-model="state.year" name="year">
        <option v-for="year in yearArray" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <select
        id="month"
        v-model="state.month"
        name="month"
        class="cursor-pointer w-20 focus:outline-none focus:bg-[transparent] focus:border-purple-500 outline-none border-none bg-[transparent]"
      >
        <option
          v-for="month in monthArray"
          :key="month"
          :value="month"
        >
          {{ month }}
        </option>
      </select>
    </div>
    <div
      class="px-2 py-4 <md:(order-3) cursor-pointer flex-shrink-0"
      :class="{'cursor-not-allowed': data.currentYear === state.year}"
      @click="goToNextMonth"
    >
      下月
      <Icon name="angle-right" size=".8rem" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    defaultYear: {
      type: [String, Number],
      default: new Date().getFullYear()
    },
    defaultMonth: {
      type: [String, Number],
      default: String(new Date().getMonth() + 1).padStart(2, '0')
    },
    defaultDay: {
      type: [String, Number],
      default: String(new Date().getDate()).padStart(2, '0')
    }
  },
  data () {
    return {
      state: {
        year: this.defaultYear,
        month: this.defaultMonth,
        day: this.defaultDay
      },
      data: {
        currentYear: new Date().getFullYear(),
        currentMonth: new Date().getMonth() + 1,
        currentDay: new Date().getDate()
      }
    }
  },
  computed: {
    date () {
      return `${this.state.year}-${this.state.month}-${this.state.day}`
    },
    yearArray () {
      let startYear = 2016
      const endYear = new Date().getFullYear()
      const yearArray = [startYear]
      while (endYear !== startYear) {
        yearArray.push(startYear += 1)
      }
      return yearArray
    },
    monthArray () {
      let startMonth = 1
      const endMonth = 12
      const monthArray = [startMonth]
      while (startMonth !== endMonth) {
        if (this.state.year === this.data.currentYear && startMonth > this.data.currentMonth) {
          break
        }
        monthArray.push(startMonth += 1)
      }
      return monthArray
    }
  },
  watch: {
    'state.year' (year) {
      this.$emit('changeYear', year)
      this.changeDate()
    },
    'state.month' (month) {
      this.$emit('changeMonth', month)
      this.changeDate()
    },
    'state.day' (day) {
      this.$emit('changeDay', day)
      this.changeDate()
    }
  },
  methods: {
    changeDate () {
      this.$emit('changeDate', this.date)
    },
    goToPrevMonth () {
      if (this.state.month === 1) {
        this.state.year -= 1
        this.state.month = 12
      } else {
        this.state.month -= 1
      }
    },
    goToNextMonth () {
      if (this.state.month === 12) {
        this.state.year += 1
        this.state.month = 1
      } else {
        this.state.month += 1
      }
    }
  }
}
</script>
