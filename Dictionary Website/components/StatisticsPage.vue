<template>
  <div>
    <div v-if="loading">
      Loading statistics...
    </div>
    <div v-else-if="errorMessage">
      Error loading statistics: {{ errorMessage }}
    </div>
    <!-- Render Statistics component only when data is available -->
    <Statistics v-if="statisticsData" :statistics="statisticsData"></Statistics>
  </div>
</template>

<script>
import Statistics from '../views/Statistics.vue'; 
import { api } from '../helpers/helpers';

export default {
  name: 'StatisticsPage',
  components: {
    Statistics
  },
  data() {
    return {
      statisticsData: null, 
      loading: false,
      errorMessage: ''
    };
  },
  mounted() {
    this.loadStatistics();
  },
  methods: {
    async loadStatistics() { 
      this.loading = true;
      this.errorMessage = '';
      try {
        const response = await api.getTestResults(); 
        console.log('Response from API:', response); 
        if (response.status !== 200) {
          throw new Error(`Failed to fetch statistics: ${response.statusText || 'Unknown error'}`);
        }
        console.log('Received data:', response.data);
        this.statisticsData = response.data;
      } catch (error) {
        console.error("Failed to load statistics:", error.message || 'Unknown error');
        this.errorMessage = error.message || "Failed to load statistics.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>