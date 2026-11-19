// Ambientación: pegá acá el ID de un video/audio de YouTube (lo que va después de "v=").
const YOUTUBE_ID = "";
(function () {
  const box = document.getElementById("ambient"); if (!box) return;
  if (YOUTUBE_ID) {
    box.innerHTML = '<iframe src="https://www.youtube.com/embed/' + YOUTUBE_ID + '?rel=0" title="Música de ambientación" allow="autoplay; encrypted-media" loading="lazy" allowfullscreen></iframe>';
  } else {
    box.innerHTML = '<p><a href="https://www.youtube.com/results?search_query=Atahualpa+Yupanqui+Los+ejes+de+mi+carreta" target="_blank" rel="noopener">Experienciá la historia con todos los sentidos.</p>';
  }
})();
