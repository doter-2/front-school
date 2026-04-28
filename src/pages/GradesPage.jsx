import React from "react";

const GradesPage = ({ grades }) => {
  return (
    <div className="grades-container">
      <h1 className="title">📊 Мои оценки</h1>

      {grades.length === 0 ? (
        <p className="empty">Нет оценок</p>
      ) : (
        <div className="grades-grid">
          {grades.map((item) => (
            <div className="grade-card" key={item.id}>
              <div className="card-header">
                <h2>{item.subject_name || item.subject}</h2>
                <span className={`grade grade-${item.grade}`}>
                  {item.grade}
                </span>
              </div>

              <p className="topic">📘 {item.lesson_topic || "Без темы"}</p>

              <p className="date">📅 {item.date}</p>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .grades-container {
          padding: 30px;
          background: #f5f7fb;
          min-height: 100vh;
        }

        .title {
          text-align: center;
          margin-bottom: 30px;
          color: #273da4;
        }

        .empty {
          text-align: center;
          font-size: 18px;
          color: gray;
        }

        .grades-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .grade-card {
          background: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          transition: 0.3s;
        }

        .grade-card:hover {
          transform: translateY(-5px);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .card-header h2 {
          font-size: 18px;
          color: #333;
        }

        .grade {
          padding: 8px 12px;
          border-radius: 10px;
          font-weight: bold;
          color: white;
        }

        .grade-5 {
          background: #4caf50;
        }

        .grade-4 {
          background: #2196f3;
        }

        .grade-3 {
          background: #ff9800;
        }

        .grade-2 {
          background: #f44336;
        }

        .topic {
          font-size: 14px;
          color: #555;
          margin: 10px 0;
        }

        .date {
          font-size: 13px;
          color: gray;
        }
      `}</style>
    </div>
  );
};

export default GradesPage;
