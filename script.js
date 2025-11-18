document.addEventListener("DOMContentLoaded", () => {
  const sections = [
    { containerId: "award", file: "sections/award.html" },
    { containerId: "activities", file: "sections/activities.html" },
    { containerId: "other", file: "sections/other.html" },
    { containerId: "military", file: "sections/military.html" } // 버튼 없음, 그냥 내용 표시
  ];

  sections.forEach(({ containerId, file }) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    fetch(file)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html; // HTML 삽입

        // 버튼 이벤트 등록 (있을 경우)
        container.querySelectorAll(".show-card-button").forEach(btn => {
          const cardDiv = btn.nextElementSibling; // 바로 아래 project-card
          const file = btn.dataset.file;

          btn.addEventListener("click", async () => {
            // 이미 열려있으면 닫기
            if (cardDiv.classList.contains("open")) {
              cardDiv.classList.remove("open");
              setTimeout(() => (cardDiv.innerHTML = ""), 300);
              return;
            }

            // 열기
            try {
              const res = await fetch(file);
              const html = await res.text();
              cardDiv.innerHTML = html;
              cardDiv.classList.add("open");
            } catch (err) {
              cardDiv.innerHTML =
                "<p style='color:red;'>불러오기 실패 😢</p>";
              cardDiv.classList.add("open");
              console.error(`${file} 불러오기 실패:`, err);
            }
          });
        });
      })
      .catch(err => {
        container.innerHTML = "<p style='color:red;'>불러오기 실패 😢</p>";
        console.error(`${file} 불러오기 실패:`, err);
      });
  });
});
