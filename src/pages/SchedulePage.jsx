import React from "react";

const SchedulePage = ({ schedule }) => {
  // 👉 группируем по дате
  const grouped = schedule.reduce((acc, lesson) => {
    if (!acc[lesson.date]) {
      acc[lesson.date] = [];
    }
    acc[lesson.date].push(lesson);
    return acc;
  }, {});

  return (
    <main style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>📅 Расписание</h1>

      {Object.keys(grouped).length === 0 && <p>Нет расписания</p>}

      {Object.entries(grouped).map(([date, lessons]) => (
        <section key={date} style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "10px", color: "#273da4" }}>{date}</h2>

          <div style={{ display: "grid", gap: "10px" }}>
            {lessons.map((lesson, index) => (
              <div
                key={index}
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                  background: "#fff",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Левая часть */}
                <div>
                  <h3 style={{ margin: 0 }}>{lesson.subject}</h3>
                  <p style={{ margin: "5px 0", color: "#555" }}>
                    👨‍🏫 {lesson.teacher}
                  </p>
                  <p style={{ margin: 0, color: "#888" }}>
                    📍 Кабинет: {lesson.classroom}
                  </p>
                </div>

                {/* Правая часть */}
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {lesson.start_time} - {lesson.end_time}
                  </p>
                  <p style={{ margin: 0, color: "#ff6900" }}>
                    {lesson.class_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default SchedulePage;
