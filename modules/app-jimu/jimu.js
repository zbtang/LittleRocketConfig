let body = $response.body;
const url = $request.url;

try {
  const jsonBody = JSON.parse(body);
  if (url.includes("/time/getconfig")) {
    jsonBody.httpdns_switch = false;
    jsonBody.maidian_interval = 99999999;
    jsonBody.httpdns_hostnames.forEach((hostname) => {
      hostname.ip = ["service.hitup.cn"];
    });
  } else if (url.includes("/api/v1/sell/user/privilege")) {
    // 修改特权字段
    for (let privilege in jsonBody.data.privileges) {
      jsonBody.data.privileges[privilege].count = 10;
      jsonBody.data.privileges[privilege].status = 1;
      jsonBody.data.privileges[privilege].text = "已开通";
      jsonBody.data.privileges[privilege].rest_days = 10;
      jsonBody.data.privileges[privilege].expired_days = 10;
      jsonBody.data.privileges[privilege].buy_status = 1;

      // 针对特定特权的文本描述进行更改
      if (privilege === "likeme") {
        jsonBody.data.privileges[privilege].text = "已开通谁喜欢我";
      } else if (privilege === "ssvip") {
        jsonBody.data.privileges[privilege].text = "已开通黑钻特权";
      } else if (privilege === "svip") {
        jsonBody.data.privileges[privilege].text = "已开通SVIP特权";
      } else if (privilege === "vip") {
        jsonBody.data.privileges[privilege].text = "已开通VIP特权";
      }
    }
  } else if (url.includes("/api/v1/social/super_exposure/stats")) {
    jsonBody.data.exposure_num = 10;
    // jsonBody.data.exposure_status = 1;
    jsonBody.data.real_num = 10;
    jsonBody.data.exposure_other_count = 10;
    jsonBody.data.like_me_proportion = 90;
  } else if (url.includes("/api/v1/social/regret_like/status")) {
    jsonBody.data.enable = 1;
    jsonBody.data.left = 10;
  } else if (url.includes("/api/v1/superlike/status")) {
    jsonBody.data.enable = 1;
    jsonBody.data.left = 10;
    jsonBody.data.trigger_real = true;
    jsonBody.data.exists_free = true;
    jsonBody.data.super_like_privilege = true;
    jsonBody.data.note_count = 10;
  }
  body = JSON.stringify(jsonBody);
} catch (error) {
  console.error(error);
}
$done({ body });