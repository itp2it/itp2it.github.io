
/// ///
const imageGrid = document.getElementById('image-grid');
const preview = document.getElementById('preview');
const backspaceButton = document.getElementById('backspace');
const clearButton = document.getElementById('clear');
const spaceButton = document.getElementById('space');
const copyButton = document.getElementById('copy');
const charTypeButtons = document.querySelectorAll('#character-type-switcher .char-type-button');



///  ///
let currentInput = [];
let iconsData;
let currentType = 'alphanumeric'; // Default to alphanumeric



// Fetch icons data
fetch('icons.json')
    .then(response => response.json())
    .then(data => {
        iconsData = data;
        renderImages(currentType);
    })
    .catch(error => console.error('Error loading icons.json:', error));

function getUnicodeByFilename(filename) {
    const icon = iconsData.find(icon => icon.filename === filename);
    return icon ? icon.unicode : null;
}



/// PNG画像一覧向け (render Images) ///
function renderImages(type) {
    imageGrid.innerHTML = ''; // Clear existing images
    let filteredIcons = [];

    if (type === 'alphanumeric') {
        const alphanumericFiles = [
            /alpha_purple_\d{3}_\d{3}\.png/, // 正規表現で "alpha_purple_XXX_001.png" 形式にマッチ
            /image05\d\.png/,             // 正規表現で "image050.png" ~ "image059.png" にマッチ
            'image167.png', 'image168.png', 'image169.png', 'image170.png',
            'image171.png', 'image172.png', 'image173.png', 'image174.png',
            'image175.png', 'image176.png',
            'image093.png', 'image094.png', 'image095.png', 'image096.png',
            'image097.png', 'image098.png', 'image099.png', 'image100.png',
            'image101.png', 'image102.png', 'image103.png', 'image104.png',
            'image105.png', 'image106.png', 'image107.png', 'image108.png',
            'image109.png', 'image110.png', 'image111.png', 'image112.png',
            'image113.png', 'image114.png', 'image115.png', 'image116.png',
            'image117.png', 'image118.png', 'image119.png', 'image120.png',
            'image121.png', 'image122.png', 'image123.png', 'image124.png',
            'image127.png', 'image128.png', 'image129.png', 'image130.png',
            'image131.png', 'image132.png', 'image133.png', 'image134.png',
            'image135.png'
        ];

        filteredIcons = iconsData.filter(icon =>
            alphanumericFiles.some(file =>
                typeof file === 'string' ? icon.filename === file : file.test(icon.filename)
            )
        );

        // 指定順にソート (効率化のため Map を使用)
        const sortOrderMap = new Map(alphanumericFiles.map((file, index) => [file, index]));
        filteredIcons.sort((a, b) => {
            const indexA = sortOrderMap.get(alphanumericFiles.find(file => typeof file === 'string' ? a.filename === file : file.test(a.filename)));
            const indexB = sortOrderMap.get(alphanumericFiles.find(file => typeof file === 'string' ? b.filename === file : file.test(b.filename)));
            return indexA - indexB;
        });


    } else if (type === 'symbols') {
        const alphanumericFiles = [
            /alpha_purple_\d{3}_\d{3}\.png/, // 正規表現で "alpha_purple_XXX_001.png" 形式にマッチ
            /image05\d\.png/,             // 正規表現で "image050.png" ~ "image059.png" にマッチ
            'image167.png', 'image168.png', 'image169.png', 'image170.png',
            'image171.png', 'image172.png', 'image173.png', 'image174.png',
            'image175.png', 'image176.png',
            'image093.png', 'image094.png', 'image095.png', 'image096.png',
            'image097.png', 'image098.png', 'image099.png', 'image100.png',
            'image101.png', 'image102.png', 'image103.png', 'image104.png',
            'image105.png', 'image106.png', 'image107.png', 'image108.png',
            'image109.png', 'image110.png', 'image111.png', 'image112.png',
            'image113.png', 'image114.png', 'image115.png', 'image116.png',
            'image117.png', 'image118.png', 'image119.png', 'image120.png',
            'image121.png', 'image122.png', 'image123.png', 'image124.png',
            'image127.png', 'image128.png', 'image129.png', 'image130.png',
            'image131.png', 'image132.png', 'image133.png', 'image134.png',
            'image135.png'
        ];
        filteredIcons = iconsData.filter(icon =>
            !alphanumericFiles.some(file =>
                typeof file === 'string' ? icon.filename === file : file.test(icon.filename)
            )
        );
    }


    /// DOM の更新 ///
    filteredIcons.forEach(icon => {
        const img = document.createElement('img');
        img.src = `static/icons/${icon.filename}`;
        img.alt = icon.filename;
        img.style.width = '80%'; // Reduce width by 20%
        img.style.height = 'auto'; // Maintain aspect ratio
        img.style.borderRadius = '5px'; // Apply rounded corners
        img.addEventListener('click', () => {
            currentInput.push(icon);
            updatePreview();
        });
        imageGrid.appendChild(img);
    });
}



