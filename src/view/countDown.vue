<template>
    <div id="countDown">
        <span class="num">{{seconds}}</span>s later,page will rediret to index page
    </div>
</template>

<script>

  export default {
    name:"countDown",
    data(){
      return{
        seconds:5
      }
    },
    mounted(){
        let _this = this;
    
        let timer = setInterval(()=>{
            _this.seconds>0?_this.seconds -=1:clearInterval(timer);
            if(_this.seconds<=0){
                _this.$router.push('/');
            }
        },1000)

        
    }
  }
</script>

<style lang="less" scoped>
  #countDown{
    text-align: center;
    font-size: 16px;
    .num{
        font-size: 32px;
        font-weight: 600;
    }
  }
</style>
