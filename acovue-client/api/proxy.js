export const config = {
  api: {
    bodyParser: false,
  },
};


export default async function handler(req, res) {
  // Vercel 환경변수에서 EC2 주소 가져오기 (브라우저엔 노출 X)
  const backendUrl = process.env.EC2_API_URL;
  if (!backendUrl) {
    return res.status(500).json({ message: "EC2_API_URL 환경변수가 설정되지 않았습니다." });
  }

  const rawPath = req.query.path || "";
  const path = Array.isArray(rawPath) ? rawPath.join("/") : rawPath;
  const params = new URLSearchParams(req.query);
  params.delete("path");
  const query = params.toString();
  const targetUrl = `${backendUrl}/api/${path}${query ? `?${query}` : ""}`;

  console.log("프록시가 요청할 백엔드 주소:", targetUrl);

  try {
    const options = {
      method: req.method,
      headers: { ...req.headers },
    };
    
    // 호스트 헤더가 꼬이지 않도록 Vercel 쪽 정보는 살짝 삭제
    delete options.headers.host;
    delete options.headers.referer;
    delete options.headers.connection;
    delete options.headers["content-length"];

    // POST 요청 등 데이터(body)가 있을 때도 그대로 전달되게 처리
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      options.body = req;
      options.duplex = "half";
    }

    // Vercel 서버가 EC2로 대신 통신
    const response = await fetch(targetUrl, options);
    const data = await response.text(); 
    res.setHeader("x-proxy-target", targetUrl);
    res.setHeader("Cache-Control", "no-store");
    
    // EC2에서 받은 데이터를 리액트로 전달
    try {
        res.status(response.status).json(JSON.parse(data));
    } catch(e) {
        res.status(response.status).send(data);
    }
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ message: "서버리스 프록시 통신 에러 발생!" });
  }
}
