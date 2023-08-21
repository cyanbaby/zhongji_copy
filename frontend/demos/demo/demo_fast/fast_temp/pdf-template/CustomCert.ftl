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

        h2,
        p {
            margin: 0;
        }
    </style>
</head>

<body>
<div class="outer" style=" position: relative;
	width: 690px;
	height: 500px;">
    <img src="${(certBackUrl)! ''}" alt=""
         style="position:absolute; top: 0; width: 690px;height: 500px;z-index:-10"></img>
    <div class="all" style="padding: 68px 100px 0 100px;height: 100%;">
        <h2 class="text-center" style="text-align: center;color:  #4A6E82;font-size: 30px;
				height: 45px;letter-spacing:20px">
            ${certName}
        </h2>
        <div class="containEnum">
            <p style="text-align: center;height: 43px;">
                <img src="https://static.peixunyun.cn/%E8%AF%81%E4%B9%A6%E5%88%87%E5%9B%BE.png" alt=""
                     style="width: 450px; height: 7px"></img>
            </p>
            <p style="text-align:right;height: 30px;">
						<span style="font-size:15px;color:#23343E;">
                            <#if (cIdentifierName??)>
                                ${(cIdentifierName)}：<#if (cIdentifier??)>${cIdentifier}</#if>
                            </#if></span>
            </p>
            <p
                    style="text-indent: 2em;  line-height: 1.2em; font-size: 17px;color: #23343E;margin-bottom: 19px;font-weight: 400;">
                <#if (certificateContent??)>${(certificateContent)}</#if>
            </p>
            <p style="text-indent: 2em;line-height: 1.2em;">
						<span style="font-size:17px;font-weight: 400;color: #23343E;">
							<#if (idCardNumName??)>
                                ${(idCardNumName)}<#--身份证号码--><#if (idCardNum??)>
                            <#--身份证号码-->
                                :${(idCardNum)}</#if>
                            </#if></span>
            </p>

        </div>
        <img style="width:  82px;height:  82px;z-index:10;position: absolute;left: 20%;bottom: 14%; "
             src="${scanUrl}"></img>
        <div style="position: absolute;  right:14%; bottom: 16%; padding-top: 38px;">
            <p style="text-align:center;margin-bottom: 9px; ">
						<span style="font-size:15px;color: #23343E;font-weight: 400;">
							<#if (orgNameName??)>
                                ${(orgNameValue)}
                            </#if></span>
            </p>
            <p style="text-align:center;">
						<span style="font-size:15px;color: #23343E;font-weight: 400;">
                        <#if (certGiveTimeName??)>
                            ${(openingDate)}
                        </#if></span>
            </p>
        </div>
        <#if (orgNameValue2??)><#if (orgNameName??)>
            <div style="position: absolute;  right:42%; bottom: 16%; padding-top: 38px;">
                <p style="text-align:center;margin-bottom: 9px; ">
						<span style="font-size:15px;color: #23343E;font-weight: 400;">
							<#if (orgNameName??)>
                                ${(orgNameValue2)}
                            </#if></span>
                </p>
                <p style="text-align:center;">
						<span style="font-size:15px;color: #23343E;font-weight: 400;">
                        <#if (certGiveTimeName??)>
                            ${(openingDate)}
                        </#if></span>
                </p>
            </div>
        </#if></#if>
        <#if (certOfficialUrl1??)>
            <img src="${certOfficialUrl1}" alt=""
                 style="width: 98px;height: 98px;position: absolute;right:20%; bottom: 12%; z-index: 1000;"></img>
        </#if>
        <#if (certOfficialUrl2??)>
            <img src="${certOfficialUrl2}" alt=""
                 style="width: 98px;height: 98px;position: absolute; right:44%; bottom: 12%; z-index: 1000;"></img>
        </#if>

    </div>
</div>
</body>

</html>