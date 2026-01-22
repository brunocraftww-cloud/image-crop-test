const uploadInput = document.getElementById('uploadInput');
const preview = document.getElementById('preview');
const label = document.getElementById('label');
const buttons = document.querySelectorAll('.buttons button');
const thumbList = document.getElementById('thumbList');

let images = []; // Array para armazenar imagens
let currentImage = null;
let currentMode = 'full';

const sizes = {
  full: { w: 2625, h: 1750, name: 'Full Image' },
  mobile: { w: 2625, h: 1313, name: 'Mobile' },
  desktop: { w: 2625, h: 875, name: 'Desktop' }
};

/* ---------- Funções ---------- */

// Atualiza o tamanho do preview conforme o modo selecionado
function updatePreviewSize() {
  if (!currentImage) return;
  const size = sizes[currentMode];

  const previewWidth = 900; // largura fixa do preview
  const previewHeight = Math.round(previewWidth * size.h / size.w);

  preview.style.width = previewWidth + 'px';
  preview.style.height = previewHeight + 'px';

  label.textContent = `${size.name} – ${size.w} x ${size.h}`;
}


// Carrega a imagem no preview principal, substituindo a antiga
function loadImage(src) {
  currentImage = src;

  // Remove todas as imagens antigas
  preview.innerHTML = '';

  const img = document.createElement('img');
  img.src = src;
  img.onload = () => updatePreviewSize();
  preview.appendChild(img);

  renderThumbs(); // Atualiza a seleção dos thumbs
}

// Renderiza os thumbs laterais
function renderThumbs() {
  thumbList.innerHTML = '';
  images.forEach(img => {
    const div = document.createElement('div');
    div.className = 'thumb' + (img === currentImage ? ' active' : '');
    div.innerHTML = `<img src="${img}">`;
    div.onclick = () => loadImage(img);
    thumbList.appendChild(div);
  });
}

/* ---------- Eventos ---------- */

// Upload de nova imagem
uploadInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const dataURL = reader.result;

    // Adiciona a nova imagem no array
    images.push(dataURL);

    // Atualiza o preview principal e os thumbs imediatamente
    loadImage(dataURL);

    // Limpa input
    uploadInput.value = '';
  };
  reader.readAsDataURL(file);
});

// Botões Full/Mobile/Desktop
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    updatePreviewSize();
  });
});
