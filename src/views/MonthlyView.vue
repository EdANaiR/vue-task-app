<template>
  <div class="monthly-view">
    <div class="monthly-grid">
      <div class="grid-item">
        <MonthlyGoals />
      </div>
      <div class="grid-item">
        <ReadingList />
      </div>
      <div class="grid-item">
        <BudgetPlanner />
      </div>
    </div>
  </div>
</template>

<script setup>
import MonthlyGoals from "@/components/MonthlyGoals.vue";
import ReadingList from "@/components/ReadingList.vue";
import BudgetPlanner from "@/components/BudgetPlanner.vue";
</script>

<style scoped>
.monthly-view {
  padding: 20px;
  min-height: 100%;
  width: 100%;
}

.monthly-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  max-width: 1600px;
  margin: 0 auto;
}

.grid-item {
  display: flex;
  justify-content: start;
}

@media (max-width: 1200px) {
  .monthly-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .monthly-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .monthly-view {
    padding: 12px;
  }

  .monthly-grid {
    gap: 16px;
  }
}
</style>
