<template>
  <router-view/>
</template>

<script>
import { mapGetters } from 'vuex'
import apiService from './util/api'

export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapGetters(['get_current_user'])
    },
    created () {
        apiService.init()
    }
}
</script>

<style lang="scss" scoped>

</style>
