<template>
  <div class="reading-list">
    <v-card class="reading-card pa-4" elevation="0">
      <v-card-title
        class="d-flex align-center justify-space-between mb-4 flex-wrap"
        style="gap: 16px"
      >
        <span class="text-h6 font-weight-medium"
          >{{ currentMonth }} Reading List</span
        >
        <v-btn
          color="primary"
          @click="dialog = true"
          class="add-book-btn"
          elevation="0"
        >
          <v-icon left class="mr-1">mdi-plus</v-icon>
          Add Book
        </v-btn>
      </v-card-title>

      <div class="books-list">
        <div v-for="(book, index) in books" :key="book.id" class="book-item">
          <div class="d-flex align-center justify-space-between w-100">
            <div class="book-info flex-grow-1">
              <div class="book-title">{{ book.title }}</div>
              <div class="book-author">{{ book.author }}</div>
              <v-chip
                :color="getStatusColor(book.status)"
                size="small"
                class="mt-1"
                variant="flat"
              >
                {{ book.status }}
              </v-chip>
            </div>
            <div class="book-actions d-flex align-center">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn icon variant="text" v-bind="props" size="small">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="status in bookStatuses"
                    :key="status"
                    @click="updateBookStatus(index, status)"
                  >
                    <v-list-item-title>{{ status }}</v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="removeBook(index)" color="error">
                    <v-list-item-title class="text-error"
                      >Delete</v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </div>

        <div v-if="books.length === 0" class="empty-state pa-4 text-center">
          <v-icon size="40" color="grey-lighten-1" class="mb-2"
            >mdi-book-outline</v-icon
          >
          <div class="text-body-1 text-grey">No books added yet</div>
        </div>
      </div>
    </v-card>

    <!-- Add Book Dialog -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6 pa-4"> Add New Book </v-card-title>

        <v-card-text class="pa-4">
          <v-form @submit.prevent="addBook">
            <v-text-field
              v-model="newBook.title"
              label="Book Title"
              variant="outlined"
              class="mb-3"
              hide-details
            ></v-text-field>
            <v-text-field
              v-model="newBook.author"
              label="Author"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn variant="text" color="grey" @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="addBook" :disabled="!isValidBook">
            Add Book
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const books = ref([]);
const dialog = ref(false);
const newBook = ref({
  title: "",
  author: "",
});

const bookStatuses = ["Not Started", "In Progress", "Completed"];

const currentMonth = computed(() => {
  return new Date().toLocaleString("en-US", { month: "long" });
});

const isValidBook = computed(() => {
  return newBook.value.title.trim() && newBook.value.author.trim();
});

const getStatusColor = (status) => {
  switch (status) {
    case "Not Started":
      return "grey";
    case "In Progress":
      return "info";
    case "Completed":
      return "success";
    default:
      return "grey";
  }
};

const loadBooks = () => {
  const savedBooks = localStorage.getItem("monthlyBooks");
  if (savedBooks) {
    books.value = JSON.parse(savedBooks);
  }
};

const saveBooks = () => {
  localStorage.setItem("monthlyBooks", JSON.stringify(books.value));
};

const addBook = () => {
  if (isValidBook.value) {
    books.value.unshift({
      id: Date.now(),
      title: newBook.value.title.trim(),
      author: newBook.value.author.trim(),
      status: "Not Started",
    });
    newBook.value = {
      title: "",
      author: "",
    };
    dialog.value = false;
    saveBooks();
  }
};

const updateBookStatus = (index, status) => {
  books.value[index].status = status;
  saveBooks();
};

const removeBook = (index) => {
  books.value.splice(index, 1);
  saveBooks();
};

onMounted(() => {
  loadBooks();
});

watch(
  books,
  () => {
    saveBooks();
  },
  { deep: true }
);
</script>

<style scoped>
.reading-list {
  max-width: 500px;
  margin: 0;
  padding: 20px;
}

@media (max-width: 768px) {
  .reading-list {
    max-width: 100%;
    padding: 16px;
  }

  .book-item {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .reading-list {
    padding: 12px;
  }

  .v-card-title {
    flex-direction: column;
    gap: 12px;
  }

  .add-book-btn {
    width: 100%;
  }
}

.v-card-title {
  flex-wrap: wrap;
  gap: 16px;
}

.reading-card {
  background-color: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px !important;
}

.add-book-btn {
  text-transform: none;
  font-weight: 500;
}

.books-list {
  max-height: 400px;
  overflow-y: auto;
}

.book-item {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;
}

.book-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.book-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: white;
}

.book-author {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 2px;
}

.book-actions {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.book-item:hover .book-actions {
  opacity: 1;
}

.empty-state {
  color: rgba(255, 255, 255, 0.7);
}
</style>
