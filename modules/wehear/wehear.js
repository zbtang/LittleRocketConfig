let body = $response.body;
const url = $request.url;

try {
  if (url.includes("/pay/memberinfo")) {
    const jsonBody = JSON.parse(body);
    // 解锁会员状态
    jsonBody.isMember = 1;
    jsonBody.isAutoRenewable = 1;
    jsonBody.startTime = Math.floor(Date.now() / 1000) - 86400;
    jsonBody.endTime = Math.floor(Date.now() / 1000) + 31536000; // 一年后过期
    jsonBody.isExperienceMember = false;
    jsonBody.expiresIn = 31536000;
    jsonBody.subscriptionDesc = "VIP会员 · 无限畅听";
    jsonBody.subscriptionButtonLabel = "已开通会员";
    jsonBody.hasPromoRight = false;
    // 体验卡设置
    jsonBody.experienceCard.experienceCardNum = 99;
    jsonBody.experienceCard.waitReceiveCardNum = 0;
    jsonBody.experienceCard.hasSendCardNum = 99;
    body = JSON.stringify(jsonBody);
  } else if (url.includes("/mine")) {
    const jsonBody = JSON.parse(body);
    // 修改时长钱包信息
    jsonBody.timeWalletInfo.label = "VIP会员 · 无限畅听时长";
    jsonBody.timeWalletInfo.remainSeconds = 999999;
    // 修改订阅信息
    jsonBody.subscriptionInfo.desc = "VIP会员 · 无限畅听";
    jsonBody.subscriptionInfo.buttonText = "已开通会员";
    body = JSON.stringify(jsonBody);
  }
} catch (error) {
  console.error(error);
}

$done({ body });