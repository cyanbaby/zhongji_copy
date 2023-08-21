<template>
  <d2-container>
    <el-steps :active="activeSteps" finish-status="success" simple class="steps-box">
      <el-step title="基础信息"></el-step>
      <el-step title="拿证要求" v-if="flag"></el-step>
    </el-steps>
    <div v-if="activeSteps === 0">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="证书类型" prop="certType">
          <el-select v-model="form.certType" placeholder="请选择" style="width: 300px" @change="certTypeHandleChange">
            <el-option v-for="item in certTypeList" :key="item.dictDataId" :label="item.dictDataName"
              :value="item.dictDataValue">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证书名称" prop="certName">
          <el-input v-model="form.certName" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="适用课程" v-if="form.certType == 3">
          <el-radio-group v-model="form.applicableCourse">
            <el-radio :label="1">专业科目</el-radio>
            <el-radio :label="2">公共科目</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否需要审核" prop="isNeedAudit">
          <el-radio-group v-model="form.isNeedAudit">
            <el-radio :label="2">无需审核</el-radio>
            <el-radio :label="1">需要审核</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型" prop="typesetting">
          <el-radio-group v-model="form.typesetting" @change="changeType">
            <el-radio-button label="1">横版</el-radio-button>
            <el-radio-button label="2">竖版</el-radio-button>
            <el-radio-button label="3">定制版</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="展示信息" prop="certInformation" class="certInformation-box">
          <div class="cert-template-box">
            <div class="title">实时预览</div>
            <!-- 横版 -->
            <div :style="'background-image:url(' + form.certBackUrl + ')'" class="my-cert-template-heng"
              v-if="certTemplateType == 1">
              <div class="cert-name">
                {{ form.certName ? form.certName : "证书名称" }}
              </div>
              <div class="cert-preview">
                <ul>
                  <li v-if="form.studentNameStatus">
                    {{
                        form.studentNameName ? form.studentNameName : "姓名"
                    }}：<span style="font-weight: bold">XXX</span>
                  </li>
                  <li v-if="form.sexStatus">
                    {{ form.sexName ? form.sexName : "性别" }}：<span>X</span>
                  </li>
                  <li v-if="form.idCardNumStatus">
                    {{
                        form.idCardNumName ? form.idCardNumName : "身份证号码"
                    }}：<span style="font-weight: bold">XXXXXXXXXXXXXXXXXX</span>
                  </li>
                  <li style="
                      text-indent: 24px;
                      max-height: 100px;
                      min-height: 50px;
                      word-break:break-all;
                    ">
                    {{ form.templateContent ? form.templateContent : "" }}
                  </li>
                </ul>
              </div>
              <div class="cert-preview cert-preview-bottom">
                <ul>
                  <li v-if="form.orgNameStatus && form.certType != 4">
                    {{
                        form.orgNameName ? form.orgNameName : "施教机构"
                    }}：<span style="font-weight: bold">{{
    form.orgNameValue ? form.orgNameValue : "XXXXXXXXXX"
}}</span>
                  </li>
                  <li v-if="form.orgNameStatus && form.certType == 4">
                    {{
                        form.orgNameName ? form.orgNameName : "发证机构"
                    }}：<span style="font-weight: bold">XXXXXXXXXX</span>
                  </li>
                  <li v-if="form.cIdentifierStatus">
                    {{
                        form.cIdentifierName ? form.cIdentifierName : "证书编号"
                    }}：<span style="font-weight: bold">XXXXXXXX</span>
                  </li>
                  <li v-if="form.purchaseTimeStatus && form.certType != 4">
                    {{
                        form.purchaseTimeName
                          ? form.purchaseTimeName
                          : "购课时间"
                    }}：<span style="font-weight: bold">XXXX-X-X</span>
                  </li>
                  <li v-if="form.certGiveTimeStatus">
                    {{
                        form.certGiveTimeName
                          ? form.certGiveTimeName
                          : "发证时间"
                    }}：<span style="font-weight: bold">XXXX-X-X</span>
                  </li>
                </ul>
              </div>
              <div class="img-erweima">
                <img src="@/assets/images/company_erweima.png" />
              </div>
              <div class="img-chapter">
                <img v-if="form.certOfficialUrl" :src="form.certOfficialUrl" />
                <!--                          <img v-if="!form.certOfficialUrl" src="@/assets/images/chapter.png"/>
 -->
              </div>
            </div>
            <!-- 竖版 -->
            <div :style="'background-image:url(' + form.certBackUrl + ')'" class="my-cert-template-shu"
              v-if="certTemplateType == 2">
              <div class="cert-name">
                {{ form.certName ? form.certName : "证书名称" }}
              </div>
              <div class="cert-preview">
                <ul>
                  <li v-if="form.studentNameStatus" style="
                      text-align: center;
                      margin-top: 30px;
                      font-size: 18px;
                    ">
                    <!-- {{form.studentNameName?form.studentNameName:'姓名'}}： -->
                    <span style="font-weight: bold">XXX</span>
                  </li>
                  <!-- <li v-if="form.sexStatus">{{form.sexName?form.sexName:'性别'}}：<span>X</span></li>
                        <li v-if="form.idCardNumStatus">{{form.idCardNumName?form.idCardNumName:'身份证号码'}}：<span style="font-weight: bold;">XXXXXXXXXXXXXXXXXX</span></li> -->
                  <li style="
                      text-indent: 24px;
                      max-height: 100px;
                      min-height: 50px;
                      word-break:break-all;
                    ">
                    {{ form.templateContent ? form.templateContent : "" }}
                  </li>
                </ul>
              </div>
              <div class="cert-preview cert-preview-bottom">
                <ul style="text-align: center">
                  <li v-if="form.cIdentifierStatus">
                    {{
                        form.cIdentifierName ? form.cIdentifierName : "证书编号"
                    }}：<span style="font-weight: bold">XXXXXXXX</span>
                  </li>
                  <li class="img-erweima">
                    <img src="@/assets/images/company_erweima.png" />
                  </li>
                  <li v-if="form.orgNameStatus">
                    <span style="font-weight: bold">
                      {{
                          form.orgNameValue ? form.orgNameValue : "XXXXXXXXXX"
                      }}</span>
                  </li>
                  <li v-if="form.certGiveTimeStatus" style="position: relative">
                    <span style="font-weight: bold">XXXX-X-X</span>
                  </li>
                  <!-- <li v-if="form.purchaseTimeStatus&&form.certType!=4">{{form.purchaseTimeName ?form.purchaseTimeName:'购课时间'}}：<span style="font-weight: bold;">XXXX-X-X</span></li>
                           -->
                </ul>
              </div>
              <div class="img-chapter">
                <img v-if="form.certOfficialUrl" :src="form.certOfficialUrl" />
                <!--                          <img v-if="!form.certOfficialUrl" src="@/assets/images/chapter.png"/>
 -->
              </div>
            </div>
            <!-- 定制版 -->
            <div :style="'background-image:url(' + form.certBackUrl + ')'" class="my-cert-template-dingZhi"
              v-if="certTemplateType == 3">
              <div class="cert-name">
                {{ form.certName ? form.certName : "学时证明" }}
              </div>
              <div class="cert-preview">
                <ul>
                  <li style="height: 28px; display: flex; justify-content: center;align-items:center">
                    <img src="@/assets/images/zhuangShi.png" alt="" style="width: 320px;height: 7px;">
                  </li>
                  <li v-if="form.cIdentifierStatus" style="display: flex; justify-content: flex-end">
                    {{
                        form.cIdentifierName ? form.cIdentifierName : "No."
                    }}：<span style="font-weight: bold">HNGS2208091346</span>
                  </li>
                  <!-- <li v-if="form.studentNameStatus"
                      style="text-align: center;margin-top: 30px;font-size: 18px;"> -->
                  <!-- {{form.studentNameName?form.studentNameName:'姓名'}}： -->
                  <!-- <span style="font-weight: bold;">XXX</span> -->
                  <!-- </li> -->
                  <!-- <li v-if="form.sexStatus">{{form.sexName?form.sexName:'性别'}}：<span>X</span></li>
                        <li v-if="form.idCardNumStatus">{{form.idCardNumName?form.idCardNumName:'身份证号码'}}：<span style="font-weight: bold;">XXXXXXXXXXXXXXXXXX</span></li> -->

                  <li style="
                      text-indent: 24px;
                      max-height: 100px;
                      min-height: 50px;
                      word-break:break-all;
                    ">
                    {{
                        form.templateContent
                          ? form.templateContent
                          : "段小兰同志于2022年8月2日至2022年8月28日参加155387377615852585285258528528-湖南省高校教师岗 前培训班的学习，修完全部课程，获得138学时，特此证明。"
                    }}
                  </li>
                  <li v-if="form.idCardNumStatus" style="text-indent: 2em;">
                    {{
                        form.idCardNumName ? form.idCardNumName : "身份证号码"
                    }}：<span style="font-weight: bold">XXXXXXXXXXXXXXXXXX</span>
                  </li>
                </ul>
              </div>
              <div class="cert-preview cert-preview-bottom" style="padding: 0 78px 0 100px; margin-top: 25px;">
                <ul
                  :style="{'justify-content': inputcount==1 ? 'right' : 'space-around' }"
                  style="height: 52px; position: relative;  display: flex;">
                  <li class="img-erweima">
                    <img src="@/assets/images/company_erweima.png" />
                  </li>
                  <!-- 印章二 -->
                  <div class="sealone" style="margin-left: 65px;" v-if="certTemplateType == 3 && inputcount == 2">
                    <img v-if="form.certOfficialUrl2" :src="form.certOfficialUrl2" alt="">
                    <li v-if="form.orgNameStatus" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
                      <span style="font-weight: bold;"> {{ form.orgNameValue2 ? form.orgNameValue2 : "XXXXXXXXXX" }} </span>
                    </li>
                    <li v-if="form.certGiveTimeStatus" style="
                        position: relative;
                        display: flex;
                        justify-content: center;
                      ">
                      <span style="font-weight: bold">XXXX-X-X</span>
                    </li>
                  </div>
                  <!-- 印章一 -->
                  <div class="sealone" v-if="certTemplateType == 3&&inputcount == 2 || inputcount == 1">
                    <img v-if="form.certOfficialUrl" :src="form.certOfficialUrl" alt="">
                    <li v-if="form.orgNameStatus" style="display: flex; justify-content: center;">
                      <span style="font-weight: bold;">{{ form.orgNameValue ? form.orgNameValue : "XXXXXXXXXX"}}</span>
                    </li>
                    <li v-if="form.certGiveTimeStatus" style="
                        position: relative;
                        display: flex;
                        justify-content: center;
                      ">
                      <span style="font-weight: bold">XXXX-X-Xs</span>
                    </li>
                  </div>
                  <!-- <li v-if="form.purchaseTimeStatus&&form.certType!=4">{{form.purchaseTimeName ?form.purchaseTimeName:'购课时间'}}：<span style="font-weight: bold;">XXXX-X-X</span></li>
                           -->
                </ul>
              </div>
              <!-- <div class="img-chapter">
                <img v-if="form.certOfficialUrl"
                     :src="form.certOfficialUrl" />
                <img v-if="!form.certOfficialUrl" src="@/assets/images/chapter.png"/>
              </div> -->
            </div>

            <!-- 更换背景图和上传印章 -->
            <div class="unload-box">
              <el-form-item prop="certBackUrl" class="upload-btn">
                <div style="display: flex; flex-direction: column">
                  <!--                          <img v-if='"form.certBackUrl"' :src="form.certBackUrl" alt="" style="width:200px;height:100px">
 -->
                  <el-button type="primary" size="mini" @click="dialogVisible1 = true"
                    style="width: 100px;padding: 10px 0;">更换背景图</el-button>
                </div>
                <el-dialog title="上传证书背景图" :visible.sync="dialogVisible1" width="400px" :close-on-click-modal="false">
                  <resource-uploader-v2 v-model="form.certBackUrl" resource-name="图片" upload-code="Upload-file-img"
                    resource-suffix=".jpg,.png,.ico" :show-upload-button="true" :show-select-dir="false"
                    :select-dir-by-suffix="false" :show-label="false" file-type="img" :limit-file-size="1024000"
                    @uploadComplete="uploadComplete1" />
                </el-dialog>
              </el-form-item>
              <el-form-item prop="certOfficialUrl" class="upload-btn">
                <div style="display: flex; flex-direction: column">
                  <!--                          <img v-if='form.certOfficialUrl' :src="form.certOfficialUrl" alt="" style="width:100px;height:100px">
 -->
                  <el-button type="primary" size="mini" @click="dialogVisible2 = true"
                    style="width: 120px; padding: 10px;">上传/更换印章</el-button>
                </div>
                <el-dialog title="上传证书印章" :visible.sync="dialogVisible2" width="400px" :close-on-click-modal="false">
                  <resource-uploader-v2 v-model="form.certOfficialUrl" resource-name="图片" upload-code="Upload-file-img"
                    resource-suffix=".jpg,.png,.ico" :show-upload-button="true" :show-select-dir="false"
                    :select-dir-by-suffix="false" :show-label="false" file-type="img" :limit-file-size="1024000"
                    @uploadComplete="uploadComplete2" />
                </el-dialog>
              </el-form-item><br>
              <el-from-item  prop="certOfficialUrl2" v-if="certTemplateType == 3 && inputcount == 2">
                <el-button type="primary" size="mini" style="margin-right: 40px;" @click="dialogVisible3 = true">印章二</el-button>

                <el-dialog title="上传证书印章二" :visible.sync="dialogVisible3" width="400px" :close-on-click-modal="false">
                  <resource-uploader-v2 v-model="form.certOfficialUrl2" resource-name="图片" upload-code="Upload-file-img"
                    resource-suffix=".jpg,.png,.ico" :show-upload-button="true" :show-select-dir="false"
                    :select-dir-by-suffix="false" :show-label="false" file-type="img" :limit-file-size="1024000"
                    @uploadComplete="uploadComplete3" />
                </el-dialog>
              </el-from-item>
              <el-from-item prop="certOfficialUrl" v-if="certTemplateType == 3">
                <el-button type="primary" size="mini" @click="dialogVisible4 = true">印章一</el-button>

                 <el-dialog title="上传证书印章一" :visible.sync="dialogVisible4" width="400px" :close-on-click-modal="false">
                  <resource-uploader-v2 v-model="form.certOfficialUrl" resource-name="图片" upload-code="Upload-file-img"
                    resource-suffix=".jpg,.png,.ico" :show-upload-button="true" :show-select-dir="false"
                    :select-dir-by-suffix="false" :show-label="false" file-type="img" :limit-file-size="1024000"
                    @uploadComplete="uploadComplete4" />
                </el-dialog>
              </el-from-item>
            </div>
          </div>

          <div class="certInformation">
            <div>用户信息</div>
            <div class="right-box">
              <div class="input-box">
                <el-checkbox class="item" v-model="form.studentNameStatus">姓名</el-checkbox>
                <div class="input-box">
                  <span class="text">自定义名称</span>
                  <el-input v-model="form.studentNameName" size="small" :disabled="!form.studentNameStatus"></el-input>
                </div>
              </div>
              <div class="input-box">
                <el-checkbox class="item" v-model="form.sexStatus">性别</el-checkbox>
                <div class="input-box">
                  <span class="text">自定义名称</span>
                  <el-input v-model="form.sexName" size="small" :disabled="!form.sexStatus"></el-input>
                </div>
              </div>
              <div class="input-box">
                <el-checkbox class="item" v-model="form.idCardNumStatus">身份证号</el-checkbox>
                <div class="input-box">
                  <span class="text">自定义名称</span>
                  <el-input v-model="form.idCardNumName" size="small" :disabled="!form.idCardNumStatus"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="certInformation">
            <div>证书信息</div>
            <div class="right-box">
              <div class="input-box">
                <el-checkbox class="item" v-model="form.orgNameStatus">
                  <span v-if="form.certType != 4">施教机构</span>
                  <span v-if="form.certType == 4">发证机构</span>
                </el-checkbox>
                <div class="input-box">
                  <span class="text">自定义名称</span>
                  <el-input v-model="form.orgNameName" size="small" :disabled="!form.orgNameStatus"></el-input>
                </div>
              </div>
              <div class="input-box" v-if="form.certType != 4">
                <el-checkbox class="item" v-model="form.purchaseTimeStatus">购课时间</el-checkbox>
                <div class="input-box">
                  <span class="text">自定义名称</span>
                  <el-input v-model="form.purchaseTimeName" size="small" :disabled="!form.purchaseTimeStatus">
                  </el-input>
                </div>
              </div>
              <div class="input-box">
                <el-checkbox class="item" v-model="form.certGiveTimeStatus">发证时间</el-checkbox>
                <div class="input-box">
                  <span class="text">自定义名称</span>
                  <el-input v-model="form.certGiveTimeName" size="small" :disabled="!form.certGiveTimeStatus">
                  </el-input>
                </div>
              </div>
              <div class="input-box">
                <el-checkbox class="item" disabled="disabled" v-model="form.cIdentifierStatus">证书编码</el-checkbox>
                <div class="input-box">
                  <span class="text">自定义名称</span>
                  <el-input v-model="form.cIdentifierName" size="small" :disabled="!form.cIdentifierStatus"></el-input>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="tips">自定义名称</div> -->
        </el-form-item>
        <el-form-item :label="nameOrg" v-if="inputcount == 1" prop="orgNameValue">
          <el-input v-model="form.orgNameValue" style="width: 300px"></el-input>
          <el-input-number v-if="certTemplateType == 3" v-model="inputcount" @change="numberbox" :min="1" :max="2" label="描述文字" class="numberbox"></el-input-number>
        </el-form-item>
        <el-form-item style="display: inline-block" :label="nameOrg" prop="orgNameValue2" v-if="inputcount == 2 && certTemplateType == 3">
          <el-input v-model="form.orgNameValue2" style="width: 300px"></el-input>
          <el-input-number v-model="inputcount" @change="numberbox" :min="1" :max="2" label="描述文字" class="numberbox"></el-input-number>
        </el-form-item>
        <el-form-item label="模板内容" style="width: 540px;" prop="templateContent">
          <el-input id="templateConteId" style="width: 522px" type="textarea" :rows="2" placeholder="请输入内容"
            v-model="form.templateContent">
          </el-input>
          <div style="width: 522px; position: absolute; bottom: -9px">
            <div @click="gateway = true" style="
                color: #409eff;
                position: absolute;
                left: 0;
                font-size: 12px;
                cursor: pointer;
              ">
              常用模板库
            </div>
            <div style="position: absolute; right: 0">
              <span style="color: #888888; font-size: 12px; margin-right: 5px">插入变量</span>
              <el-select size="mini" style="width: 100px" v-model="templateContentOptions" placeholder="请选择"
                @change="templateContentChange">
                <el-option v-for="item in templateContentOptionsList" :key="item.dictDataId" :label="item.dictDataName"
                  :value="item.dictDataValue">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-dialog title="证书模板库" :visible.sync="gateway" width="600px" :append-to-body="true">
            <el-table border height="260" :data="tableData" empty-text="暂无门户信息" style="width: 100%; margin-top: 10px">
              <el-table-column prop="templateName" label="门户名称" width="180">
              </el-table-column>
              <el-table-column prop="templateContent" label="模板内容">
              </el-table-column>
              <el-table-column prop="edit" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" @click="editClick(scope.$index, scope.row)">选择模板</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div slot="footer" style="text-align: right">
              <el-button @click="gateway = false"> 关闭 </el-button>
            </div>
          </el-dialog>
        </el-form-item>
        <el-form-item label="证书编码" style="margin-top: 40px; display: inline-block">
          <span style="color: red">请至少配置一项</span>
        </el-form-item>
      </el-form>
      <el-row :gutter="15" v-for="(item, index) in certRuleCodeParams" :key="index"
        style="margin-left: 120px; margin-bottom: 8px">
        <el-col :span="4" style="display: flex; flex-direction: column">
          <el-select v-model="item.ruleItem" placeholder="请选择" @change="certCodeHandleChange(item)">
            <el-option v-for="item in certCodeRules" :key="item.dictDataId" :label="item.dictDataName"
              :value="item.dictDataValue">
            </el-option>
          </el-select>
          <span style="color: #c9c9c9; font-size: 12px; margin-top: 3px">生成规则</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="item.ruleDigit" type="number" min="1" max="10"
            :disabled="item.ruleItem == 'nznyr' || item.ruleItem == 'gdzf'"></el-input>
          <span style="color: #c9c9c9; font-size: 12px">位数</span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="item.ruleValue"></el-input>
          <span style="color: #c9c9c9; font-size: 12px">内容示意</span>
        </el-col>
        <el-col :span="3">
          <i class="el-icon-delete" style="font-size: 35px; cursor: pointer" @click="delCodeRule(index)"></i>
        </el-col>
      </el-row>
      <i @click="addRules" class="el-icon-circle-plus-outline"
        style="font-size: 40px; margin-left: 120px; cursor: pointer">
      </i>
      <div style="margin-top: 20px; margin-left: 120px">
        实时示例：{{ certCodeEg }}
      </div>
      <div class="all-btn-box">
        <el-button @click="canceEditCert" style="margin-left: 120px; margin-top: 10px">取消</el-button>
        <el-button type="primary" @click="nextStep" style="margin-left: 20px; margin-top: 10px" v-if="flag">下一步
        </el-button>
        <el-button type="primary" @click="saveCert" style="margin-left: 20px; margin-top: 10px"
          :loading="saveBtnLoading" v-else>保存</el-button>
      </div>
    </div>
    <div v-if="flag && activeSteps === 1" style="width: 900px">
      <el-form :model="yearFormInfo" :rules="yearCertRules" ref="yearForm" class="requirement" label-width="100px"
        style="width: 400px; margin: 0 auto">
        <el-form-item label="学时要求" prop="classHour">
          <div style="display: flex; flex-direction: row">
            <el-input v-model="yearFormInfo.classHour" size="small" style="width: 200px; margin-right: 10px"
              type="number" min="0"></el-input>
            <span>学时</span>
          </div>
        </el-form-item>
        <el-form-item label="购课拿证间隔">
          <div style="display: flex; flex-direction: row">
            <el-input v-model="yearFormInfo.courseInterval" size="small" type="number"
              style="width: 200px; margin-right: 10px" min="0"></el-input>
            <span>天</span>
          </div>
        </el-form-item>
        <!-- <el-form-item label="审核" prop="isNeedAudit">
        <el-radio-group v-model="yearFormInfo.isNeedAudit">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="2">关闭</el-radio>
        </el-radio-group>
     </el-form-item> -->
      </el-form>
      <div style="
          width: 200px;
          margin: 30px auto;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        ">
        <el-button @click="goBack">上一步</el-button>
        <el-button type="primary" :loading="saveBtnLoading" @click="saveCert">保存</el-button>
      </div>
    </div>
  </d2-container>
