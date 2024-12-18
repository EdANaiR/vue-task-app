<template>
  <div class="reading-tracker">
    <v-card class="tracker-card pa-6" elevation="3">
      <h3 class="text-h6 font-weight-bold mb-4 text-black d-flex align-center">
        <v-icon left color="orange">mdi-book-open-page-variant</v-icon>
        Daily Reading
      </h3>

      <v-form @submit.prevent="saveReading" v-if="!isAdding">
        <v-btn
          color="blue"
          block
          @click="isAdding = true"
          class="mb-4"
          elevation="2"
        >
          <v-icon left>mdi-book-plus</v-icon>
          New Add
        </v-btn>
      </v-form>

      <v-expand-transition>
        <v-form @submit.prevent="saveReading" v-if="isAdding">
          <v-text-field
            v-model="bookName"
            label="Kitap Adı"
            class="mb-3"
            outlined
            dense
            hide-details
            color="primary"
            :rules="[(v) => !!v || 'Kitap adı gerekli']"
          ></v-text-field>

          <v-text-field
            v-model="pagesRead"
            label="Okunan Sayfa Sayısı"
            type="number"
            class="mb-4"
            outlined
            dense
            hide-details
            color="primary"
            :rules="[(v) => !!v || 'Sayfa sayısı gerekli']"
          ></v-text-field>

          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="!bookName || !pagesRead"
            elevation="2"
          >
            <v-icon left>mdi-check</v-icon>
            Kaydet
          </v-btn>
        </v-form>
      </v-expand-transition>

      <v-divider class="my-1"></v-divider>

      <v-slide-y-transition group>
        <div
          v-if="readingsForSelectedDate.length > 0"
          class="readings-container"
        >
          <v-card
            v-for="(reading, index) in readingsForSelectedDate"
            :key="index"
            class="reading-item mb-3 pa-3"
            outlined
          >
            <div class="d-flex justify-space-between align-center">
              <div>
                <div class="book-name font-weight-medium black--text">
                  {{ reading.bookName }}
                </div>
                <div class="pages-read grey--text text--darken-1">
                  {{ reading.pagesRead }} page read
                </div>
              </div>
              <v-btn
                icon
                x-small
                @click="removeReading(index)"
                class="delete-icon"
                text
              >
                <v-icon small color="black">mdi-close</v-icon>
              </v-btn>
            </div>
          </v-card>
        </div>
      </v-slide-y-transition>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  selectedDate: {
    type: String,
    required: true,
  },
});

const bookName = ref("");
const pagesRead = ref("");
const readings = ref({});
const isAdding = ref(false);

// Seçili tarihe göre okuma kayıtlarını getir
const readingsForSelectedDate = computed(() => {
  return readings.value[props.selectedDate] || [];
});

// Local storage'dan verileri yükle
const loadReadingsFromLocalStorage = () => {
  const savedReadings = localStorage.getItem("readings");
  if (savedReadings) {
    readings.value = JSON.parse(savedReadings);
  }
};

// Local storage'a verileri kaydet
const saveToLocalStorage = () => {
  localStorage.setItem("readings", JSON.stringify(readings.value));
};

// Yeni okuma kaydı ekler
const saveReading = () => {
  if (bookName.value && pagesRead.value) {
    if (!readings.value[props.selectedDate]) {
      readings.value[props.selectedDate] = [];
    }

    readings.value[props.selectedDate].unshift({
      bookName: bookName.value,
      pagesRead: pagesRead.value,
      date: new Date().toISOString(),
    });

    // Local storage'a kaydet
    saveToLocalStorage();

    // Formu temizler
    bookName.value = "";
    pagesRead.value = "";
    isAdding.value = false;
  }
};

// Okuma kaydını sil
const removeReading = (index) => {
  readings.value[props.selectedDate].splice(index, 1);
  saveToLocalStorage();
};

// Bileşen yüklendiğinde verileri yükle
onMounted(() => {
  loadReadingsFromLocalStorage();
});

// Tarih değiştiğinde yeni tarihe ait kayıtları hazırla
watch(
  () => props.selectedDate,
  (newDate) => {
    if (!readings.value[newDate]) {
      readings.value[newDate] = [];
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.reading-tracker {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}

.tracker-card {
  background: white !important;
  border-radius: 12px !important;
  width: 100%;
  height: 100%;
  margin: 20px 0;
}

.readings-container {
  display: flex;
  flex-direction: column;
}

.reading-item {
  transition: all 0.3s ease;
}

.reading-item:hover {
  background: #f5f5f5;
}

.book-name {
  font-size: 1rem;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.87);
}

.pages-read {
  font-size: 0.85rem;
  margin-top: 2px;
  color: rgba(0, 0, 0, 0.6);
}

.delete-icon {
  opacity: 0.5;
  transition: opacity 0.2s;
}

.delete-icon:hover {
  opacity: 1;
}

.delete-icon::v-deep .v-btn__content {
  opacity: 1;
}

:deep(.v-btn) {
  text-transform: none;
}
</style>