/// プレビュー用 ///
function updatePreview() {
    preview.innerHTML = '';
    currentInput.forEach(icon => {
        if (icon.filename === ' ') {
            const spaceSpan = document.createElement('span');
            spaceSpan.textContent = '\u2423'; // Unicode for Open Box
            spaceSpan.style.fontFamily = 'monospace';
            spaceSpan.style.fontSize = '30px';
            preview.appendChild(spaceSpan);
        } else {
            const img = document.createElement('img');
            img.src = `static/icons/${icon.filename}`;
            img.alt = icon.filename;
            img.style.height = '30px'; // Consistent height in preview
            img.style.width = 'auto';
            img.style.borderRadius = '5px'; // Apply rounded corners to preview images
            preview.appendChild(img);
        }
    });
}



/// 操作ボタン ///
function removeLastImage() {
    currentInput.pop();
    updatePreview();
}

function clearAllImages() {
    currentInput = [];
    updatePreview();
}

function insertSpace() {
    //  Add a space representation in currentInput (not an image object)
    // Using Unicode for space character (U+0020)
    currentInput.push({ filename: ' ', unicode: 32 });
    updatePreview();
}

function copyToClipboard() {
    let textToCopy = currentInput.map(item => {
        if (item.filename === ' ') {
            return ' ';
        }
        const unicode = getUnicodeByFilename(item.filename);
        return unicode ? String.fromCodePoint(unicode) : '';
    }).join('');

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            Swal.fire({ // SweetAlert2 の関数
                title: 'Unicode Copied!', // 表示するメッセージ
                text: 'This window will close automatically.',
                icon: 'success', // アイコン（success, error, warning, info など）
                timer: 1500, // 1秒 (1000ミリ秒) 後に閉じる
                showConfirmButton: false // OKボタンを表示しない
            });
        })
        .catch(err => console.error('Could not copy text: ', err));
}



/// Event Listeners ///
backspaceButton.addEventListener('click', removeLastImage);
clearButton.addEventListener('click', clearAllImages);
spaceButton.addEventListener('click', insertSpace);
copyButton.addEventListener('click', copyToClipboard);

charTypeButtons.forEach(button => {
    button.addEventListener('click', function () {
        charTypeButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        currentType = this.dataset.type;
        renderImages(currentType);
    });
});



/// 背景色変更 ///
const bgToggleButton = document.getElementById('bg-toggle-button');
const body = document.body;
const gradients = [
    'cyberpunk-bg',
    'gradient1',
    'gradient2',
    'gradient3',
    'gradient4',
    'gradient5',
    'gradient6',
    'gradient7'

];
let currentGradientIndex = 0;

bgToggleButton.addEventListener('click', () => {
    // 古い背景色クラスを削除
    body.classList.remove(gradients[currentGradientIndex]);

    // 次の背景色へ
    currentGradientIndex = (currentGradientIndex + 1) % gradients.length;

    // 新しい背景色クラスを追加
    body.classList.add(gradients[currentGradientIndex]);
});

// 初期背景色を設定 (例: cyberpunk-bg)
body.classList.add(gradients[currentGradientIndex]);