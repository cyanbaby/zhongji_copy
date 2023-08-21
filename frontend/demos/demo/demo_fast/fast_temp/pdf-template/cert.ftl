<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${certName}</title>
    <style>
        body {
            font-family: SimHei;
        }
    </style>
</head>

<body>
<section class="outer" style="position: absolute;width: 750px;height: 595px;margin-left:-50px;left: 27px;">
    <img src="${(certBackUrl)! ''}" alt="" style="position:absolute;top: -35px;width: 750px;height: 595px;z-index:-10"/>
    <section class="all" style="position:absolute; width: 750px; height: 595px"><br/>
        <h2 class="text-center"
            style="padding-top: 50px; color: rgb(0,0,0);padding-left: 158px;width: 438px;text-align: center;overflow: hidden;">
            ${certName}
        </h2>
        <section class="containEnum" style="position: absolute;padding-left: 158px; margin-top: 0px;">

            <#if (studentNameName??)>
                <p style="margin: 3px;padding: 3px">
                            <span style="font-size:15px">${(studentNameName)}
                                <#--姓名-->
                                :<#if (stuName??)>${(stuName)}</#if></span>
                </p>
            </#if>

            <#if (sexName??)>
                <p style="margin: 3px;padding: 3px">
                            <span style="font-size:15px;">${(sexName)}
                                <#--性别-->
                                :${(sex)}</span>
                </p>
            </#if>

            <#if (idCardNumName??)>
                <p style="margin: 3px;padding: 3px">
                    <#if (idCardNum??)><span style="font-size:15px;">${(idCardNumName)}
                    <#--身份证号码-->
                        :${(idCardNum)}</span></#if>
                </p>
            </#if>

            <p style="text-indent: 2em; margin-top: 10px; width: 450px; line-height: 1.2em; font-size: 17px;">
                <#if (certificateContent??)>${(certificateContent)}</#if>
            </p>

            <p style="margin: 3px;padding: 3px">
                <#if (orgNameName??)>
                    <span style="font-size:15px;margin-top: 10px">${(orgNameName)}
                        <#--施教机构-->
                                :${(orgNameValue)}</span>
                </#if>
            </p>


            <#if (cIdentifierName??)>
                <p style="margin: 3px;padding: 3px">
                            <span style="font-size:15px">${(cIdentifierName)}
                                <#--证书编码-->
                                :<#if (cIdentifier??)>${cIdentifier}</#if></span>
                </p>
            </#if>

            <#if (purchaseTimeName??)>
                <p style="margin: 3px;padding: 3px">
                            <span style="font-size:15px">${(purchaseTimeName)}
                                <#--购课时间-->
                                :<#if (purchaseTime??)>${(purchaseTime)}</#if></span>
                </p>
            </#if>

            <#if (certGiveTimeName??)>
                <p style="margin: 3px;padding: 3px">
                            <span style="font-size:15px">${(certGiveTimeName)}
                                <#--发证时间-->
                                :<#if (certGiveTime??)>${(certGiveTime)}</#if></span>
                </p>
            </#if>
        </section>
        <#if (certOfficialUrl1??)><img class="zang1"
                                       style="position: absolute;width: 72px;height: 72px;bottom: 150px;border-radius:50%;left: 435px"
                                       src="${(certOfficialUrl1)}"></img></#if>
        <#if (certOfficialUrl2??)><img class="zang2"
                                       style="position: absolute;width: 72px;height: 72px;bottom: 150px;border-radius:50%;left: 435px"
                                       src="${(certOfficialUrl2)}"></img></#if>
        <#if (certOfficialUrl3??)><img class="zang2"
                                       style="position: absolute;width: 72px;height: 72px;bottom: 150px;border-radius:50%;left: 435px"
                                       src="${(certOfficialUrl3)}"></img></#if>
        <#if (scanUrl??)>
            <img class="" style="position: absolute;width:  92px;height:  92px;bottom: 135px;right: 119px;z-index:10"
                 src="${scanUrl}"></img>
        <#--            <img  class="qrcode" style="position: absolute;width: 125px;height: 125px;bottom: 135px;right: 119px;border:red 2px solid;z-index:10" src="34831893.jpg"></img>-->
        <#--            <img  class="qrcode" style="position: absolute;width: 125px;height: 125px;bottom: 135px;right: 119px;border:red 2px solid;z-index:10" src="../images/QQ图片20211010233120.png"></img>&ndash;&gt;-->
        </#if>
    </section>
</section>
</body>
</html>
