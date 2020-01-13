<template>
    <article class="post">
        <header class="post-header">
            <div class="post-title">
                <h1>{{post.title}}</h1>
                <nuxt-link :to="'/'||$router.push('/')"> 
                    <i class="el-icon-back"></i>
                </nuxt-link>   
            </div>
            <div class="post-info">
                <small class="el-icon-time">{{post.date|date}}</small>
                <small class="el-icon-view">{{post.views}}</small>
            </div>
            <div>
                <img :src="post.imageUrl" 
                alt="post-image" class="post-img">
            </div>
        </header>
        <main class="post-main">
            <vue-markdown>{{post.text}}</vue-markdown>
        </main>
        <footer class="post-footer">
            <app-comment-form v-if="canAddComment" @created="createCommentHandler" :postId="post._id"/>
            <div class="comments" v-if="post.comments.length">
                <app-comment v-for="comment in post.comments" :comment="comment" :key="comment._id" />
            </div>
            <div class="comments" v-else>
                <p>Комментариев нет</p>
            </div>
        </footer>

    </article>
</template>

<script>
    import appComment from '~/components/main/comment'
    import appCommentForm from '~/components/main/commentForm'
    export default {
        head() {
            return {
                'title':`${process.env.appName} | ${this.post.title}`
            }
        },
        async validate ({params}){
            if (params.id){return true}
            else throw new Error('Under Construction!')
        },
        data(){
            return {
                id: this.$route.params.id,
                canAddComment: true,
                title:''
            }
        },
        async asyncData({store, params}) {
            const post = await store.dispatch('post/fetchById', params.id)
            await store.dispatch('post/addView', post)
            return {post}
        },
        components:{
            appComment,
            appCommentForm
        },
        methods:{
            createCommentHandler({newComment}){
                this.post.comments.unshift(newComment)
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