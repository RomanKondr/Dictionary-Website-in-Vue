<template>
  <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out all fields!</p>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" placeholder="Enter English word..." v-model="word.english" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" placeholder="Enter German word..." v-model="word.german" />
    </div>

    <div class="ui labeled input fluid"> 
      <div class="ui label">
        <i class="spain flag"></i> Spanish
      </div>
      <input type="text" placeholder="Enter Spanish word..." v-model="word.spanish" />
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'word-form',
  props: {
    word: {
      type: Object,
      required: false,
      default: () => ({
        english: '',
        german: '',
        spanish: '' 
      })
    }
  },
  data() {
    return {
      errorsPresent: false
    };
  },
  methods: {
    onSubmit: function() {
      // Check all fields are filled
      if (this.word.english === '' || this.word.german === '' || this.word.spanish === '') {
        this.errorsPresent = true;
      } else {
        this.errorsPresent = false;
        this.$emit('createOrUpdate', this.word);
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>