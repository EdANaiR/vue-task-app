<template>
  <div class="task-note">
    <v-card class="note-card pa-4">
      <h3 class="text-h6 font-weight-medium mb-3 white--text text-white">
        Leave Yourself a Note
      </h3>
      <v-divider class="mb-4 divider"></v-divider>

      <v-textarea
        v-if="isEditing"
        v-model="editableNote"
        class="note-textarea mb-4"
        placeholder="Write your note for today here.."
        @keyup.enter="saveNote"
        rows="3"
        no-resize
        outlined
        dense
        hide-details
        background-color="rgba(255, 255, 255, 0.1)"
        color="white"
      ></v-textarea>

      <v-slide-y-transition group>
        <div v-if="!isEditing" class="notes-container">
          <div
            v-for="(note, index) in notesForSelectedDate"
            :key="index"
            class="note-item mb-3 pa-3"
          >
            <div class="d-flex justify-space-between align-center">
              <span class="note-text">{{ note.text }}</span>
              <div class="d-flex align-center">
                <span class="note-date mr-2">{{ formatDate(note.date) }}</span>
                <v-btn
                  icon
                  x-small
                  @click="editNote(index)"
                  class="edit-icon"
                  color="white"
                >
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-slide-y-transition>

      <v-btn
        v-if="!isEditing"
        color="white"
        text
        @click="startNewNote"
        class="mt-4"
        block
      >
        <v-icon left small>mdi-plus</v-icon>
        Add New Note
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  selectedDate: {
    type: String,
    required: true,
  },
});

const editableNote = ref("");
const notes = ref({});
const isEditing = ref(false);
const editingIndex = ref(null);

const notesForSelectedDate = computed(() => {
  return notes.value[props.selectedDate] || [];
});

const loadNotesFromLocalStorage = () => {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    notes.value = JSON.parse(savedNotes);
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem("notes", JSON.stringify(notes.value));
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const startNewNote = () => {
  editableNote.value = "";
  editingIndex.value = null;
  isEditing.value = true;
};

const saveNote = () => {
  if (editableNote.value.trim() !== "") {
    const noteObj = {
      text: editableNote.value.trim(),
      date: new Date().toISOString(),
    };

    if (!notes.value[props.selectedDate]) {
      notes.value[props.selectedDate] = [];
    }

    if (editingIndex.value !== null) {
      // Düzenleme işlemi
      notes.value[props.selectedDate].splice(editingIndex.value, 1, noteObj);
    } else {
      // Yeni not ekleme
      notes.value[props.selectedDate].unshift(noteObj);
    }

    // Local storage'a kaydet
    saveToLocalStorage();

    // Formu temizle
    editableNote.value = "";
    editingIndex.value = null;
    isEditing.value = false;
  }
};

const editNote = (index) => {
  editingIndex.value = index;
  editableNote.value = notesForSelectedDate.value[index].text;
  isEditing.value = true;
};

onMounted(() => {
  loadNotesFromLocalStorage();
});
</script>

<style scoped>
.task-note {
  width: 100%;
  max-width: 400px;
  padding: 0px;
  margin-top: 3%;
}

.note-card {
  background: linear-gradient(
    135deg,
    rgba(33, 13, 42, 0.7),
    rgba(95, 21, 46, 0.7)
  ) !important;
  backdrop-filter: blur(4px);
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
}

.note-textarea {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  font-size: 0.95rem !important;
}

.notes-container {
  display: flex;
  flex-direction: column;
}

.note-item {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px !important;
  transition: all 0.3s ease;
}

.note-item:hover {
  background: rgba(255, 255, 255, 0.3);
}

.note-text {
  font-size: 1rem;
  line-height: 1.5;
  word-break: break-word;
  color: white;
}

.note-date {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.edit-icon {
  opacity: 0.5;
  transition: opacity 0.2s;
}

.note-item:hover .edit-icon {
  opacity: 1;
}

:deep(.v-btn) {
  text-transform: none;
}

:deep(.v-field__outline) {
  --v-field-border-opacity: 0.2;
}

:deep(.v-textarea .v-field__input) {
  font-size: 0.95rem !important;
  padding-top: 12px !important;
  padding-bottom: 12px !important;
  color: white !important;
}

.divider {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

:deep(.v-textarea textarea::placeholder) {
  color: rgba(255, 255, 255, 0.6) !important;
}
</style>
