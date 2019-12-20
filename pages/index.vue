<template>
  <section class="container">
    <div class="project-list">
      <div 
        v-for="project in projects" 
        :key="project.id" class="project" 
        @click="$router.push({ path: `/projects/${project.id}`, params: { id: project.id }})"
      >
        <div class="project__logo" v-if="project.logo_url">
          <img>
        </div>
        <router-link :to="{ path: `/projects/${project.id}`, params: { id: project.id }}" class="project__name">{{project.name}}</router-link>
        <div class="project__status project__status--active" v-if="project.is_active">Active</div>
        <div class="project__status project__status--inactive" v-else>Inactive</div>
        <div class="project__section">
          <DataPanel :project="project"></DataPanel>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DataPanel from '~/components/DataPanel.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    DataPanel
  },

  data() {
    return {
      projects: []
    }
  },

  methods: {
    ...mapActions({
      fetchProjects: 'project/fetchProjects'
    })
  },

  async mounted () {
    const isUserAuthorized = JSON.parse(localStorage.getItem('user')) || this.$store.state.auth.userInfo
    if (!isUserAuthorized) {
      this.$router.push('/login')
    }

    try {
      this.projects = await this.fetchProjects()
    } catch (error) {
      console.log('handle error', error)
    }
  }
}
</script>

<style lang='scss'>

.container {
  padding: 20px;
}

.project-list {
  max-width: 50%;
  width: 100%;
  margin: 0 auto;
}

.project {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 2px;
  padding: 15px;
  border: 1px solid #dedede;
  box-shadow: 0px 0px 4px #efefef;
  cursor: pointer;

  &__name {
    padding: 0 10px;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }

  &__status {
    font-size: 15px;
    font-weight: 700;
    &--active {
      color: #2cc82c;
    }

    &--inactive {
      color: red;
    }
  }
}

.project + .project {
  margin-top: 10px;
}


</style>

