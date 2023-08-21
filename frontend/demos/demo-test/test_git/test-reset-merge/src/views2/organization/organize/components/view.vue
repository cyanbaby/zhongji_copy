<template>
    <div>
        <el-form
        ref="form"
        style="width: 600px"
        :model="selectOrgInfo"
        :rules="rules"
        label-width="120px"
        v-if="orgId"
        >
        <el-form-item
            label="组织全称："
            prop="orgFullName"
        >
            {{selectOrgInfo.orgFullName}}
        </el-form-item>
        <el-form-item
            label="组织简称："
            prop="orgShortName"
        >
            {{selectOrgInfo.orgShortName}}
        </el-form-item>
        <el-form-item
            label="机构logo："
            prop="orgIconUrl"
        >
            <img :src="selectOrgInfo.orgIconUrl" style="width:60px;"/>
        </el-form-item>
        <el-form-item
            label="地址："
            prop="addressCode"
        >
            {{selectOrgInfo.province}}
            <span v-if="selectOrgInfo.city">/</span>
            {{selectOrgInfo.city}}
            <span v-if="selectOrgInfo.area">/</span>
            {{selectOrgInfo.area}}
            <span v-if="selectOrgInfo.street">/</span>
            {{selectOrgInfo.street}}
        </el-form-item>
        <el-form-item
            label="详细地址："
            prop="addressDetail"
        >
            {{selectOrgInfo.addressDetail}}
        </el-form-item>

        <el-form-item
            label="组织类型："
            prop="orgType"
        >
            <span v-for="(item,i) in optionsorgType" :key="i">
              <span v-if="item.value==selectOrgInfo.orgType">{{item.label}}</span>
            </span>
        </el-form-item>
        <el-form-item
            label="管理员姓名："
            prop="managerName"
        >
            {{selectOrgInfo.managerName}}
        </el-form-item>
        <el-form-item
            label="管理员手机号："
            prop="managerMobile"
        >
            {{selectOrgInfo.managerMobile}}
        </el-form-item>
        <!-- <el-form-item>
            <el-button type="primary" @click="changeEdit">编辑机构资料</el-button>
            <el-button style="margin-left: 20px;" @click="changeRole">更换管理员</el-button>
        </el-form-item> -->
        </el-form>
        <div v-else style="margin-top: 30vh;margin-left: 45%;font-size: 20px;">暂无数据</div>
    </div>
</template>
<script>
/* eslint-disable */ 

export default {
  props: {
    selectOrgInfo: {},
    optionsorgType: [],
    orgId: ''
  },
  data () {
    return {
      rules: {
        orgFullName: [
          { required: true, message: '请输入组织全称', trigger: 'blur' }
        ],
        addressCode: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        orgShortName: [
          { required: true, message: '请输入组织简称', trigger: 'blur' }
        ],
        orgIconUrl: [
          { required: true, message: '请上传组织logo', trigger: 'blur' }
        ],
        orgType: [{
          required: true,
          message: '请选择组织类型',
          trigger: 'change'
        }],
        managerName: [{
          required: true,
          message: '请输入管理者姓名',
          trigger: 'blur'
        }],
        managerMobile: [{
          required: true,
          message: '请输入管理者手机号',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    changeEdit () {
      this.$emit('isChangeView', false)
    },
    changeRole () {
      this.$emit('changeRole', true)
    }
  }
}
</script>
