let body = $response.body;
const url = $request.url;

try {
  if (url.includes("/time/getconfig")) {
    const jsonBody = JSON.parse(body);
    jsonBody.httpdns_switch = false;
    jsonBody.maidian_interval = 99999999;
    jsonBody.httpdns_hostnames.forEach((hostname) => {
      hostname.ip = ["service.hitup.cn"];
    });
    body = JSON.stringify(jsonBody);
  } else if (url.includes("/api/v1/sell/user/privilege")) {
    const jsonBody = JSON.parse(body);
    Object.keys(jsonBody.data.privileges).forEach((privilege) => {
      let p = jsonBody.data.privileges[privilege];
      p.count = 10;
      p.status = 1;
      p.text = "已开通";
      p.rest_days = 10;
      p.expired_days = 10;
      p.buy_status = 1;

      switch (privilege) {
        case "likeme":
          p.text = "已开通谁喜欢我";
          break;
        case "ssvip":
          p.text = "已开通黑钻特权";
          break;
        case "svip":
          p.text = "已开通SVIP特权";
          break;
        case "vip":
          p.text = "已开通VIP特权";
          break;
      }
    });
    body = JSON.stringify(jsonBody);
  } else if (url.includes("/api/v1/social/super_exposure/stats")) {
    const jsonBody = JSON.parse(body);
    jsonBody.data.exposure_num = 10;
    jsonBody.data.real_num = 10;
    jsonBody.data.exposure_other_count = 10;
    jsonBody.data.like_me_proportion = 90;
    body = JSON.stringify(jsonBody);
  } else if (url.includes("/api/v1/social/regret_like/status")) {
    const jsonBody = JSON.parse(body);
    jsonBody.data.enable = 1;
    jsonBody.data.left = 10;
    body = JSON.stringify(jsonBody);
  } else if (url.includes("/api/v1/superlike/status")) {
    const jsonBody = JSON.parse(body);
    jsonBody.data.enable = 1;
    jsonBody.data.left = 10;
    jsonBody.data.trigger_real = true;
    jsonBody.data.exists_free = true;
    jsonBody.data.super_like_privilege = true;
    jsonBody.data.note_count = 10;
    body = JSON.stringify(jsonBody);
  }
} catch (error) {
  console.error(error);
}

$done({ body });
