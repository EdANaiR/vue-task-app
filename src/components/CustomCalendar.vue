<template>
  <div class="custom-calendar">
    <div class="calendar-header">
      <button class="nav-button" @click="previousMonth">&lt;</button>
      <h2>{{ currentMonthName }} {{ currentYear }}</h2>
      <button class="nav-button" @click="nextMonth">&gt;</button>
    </div>
    <div class="calendar-body">
      <div v-for="day in daysOfWeek" :key="day" class="calendar-day day-name">
        {{ day }}
      </div>
      <div
        v-for="date in dates"
        :key="date.date"
        :class="[
          'calendar-day',
          { 'current-month': date.currentMonth },
          { selected: isSelected(date.date) },
          { today: isToday(date.date) },
        ]"
        @click="selectDate(date.date)"
      >
        {{ date.day }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomCalendar",
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
      daysOfWeek: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    };
  },
  computed: {
    currentMonthName() {
      return this.currentDate.toLocaleString("en-US", { month: "long" });
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    dates() {
      const dates = [];
      const firstDayOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      );

      let firstDayIndex = firstDayOfMonth.getDay();

      firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

      for (let i = firstDayIndex - 1; i >= 0; i--) {
        const date = new Date(firstDayOfMonth);
        date.setDate(date.getDate() - i - 1);
        dates.push({ date, day: date.getDate(), currentMonth: false });
      }

      for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const date = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          i
        );
        dates.push({ date, day: i, currentMonth: true });
      }

      const remainingDays = 7 - (dates.length % 7);
      if (remainingDays < 7) {
        for (let i = 1; i <= remainingDays; i++) {
          const date = new Date(lastDayOfMonth);
          date.setDate(date.getDate() + i);
          dates.push({ date, day: date.getDate(), currentMonth: false });
        }
      }

      return dates;
    },
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      );
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      );
    },
    selectDate(date) {
      this.selectedDate = date;
      this.$emit("date-selected", date);
    },
    isSelected(date) {
      return (
        this.selectedDate &&
        date.toDateString() === this.selectedDate.toDateString()
      );
    },
    isToday(date) {
      const today = new Date();
      return date.toDateString() === today.toDateString();
    },
  },
};
</script>

<style scoped>
.custom-calendar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  font-family: Arial, sans-serif;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.171);
  border: 1px solid rgba(142, 36, 170, 0.2);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 8px;
}

.nav-button {
  background: rgba(142, 36, 170, 0.1);
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #8e24aa;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: rgba(142, 36, 170, 0.2);
  transform: scale(1.1);
}

.calendar-header h2 {
  margin: 0;
  font-size: 20px;
  color: #f3efef;
  font-weight: 600;
}

.calendar-body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  position: relative;
}

.day-name {
  font-weight: 600;
  color: #8e24aa;
  cursor: default;
  font-size: 13px;
}

.current-month {
  color: #050505;
  font-weight: 560;
}

.calendar-day:not(.current-month) {
  color: #ccc;
}

.calendar-day:hover:not(.day-name):not(.selected) {
  background-color: rgba(142, 36, 170, 0.1);
  transform: scale(1.1);
}

.selected {
  background-color: #8e24aa;
  color: white !important;
  font-weight: bold;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(142, 36, 170, 0.3);
}

.today:not(.selected) {
  color: #8e24aa !important;
  font-weight: bold;
  border: 2px solid #8e24aa;
}

.today.selected {
  border: 2px solid white;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.calendar-day {
  animation: fadeIn 0.3s ease-out;
}
</style>
