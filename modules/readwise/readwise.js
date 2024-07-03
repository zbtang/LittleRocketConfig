let body = $response.body;
const url = $request.url;

try {
  if (url.includes("/api/profile_details")) {
    const jsonBody = JSON.parse(body);
    jsonBody.is_staff = true;
    jsonBody.subscription.product = "full";
    jsonBody.subscription.trial_days_left = 100;
    jsonBody.subscription.was_previously_subscribed = true;
    jsonBody.subscription.subscribed_via_apple = true;
    body = JSON.stringify(jsonBody);
  }
} catch (error) {
  console.error(error);
}

$done({ body });
