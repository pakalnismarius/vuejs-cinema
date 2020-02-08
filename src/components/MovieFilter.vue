<template>
  <div id='movie-filter'>
    <h2>Movie filter</h2>
    <h3>By time</h3>
    <div class="filter-group">
      <check-filter v-for="time in times" category="time" v-bind:title="time" v-on:check-filter="checkFilter"></check-filter>
    </div>
    <h3>By time</h3>
    <div class="filter-group">
      <check-filter v-for="genre in genres" category="genre" v-bind:title="genre" v-on:check-filter="checkFilter"></check-filter>
    </div>
  </div>
</template>

<script type="text/javascript">
  import genres from '../util/genres';
  import times from '../util/times';
  import CheckFilter from './CheckFilter.vue';
  export default {
    data() {
      return {
        genres,
        times
      }
    },
    template: ``,
    methods: {
      checkFilter(category, title, checked) {
        this.$emit('check-filter', category, title, checked);
      }
    },
    components: {
      CheckFilter
    }
  }
</script>
