async function loadSection(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadSection("award", "sections/award.html");
loadSection("activities", "sections/activities.html");
loadSection("other", "sections/other.html");
loadSection("military", "sections/military.html");