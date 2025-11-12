<script>
const buttons = document.querySelectorAll('.show-card-button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.nextElementSibling;
    if (card.style.display === 'block') {
      card.style.display = 'none';
    } else {
      card.style.display = 'block';
    }
  });
});
</script>
