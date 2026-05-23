import client from "./Client";

// 포스트 리스트 조회
export const getPostList = (limit, page, type, communityCategory) => {
  const params = new URLSearchParams();

  if (limit) params.set("limit", limit);
  if (page) params.set("page", page);
  if (type) params.set("type", type);
  if (communityCategory) params.set("communityCategory", communityCategory);

  return client.get(`/api/post/find/all?${params.toString()}`);
};

// 포스트 상세 조회
export const getPostDetail = (postId) =>
  client.get(`/api/post/find/${postId}`);

// 포스트 삭제
export const deletePostDetail = (postId) =>
  client.delete(`/api/post/delete/${postId}`);

// 포스트 등록
export const postCreatePost = (postData) => {
  return client.post(`/api/post/create`, postData);
};

// 포스트 수정
export const putUpdatePost = (postId, data) => {
  return client.put(`/api/post/update/${postId}`, data);
};

// 포스트 삭제
export const deletePost = (postId) => {
  return client.delete(`/api/post/delete/${postId}`);
}

// 이미지 업로드(S3)
export const postImageUpload = (formData) => {
  return client.post(`/api/post/image`, formData);
};
