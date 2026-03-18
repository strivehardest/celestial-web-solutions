export async function submitToIndexNow(urls) {
  const key = "485381d08fe442928caf9239a8db765a";
  const host = "celestialwebsolutions.net";

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urls,
    }),
  });

  console.log("IndexNow status:", res.status);
  return res.status;
}
