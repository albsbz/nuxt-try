<template>
    <article class="post">
        <header class="post-header">
            <div class="post-title">
                <h1>Post title</h1>
                <nuxt-link :to="'/'||$router.push('/')"> 
                    <i class="el-icon-back"></i>
                </nuxt-link>   
            </div>
            <div class="post-info">
                <small class="el-icon-time">{{new Date().toLocaleString()}}</small>
                <small class="el-icon-view">10</small>
            </div>
            <div class="post-img">
                <img src="https://i.pinimg.com/736x/18/cc/dd/18ccdd8461473aac27dd0c64b925bf81.jpg" 
                alt="post-image">
            </div>
        </header>
        <main class="post-main">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, maxime!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, maxime!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, maxime!</p>
        </main>
        <footer class="post-footer">
            <app-comment-form v-if="canAddComment" @created="createCommentHandler"/>
            <div class="comments" v-if="true">
                <app-comment v-for="comment in 4" :comment="comment" :key="comment" />
            </div>
            <div class="comments" v-if="false">
                <p>Комментариев нет</p>
            </div>
        </footer>

    </article>
</template>

<script>
    import appComment from '~/components/main/comment'
    import appCommentForm from '~/components/main/commentForm'
    export default {
        async validate ({params}){
            if (params.id){return true}
            else throw new Error('Under Construction!')
        },
        data(){
            return {
                id: this.$route.params.id,
                canAddComment: true
            }
        },
        components:{
            appComment,
            appCommentForm
        },
        methods:{
            createCommentHandler(){
                
                this.canAddComment=false
            }
        }
    }
</script>

<style lang="scss" scoped>
.post{
    max-width: 600px;
    margin: 0 auto;
}
.post-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
.post-info{
     display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
}
.post-img{
    width: 100%;
    height: auto;
}
.post-header{
    margin-bottom: 1.5rem;
}
.post-main{margin-bottom: 2rem;}
// .post-footer{}
</style>