<template>
  <div class="page has-navbar" v-nav="{ title: 'Home' }">
    <div class="page-content text-center">
      <h2 class="padding" v-text="msg"></h2>

      <md-button class="button button-assertive" v-link="{path: '/about'}">
        <i class="ion-information-circled"></i> About
      </md-button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        msg: 'Hello! Vonic.'
      }
    },
    methods: {
    }
  }
</script>
<style lang="scss">
  h2 {
    font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;
    color: #888;
  }
  [theme='weixin'].action-sheet-backdrop .action-sheet-wrapper .action-sheet .action-sheet-group .button {
    @media (max-width: 768px) and (orientation: landscape) {
      height: 34px;      
      min-height: 34px;
      line-height: 34px;
    }
  }
  .page.has-navbar {
    .page-content {
      padding-top: 50px;
    }
  }
</style>
