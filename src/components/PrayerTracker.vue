<template>
  <div class="prayer-tracker">
    <v-card class="tracker-card" elevation="3">
      <div class="card-header pa-4">
        <div class="d-flex align-center">
          <v-icon size="28" color="green" class="mr-2">mdi-mosque</v-icon>
          <h3 class="text-h6 font-weight-bold mb-0">Daily Prayers</h3>
        </div>
        <div class="progress-text mt-2">
          {{ completedCount }}/{{ prayersForSelectedDate.length }} completed
        </div>
      </div>

      <v-divider></v-divider>

      <v-list class="prayer-list pa-2">
        <v-list-item
          v-for="prayer in prayersForSelectedDate"
          :key="prayer.name"
          :class="{ 'prayer-completed': prayer.completed }"
          class="prayer-item mb-2 rounded-lg"
        >
          <div class="d-flex justify-space-between align-center w-100">
            <div>
              <div class="font-weight-medium mb-1">{{ prayer.name }}</div>
              <div class="text-caption">{{ prayer.time }}</div>
            </div>
            <div class="d-flex align-center">
              <v-checkbox
                v-model="prayer.completed"
                :color="prayer.completed ? 'primary' : 'grey'"
                @change="() => updatePrayerStatus(prayer)"
                class="ma-0 pa-0"
                hide-details
              >
                <template v-slot:default="{ isChecked }">
                  <div class="custom-checkbox" :class="{ checked: isChecked }">
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
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from "vue";

export default {
  name: "PrayerTracker",
  props: {
    selectedDate: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const STORAGE_KEY = "prayer-tracker-data";

    const defaultPrayers = [
      { name: "Dawn", time: "06:27", completed: false },
      { name: "Noon", time: "12:52", completed: false },
      { name: "Afternoon", time: "15:13", completed: false },
      { name: "Evening", time: "17:32", completed: false },
      { name: "Night", time: "18:57", completed: false },
    ];

    const prayers = ref({});

    const loadPrayersFromLocalStorage = () => {
      try {
        const savedPrayers = localStorage.getItem(STORAGE_KEY);
        if (savedPrayers) {
          prayers.value = JSON.parse(savedPrayers);
        }
      } catch (error) {
        console.error("Error loading prayers:", error);
      }
    };

    const savePrayersToLocalStorage = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(prayers.value));
      } catch (error) {
        console.error("Error saving prayers:", error);
      }
    };

    const prayersForSelectedDate = computed(() => {
      if (!prayers.value[props.selectedDate]) {
        prayers.value[props.selectedDate] = JSON.parse(
          JSON.stringify(defaultPrayers)
        );
        savePrayersToLocalStorage();
      }
      return prayers.value[props.selectedDate];
    });

    const completedCount = computed(() => {
      return prayersForSelectedDate.value.filter((prayer) => prayer.completed)
        .length;
    });

    const updatePrayerStatus = (prayer) => {
      const prayerIndex = prayersForSelectedDate.value.findIndex(
        (p) => p.name === prayer.name
      );

      if (prayerIndex !== -1) {
        prayersForSelectedDate.value[prayerIndex] = { ...prayer };
        savePrayersToLocalStorage();
      }
    };

    onMounted(() => {
      loadPrayersFromLocalStorage();
    });

    watch(
      () => props.selectedDate,
      (newDate) => {
        if (!prayers.value[newDate]) {
          prayers.value[newDate] = JSON.parse(JSON.stringify(defaultPrayers));
          savePrayersToLocalStorage();
        }
      }
    );

    return {
      prayersForSelectedDate,
      completedCount,
      updatePrayerStatus,
    };
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

:deep(.v-list-item) {
  padding: 8px 0;
}
</style>
