import client from "./client";

export const getAboutMeContent = () =>
  client.get("/api/aboutMe");

export const putAboutMeContent = (data) => {
  return client.put(`/api/aboutMe/update`, data)
}