</template>

<script>
/* eslint-disable */ 

import ResourceUploaderV2 from '@/components/resource-uploader/resource-uploader-v2.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    ResourceUploaderV2
  },
  data () {
    const isNum = (rule, value, callback) => {
      if (value <= 0) {
        return callback(new Error('请输入正整数'))
      } else {
        return callback()
      }
    }
    return {
      // 是否显示多个输入框
      inputcount: 1,
      nameOrg: '施教机构名称',
      tableData: [],
      gateway: false,
      activeSteps: 0,
      // 判断是否为年度证书
      flag: false,
      certTemplateType: 1,
      arr: [],
      saveBtnLoading: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      certRuleCodeParams: [
        {
          ruleItem: '', // 规则项
          ruleDigit: '', // 规则数
          ruleValue: '' // 规则值
        }
      ],
      form: {
        studentNameName: '',
        studentNameStatus: true,
        sexName: '',
        sexStatus: true,
        idCardNumName: '身份证号码',
        idCardNumStatus: true,
        orgNameName: '',
        orgNameStatus: true,
        purchaseTimeName: '',
        purchaseTimeStatus: true,
        certGiveTimeName: '',
        certGiveTimeStatus: true,
        cIdentifierName: 'No.',
        cIdentifierStatus: true,
        typesetting: 1,
        certType: '',
        certName: '',
        orgNameValue: '',
        orgNameValue2: '',
        status: 1,
        isNeedAudit: 2,
        templateContent: '',
        certBackUrl:
          'https://static.peixunyun.cn/证书封面_1649828859814_1652059536305.png', // 默认图片
        certOfficialUrl: '',
        certYear: '',
        certRuleCodeParams: [
          {
            ruleItem: '', // 规则项
            ruleDigit: '', // 规则数
            ruleValue: '' // 规则值
          }
        ],
        applicableCourse: 0
      },
      templateContentOptions: '',
      templateContentOptionsList: [],
      certCodeValue: null,
      certTypeValue: null,
      certTypeList: [],
      certCodeRules: [],
      // 年度证书扩展信息校验规则
      yearCertRules: {
        classHour: [
          { required: true, message: '请输入学时要求', trigger: 'blur' },
          { validator: isNum, mintrigger: 'change' }
        ]
        // isNeedAudit: [
        //   { required: true, message: '请选择是否开启审核', trigger: 'change' },
        //   { validator: isNum, trigger: 'change' }
        // ]
      },
      // 年度证书扩展信息
      yearFormInfo: {
        classHour: null,
        courseInterval: null
        // isNeedAudit: 1
      },
      // 普通证书校验规则
      rules: {
        certType: [
          { required: true, message: '请选择证书类型', trigger: 'blur' }
        ],
        certName: [
          { required: true, message: '请填写证书名称', trigger: 'blur' }
        ],
        orgNameValue: [
          { required: true, message: '请填写机构名称', trigger: 'blur' }
        ],
        orgNameValue2: [
          { required: true, message: '请填写机构名称', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择证书状态', trigger: 'blur' }
        ],
        isNeedAudit: [
          { required: true, message: '请选择是否需要审核', trigger: 'change' }
        ],
        templateContent: [
          { required: true, message: '请选择证模板内容', trigger: 'blur' }
        ],
        certBackUrl: [
          { required: true, message: '请上传证书背景图', trigger: 'blur' }
        ],
        certOfficialUrl: [
          { required: false, message: '请上传证书印章', trigger: 'blur' }
        ],
        certOfficialUrl2: [
          { required: false, message: '请上传证书印章', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getDicData()

    if (this.$route.query.certId) {
      const id = this.$route.query.certId
      this.getCertInfo(id)
    } else {
      this.getOrgName()
    }
    // console.log(this.rulesArr)
  },
  watch: {
    'form.certType' (val) {
      const certType = Number(val)
      if (certType === 3) {
        this.flag = true
      } else {
        this.flag = false
      }
    }
  },
  computed: {
    certCodeEg () {
      if (this.certRuleCodeParams) {
        const str = this.certRuleCodeParams
          .map((item) => {
            return '' + item.ruleValue
          })
          .join('')
        return str
      }
    }
  },
  methods: {
    numberbox (val) {
      console.log(val)
      if (val == 1) {
        this.form.certOfficialUrl2 = ''
        this.form.orgNameValue2 = ''
      }
    },
    ...mapActions('d2admin/page', ['close']),
    changeType (val) {
      if (val == 1) {
        // 横屏
        (this.form.certBackUrl =
          'https://static.peixunyun.cn/证书封面_1649828859814_1652059536305.png'), // 默认图片
        (this.certTemplateType = 1)
      } else if (val == 2) {
        this.form.certBackUrl =
          'https://static.peixunyun.cn/da104c95e5243113efd2d6863202532_1652067767225.jpg'
        this.certTemplateType = 2
      } else {
        this.form.certBackUrl =
          'https://static.peixunyun.cn/%E8%AF%81%E4%B9%A6%E5%B0%81%E9%9D%A2.png'
        this.certTemplateType = 3
      }
    },
    editClick (index, row) {
      // 选择模板库
      console.log('row.content1111', row)
      this.form.templateContent = row.templateContent
      this.gateway = false
    },
    templateContentChange () {
      const elInput = document.getElementById('templateConteId') // 根据id选择器选中对象
      var startPos = elInput.selectionStart // input 第0个字符到选中的字符
      var endPos = elInput.selectionEnd // 选中的字符到最后的字符
      const test = '$' + '{' + this.templateContentOptions + '}'
      if (startPos === undefined || endPos === undefined) return
      this.form.templateContent =
        this.form.templateContent.substring(0, startPos) +
        test +
        this.form.templateContent.substring(endPos)
      elInput.focus()
      // elInput.selectionStart = startPos + test.length;
      // elInput.selectionEnd = startPos + test.length;
      console.log(this.templateContentOptions)
    },
    certTypeHandleChange (value) {
      console.log(typeof value === 'string')
      // this.form.certType = value
      if (value == 4) {
        this.nameOrg = '发证机构名称'
      } else {
        this.nameOrg = '施教机构名称'
      }
    },
    certCodeHandleChange (item) {
      if (item.ruleItem === 'nznyr') {
        item.ruleDigit = '6'
      } else {
        item.ruleDigit = ''
      }
    },
    saveCert () {
      // if (this.certTemplateType == 3 && this.inputcount == 2 && !this.from,certOfficialUrl || !this.form.certOfficialUrl2) {
      //   this.$message({
      //     type: 'warning',
      //     title: '请上传证书印章'
      //   })
      // }
      if (this.form.certType != 3) {
        console.log(123456)
        const _this = this
        const formRef = this.flag ? 'yearForm' : 'form'
        _this.form = this.flag
          ? Object.assign(_this.form, _this.yearFormInfo)
          : _this.form
        _this.form.studentNameStatus =
          _this.form.studentNameStatus == true ? 1 : 2
        _this.form.sexStatus = _this.form.sexStatus == true ? 1 : 2
        _this.form.idCardNumStatus = _this.form.idCardNumStatus == true ? 1 : 2
        _this.form.orgNameStatus = _this.form.orgNameStatus == true ? 1 : 2
        _this.form.purchaseTimeStatus =
          _this.form.purchaseTimeStatus == true ? 1 : 2
        _this.form.certGiveTimeStatus =
          _this.form.certGiveTimeStatus == true ? 1 : 2
        _this.form.cIdentifierStatus =
          _this.form.cIdentifierStatus == true ? 1 : 2
        _this.form.cidentifierName = _this.form.cIdentifierName
        _this.form.cidentifierStatus =
          _this.form.cIdentifierStatus == true ? 1 : 2
        _this.$refs[formRef].validate((valid) => {
          if (valid) {
            console.log(valid)
            _this.saveBtnLoading = true
            _this.$delete(_this.form, 'certRuleCodeVOS')
            console.log(_this.form)
            _this.form.certRuleCodeParams = _this.certRuleCodeParams
            if (_this.$route.query.certId) {
              _this.form.certId = _this.$route.query.certId
            }
            console.log(_this.form)
            _this.$api
              .cert_edit({
                ..._this.form
              })
              .then((res) => {
                if (res.code === '1') {
                  if (_this.$route.query.certId) {
                    _this.$message.success('编辑证书模板成功!')
                    const tagName = _this.$route.fullPath
                    _this.close({ tagName }).then(() => {
                      _this.$router.push({ path: '/certificate/manage' })
                    })
                  } else {
                    _this.$message.success('新增证书模板成功!')
                    const tagName = _this.$route.fullPath
                    _this.close({ tagName }).then(() => {
                      _this.$router.push({ path: '/certificate/manage' })
                    })
                  }
                }
              })
              .finally(() => {
                _this.form.studentNameStatus =
                  _this.form.studentNameStatus == 1
                _this.form.sexStatus = _this.form.sexStatus == 1
                _this.form.idCardNumStatus =
                  _this.form.idCardNumStatus == 1
                _this.form.orgNameStatus =
                  _this.form.orgNameStatus == 1
                _this.form.purchaseTimeStatus =
                  _this.form.purchaseTimeStatus == 1
                _this.form.certGiveTimeStatus =
                  _this.form.certGiveTimeStatus == 1
                _this.form.cIdentifierStatus =
                  _this.form.cIdentifierStatus == 1
                _this.saveBtnLoading = false
              })
          }
        })
      } else {
        const tt = /^([0-9][0-9]*)$/.test(this.yearFormInfo.classHour)
        const cc = /^([0-9][0-9]*)$/.test(this.yearFormInfo.courseInterval)
        // console.log(tt,cc,this.yearFormInfo.classHour,this.yearFormInfo.courseInterval);
        if (tt && cc) {
          const _this = this
          const formRef = this.flag ? 'yearForm' : 'form'
          _this.form = this.flag
            ? Object.assign(_this.form, _this.yearFormInfo)
            : _this.form
          _this.form.studentNameStatus =
            _this.form.studentNameStatus == true ? 1 : 2
          _this.form.sexStatus = _this.form.sexStatus == true ? 1 : 2
          _this.form.idCardNumStatus = _this.form.idCardNumStatus == true ? 1 : 2
          _this.form.orgNameStatus = _this.form.orgNameStatus == true ? 1 : 2
          _this.form.purchaseTimeStatus =
            _this.form.purchaseTimeStatus == true ? 1 : 2
          _this.form.certGiveTimeStatus =
            _this.form.certGiveTimeStatus == true ? 1 : 2
          _this.form.cIdentifierStatus =
            _this.form.cIdentifierStatus == true ? 1 : 2
          _this.form.cidentifierName = _this.form.cIdentifierName
          _this.form.cidentifierStatus =
            _this.form.cIdentifierStatus == true ? 1 : 2
          _this.$refs[formRef].validate((valid) => {
            if (valid) {
              console.log(valid)
              _this.saveBtnLoading = true
              _this.$delete(_this.form, 'certRuleCodeVOS')
              console.log(_this.form)
              _this.form.certRuleCodeParams = _this.certRuleCodeParams
              if (_this.$route.query.certId) {
                _this.form.certId = _this.$route.query.certId
              }
              console.log(_this.form)
              _this.$api
                .cert_edit({
                  ..._this.form
                })
                .then((res) => {
                  if (res.code === '1') {
                    if (_this.$route.query.certId) {
                      _this.$message.success('编辑证书模板成功!')
                      const tagName = _this.$route.fullPath
                      _this.close({ tagName }).then(() => {
                        _this.$router.push({ path: '/certificate/manage' })
                      })
                    } else {
                      _this.$message.success('新增证书模板成功!')
                      const tagName = _this.$route.fullPath
                      _this.close({ tagName }).then(() => {
                        _this.$router.push({ path: '/certificate/manage' })
                      })
                    }
                  }
                })
                .finally(() => {
                  _this.form.studentNameStatus =
                    _this.form.studentNameStatus == 1
                  _this.form.sexStatus = _this.form.sexStatus == 1
                  _this.form.idCardNumStatus =
                    _this.form.idCardNumStatus == 1
                  _this.form.orgNameStatus =
                    _this.form.orgNameStatus == 1
                  _this.form.purchaseTimeStatus =
                    _this.form.purchaseTimeStatus == 1
                  _this.form.certGiveTimeStatus =
                    _this.form.certGiveTimeStatus == 1
                  _this.form.cIdentifierStatus =
                    _this.form.cIdentifierStatus == 1
                  _this.saveBtnLoading = false
                })
            }
          })
        } else {
          this.$message.warning('学时要求必须为正整数且购课拿证间隔必须为整数')
        }
      }
    },
    addRules () {
      this.certRuleCodeParams.push({
        ruleItem: '', // 规则项
        ruleDigit: '', // 规则数
        ruleValue: '' // 规则值
      })
    },
    async getDicData () {
      const { data: res0 } = await this.$api.GET_CERT_LIST({
        certType: 1
      })
      this.tableData = res0
      console.log('tableData', this.tableData)

      const { data: res1 } = await this.$api.SETTING_GET_DICT({
        typeCode: 'cert_type'
      })
      this.certTypeList = res1

      const { data: res2 } = await this.$api.SETTING_GET_DICT({
        typeCode: 'cert_code_rules'
      })
      this.certCodeRules = res2

      const { data: res3 } = await this.$api.SETTING_GET_DICT({
        typeCode: 'templateContent'
      })
      this.templateContentOptionsList = res3
    },
    getOrgName () {
      this.$api.GET_ORG_NAME({}).then((res) => {
        console.log('orgNameValue哈哈', res)
        this.form.orgNameValue = res.data.orgFullName
      })
    },
    async getCertInfo (certId) {
      const _this = this
      const { data: res } = await _this.$api.echo_cert_info({ certId: certId })
      console.log(res)
      _this.form = res
      if (_this.form.certOfficialUrl && _this.form.certOfficialUrl2 || _this.form.orgNameValue2) {
        this.inputcount = 2
      }
      _this.form.certType = String(_this.form.certType)
      if (_this.form.certType == 3) {
        _this.yearFormInfo.classHour = res.classHour
        _this.yearFormInfo.courseInterval = res.courseInterval
        // _this.yearFormInfo.isNeedAudit = res.isNeedAudit
        console.log(res.certOfficialUrl.split(',')[0])
      }

      if (_this.form.typesetting == 1) {
        // 横屏
        (this.form.certBackUrl =
          'https://static.peixunyun.cn/证书封面_1649828859814_1652059536305.png'), // 默认图片
        (this.certTemplateType = 1)
      } else if (_this.form.typesetting == 2) {
        this.form.certBackUrl =
          'https://static.peixunyun.cn/da104c95e5243113efd2d6863202532_1652067767225.jpg'
        this.certTemplateType = 2
      } else {
        this.form.certBackUrl =
          'https://static.peixunyun.cn/%E8%AF%81%E4%B9%A6%E5%B0%81%E9%9D%A2.png'
        this.certTemplateType = 3
      }

      _this.form.certOfficialUrl = _this.form.certOfficialUrl.split(',')[0]
      _this.certRuleCodeParams = res.certRuleCodeVOS
      console.log(this.rulesArr)
    },
    delCodeRule (index) {
      if (this.certRuleCodeParams) {
        if (this.certRuleCodeParams.length > 1) {
          this.certRuleCodeParams.splice(index, 1)
        } else {
          this.$message.error('请至少保留一项配置规则')
        }
      }
    },
    nextStep () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.certRuleCodeParams[0].ruleItem) {
            this.activeSteps += 1
          } else {
            this.$message.error('证书编码规则有误！')
          }
        }
      })
    },
    goBack () {
      this.activeSteps -= 1
    },
    canceEditCert () {
      const tagName = this.$route.fullPath
      this.close({ tagName }).then(() => {
        this.$router.push({ path: '/certificate/manage' })
      })
    },
    uploadComplete1 () {
      this.dialogVisible1 = false
    },
    uploadComplete2 () {
      this.dialogVisible2 = false
    },
    uploadComplete3 () {
      this.dialogVisible3 = false
    },
    uploadComplete4 () {
      this.dialogVisible4 = false
    }
  }
}
</script>

