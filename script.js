<script>
document.addEventListener("DOMContentLoaded", () => {
  // 카드 정보
  const cards = [
    { containerId: "award", file: "sections/award.html" },
    { containerId: "activities", file: "sections/activities.html" },
    { containerId: "other", file: "sections/other.html" }
  ];

  cards.forEach(({ containerId, file }) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 버튼 생성
    const btn = document.createElement("button");
    btn.textContent = "자세히 보기";
    btn.classList.add("show-card-button");
    container.appendChild(btn);

    // 카드 내용을 담을 div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("project-card");
    container.appendChild(cardDiv);

    // 버튼 클릭 이벤트
    btn.addEventListener("click", () => {
      if (cardDiv.classList.contains("open")) {
        cardDiv.classList.remove("open");
        setTimeout(() => cardDiv.innerHTML = "", 300);
        return;
      }

      fetch(file)
        .then(res => res.text())
        .then(html => {
          cardDiv.innerHTML = html;
          cardDiv.classList.add("open");

          // 내부 show-card-button 처리
          cardDiv.querySelectorAll(".show-card-button").forEach(innerBtn => {
            innerBtn.addEventListener("click", () => {
              const innerCard = innerBtn.nextElementSibling;
              if (!innerCard) return;

              if (innerCard.classList.contains("open")) {
                innerCard.classList.remove("open");
                setTimeout(() => innerCard.innerHTML = "", 300);
                return;
              }

              const innerFile = innerBtn.dataset.file;
              if (!innerFile) return;

              fetch(innerFile)
                .then(res => res.text())
                .then(innerHtml => {
                  innerCard.innerHTML = innerHtml;
                  innerCard.classList.add("open");
                })
                .catch(() => {
                  innerCard.innerHTML = "<p style='color:red;'>불러오기 실패 😢</p>";
                  innerCard.classList.add("open");
                });
            });
          });
        })
        .catch(err => {
          cardDiv.innerHTML = "<p style='color:red;'>불러오기 실패 😢</p>";
          cardDiv.classList.add("open");
          console.error(file, "불러오기 실패:", err);
        });
    });
  });
});
</script>