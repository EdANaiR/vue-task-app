export default {
  name: "App",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Günlük", icon: "mdi-view-day", to: "/" },
        { title: "Aylık", icon: "mdi-calendar-month", to: "/monthly" },
        { title: "Yıllık", icon: "mdi-calendar", to: "/yearly" },
      ],
    };
  },
};
