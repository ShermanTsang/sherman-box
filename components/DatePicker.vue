<style lang="scss">
.datepicker {

  &__area {
    @apply appearance-none py-2 px-6 cursor-pointer bg-[rgba(177,177,177,.1)] rounded-full transition ease-in-out duration-300 hover:(bg-blue-100 text-blue-600)

  }

  select {
    @apply cursor-pointer w-20 focus:outline-none focus:bg-[transparent] focus:border-purple-500 outline-none border-none bg-[transparent]
  }

}
</style>

<template>
  <div class="datepicker flex flex-row items-center justify-between text-[#666] text-md <md:(flex-wrap)">
    <div class="datepicker__area <md:(order-1)" @click="goToPrevMonth">
      <Icon name="angle-left" size=".8em" /> 上月
    </div>
    <div class="datepicker__area <md:(order-first w-full text-center mb-4)">
      <select id="year" v-model="state.year" name="year">
        <option v-for="year in yearArray" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <select id="month" v-model="state.month" name="month">
        <option
          v-for="month in monthArray"
          :key="month"
          :value="month"
        >
          {{ month }}
        </option>
      </select>
    </div>
    <div class="datepicker__area <md:(order-3)" :class="{'cursor-not-allowed': data.currentYear === state.year}" @click="goToNextMonth">
      下月 <Icon name="angle-right" size=".8rem" />
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
      // return monthArray.map((month) => {
      //   return String(month).padStart(2, '0')
      // })
    }
  },
  watch: {
    'state.year' (year) {
      this.$emit('changeYear', year)
      this.changeDate('year', year)
    },
    'state.month' (month) {
      this.$emit('changeMonth', month)
      this.changeDate('month', month)
    },
    'state.day' (day) {
      this.$emit('changeDay', day)
      this.changeDate('day', day)
    }
  },
  methods: {
    changeDate (type, value) {
      this.$emit('changeDate', {
        type,
        value
      })
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
