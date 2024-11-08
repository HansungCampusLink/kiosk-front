// src/components/Home/Footer/TeamInfoPage.jsx
import React from 'react';
import './TeamInfoPage.css';

const TeamInfoPage = () => {
    const teamMembers = [
        { name: '이경미', role: '팀장 / 데이터베이스 연동 및 API 개발', bio: '깃헙 주소.' },
        { name: '박정제', role: '백엔드, 프롬프트 엔지니어', bio: '깃헙 주소.' },
        { name: '민경빈', role: 'AI 엔지니어', bio: '깃헙 주소.' },
        { name: '유호준', role: '데이터 엔지니어', bio: '깃헙 주소' },
        { name: '신민금', role: '프론트엔드 개발자', bio: '깃헙 주소' },
    ];

    return (
        <div className="team-info-page">
            <h1>Team HansungCampusLink</h1>
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <div key={index} className="team-member-card">
                        <h2>{member.name}</h2>
                        <p className="role">{member.role}</p>
                        <p className="bio">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamInfoPage;
