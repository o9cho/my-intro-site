document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.show-card-button');

  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const card = btn.nextElementSibling;
      const file = btn.dataset.file;

      // 열려 있으면 닫기
      if (card.classList.contains('open')) {
        card.classList.remove('open');
        setTimeout(() => card.innerHTML = '', 300); // 애니메이션 끝난 뒤 내용 제거
        return;
      }

      try {
        const res = await fetch(file);
        const html = await res.text();
        card.innerHTML = html;
        card.classList.add('open');
      } catch (e) {
        card.innerHTML = '<p style="color:red;">불러오기에 실패했습니다 😢</p>';
        card.classList.add('open');
      }
    });
  });
});
