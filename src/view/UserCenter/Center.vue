<template>
	<Card dis-hover>
		<p slot="title" class="text-left">
			<Icon type="person"></Icon>
			个人中心
		</p>

		<Row class="p-20-rl">
			<Col :xs="12" :sm="10" :md="12" :lg="6">
			<Form label-position="right" :label-width="100" :model="formData" :rules="validate">
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
				<FormItem class="text-left" label="头像：">
					<Avatar class="m-10-ud" shape="square" size="large" :src="avatar"></Avatar>
					<Upload :action="uploadUrl" :format="['jpg','jpeg','png']" :on-format-error="uploadFormatErr" :on-success="uploadSuccess" :max-size="2048">
						<Button type="ghost" icon="ios-cloud-upload-outline">上传头像</Button>
					</Upload>
				</FormItem>
				<FormItem class="text-left" label="签名：" prop="description">
					<Input type="textarea" v-model="formData.description"></Input>
				</FormItem>
			</Form>
			</Col>
		</Row>
	</Card>
</template>

<script>
import { mapGetters } from "vuex";
import config from "@/config.js";

export default {
  name: "UserCenter",
  data() {
    return {
      avatar: "",
      formData: {
        email: "",
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
    this.avatar = this.userInfo.avatar;
    this.formData.email = this.userInfo.email;
  },
  methods: {
    uploadFormatErr(file) {
      this.$Message.error("选择的文件格式错误！");
    },
    uploadSuccess(res) {
      if (res.code === 200) {
        this.avatar = res.content.avatar;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
