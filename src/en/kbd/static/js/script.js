
/// ///
const imageGrid = document.getElementById('image-grid');
const preview = document.getElementById('preview');
const backspaceButton = document.getElementById('backspace');
const clearButton = document.getElementById('clear');
const spaceButton = document.getElementById('space');
const copyButton = document.getElementById('copy');
const charTypeButtons = document.querySelectorAll('#character-type-switcher .char-type-button');



/// PNG画像一覧 (Alphanumeric用　※これ以外がSymbols用になる) ///
const alphanumericOrder = [
    { filename: "image167.png", unicode: 57568 },
    { filename: "image168.png", unicode: 57569 },
    { filename: "image169.png", unicode: 57570 },
    { filename: "image170.png", unicode: 57571 },
    { filename: "image171.png", unicode: 57572 },
    { filename: "image172.png", unicode: 57573 },
    { filename: "image173.png", unicode: 57574 },
    { filename: "image174.png", unicode: 57575 },
    { filename: "image175.png", unicode: 57576 },
    { filename: "image176.png", unicode: 57577 },
    { filename: "image150.png", unicode: 57554 },
    { filename: "image148.png", unicode: 57552 },
    { filename: "image141.png", unicode: 57536 },
    { filename: "image029.png", unicode: 57418 },
    { newline: true }, // 改行
    { filename: "alpha_purple_083_017.png", unicode: 57473 },
    { filename: "alpha_purple_089_023.png", unicode: 57479 },
    { filename: "alpha_purple_071_005.png", unicode: 57461 },
    { filename: "alpha_purple_084_018.png", unicode: 57474 },
    { filename: "alpha_purple_086_020.png", unicode: 57476 },
    { filename: "alpha_purple_091_025.png", unicode: 57481 },
    { filename: "alpha_purple_087_021.png", unicode: 57477 },
    { filename: "alpha_purple_075_009.png", unicode: 57465 },
    { filename: "alpha_purple_081_015.png", unicode: 57471 },
    { filename: "alpha_purple_082_016.png", unicode: 57472 },
    { filename: "image057.png", unicode: 57447 },
    { filename: "image058.png", unicode: 57448 },
    { filename: "image059.png", unicode: 57449 },
    { filename: "image030.png", unicode: 57419 },
    { newline: true }, // 改行
    { filename: "alpha_purple_067_001.png", unicode: 57457 },
    { filename: "alpha_purple_085_019.png", unicode: 57475 },
    { filename: "alpha_purple_070_004.png", unicode: 57460 },
    { filename: "alpha_purple_072_006.png", unicode: 57462 },
    { filename: "alpha_purple_073_007.png", unicode: 57463 },
    { filename: "alpha_purple_074_008.png", unicode: 57464 },
    { filename: "alpha_purple_076_010.png", unicode: 57466 },
    { filename: "alpha_purple_077_011.png", unicode: 57467 },
    { filename: "alpha_purple_078_012.png", unicode: 57468 },
    { filename: "image066.png", unicode: 57456 },
    { filename: "image054.png", unicode: 57444 },
    { filename: "image055.png", unicode: 57445 },
    { filename: "image056.png", unicode: 57446 },
    { filename: "image031.png", unicode: 57420 },
    { newline: true }, // 改行
    { filename: "alpha_purple_092_026.png", unicode: 57482 },
    { filename: "alpha_purple_090_024.png", unicode: 57480 },
    { filename: "alpha_purple_069_003.png", unicode: 57459 },
    { filename: "alpha_purple_088_022.png", unicode: 57478 },
    { filename: "alpha_purple_068_002.png", unicode: 57458 },
    { filename: "alpha_purple_080_014.png", unicode: 57470 },
    { filename: "alpha_purple_079_013.png", unicode: 57469 },
    { filename: "image161.png", unicode: 57386 },
    { filename: "image162.png", unicode: 57387 },
    { filename: "image065.png", unicode: 57455 },
    { filename: "image051.png", unicode: 57441 },
    { filename: "image052.png", unicode: 57442 },
    { filename: "image053.png", unicode: 57443 },
    { filename: "image032.png", unicode: 57421 },
    { newline: true }, // 改行
    { filename: "image127.png", unicode: 57521 },
    { filename: "image128.png", unicode: 57522 },
    { filename: "image129.png", unicode: 57523 },
    { filename: "image130.png", unicode: 57524 },
    { filename: "image131.png", unicode: 57525 },
    { filename: "image132.png", unicode: 57526 },
    { filename: "image133.png", unicode: 57527 },
    { filename: "image134.png", unicode: 57528 },
    { filename: "image135.png", unicode: 57529 },
    { filename: "image060.png", unicode: 57450 },
    { filename: "image050.png", unicode: 57440 },
    { filename: "image021.png", unicode: 57407 },
    { filename: "image018.png", unicode: 57404 },
    { filename: "image033.png", unicode: 57422 },
    { newline: true }, // 改行
];



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
        filteredIcons = alphanumericOrder;
    } else if (type === 'symbols') {
        const alphanumericFilenames = alphanumericOrder.filter(item => item.filename).map(item => item.filename);
        filteredIcons = iconsData.filter(icon => !alphanumericFilenames.includes(icon.filename));
    }


    /// DOM の更新 ///
    filteredIcons.forEach(icon => {
        if (icon.newline) {
            imageGrid.appendChild(document.createElement('br'));
        } else {
            const img = document.createElement('img');
            img.src = `static/icons/${icon.filename}`;
            img.alt = icon.filename;

            //img.className = 'icon';
            //img.dataset.unicode = icon.unicode;

            img.style.width = '85%'; // Reduce width by 15%
            img.style.height = 'auto'; // Maintain aspect ratio
            img.style.borderRadius = '5px'; // Apply rounded corners

            img.addEventListener('click', () => {
                currentInput.push(icon);
                updatePreview();
            });
            imageGrid.appendChild(img);
        }
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