document.addEventListener("DOMContentLoaded", async () => {

  async function loadSection(id, file) {
    const container = document.getElementById(id);
    if (!container) return;

    try {
      const res = await fetch(file);
      const html = await res.text();
      container.innerHTML = html;
    } catch (err) {
      container.innerHTML = "<p style='color:red;'>불러오기 실패</p>";
      console.error("로드 실패:", file, err);
    }
  }

  // ❗ 순차 실행 → 병렬 실행으로 변경
  const tasks = [
    loadSection("award", "sections/award.html"),
    loadSection("activities", "sections/activities.html"),
    loadSection("other", "sections/other.html"),
    loadSection("military", "sections/military.html")
  ];

  // 모든 fetch가 동시에 시작됨
  await Promise.all(tasks);
});
