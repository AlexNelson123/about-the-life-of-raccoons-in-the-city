// Подстройка высоты изображения под пропорции
function resizeMainToImage() {
    const img = document.querySelector('.foreground-img');

    if (!img || !img.complete) return;

    const containerWidth = window.innerWidth;
    const calculatedHeight = (containerWidth * img.naturalHeight) / img.naturalWidth;

    const minHeight = 300;
    document.getElementById('main').style.height = Math.max(calculatedHeight, minHeight) + 'px';
}

window.addEventListener('load', () => {
    const img = document.querySelector('.foreground-img');
    if (img && img.complete) {
        resizeMainToImage();
    } else if (img) {
        img.addEventListener('load', resizeMainToImage);
    }
});

window.addEventListener('resize', debounce(resizeMainToImage, 200));

// Подстройка размера основного текста
function resizeTextToFit() {
    const lines = document.querySelectorAll('.text-line');

    let longestLine = '';
    lines.forEach(line => {
        if (line.textContent.length > longestLine.length) {
            longestLine = line.textContent;
        }
    });

    const container = lines[0]?.parentElement;
    if (!container) return;

    const textLength = longestLine.length;
    const maxWidth = container.offsetWidth * 0.9;

    let fontSize = maxWidth / textLength * 4.5;

    if (window.innerWidth >= 1024) {
        fontSize *= 1.2;
    }

    let maxFontSize = 70;
    if (window.innerWidth < 768) {
        maxFontSize = 40;
    }

    if (fontSize > maxFontSize) fontSize = maxFontSize;
    if (fontSize < 24) fontSize = 24;

    lines.forEach(line => {
        line.style.fontSize = fontSize + 'px';
    });

    const altText = document.getElementById('altText');
    if (altText) {
        altText.style.fontSize = (fontSize*0.75) + 'px'; // Альтернативный текст в 2 раза меньше
    }
}

window.addEventListener('load', () => {
    resizeTextToFit();
});

window.addEventListener('resize', debounce(resizeTextToFit, 200));

// Утилита debounce
function debounce(func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, arguments), delay);
    };
}

// Создаем .alt-wrapper внутри .text-container
const textContainer = document.querySelector('.text-container');

const altWrapper = document.createElement('div');
altWrapper.classList.add('alt-wrapper');
altWrapper.id = 'altWrapper';
altWrapper.innerHTML = `
    <span id="altText" class="alt-text">ТЕКСТ</span>
    <img src="" class="alt-image" id="altImage" />
`;
textContainer.appendChild(altWrapper);

// Данные для альтернативных текстов
const altData = {
    raccoon1: {
        text: "Изначально еноты обитали в лесах и на берегах водоемов Северной Америки. Благодаря своей исключительной адаптивности, они успешно расширили ареал, освоив различные ландшафты",
        image: "images/ЕНОТ1.png"
    },
    raccoon2: {
        text: "В последние десятилетия еноты всё чаще встречаются в городах, превращая их в часть своего ареала. Причины: Легкий доступ к пище, укрытия как чердаки и подвалы, а также отсутствие крупных хищников.",
        image: "images/ЕНОТ2.png"
    },
    raccoon3: {
        text: "Сосуществование енотов и людей в городе – сложная задача, требующая ответственного подхода и знаний о поведении этих животных.",
        image: "images/ЕНОТ3.png"
    }
};

let currentTimeout;

function showAltWrapper(line) {
    const key = line.getAttribute('data-alt');
    const data = altData[key];

    if (!data) return;

    document.getElementById('altText').textContent = data.text;
    const img = document.getElementById('altImage');
    img.src = data.image;

    img.onload = () => {
        const textHeight = altTextElement.offsetHeight;
        img.style.height = `${textHeight}px`;
    };

    // Получаем координаты строки
    const lineRect = line.getBoundingClientRect();
    const containerRect = textContainer.getBoundingClientRect();

    // Вычисляем top и left, чтобы совпадало с началом строки
    const topOffset = lineRect.top - containerRect.top + window.scrollY;
    const leftOffset = lineRect.left - containerRect.left;

    // Показываем фон точно над этой строкой
    altWrapper.style.top = `${topOffset}px`;
    altWrapper.style.left = `${leftOffset}px`;

    // Подстраиваем ширину под содержимое
    requestAnimationFrame(() => {
        const containerWidth = textContainer.offsetWidth;
        const wrapperContentWidth = altTextElement.offsetWidth + img.offsetWidth + 60;

        altWrapper.style.width = `${line.offsetWidth}px`;
    });

    altWrapper.classList.add('show');
}

function hideAltWrapper() {
    currentTimeout = setTimeout(() => {
        altWrapper.classList.remove('show');
    }, 100);
}

const textLines = document.querySelectorAll('.text-line');
const altTextElement = document.getElementById('altText');

document.querySelectorAll('.text-line').forEach(line => {
    line.addEventListener('mouseenter', () => {
        clearTimeout(currentTimeout);
        showAltWrapper(line);
    });
    line.addEventListener('mouseleave', () => {
        hideAltWrapper();
    });
});

