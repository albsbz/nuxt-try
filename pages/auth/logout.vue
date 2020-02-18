<template>
    <div>logout</div>
</template>

<script>
export default {
    beforeCreate(){
        this.$store.dispatch('auth/logout')
        this.$router.push('/?message=logout')
    },
    mounted(){
        const {message}=this.$route.query
        if  (message==='logout'){
            this.$message.info('Вы вышли из профиля')
        } 
    },
}
</script>

<style lang="scss" scoped>

</style>