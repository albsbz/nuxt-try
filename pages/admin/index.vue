<template>
    <div>
        <h1>Аналитика по постам</h1>
        <app-graph 
            :data="analytData.comments.data" 
            :labels="analytData.comments.labels"
            :name="'Комментарии'"
        />
        <app-graph 
            :data="analytData.views.data" 
            :labels="analytData.views.labels"
            :name="'Просмотры'"
        />
    </div>
</template>

<script>
import appGraph from '~/components/admin/Graph'
export default {
    head() {
        return {
            'title':`${process.env.appName} | Аналитика`
        }
    },
    layout:'admin',
    middleware: ['admin-auth'],
    components: {appGraph},
    async asyncData ({store}){ 
        const analytData= await store.dispatch('post/getAnalytics')
        return {analytData}
    },

}
</script>