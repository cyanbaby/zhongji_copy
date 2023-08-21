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
<section class="outer" style="position: absolute;width: 600px;height: 780px;margin-left:-285px;left: 50%">
    <img src="${(certBackUrl)! ''}" alt="" style="position:absolute;width: 600px;height: 780px;z-index:-10"/>
    <section class="all" style="position:absolute; width: 600px; height: 780px;text-align: center">
        <h1 class="text-center"
            style="padding-top: 115px;width: 74%; padding-left: 78px;color: rgb(0,0,0);text-align: center;font-size:26px">
            ${certName}
        </h1>
        <section class="containEnum" style="margin: 0 auto;width: 60%;text-align: center;">
            <#if (studentNameName??)>
                <p style="text-align: center;">
                            <span style="font-size:18px;font-weight:bold">
                            <#--姓名-->
                                <#if (stuName??)><b>${(stuName)}</b></#if></span>
                </p>
            </#if>
            <p style="text-indent: 2em; margin-top: 10px; margin: 0 auto;width: 78%;line-height: 25px;  font-size: 16px;text-align: left">
                <#if (certificateContent??)>${(certificateContent)}</#if>
            </p>
            <#if (cIdentifierName??)>
                <p style="text-align: center;margin: 3px;padding: 3px">
                            <span style="font-size:16px">${(cIdentifierName)}
                                <#--证书编码-->
                                ：<#if (cIdentifier??)><b>${cIdentifier}</b></#if></span>
                </p>
            </#if>
            <p style="text-align: center;margin: 3px;padding: 3px;margin: 0"><#if (scanUrl??)>
                    <img class="qrcode" style="width: 90px;height: 90px;z-index:10" src="${scanUrl}"></img>
                </#if>
            </p>
            <#if (orgNameName??)>
                <p style="text-align: center;margin: 3px;padding: 3px;margin: 0">
                            <span style="font-size:16px;margin-top: 10px">
                            <#--施教机构-->
                                <b>${(orgNameValue)}</b></span>
                </p>
            </#if>
            <#if (certGiveTimeName??)>
                <p style="text-align: center;margin: 3px;padding: 3px;margin: 0">
                            <span style="font-size:16px">
                            <#--发证时间-->
                                <#if (certGiveTime??)><b>${(certGiveTime)}</b></#if></span>
                </p>
            </#if>
            <#if (certOfficialUrl1??)><img class="zang1" style="width: 60px;height: 60px;border-radius:50%;"
                                           src="${(certOfficialUrl1)}"></img></#if>
            <#if (certOfficialUrl2??)><img class="zang2" style="width: 60px;height: 60px;border-radius:50%;"
                                           src="${(certOfficialUrl2)}"></img></#if>
            <#if (certOfficialUrl3??)><img class="zang2" style="width: 60px;height: 60px;border-radius:50%;"
                                           src="${(certOfficialUrl3)}"></img></#if>
        </section>

        <#--<#if (scanUrl??)>-->
        <#--&lt;#&ndash;<img  class="qrcode" style="position: absolute;width: 125px;height: 125px;bottom: 135px;right: 119px;z-index:10" src="${scanUrl}"></img>&ndash;&gt;-->
        <#--&lt;#&ndash;            <img  class="qrcode" style="position: absolute;width: 125px;height: 125px;bottom: 135px;right: 119px;border:red 2px solid;z-index:10" src="34831893.jpg"></img>&ndash;&gt;-->
        <#--&lt;#&ndash;            <img  class="qrcode" style="position: absolute;width: 125px;height: 125px;bottom: 135px;right: 119px;border:red 2px solid;z-index:10" src="../images/QQ图片20211010233120.png"></img>&ndash;&gt;&ndash;&gt;-->
        <#--</#if>-->
    </section>
</section>
</body>
</html>
