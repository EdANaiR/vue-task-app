<template>
  <div class="task-manager" :class="{ 'sidebar-open': isSidebarOpen }">
    <v-card class="todo-card pa-4">
      <div class="title-section mb-3">
        <h2 class="todo-title">✏️ To do list</h2>
        <v-divider class="mt-2"></v-divider>
      </div>

      <!-- Task Form -->
      <v-form @submit.prevent="addTask">
        <v-text-field
          ref="taskInput"
          v-model="newTask"
          placeholder="+ Add a new task"
          variant="plain"
          density="comfortable"
          hide-details
          class="task-input mb-2"
          @click:append-inner="toggleEmojiPicker"
        >
          <template v-slot:append-inner>
            <v-menu
              v-model="showEmojiPicker"
              :close-on-content-click="false"
              location="bottom end"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  variant="plain"
                  v-bind="props"
                  size="small"
                  class="emoji-btn"
                >
                  <v-icon>mdi-emoticon-outline</v-icon>
                </v-btn>
              </template>
              <v-card class="emoji-picker pa-2">
                <div class="emoji-grid">
                  <button
                    v-for="emoji in emojis"
                    :key="emoji"
                    class="emoji-btn"
                    @click="addEmoji(emoji)"
                  >
                    {{ emoji }}
                  </button>
                </div>
              </v-card>
            </v-menu>
          </template>
        </v-text-field>
      </v-form>

      <!-- Task List -->
      <div class="task-list">
        <div
          v-for="task in tasksForSelectedDate"
          :key="task.id"
          class="task-item"
          :class="{ completed: task.completed }"
        >
          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center">
              <v-checkbox
                v-model="task.completed"
                hide-details
                density="comfortable"
                color="primary"
                class="task-checkbox"
                @change="saveTasksToLocalStorage"
              ></v-checkbox>
              <span class="task-text">{{ task.title }}</span>
            </div>
            <div class="d-flex">
              <v-btn
                icon="mdi-pencil"
                size="x-small"
                variant="text"
                @click.stop="editTask(task.id)"
                class="edit-icon mr-1"
              ></v-btn>
              <v-btn
                icon="mdi-delete"
                size="x-small"
                color="error"
                variant="text"
                @click.stop="deleteTask(task.id)"
                class="delete-icon"
              ></v-btn>
            </div>
          </div>
        </div>
      </div>

      <v-alert
        v-if="tasksForSelectedDate.length === 0"
        type="info"
        variant="text"
        class="mt-3 text-body-2"
      >
        No tasks yet. Add your first task above!
      </v-alert>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

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

const newTask = ref("");
const tasks = ref({});
const showEmojiPicker = ref(false);
const emojis = [
  "😀",
  "😊",
  "😂",
  "🥳",
  "👍",
  "❤️",
  "🎉",
  "✨",
  "🔥",
  "⭐",
  "📝",
  "📌",
  "⏰",
  "📅",
  "💡",
  "✅",
  "⚡",
  "🎯",
  "🎨",
  "💪",
  "🏃",
  "🌟",
  "💭",
  "📚",
  "💻",
  "🎵",
  "🎮",
  "🍕",
  "☕",
  "🌈",
];

const tasksForSelectedDate = computed(() => {
  return tasks.value[props.selectedDate] || [];
});

const addTask = () => {
  if (newTask.value.trim()) {
    if (!tasks.value[props.selectedDate]) {
      tasks.value[props.selectedDate] = [];
    }
    tasks.value[props.selectedDate].unshift({
      id: Date.now(),
      title: newTask.value.trim(),
      completed: false,
    });
    newTask.value = "";
    saveTasksToLocalStorage();
  }
};

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};

const addEmoji = (emoji) => {
  newTask.value += emoji;
  showEmojiPicker.value = false;
};

const editTask = (taskId) => {
  const task = tasksForSelectedDate.value.find((t) => t.id === taskId);
  if (task) {
    newTask.value = task.title;
  }
};

const deleteTask = (taskId) => {
  tasks.value[props.selectedDate] = tasksForSelectedDate.value.filter(
    (t) => t.id !== taskId
  );
  saveTasksToLocalStorage();
};

const saveTasksToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
};

onMounted(() => {
  loadTasksFromLocalStorage();
});

watch(
  () => props.selectedDate,
  (newDate) => {
    if (!tasks.value[newDate]) {
      tasks.value[newDate] = [];
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.task-manager {
  width: 100%;
  max-width: 400px;
}

.todo-card {
  background: white !important;
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.todo-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #000;
  margin: 0;
}

.task-input {
  margin-top: 8px;
}
.delete-icon {
  opacity: 0.5;
  transition: opacity 0.2s;
}

.task-item:hover .delete-icon {
  opacity: 1;
}
.task-input :deep(.v-field__outline) {
  display: none;
}

.task-list {
  margin-top: 8px;
}

.task-item {
  border-bottom: 1px solid #eee;
  padding: 0px 0;
  display: flex;
  align-items: center;
}

.task-item:last-child {
  border-bottom: none;
}

.task-checkbox {
  margin-right: 8px;
}

.task-text {
  font-size: 0.95rem;
  color: #201f1f;
  text-align: left;
  width: 100%;
}

.completed .task-text {
  text-decoration: line-through;
  color: #2b2a2a;
}

.emoji-picker {
  background: white !important;
  border: 1px solid #eee !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  max-width: 320px;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.emoji-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  font-size: 1.2rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.emoji-btn:hover {
  background-color: #f5f5f5;
}

:deep(.v-checkbox .v-selection-control) {
  margin-inline-start: -8px;
}

:deep(.v-field__input) {
  font-size: 0.95rem !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

:deep(.v-label) {
  font-size: 0.95rem !important;
}

:deep(.v-checkbox .v-selection-control__input) {
  color: #7b1fa2 !important;
}

.edit-icon {
  opacity: 0.5;
  transition: opacity 0.2s;
}

.task-item:hover .edit-icon {
  opacity: 1;
}
</style>
