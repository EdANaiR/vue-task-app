<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="modern-sidebar"
      width="280"
    >
      <div class="sidebar-header pa-4">
        <div class="d-flex align-center">
          <v-avatar size="53">
            <img
              src="/images/logo.png"
              alt="Profile Picture"
              class="avatar-img"
            />
          </v-avatar>

          <div class="ml-3">
            <div class="taskly-title">
              <div class="text-h5 font-weight-bold text-white">TASKLY</div>
            </div>
            <div class="text-caption text-white">Task Manager</div>
          </div>
        </div>
      </div>

      <v-divider class="border-opacity-25"></v-divider>

      <v-list class="pa-2">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          class="mb-1 sidebar-item text-white"
          rounded="lg"
        ></v-list-item>

        <v-divider class="my-4 border-opacity-25"></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="modern-header" elevation="0" height="62">
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        color="white"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <div class="text-center date-time-display d-flex align-center">
        <v-btn icon @click="changeDate(-1)" class="mr-2">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <span>{{ formattedDate }}</span>
        <v-btn icon @click="changeDate(1)" class="ml-2">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn icon class="mr-2" color="white">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon class="mr-2" color="white">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>

      <v-avatar color="white" size="32" class="mr-2">
        <v-icon color="#1a73e8">mdi-account</v-icon>
      </v-avatar>
    </v-app-bar>

    <v-main class="main-content">
      <router-view
        :isSidebarOpen="drawer"
        :selectedDate="selectedDate"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Daily", icon: "mdi-view-day", to: "/" },
        { title: "Monthly", icon: "mdi-calendar-month", to: "/monthly" },
        { title: "Yearly", icon: "mdi-calendar", to: "/yearly" },
      ],
      currentDateTime: "",
      selectedDate: new Date().toISOString().split("T")[0],
    };
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      this.currentDateTime = now.toLocaleDateString("en-US", options);
    },
    changeDate(days) {
      const date = new Date(this.selectedDate);
      date.setDate(date.getDate() + days);
      this.selectedDate = date.toISOString().split("T")[0];
    },
  },
  computed: {
    formattedDate() {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(this.selectedDate).toLocaleDateString("en-US", options);
    },
  },
  mounted() {
    this.updateDateTime();
    setInterval(this.updateDateTime, 60000);
  },
  beforeUnmount() {
    clearInterval(this.updateDateTime);
  },
};
</script>

<style>
html,
body {
  overflow-y: auto !important;
}

.avatar-img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.v-application {
  background: transparent !important;
}

.modern-sidebar {
  background: rgba(0, 0, 0, 0.6) !important;
  border: none !important;
  backdrop-filter: blur(10px);
}

.modern-header {
  background: rgba(0, 0, 0, 0.02) !important;
  border: none !important;
  backdrop-filter: blur(10px);
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
}

.sidebar-item {
  transition: all 0.3s ease;
}

.sidebar-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.main-content {
  background-image: url("/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: calc(100vh - 64px);
  width: 100%;
  position: relative;
  overflow-y: auto;
}

.v-main::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 0;
}

.v-navigation-drawer--active + .v-main {
  padding-left: 280px;
}

@media (max-width: 768px) {
  .v-navigation-drawer--active + .v-main {
    padding-left: 0;
  }
}

.v-container {
  position: relative;
  z-index: 1;
  max-width: none !important;
  width: 100% !important;
  padding: 0 !important;
}

.v-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.v-main {
  color: white;
  transition: padding-left 0.3s ease;
}

:deep(.v-list) {
  background: transparent !important;
}

:deep(.v-list-item--active) {
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

:deep(.v-list-item--active .v-icon),
:deep(.v-list-item .v-icon) {
  color: white !important;
}

:deep(.v-list-item) {
  min-height: 44px !important;
  color: white !important;
}

:deep(.v-list-item__prepend > .v-icon) {
  color: white !important;
  opacity: 0.8;
}

:deep(.v-divider) {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.custom-expansion-panel) {
  background: transparent !important;
  color: white !important;
}

:deep(.v-expansion-panel-title) {
  color: white !important;
}

:deep(.v-expansion-panel-text) {
  color: white !important;
  background: rgba(255, 255, 255, 0.05) !important;
}

.date-time-display {
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%;
}
.taskly-title {
  font-family: "Montserrat", sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(90deg, #3eb899, #167a79);
  -webkit-background-clip: text; /* Sadece yazıya uygula */
  -webkit-text-fill-color: transparent; /* Arka planı görünmez yap */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.445);
  letter-spacing: 3px;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .date-time-display {
    font-size: 0.9rem;
  }
}
</style>
