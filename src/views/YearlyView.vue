<template>
  <div class="yearly-view">
    <div class="yearly-goals-container">
      <v-card class="yearly-goals-card" elevation="0">
        <div class="floating-items">
          <div
            class="float-item"
            v-for="(item, index) in floatingItems"
            :key="index"
            :style="{
              animation: `float ${item.duration}s ease-in-out infinite ${item.delay}s`,
            }"
          >
            <v-icon :color="item.color" :size="item.size">{{
              item.icon
            }}</v-icon>
          </div>
        </div>

        <div class="card-content pa-6">
          <div class="text-center mb-6">
            <h1 class="new-year-title mb-2">2025 New Year Goals</h1>
            <div class="countdown-timer" v-if="showCountdown">
              <div class="text-h6 text-white-darken-2 mb-2">
                Time until New Year
              </div>
              <div class="countdown-numbers">
                <div class="countdown-item">
                  <span class="number">{{ countdown.days }}</span>
                  <span class="label">Days</span>
                </div>
                <div class="countdown-item">
                  <span class="number">{{ countdown.hours }}</span>
                  <span class="label">Hours</span>
                </div>
                <div class="countdown-item">
                  <span class="number">{{ countdown.minutes }}</span>
                  <span class="label">Minutes</span>
                </div>
              </div>
            </div>
          </div>

          <v-btn
            block
            color="primary"
            class="mb-6 add-goal-btn"
            elevation="0"
            @click="dialog = true"
          >
            <v-icon left class="mr-2">mdi-plus</v-icon>
            Add New Year Goal
          </v-btn>

          <div class="goals-list">
            <v-card
              v-for="(goal, index) in yearlyGoals"
              :key="goal.id"
              class="goal-card mb-4"
              elevation="0"
              :class="{ completed: goal.completed }"
            >
              <div class="d-flex align-center pa-4">
                <div class="goal-checkbox mr-4" @click="toggleGoal(index)">
                  <div
                    class="checkbox-circle"
                    :class="{ checked: goal.completed }"
                  >
                    <v-icon v-if="goal.completed" size="small" color="white">
                      mdi-check
                    </v-icon>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <div
                    class="goal-title"
                    :class="{ completed: goal.completed }"
                  >
                    {{ goal.text }}
                  </div>
                  <div class="goal-category">
                    <v-chip
                      size="small"
                      :color="getCategoryColor(goal.category)"
                      variant="flat"
                      class="mt-1"
                    >
                      {{ goal.category }}
                    </v-chip>
                  </div>
                </div>
                <v-btn
                  icon="mdi-delete"
                  size="small"
                  variant="text"
                  color="error"
                  @click="removeGoal(index)"
                  class="delete-btn"
                ></v-btn>
              </div>
            </v-card>

            <div
              v-if="yearlyGoals.length === 0"
              class="empty-state text-center pa-8"
            >
              <v-icon size="64" color="white" class="mb-4"
                >mdi-star-outline</v-icon
              >
              <div class="text-h6 text-white-darken-2">
                Start Planning Your Year!
              </div>
              <div class="text-subtitle-1 text-white-darken-2">
                Add your goals and make this year amazing
              </div>
            </div>
          </div>

          <div v-if="completedGoalsCount > 0" class="progress-section mt-6">
            <div class="text-center mb-2">
              <span class="text-h6 text-white">Your Progress</span>
            </div>
            <v-progress-circular
              :model-value="progressPercentage"
              color="success"
              size="100"
              width="8"
              class="mb-2"
            >
              {{ progressPercentage }}%
            </v-progress-circular>
            <div class="text-caption text-white-darken-2">
              {{ completedGoalsCount }} of {{ yearlyGoals.length }} goals
              completed
            </div>
          </div>
        </div>
      </v-card>
    </div>

    <v-dialog v-model="dialog" max-width="500">
      <v-card class="add-goal-dialog">
        <v-card-title class="text-h6 pa-4"> Add New Year Goal </v-card-title>

        <v-card-text class="pa-4">
          <v-form @submit.prevent="addGoal">
            <v-textarea
              v-model="newGoal.text"
              label="What's your goal for this year?"
              variant="outlined"
              rows="3"
              class="mb-3"
              hide-details
            ></v-textarea>
            <v-select
              v-model="newGoal.category"
              :items="categories"
              label="Category"
              variant="outlined"
              hide-details
            ></v-select>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn variant="text" color="grey" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="addGoal"
            :disabled="!newGoal.text.trim()"
          >
            Add Goal
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const dialog = ref(false);
const yearlyGoals = ref([]);
const showCountdown = ref(true);
const countdownInterval = ref(null);
const countdown = ref({ days: 0, hours: 0, minutes: 0 });

const newGoal = ref({
  text: "",
  category: "Personal",
});

const categories = [
  "Personal",
  "Career",
  "Health",
  "Financial",
  "Educational",
  "Travel",
  "Relationships",
  "Spiritual",
];

