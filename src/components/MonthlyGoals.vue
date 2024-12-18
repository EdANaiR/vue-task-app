<template>
  <div class="monthly-goals">
    <v-card class="goals-card pa-4" elevation="0">
      <v-card-title class="d-flex align-center justify-space-between mb-4">
        <span class="text-h6 font-weight-medium">{{ currentMonth }} Goals</span>
        <v-btn
          color="primary"
          @click="dialog = true"
          class="add-goal-btn"
          elevation="0"
        >
          <v-icon left class="mr-1">mdi-plus</v-icon>
          Add Goal
        </v-btn>
      </v-card-title>

      <div class="goals-list">
        <div
          v-for="(goal, index) in goals"
          :key="goal.id"
          class="goal-item"
          :class="{ completed: goal.completed }"
        >
          <div class="d-flex align-center justify-space-between w-100">
            <div class="d-flex align-center flex-grow-1">
              <div class="checkbox-wrapper mr-3" @click="toggleGoal(index)">
                <div
                  class="checkbox-circle"
                  :class="{ checked: goal.completed }"
                >
                  <v-icon v-if="goal.completed" size="small" color="white">
                    mdi-check
                  </v-icon>
                </div>
              </div>
              <span class="goal-text" :class="{ completed: goal.completed }">
                {{ goal.text }}
              </span>
            </div>
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              color="grey-lighten-1"
              @click="removeGoal(index)"
              class="delete-btn"
            ></v-btn>
          </div>
        </div>

        <div v-if="goals.length === 0" class="empty-state pa-4 text-center">
          <v-icon size="40" color="grey-lighten-1" class="mb-2"
            >mdi-clipboard-text-outline</v-icon
          >
          <div class="text-body-1 text-grey">No goals added yet</div>
        </div>
      </div>

      <div v-if="hasCompletedGoals" class="clear-completed mt-4">
        <v-btn
          variant="text"
          color="primary"
          @click="clearCompletedGoals"
          class="text-none"
        >
          Clear Completed
        </v-btn>
      </div>
    </v-card>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6 pa-4"> Add New Goal </v-card-title>

        <v-card-text class="pa-4">
          <v-text-field
            v-model="newGoal"
            label="What do you need to do?"
            variant="outlined"
            hide-details
            autofocus
            @keyup.enter="addGoal"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn variant="text" color="grey" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="addGoal" :disabled="!newGoal.trim()">
            Add Goal
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const goals = ref([]);
const newGoal = ref("");
const dialog = ref(false);

const currentMonth = computed(() => {
  return new Date().toLocaleString("en-US", { month: "long" });
});

const hasCompletedGoals = computed(() => {
  return goals.value.some((goal) => goal.completed);
});

const loadGoals = () => {
  const savedGoals = localStorage.getItem("monthlyGoals");
  if (savedGoals) {
    goals.value = JSON.parse(savedGoals);
  }
};

const saveGoals = () => {
  localStorage.setItem("monthlyGoals", JSON.stringify(goals.value));
};

const addGoal = () => {
  if (newGoal.value.trim()) {
    goals.value.unshift({
      id: Date.now(),
      text: newGoal.value.trim(),
      completed: false,
    });
    newGoal.value = "";
    dialog.value = false;
    saveGoals();
  }
};

const toggleGoal = (index) => {
  goals.value[index].completed = !goals.value[index].completed;
  saveGoals();
};

const removeGoal = (index) => {
  goals.value.splice(index, 1);
  saveGoals();
};

const clearCompletedGoals = () => {
  goals.value = goals.value.filter((goal) => !goal.completed);
  saveGoals();
};

onMounted(() => {
  loadGoals();
});

watch(
  goals,
  () => {
    saveGoals();
  },
  { deep: true }
);
</script>

<style scoped>
.monthly-goals {
  max-width: 400px;
  margin: 0;
  padding: 20px;
}

.goals-card {
  background-color: #faf9f7 !important;
  border-radius: 12px !important;
}

.add-goal-btn {
  text-transform: none;
  font-weight: 500;
}

.goals-list {
  max-height: 400px;
  overflow-y: auto;
}

.goal-item {
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  transition: background-color 0.2s ease;
}

.goal-item:last-child {
  border-bottom: none;
}

.goal-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.checkbox-wrapper {
  cursor: pointer;
}

.checkbox-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.checkbox-circle.checked {
  background-color: #1a73e8;
  border-color: #1a73e8;
}

.goal-text {
  font-size: 0.95rem;
  color: #333;
  transition: all 0.2s ease;
}

.goal-text.completed {
  color: #999;
  text-decoration: line-through;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.goal-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  color: #ff5252 !important;
}

.empty-state {
  color: #999;
}

.clear-completed {
  display: flex;
  justify-content: flex-end;
}

:deep(.v-field__input) {
  font-size: 0.95rem !important;
}

:deep(.v-dialog > .v-card) {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}
</style>
