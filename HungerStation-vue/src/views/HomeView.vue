/* 
  Index page for begin search
*/
<template>
  <div class="container dish vh-100 d-flex align-items-center justify-content-center text-center ">
    <div class="row col-6">
      <form class="d-flex col-12 mt-5 justify-content-center" @submit.prevent="handleSubmit">
        <input class="form-control mx-2 " required type="text" id="search" placeholder="Find Station:" v-model="query">
        <button class="btn btn-danger col-2" style="min-width: fit-content !important;" type="submit">Search</button>
      </form>
      <em class="text-black mt-1">-ร้านอาหารพิเศษ ของคนพิเศษ-</em>
    </div>
    
  </div>
  
  
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const query = ref('')
    const router = useRouter()
    const handleSubmit = () => {
      router.push({ name: 'FindStation', query: { place: query.value } })
    }
    return {
      query,
      handleSubmit,
    }
  },
}
</script>
