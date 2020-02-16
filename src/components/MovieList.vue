<template>
  <div id='movie-list'>
    <div v-if="FilteredMovies.length">
      <movie-item v-for='movie in FilteredMovies' v-bind:movie="movie.movie">
        <div class="movie-sessions">
          <div v-for="session in filteredSessions(movie.sessions)"
               class="session-time-wrapper tooltip-wrapper"
               v-tooltip="{ seats: session.seats }"
               v-bind:key="session.id">
            <div class="session-time">{{ formatSessionTime(session.time) }}</div>
          </div>
        </div>
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      {{ noResults }}
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
      },
      formatSessionTime(raw) {
        return this.$moment(raw).format('h:mm A');
      },
      filteredSessions(sessions) {
        return sessions.filter(this.moviePassesTimeFilter);
      }
    },
    computed: {
      FilteredMovies() {
        return this.movies
          .filter(this.moviePassesGenreMovies)
          .filter(movie => movie.sessions.find(this.moviePassesTimeFilter));
      },
      noResults() {
        let times = this.time.join(", ");
        let genres = this.genre.join(", ");
        return `No result for: ${times}${this.time.length && this.genre.length ? ", " : ""}${genres}`;
      }
    },
    components: {
      MovieItem
    }
  }
</script>
