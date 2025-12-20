import client from "./client";

export const getAboutMeContent = () =>
  client.get("/api/aboutMe");