<template>
  <div>
    <h2>Score: {{ score }} out of {{ words.length }}</h2>

    <form action="#" @submit.prevent="onSubmit" v-if="!testOver">
      <div class="ui labeled input fluid">
        <div class="ui label">
          {{ testLanguage.toUpperCase() }}
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord[testLanguage]" />
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          ENGLISH
        </div>
        <input type="text" placeholder="Enter the English word..." v-model="english" :disabled="testOver" autocomplete="off" />
      </div>

      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <p :class="['results', resultClass]" v-if="result">{{ result }}</p>

    <button class="ui button primary" @click="playAgain" v-if="testOver">Play Again</button>
  </div>
</template>

<script>
import { api } from '../helpers/helpers'; 

export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      randWords: [],
      incorrectGuesses: [],
      result: '',
      resultClass: '',
      english: '',
      score: 0,
      testOver: false,
      testLanguage: ''
    };
  },
  created() {
    this.prepareTest();
  },
  methods: {
    prepareTest() {
      if (Array.isArray(this.words)) {
        this.randWords = this.words.map(word => ({
          ...word,
          testLanguage: Math.random() < 0.5 ? 'german' : 'spanish', // Randomly assign 'german' or 'spanish'
        })).sort(() => Math.random() - 0.5);
        this.currWord = this.randWords[0] || null;
        this.testLanguage = this.currWord ? this.currWord.testLanguage : '';
      }
    },
    onSubmit() {
      if (this.currWord === null) {
        console.error("No current word to submit.");
        return;
      }

      if (this.english.trim().toLowerCase() === this.currWord.english.trim().toLowerCase()) {
        this.flash('Correct!', 'success', { timeout: 1000 });
        this.score++;
      } else {
        this.flash(`Wrong! The correct translation for ${this.currWord[this.testLanguage]} is ${this.currWord.english}`, 'error');
        this.incorrectGuesses.push(this.currWord[this.testLanguage]);
      }

      this.english = ''; 
      this.randWords.shift(); 

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      } else {
        this.currWord = this.randWords[0];
        this.testLanguage = this.currWord.testLanguage; 
      }
    },
    displayResults() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        this.result = `You got the following words wrong: ${incorrect}`;
        this.resultClass = 'error';
      }
      this.saveTestResult();
    },
    flash(message, type, options) {
      this.result = message;
      this.resultClass = type;
      setTimeout(() => {
        this.result = '';
        this.resultClass = '';
      }, options.timeout || 1000);
    },
    playAgain() {
      this.randWords = [];
      this.incorrectGuesses = [];
      this.result = '';
      this.resultClass = '';
      this.english = '';
      this.score = 0;
      this.testOver = false;
      this.prepareTest();
    },
    saveTestResult() {
    const testResult = {
    score: Number(this.score),
    totalQuestions: Number(this.words.length),
    correctAnswers: Number(this.words.length - this.incorrectGuesses.length), 
    date: new Date().toISOString(),
  };

  api.saveTestResult(testResult)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(`Failed to save: ${response.statusText || 'Unknown error'}`);
      }
      console.log('Test result saved successfully:', response.data);
    })
    .catch(error => {
      console.error('Error saving test results:', error.response ? error.response.data : error.message || error);
    });
}
  }
};
</script>
<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>