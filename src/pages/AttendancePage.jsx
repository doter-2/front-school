import React from "react";

const AttendancePage = ({ attendance }) => {
  return (
    <div className="attendance-container">
      <h1>📊 Посещения</h1>

      {attendance?.length === 0 ? (
        <p className="empty">Нет данных о посещениях</p>
      ) : (
        <div className="attendance-list">
          {attendance.map((item) => (
            <div className="attendance-card" key={item.id}>
              <div className="card-header">
                <h3>{item.subject_name}</h3>
                <span
                  className={
                    item.attendance ? "status present" : "status absent"
                  }
                >
                  {item.attendance ? "✔ Был" : "✖ Не был"}
                </span>
              </div>

              <p className="date">📅 {item.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