<style lang="scss">
.numberbox{
  width: 82px;
  margin-left: 20px;
  .el-input__inner {
    width: 82px;
    padding: 0;
  }
}
.sealone {
  max-width: 150px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  li {
    max-width: 100px;
    margin: 0 !important;
    text-align: center;
  }
  img{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -32px;
    margin-top: -32px;
    width: 65px;
    height: 65px;
    z-index: -1;
  }
}
::v-deep .requirement {
  .el-form-item {
    .el-form-item__label {
      padding: 0 10px 0 0;
    }
  }
}
.tips {
  width: 522px;
  text-align: right;
  color: rgb(136, 136, 136);
  font-size: 12px;
}
.all-btn-box {
  width: 642px;
  text-align: right;
}
.certInformation-box {
  position: relative;
  .cert-template-box {
    position: absolute;
    right: 0px;
    top: 50%;
    width: 500px;
    height: 300px;
    margin-top: -226px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .title {
      width: 100%;
      text-align: center;
      font-weight: bold;
    }
    .unload-box {
      width: 100%;
      text-align: center;
      /* margin-top: 10px; */
      .upload-btn {
        display: inline-block;
        &:first-of-type {
          margin-right: 40px;
        }
      }
    }
    .my-cert-template-dingZhi {
      width: 512px;
      height: 365px;
      position: relative;
      color: #606266;
      background-image: url(../../assets/images/gaoShiZhengShu.png);
      background-size: 100%;
      background-repeat: no-repeat;
      padding-top: 44px;
      z-index: 1;
      .cert-name {
        text-align: center;
        color: #4A6E82;
        font-weight: bold;
        height: 39px;
        font-size: 27px;
      }
      .img-erweima {
        position: absolute;
        top: 0;
        left: 0;
        width: 54px;
        height: 52px;
        img {
          width: 54px;
          height: 52px;
        }
      }
      .img-chapter {
        position: absolute;
        width: 50px;
        height: 50px;
        bottom: 104px;
        left: 50%;
        margin-left: -25px;
        z-index: 1;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .cert-preview {
        padding: 0 78px;
        font-size: 12px;
        li {
          line-height: 16px;
          margin-bottom: 8px;
          span {
            font-weight: bold;
          }
        }
      }
    }
    .my-cert-template-shu {
      width: 400px;
      height: 574px;
      position: relative;
      color: #606266;
      background-image: url(../../assets/images/cert_shu_bg.png);
      background-size: 400px 574px;
      background-repeat: no-repeat;
      padding-top: 88px;
      .cert-name {
        text-align: center;
        color: #333;
        font-weight: bold;
        margin-bottom: 15px;
        font-size: 14px;
      }
      .img-erweima {
        width: 100% !important;
        text-align: center;
        width: 90px;
        height: 90px;
        img {
          width: 90px;
          height: 90px;
          border: 10px solid #fff;
        }
      }
      .img-chapter {
        position: absolute;
        width: 50px;
        height: 50px;
        bottom: 104px;
        left: 50%;
        margin-left: -25px;
        z-index: 1;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .cert-preview {
        padding: 0 68px;
        font-size: 12px;
        li {
          line-height: 16px;
          margin-bottom: 8px;
          span {
            font-weight: bold;
          }
        }
      }
      // .cert-preview-bottom {
      //   /* //margin-top: 20px; */
      // }
    }
    .my-cert-template-heng {
      width: 400px;
      height: 430px;
      background-image: url(../../assets/images/cert_heng_bg.jpg);
      background-size: 400px 430px;
      background-repeat: no-repeat;
      padding-top: 66px;
      .img-erweima {
        position: absolute;
        right: 71px;
        width: 50px;
        height: 50px;
        bottom: -100px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .img-chapter {
        position: absolute;
        right: 143px;
        width: 50px;
        height: 50px;
        bottom: -100px;
        img {
          width: 50px;
          height: 50px;
        }
      }
      .cert-name {
        text-align: center;
        color: #333;
        font-weight: bold;
        /* margin-bottom: 15px; */
        font-size: 14px;
      }
      .cert-preview {
        padding: 0 84px;
        font-size: 12px;
        color: #606266;
        li {
          line-height: 16px;
          margin-bottom: 8px;
          span {
            font-weight: bold;
          }
        }
      }
      // .cert-preview-bottom {
      //   /* margin-top: 20px; */
      // }
    }
    .backgroundSize {
      background-size: 400px 340px;
    }
  }
  .certInformation {
    color: #606266;
    display: flex;
    padding: 20px 0 0 10px;
    background: #f5f7fa;
    width: 522px;
    .right-box {
      .input-box {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        .text {
          width: 110px;
        }
        .item {
          margin: 0 60px 0 30px;
        }
        .el-input--small .el-input__inner {
          width: 176px;
        }
      }
    }
  }
}
.steps-box {
  margin-bottom: 20px;
  width: 900px;
  .is-simple {
    margin: auto;
  }
}
</style>
