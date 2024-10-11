<template>
  <div>
    <h1> Roman Kondratyuk Test Results Overview</h1>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Score</th>
          <th>Total Questions</th>
          <th>Correct Answers</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="result in statistics" :key="result._id">
          <td>{{ formatDate(result.date) }}</td>
          <td>{{ result.score }}</td>
          <td>{{ result.totalQuestions }}</td>
          <td>{{ result.correctAnswers }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
  name: 'Statistics',
  data() {
    return {
      statistics: [],
      loading: false,
      errorMessage: '',
    };
  },
  mounted() {
    this.fetchStatisticsData();
  },
  methods: {
    async fetchStatisticsData() {
      try {
        this.loading = true;
        this.errorMessage = '';
        this.statistics = await api.getTestResults();
      } catch (error) {
        console.error('Failed to fetch statistics:', error.message);
        this.errorMessage = error.message || 'Failed to fetch statistics';
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false 
  };
  return new Date(date).toLocaleString(undefined, options);
}
  }
};
</script>

<style scoped>
table {
  width: 100%;
  margin-top: 20px;
}
</style>