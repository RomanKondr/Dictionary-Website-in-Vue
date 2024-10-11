<template>
  <div>
    <h1>Roman Kondratyuk Test</h1>
    <div v-if="words.length < 5">
      <p>You need to enter at least five words to begin the test</p>
    </div>
    <div v-else>
      <vocab-test :words="words"></vocab-test>
    </div>
  </div>
</template>

<script>
import VocabTest from '../components/VocabTest.vue'; 
import {api} from '../helpers/helpers';

export default {
  name: 'Test',
  components: {
    VocabTest
  },
  data() {
    return {
      words: [],
      score: 0,
      english: '',
      currWord: null, 
      testOver: false,
      result: '',
      resultClass: '',
      loading: false,
      errorMessage: ''
    };
  },
  mounted() {
    this.fetchWords();
  },
  methods: {
    fetchWords() {
    this.loading = true;
    api.getWords()
    .then(response => {
      console.log('Fetched words:', response); 
      this.words = response;
      this.loading = false;
    })
    .catch(error => {
      console.error("Failed to load words:", error);
      this.errorMessage = "Failed to load words. Please try again later.";
      this.loading = false;
    });
    },
    
  }
};
</script>

