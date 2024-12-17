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
            v-for="(note, index) in notes"
            :key="index"
            class="note-item mb-3 pa-3"
          >
            <div class="d-flex justify-space-between align-center">
              <span class="note-text">{{ note }}</span>
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
      </v-slide-y-transition>

      <v-btn
        v-if="!isEditing && notes.length === 0"
        color="white"
        text
        @click="isEditing = true"
        class="mt-4"
        block
      >
        <v-icon left small>mdi-plus</v-icon>
        Yeni Not Ekle
      </v-btn>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "TaskNote",
  data() {
    return {
      editableNote: "",
      notes: [],
      isEditing: true,
      editingIndex: null,
    };
  },
  methods: {
    saveNote() {
      if (this.editableNote.trim() !== "") {
        if (this.editingIndex !== null) {
          this.$set(this.notes, this.editingIndex, this.editableNote);
          this.editingIndex = null;
        } else {
          this.notes.unshift(this.editableNote);
        }
        this.editableNote = "";
        this.isEditing = false;
      } else {
        console.error("Not boş olamaz!");
      }
    },
    editNote(index) {
      this.editableNote = this.notes[index];
      this.editingIndex = index;
      this.isEditing = true;
    },
  },
};
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
  color: black;
  font-size: 1.5rem;
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
  font-size: 1.25rem;
  line-height: 1.5;
  word-break: break-word;
  color: white;
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
}

.divider {
  background-color: rgba(255, 255, 255, 0.2) !important;
}
</style>
