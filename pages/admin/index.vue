<template>
    <h1>Welcome Admin</h1>
</template>
<script>
export default {
    layout:'admin',
    middleware: ['admin-auth']
}
</script>