const floatingItems = [
  { icon: "mdi-star", color: "#FFD700", size: "32", duration: 3, delay: 0 },
  { icon: "mdi-heart", color: "#FF69B4", size: "28", duration: 4, delay: 1 },
  { icon: "mdi-rocket", color: "#87CEEB", size: "36", duration: 5, delay: 2 },
  { icon: "mdi-gift", color: "#FF6B6B", size: "32", duration: 3.5, delay: 0.5 },
  {
    icon: "mdi-party-popper",
    color: "#FFB6C1",
    size: "30",
    duration: 4.5,
    delay: 1.5,
  },
  {
    icon: "mdi-balloon",
    color: "#98FB98",
    size: "34",
    duration: 4,
    delay: 2.5,
  },
  { icon: "mdi-cake", color: "#DDA0DD", size: "28", duration: 3.5, delay: 1.8 },
  {
    icon: "mdi-sparkles",
    color: "#F0E68C",
    size: "26",
    duration: 3.8,
    delay: 0.8,
  },
];

const currentYear = computed(() => new Date().getFullYear());

const completedGoalsCount = computed(() => {
  return yearlyGoals.value.filter((goal) => goal.completed).length;
});

const progressPercentage = computed(() => {
  if (yearlyGoals.value.length === 0) return 0;
  return Math.round(
    (completedGoalsCount.value / yearlyGoals.value.length) * 100
  );
});

const getCategoryColor = (category) => {
  const colors = {
    Personal: "primary",
    Career: "success",
    Health: "error",
    Financial: "warning",
    Educational: "info",
    Travel: "purple",
    Relationships: "pink",
    Spiritual: "indigo",
  };
  return colors[category] || "grey";
};

const updateCountdown = () => {
  const now = new Date();
  const nextYear = new Date(now.getFullYear() + 1, 0, 1);
  const difference = nextYear - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  countdown.value = { days, hours, minutes };
};

const addGoal = () => {
  if (newGoal.value.text.trim()) {
    yearlyGoals.value.unshift({
      id: Date.now(),
      text: newGoal.value.text.trim(),
      category: newGoal.value.category,
      completed: false,
    });
    newGoal.value = {
      text: "",
      category: "Personal",
    };
    dialog.value = false;
    saveGoals();
  }
};

const toggleGoal = (index) => {
  yearlyGoals.value[index].completed = !yearlyGoals.value[index].completed;
  saveGoals();
};

const removeGoal = (index) => {
  yearlyGoals.value.splice(index, 1);
  saveGoals();
};

const saveGoals = () => {
  localStorage.setItem("yearlyGoals", JSON.stringify(yearlyGoals.value));
};

const loadGoals = () => {
  const savedGoals = localStorage.getItem("yearlyGoals");
  if (savedGoals) {
    yearlyGoals.value = JSON.parse(savedGoals);
  }
};

onMounted(() => {
  loadGoals();
  updateCountdown();
  countdownInterval.value = setInterval(updateCountdown, 60000); // Her dakika güncelle
});

onBeforeUnmount(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
  }
});
</script>

<style scoped>
.yearly-view {
  min-height: 100vh;
  padding: 24px;
}

.yearly-goals-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}

.yearly-goals-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px !important;
  overflow: hidden;
  position: relative;
}

.floating-items {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.float-item {
  position: absolute;
  opacity: 0.6;
}

.float-item:nth-child(1) {
  top: 10%;
  left: 10%;
}
.float-item:nth-child(2) {
  top: 20%;
  right: 15%;
}
.float-item:nth-child(3) {
  bottom: 15%;
  left: 20%;
}
.float-item:nth-child(4) {
  bottom: 25%;
  right: 10%;
}
.float-item:nth-child(5) {
  top: 40%;
  left: 5%;
}
.float-item:nth-child(6) {
  top: 60%;
  right: 5%;
}
.float-item:nth-child(7) {
  bottom: 40%;
  left: 15%;
}
.float-item:nth-child(8) {
  top: 80%;
  right: 20%;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

.card-content {
  position: relative;
  z-index: 1;
}

.new-year-title {
  background: linear-gradient(135deg, #ffd700, #ffa500, #ff69b4, #87ceeb);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent !important;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
  font-size: 2.5rem !important;
  letter-spacing: 1px;
  animation: titleGlow 2s ease-in-out infinite;
  position: relative;
  display: inline-block;
}

@keyframes titleGlow {
  0%,
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.02);
    filter: brightness(1.2);
  }
}

.goal-card {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(5px);
  border-radius: 12px !important;
  transition: all 0.3s ease;
}

.goal-card:hover {
  background: rgba(255, 255, 255, 0.08) !important;
  transform: translateY(-2px);
}

.goal-checkbox {
  cursor: pointer;
}

.checkbox-circle {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.checkbox-circle.checked {
  background-color: #4caf50;
  border-color: #4caf50;
}

.goal-title {
  font-size: 1rem;
  color: white;
  transition: all 0.2s ease;
}

.goal-title.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.goal-card:hover .delete-btn {
  opacity: 1;
}

.countdown-timer {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 20px;
  margin-top: 20px;
}

.countdown-numbers {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.countdown-item {
  text-align: center;
}

.countdown-item .number {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  display: block;
}

.countdown-item .label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.progress-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-goal-btn {
  background: linear-gradient(45deg, #1a73e8, #8ab4f8) !important;
  color: white !important;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.5px;
  border-radius: 12px;
}

.empty-state {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(5px);
}

/* Responsive tasarım */
@media (max-width: 600px) {
  .yearly-view {
    padding: 16px;
  }

  .countdown-numbers {
    gap: 10px;
  }

  .countdown-item .number {
    font-size: 1.5rem;
  }
}
</style>