altWrapper.addEventListener('mouseenter', () => {
    clearTimeout(currentTimeout);
});
altWrapper.addEventListener('mouseleave', () => {
    hideAltWrapper();
});
function initHoverImages() {
  const images = document.querySelectorAll('.hover-image');

  images.forEach(img => {
    const defaultSrc = img.src;
    const hoverSrc = img.dataset.hoverSrc;

    // Предзагрузка изображения по ховеру
    const preloadImg = new Image();
    preloadImg.src = hoverSrc;

    img.addEventListener('mouseover', () => {
      img.src = hoverSrc;
    });

    img.addEventListener('mouseout', () => {
      img.src = defaultSrc;
    });
  });
}

// Вызываем функцию после загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
console.log("DOM загружен!");

  // Получаем элементы напрямую
	const mainImage1 = document.querySelector('.union-img1');
	const overlayImage1 = document.querySelector('.overlay-img1');
	const closeBtn = document.querySelector('.close-btn');
	
	const mainImage2 = document.querySelector('.union-img2');
	const overlayImage2 = document.querySelector('.overlay-img2');
	
	const mainImage3 = document.querySelector('.union-img3');
	const overlayImage3 = document.querySelector('.overlay-img3');
  
  // При клике на основное изображение — показываем дополнительное
	mainImage1.addEventListener('click', () => {
		overlayImage1.style.display = 'block';
		closeBtn.style.display = 'block';
	});


	closeBtn.addEventListener('click', () => {
		overlayImage1.style.display = 'none';
		closeBtn.style.display = 'none';
	});
	
	mainImage2.addEventListener('click', () => {
		overlayImage2.style.display = 'block';
		closeBtn.style.display = 'block';
	});

 
	closeBtn.addEventListener('click', () => {
		overlayImage2.style.display = 'none';
		closeBtn.style.display = 'none';
	});
	
	mainImage3.addEventListener('click', () => {
		overlayImage3.style.display = 'block';
		closeBtn.style.display = 'block';
	});


	closeBtn.addEventListener('click', () => {
		overlayImage3.style.display = 'none';
		closeBtn.style.display = 'none';
	});
});

	const trigger1 = document.querySelector('.menu-img3');
    const modal = document.querySelector('.infoModal1');
    const closeBtn2 = document.querySelector('.close-btn2');
	const organiz = document.querySelector('.organiz');
	const project = document.querySelector('.project');
 	const organiz2 = document.querySelector('.organiz2');
	const project2 = document.querySelector('.project2');

    trigger1.addEventListener('click', () => {
      modal.style.display = 'block';
    });
	
    closeBtn2.addEventListener('click', () => {
      modal.style.display = 'none';
    });
	

	organiz.addEventListener('click', () => {
		window.location.href = 'organiz.html';
	});
		
	project.addEventListener('click', () => {
		window.location.href = 'project.html';
	});
	organiz2.addEventListener('click', () => {
		window.location.href = 'organiz.html';
	});
		
	project2.addEventListener('click', () => {
		window.location.href = 'project.html';
	});

	const enottrigger1 = document.querySelector('.raccoon-img1');
	const enottrigger2 = document.querySelector('.raccoon-img2');
	const enottrigger3 = document.querySelector('.raccoon-img3');
	const enottrigger4 = document.querySelector('.raccoon-img4');
	const enotmodal1 = document.querySelector('.raccoon-modal1');
	const enotmodal2 = document.querySelector('.raccoon-modal2');
	const enotmodal3 = document.querySelector('.raccoon-modal3');
	const enotmodal4 = document.querySelector('.raccoon-modal4');
	const closeBtn3 = document.querySelector('.close-btn3');
	const closeBtn4 = document.querySelector('.close-btn4');
	const closeBtn5 = document.querySelector('.close-btn5');
	const closeBtn6 = document.querySelector('.close-btn6');
	enottrigger1.addEventListener('click', () => {
    	enotmodal1.style.display = 'block';
    });

	enottrigger2.addEventListener('click', () => {
    	enotmodal2.style.display = 'block';
    });

	enottrigger3.addEventListener('click', () => {
		enotmodal3.style.display = 'block';
	});

	enottrigger4.addEventListener('click', () => {
		enotmodal4.style.display = 'block';
	});

    closeBtn3.addEventListener('click', () => {
		enotmodal1.style.display = 'none';
    });
	closeBtn4.addEventListener('click', () => {
		enotmodal2.style.display = 'none';
	});
	closeBtn5.addEventListener('click', () => {
		enotmodal3.style.display = 'none';
	});
	closeBtn6.addEventListener('click', () => {
		enotmodal4.style.display = 'none';
	});

	const subtracttrigger = document.querySelector('.subtract-img');
	const subtractmodal = document.querySelector('.subtract-modal');

	subtracttrigger.addEventListener('click', () => {
    	subtractmodal.style.display = 'block';
    });
	subtractmodal.addEventListener('click', () => {
    	subtractmodal.style.display = 'none';
    });