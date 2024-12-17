<template>
  <div class="prayer-tracker">
    <v-card class="tracker-card" elevation="3">
      <div class="card-header pa-4">
        <div class="d-flex align-center">
          <v-icon size="28" color="green" class="mr-2">mdi-mosque</v-icon>
          <h3 class="text-h6 font-weight-bold mb-0">Daily Prayers</h3>
        </div>
        <div class="progress-text mt-2">
          {{ completedCount }}/{{ prayers.length }} completed
        </div>
      </div>

      <v-divider></v-divider>

      <v-list class="prayer-list pa-2">
        <v-list-item
          v-for="prayer in prayers"
          :key="prayer.name"
          :class="{ 'prayer-completed': prayer.completed }"
          class="prayer-item mb-2 rounded-lg"
        >
          <template v-slot:default>
            <v-list-item-content>
              <div class="d-flex justify-space-between align-center">
                <div>
                  <v-list-item-title class="font-weight-medium mb-1">
                    {{ prayer.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption">
                    {{ prayer.time }}
                  </v-list-item-subtitle>
                </div>
                <div class="d-flex align-center">
                  <v-checkbox
                    v-model="prayer.completed"
                    :color="prayer.completed ? 'primary' : 'grey'"
                    @change="updatePrayerStatus(prayer)"
                    class="ma-0 pa-0"
                    hide-details
                  >
                    <template v-slot:default="{ isChecked }">
                      <div
                        class="custom-checkbox"
                        :class="{ checked: isChecked }"
                      >
                        <v-icon v-if="isChecked" color="white" size="small">
                          mdi-check
                        </v-icon>
                      </div>
                    </template>
                  </v-checkbox>
                  <v-fade-transition>
                    <span
                      v-if="prayer.completed"
                      class="success-text ml-2 text-caption"
                    >
                      Completed
                    </span>
                  </v-fade-transition>
                </div>
              </div>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "PrayerTracker",
  data() {
    return {
      prayers: [
        { name: "Dawn", time: "06:27", completed: false },
        { name: "Noon", time: "12:52", completed: false },
        { name: "Afternoon", time: "15:13", completed: false },
        { name: "Evening", time: "17:32", completed: false },
        { name: "Night", time: "18:57", completed: false },
      ],
    };
  },
  computed: {
    completedCount() {
      return this.prayers.filter((prayer) => prayer.completed).length;
    },
  },
  methods: {
    updatePrayerStatus(prayer) {
      console.log(
        `${prayer.name} prayer ${
          prayer.completed ? "completed" : "not completed"
        }`
      );
    },
  },
};
</script>

<style scoped>
.prayer-tracker {
  width: 100%;
}

.tracker-card {
  background: rgba(255, 255, 255, 0.95) !important;
  border-radius: 16px !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.card-header {
  background: rgba(var(--v-theme-primary), 0.05);
}

.progress-text {
  color: rgba(var(--v-theme-primary), 0.7);
  font-size: 0.875rem;
}

.prayer-list {
  background: transparent !important;
}

.prayer-item {
  transition: all 0.3s ease;
  background: rgba(var(--v-theme-surface), 0.6) !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.05);
}

.prayer-item:hover {
  background: rgba(var(--v-theme-primary), 0.05) !important;
}

.prayer-completed {
  background: rgba(var(--v-theme-primary), 0.08) !important;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid rgba(var(--v-theme-primary), 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;
}

.custom-checkbox.checked {
  background-color: var(--v-theme-primary);
  border-color: var(--v-theme-primary);
}

.success-text {
  color: var(--v-theme-primary);
  font-weight: 500;
}

:deep(.v-list-item__content) {
  padding: 8px 0;
}

:deep(.v-list-item-title) {
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.87);
}

:deep(.v-list-item-subtitle) {
  color: rgba(0, 0, 0, 0.6);
}
</style>
