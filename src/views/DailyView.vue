<template>
  <div class="daily-view" :class="{ 'sidebar-open': isSidebarOpen }">
    <div class="content-wrapper" :class="{ 'sidebar-open': isSidebarOpen }">
      <div class="left-column">
        <TaskManager
          :isSidebarOpen="isSidebarOpen"
          :selectedDate="selectedDate"
          class="task-manager-component"
        />
        <TaskNote :selectedDate="selectedDate" class="task-note-component" />
      </div>
      <div class="center-column">
        <ReadingTracker
          :selectedDate="selectedDate"
          class="reading-tracker-component"
        />
        <PrayerTracker
          :selectedDate="selectedDate"
          class="prayer-tracker-component"
        />
      </div>
      <div class="right-column">
        <CustomCalendar />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import TaskManager from "@/components/TaskManager.vue";
import TaskNote from "@/components/TaskNote.vue";
import ReadingTracker from "@/components/ReadingTracker.vue";
import PrayerTracker from "@/components/PrayerTracker.vue";
import CustomCalendar from "@/components/CustomCalendar.vue";

const props = defineProps({
  isSidebarOpen: {
    type: Boolean,
    default: false,
  },
  selectedDate: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.daily-view {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: padding-left 0.3s ease;
}

.content-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
  flex-grow: 1;
  padding: 20px;
  transition: padding-left 0.3s ease, margin-left 0.3s ease;
}

.content-wrapper.sidebar-open {
  padding-left: 300px;
  margin-left: -250px;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 340px;
  flex-shrink: 0;
}

.center-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 340px;
  flex-shrink: 0;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 340px;
  flex-shrink: 0;
}

.calendar-card {
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
  overflow: hidden;
}

.custom-calendar {
  background: transparent !important;
  width: 100%;
}

:deep(.v-date-picker-controls) {
  background: rgba(255, 255, 255, 0.05) !important;
  padding: 8px;
}

:deep(.v-date-picker-month) {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep(.v-date-picker-controls .v-btn) {
  color: var(--v-theme-primary) !important;
}

:deep(.v-date-picker-month__day button) {
  color: rgba(0, 0, 0, 0.87) !important;
}

:deep(.v-date-picker-month__day--selected button) {
  background-color: var(--v-theme-primary) !important;
  color: white !important;
}

:deep(.v-date-picker-header) {
  color: var(--v-theme-primary) !important;
  padding: 8px;
}

.task-manager-component,
.task-note-component,
.reading-tracker-component,
.prayer-tracker-component {
  width: 100%;
}

.date-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.date-display {
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
}

@media (max-width: 1440px) {
  .content-wrapper {
    flex-wrap: wrap;
    justify-content: center;
  }

  .left-column,
  .center-column,
  .right-column {
    width: 340px;
  }
}

@media (max-width: 1024px) {
  .content-wrapper.sidebar-open {
    padding-left: 20px;
    margin-left: 0;
  }

  .content-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .left-column,
  .center-column,
  .right-column {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .left-column,
  .center-column,
  .right-column {
    width: 100%;
    max-width: 340px;
  }
}
</style>
