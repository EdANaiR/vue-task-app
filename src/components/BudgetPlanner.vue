<template>
  <div class="budget-planner">
    <v-card class="budget-card pa-4" elevation="0">
      <v-card-title class="d-flex align-center justify-space-between mb-4">
        <span class="text-h6 font-weight-medium"
          >{{ currentMonth }} Budget</span
        >
        <v-btn
          icon="mdi-pencil"
          size="small"
          variant="text"
          @click="dialog = true"
          class="edit-btn"
        ></v-btn>
      </v-card-title>

      <div class="budget-stats">
        <div class="stat-item">
          <div class="stat-label">Income</div>
          <div class="stat-value">{{ formatCurrency(budget.income) }}</div>
          <v-progress-linear
            color="success"
            height="4"
            :model-value="100"
            class="mt-1"
          ></v-progress-linear>
        </div>

        <div class="stat-item">
          <div class="stat-label">Expenses</div>
          <div class="stat-value">{{ formatCurrency(budget.expenses) }}</div>
          <v-progress-linear
            color="warning"
            height="4"
            :model-value="(budget.expenses / budget.income) * 100"
            class="mt-1"
          ></v-progress-linear>
        </div>

        <div class="stat-item">
          <div class="stat-label">Savings Goal</div>
          <div class="stat-value">{{ formatCurrency(budget.savingsGoal) }}</div>
          <v-progress-linear
            color="info"
            height="4"
            :model-value="(budget.savingsGoal / budget.income) * 100"
            class="mt-1"
          ></v-progress-linear>
        </div>

        <div class="stat-summary mt-4">
          <div class="summary-item">
            <span class="summary-label">Remaining:</span>
            <span class="summary-value" :class="remainingClass">
              {{ formatCurrency(remainingAmount) }}
            </span>
          </div>
        </div>
      </div>
    </v-card>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6 pa-4"> Edit Budget </v-card-title>

        <v-card-text class="pa-4">
          <v-form @submit.prevent="saveBudget">
            <v-text-field
              v-model="editedBudget.income"
              label="Income"
              variant="outlined"
              type="number"
              prefix="₺"
              class="mb-3"
              hide-details
            ></v-text-field>
            <v-text-field
              v-model="editedBudget.expenses"
              label="Expenses"
              variant="outlined"
              type="number"
              prefix="₺"
              class="mb-3"
              hide-details
            ></v-text-field>
            <v-text-field
              v-model="editedBudget.savingsGoal"
              label="Savings Goal"
              variant="outlined"
              type="number"
              prefix="₺"
              hide-details
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn variant="text" color="grey" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="saveBudget"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const dialog = ref(false);
const budget = ref({
  income: 0,
  expenses: 0,
  savingsGoal: 0,
});

const editedBudget = ref({
  income: 0,
  expenses: 0,
  savingsGoal: 0,
});

const currentMonth = computed(() => {
  return new Date().toLocaleString("en-US", { month: "long" });
});

const remainingAmount = computed(() => {
  return budget.value.income - budget.value.expenses - budget.value.savingsGoal;
});

const remainingClass = computed(() => {
  return {
    "text-success": remainingAmount.value > 0,
    "text-error": remainingAmount.value < 0,
  };
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(value);
};

const loadBudget = () => {
  const savedBudget = localStorage.getItem("monthlyBudget");
  if (savedBudget) {
    budget.value = JSON.parse(savedBudget);
  }
};

const saveBudget = () => {
  budget.value = { ...editedBudget.value };
  localStorage.setItem("monthlyBudget", JSON.stringify(budget.value));
  dialog.value = false;
};

const openDialog = () => {
  editedBudget.value = { ...budget.value };
  dialog.value = true;
};

onMounted(() => {
  loadBudget();
});
</script>

<style scoped>
.budget-planner {
  max-width: 400px;
  margin: 0;
  padding: 20px;
}

.budget-card {
  background-color: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px !important;
}

.stat-item {
  margin-bottom: 20px;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
}

.stat-summary {
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.summary-value {
  font-size: 1.1rem;
  font-weight: 500;
}

.text-success {
  color: #4caf50 !important;
}

.text-error {
  color: #ff5252 !important;
}

.edit-btn {
  color: rgba(255, 255, 255, 0.7) !important;
}

.edit-btn:hover {
  color: white !important;
}
</style>
