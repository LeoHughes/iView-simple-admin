<template>
  <Card dis-hover>
    <p slot="title" class="text-left">
      <Icon type="person"></Icon>
      个人中心
    </p>

    <Row class="p-20-rl">
      <Col :xs="12" :sm="10" :md="12" :lg="6">
      <Form ref="formData" label-position="right" :label-width="100" :model="formData" :rules="validate">
        <FormItem class="text-left" label="账号：">
          <strong>{{ userInfo && userInfo.userName }}</strong>
        </FormItem>
        <FormItem class="text-left" label="邮箱：" prop="email" :required="true">
          <Input type="text" v-model="formData.email"></Input>
        </FormItem>
        <FormItem class="text-left" label="登录密码：">
          <Button type="ghost">修改密码</Button>
        </FormItem>
        <FormItem class="text-left" label="角色：">
          <strong>{{ userInfo && userInfo.roleName }}</strong>
        </FormItem>
        <FormItem class="text-left" label="登录IP：">
          <span>{{ userInfo && userInfo.ip }}</span>
        </FormItem>
        <FormItem class="text-left" label="头像：">
          <Avatar class="m-10-ud" shape="square" size="large" :src="formData.avatar"></Avatar>
          <Upload :action="uploadUrl" :format="['jpg','jpeg','png']" :on-format-error="uploadFormatErr" :on-success="uploadSuccess" :max-size="2048">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传头像</Button>
          </Upload>
        </FormItem>
        <FormItem class="text-left" label="签名：" prop="description">
          <Input type="textarea" v-model="formData.description"></Input>
        </FormItem>
      </Form>
      </Col>

      <Col class="text-center" span="24">
      <Button type="primary" shape="circle" icon="checkmark-round" :loading="loading" :style="{marginRight:'15px'}" @click="sumbit">保存</Button>
      <Button type="ghost" shape="circle" icon="close-round" @click="cancel">取消</Button>
      </Col>
    </Row>
  </Card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import config from "@/config.js";

export default {
  name: "UserCenter",
  data() {
    return {
      loading:false,
      formData: {
        email: "",
        avatar:'',
        description: ""
      },
      validate: {
        email: [
          { required: true, message: "请输入邮箱地址！", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址！", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    uploadUrl() {
      return config.server + config.updatedUserAvatar;
    }
  },
  mounted() {
    this.formData.avatar = this.userInfo.avatar;
    this.formData.email = this.userInfo.email;
  },
  methods: {
    ...mapMutations(["updateOpenTabs"]),
    uploadFormatErr(file) {
      this.$Message.error("选择的文件格式错误！");
    },
    uploadSuccess(res) {
      if (res.code === 200) {
        this.formData.avatar = res.content.avatar;
      }
    },
    sumbit() {
      this.$refs.formData.validate(valid => {
        if(valid){
          //提交更新
          this.$Message.success('校验成功,正在提交中...');
          this.loading = !this.loading;

          setTimeout(() => {
            this.loading = !this.loading;
          },2000)

        }else{
          this.$Message.error('请填写正确的信息!');
        }
      })
    },
    cancel() {
      let { name, path, meta } = this.$route;

      let tabObj = {
        name,
        path,
        title: meta.title
      };

      this.updateOpenTabs({tabObj,type:1});
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
