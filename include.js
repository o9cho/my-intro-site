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


  await loadSection("award", "sections/award.html");
  await loadSection("activities", "sections/activities.html");
  await loadSection("other", "sections/other.html");
  await loadSection("military", "sections/military.html");
});
