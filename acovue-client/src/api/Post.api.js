import client from "./client";

// 포스트 리스트 조회
export const getPostList = (limit, page, type) =>
  client.get(`/api/post/find/all?limit=${limit}&page=${page}&type=${type}`);

// 포스트 상세 조회
export const getPostDetail = (postId) =>
  client.get(`/api/post/find/${postId}`);

// 댓글 조회
export const getCommentDetail = (postId) =>
  client.get(`/api/post/comment/find/${postId}`);

// 포스트 좋아요 조회
export const getLikePost = (postSeq) =>
  client.get(`/api/like/post/${postSeq}`);

// 댓글 좋아요 조회
export const getLikeComment = (commentSeq) =>
  client.get(`/api/like/comment/${commentSeq}`);

// 포스트 삭제
export const deletePostDetail = (postId) =>
  client.delete(`/api/post/delete/${postId}`);

// 포스트 좋아요 토글
export const postPostLikeToggle = (postSeq, userSeq) =>
  client.post(`/api/like/post/${postSeq}/${userSeq}`);

// 댓글 삭제
export const deleteCommentDetail = (postId, commentSeq) =>
  client.delete(`/api/post/comment/update/${postId}/${commentSeq}`);

// 댓글 좋아요 토글
export const postCommentLikeToggle = (commentSeq, userSeq) =>
  client.post(`/api/like/comment/${commentSeq}/${userSeq}`);
