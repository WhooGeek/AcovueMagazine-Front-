import React, { useEffect, useState } from 'react';
// 1. API 함수 import 추가
import { getMypageContent, putUpdateNickname } from '../../api/Mypage.api'; 
import { putLogout } from "../../api/Login.api";
import { getApiErrorMessage } from "../../api/ApiError";
import LoadingSkeleton from "../../components/Common/LoadingSkeleton";
import PageState from "../../components/Common/PageState";
import './Mypage.css';

export default function Mypage() {
  const [member, setMember] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // ⭐️ 2. 닉네임 수정 관련 State 추가
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [editNickname, setEditNickname] = useState(""); // 입력 중인 닉네임

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await getMypageContent(); 
        const memberData = response.data?.data || response.data; 
        setMember(memberData);
      } catch (error) {
        console.error("정보 로딩 실패:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMyInfo();
  }, []);

  // ⭐️ 3. 닉네임 수정 모드 켜기
  const startEditing = () => {
    setEditNickname(member.memberNickname); // 현재 닉네임을 인풋에 채워넣기
    setIsEditing(true); // 수정 모드 ON
  };

  // ⭐️ 4. 닉네임 변경 요청 보내기
  const handleUpdateNickname = async () => {
    if (!editNickname.trim()) {
      alert("닉네임을 입력해주세요.");
      return;
    }

    try {
      // API 호출 (네가 만든 putUpdateNickname 사용)
      await putUpdateNickname(editNickname);
      
      // 성공하면 화면(State)도 업데이트 (새로고침 없이 반영)
      setMember({ ...member, memberNickname: editNickname });
      setIsEditing(false); // 수정 모드 OFF
      alert("닉네임이 변경되었습니다.");
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
      alert(getApiErrorMessage(error, "닉네임 변경에 실패했습니다."));
    }
  };

  if (loading) return <LoadingSkeleton variant="detail" />;

  if (error || !member) {
    return (
      <PageState
        title="마이페이지 정보를 불러오지 못했습니다"
        description="로그인 상태를 확인하고 다시 시도해주세요."
        actionLabel="다시 시도"
        onAction={() => window.location.reload()}
      />
    );
  }

  const joinDate = member.regDate ? new Date(member.regDate).toLocaleDateString() : '-';

  return (
    <div className="mypage-wrapper">
      <div className="mypage-card">
        <h2 className="mypage-title">마이페이지</h2>
        
        <div className="profile-image-section">
          <div className="profile-avatar">
            {member.memberName ? member.memberName.charAt(0) : 'U'}
          </div>
        </div>

        <div className="profile-info-list">
          
          <div className="info-item">
            <span className="info-label">이름</span>
            <span className="info-value">{member.memberName}</span>
          </div>

          {/* ⭐️ 5. 닉네임 부분: 수정 모드에 따라 다르게 보여주기 */}
          <div className="info-item">
            <span className="info-label">닉네임</span>
            
            {isEditing ? (
              // [수정 모드일 때] 인풋박스 + 저장/취소 버튼
              <div className="nickname-edit-box">
                <input 
                  type="text" 
                  className="input-nickname"
                  value={editNickname}
                  onChange={(e) => setEditNickname(e.target.value)}
                />
                <button className="btn-save-mini" onClick={handleUpdateNickname}>저장</button>
                <button className="btn-cancel-mini" onClick={() => setIsEditing(false)}>취소</button>
              </div>
            ) : (
              // [보기 모드일 때] 텍스트 + 수정 버튼
              <div className="nickname-view-box">
                <span className="info-value">{member.memberNickname}</span>
                <button className="btn-edit-mini" onClick={startEditing}>변경</button>
              </div>
            )}
          </div>

          <div className="info-item">
            <span className="info-label">이메일</span>
            <span className="info-value">{member.memberEmail}</span>
            {member.provider && (
              <span className={`provider-badge ${member.provider}`}>
                {member.provider}
              </span>
            )}
          </div>

          <div className="info-item">
            <span className="info-label">가입일</span>
            <span className="info-value">{joinDate}</span>
          </div>
        </div>

        <div className="mypage-actions">
          {!member.provider && (
            <button className="btn-change-pw" onClick={() => alert("비밀번호 변경 기능 준비 중!")}>
              비밀번호 변경
            </button>
          )}
          
          <button className="btn-logout" onClick={async () => {
            try {
              await putLogout();
              alert("로그아웃 되었습니다.");
              window.location.href = "/login";
            } catch (error) {
              alert(getApiErrorMessage(error, "로그아웃에 실패했습니다."));
            }
          }}>로그아웃</button>
        </div>
      </div>
    </div>
  );
}
