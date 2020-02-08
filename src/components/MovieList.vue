<template>
  <div id='movie-list'>
    <div v-if="FilteredMovies.length">
      <movie-item v-for='movie in FilteredMovies'
                  v-bind:movie="movie.movie"
                  v-bind:sessions="movie.sessions"
                  v-bind:day="day"
                  v-bind:time="time">
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      No results.
    </div>
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>

<script type="text/javascript">
  import genres from '../util/genres';
  import times from '../util/times';
  import MovieItem from './MovieItem.vue';
  export default {
    props: ["time", "genre", "movies", "day"],
    methods: {
      moviePassesGenreMovies(movie) {
        if (this.genre.length) {
          let movieGenres = movie.movie.Genre.split(', ');
          let matched = true;
          this.genre.forEach(genre => {
            if (movieGenres.indexOf(genre) === -1) {
              matched = false;
            }
          });
          return matched;
        } else {
          return true;
        }
      },
      moviePassesTimeFilter(session) {
        if (!this.day.isSame(this.$moment(session.time), 'day')) {
          return false;
        } else if (this.time.length === 0 || this.time.length === 2) {
          return true;
        } else if (this.time[0] === times.AFTER_6PM) {
          return this.$moment(session.time).hour() >= 18;
        } else {
          return this.$moment(session.time).hour() < 18;
        }
      }
    },
    computed: {
      FilteredMovies() {
        return this.movies
          .filter(this.moviePassesGenreMovies)
          .filter(movie => movie.sessions.find(this.moviePassesTimeFilter));
      }
    },
    components: {
      MovieItem
    }
  }
</script>
