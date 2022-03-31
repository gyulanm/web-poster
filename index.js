const topColumnsWrapper = document.querySelector('.columns-wrapper');
const bottomColumnsWrapper = document.querySelector('.bottom');

const columnWidth = {
    mobile: 6,
    tablet: 11,
    desktop: 21
};

let columns = []; //массив, в который добавляем созданные колонки


//функция для создания элементы p с рандомным текстом и рандомной анимацией
function renderColumns() {
    topColumnsWrapper.innerHTML = ''; //удаляем все, что есть в контейнере (чтобы у нас колонки заменялись, если они уже были отрисованы)

    let screenType;

    // определяем тип экрана по его ширине
    if (window.innerWidth <= 768) {
        screenType = 'mobile';
    } else if (window.innerWidth <= 1024) {
        screenType = 'tablet';
    } else {
        screenType = 'desktop';
    }

    //считаем количество колонок, помещающихся на экран
    const numberOfColumns = Math.floor(window.innerWidth / columnWidth[screenType]);

    for (let i=0; i<numberOfColumns; i++) {
        const column = document.createElement('p'); //создаем html element
        const ext = Math.floor(Math.random()*10+10); //10 - 20 - получаем степень (количество символов в строке с числами)
        const num = Math.ceil((Math.random()*(10**ext))); //100000000000000 (** используется для возведения в степень)
        column.innerText = num.toString(); // вставляем текст внутрь p

        const animationNumber = Math.floor(Math.random()*3+1); //1 - 3
        const animationParametersNumber = Math.floor(Math.random()*3+1); //1 - 3 

        column.classList.add(`animation${animationNumber}`); // добавляем класс созданному элементу p
        column.classList.add(`animation-params-${animationParametersNumber}`); // добавляем класс созданному элементу p

        

        columns.push(column);
        
        topColumnsWrapper.appendChild(column);
    } 
}

// после загрузки страницы отрисовались колонки (если не прописать эту строку, то будет пусто)
renderColumns();

// слушатель события изменения размера экрана
window.addEventListener('resize', () => {
    renderColumns(); //изменилась ширина экрана -> перерисовали колонки (удалили и заново нарисовали)
})

// меняем текст раз в промежуток времени
setInterval(() => {
    columns.forEach(column => {
        const ext = Math.floor(Math.random()*10+10); //10 - 20
        const num = Math.ceil((Math.random()+1)*(10**ext)); //100000000000000
        column.innerText = num.toString();
    });
}, 500); // интервал в миллисекундах




const btnWrapper = document.querySelector('.buttons'); // находим элемент в контейнере перед . (document)
const btnColor = btnWrapper.querySelector('.btn-color'); // находим элемент в btnWrapper
const btnControl= btnWrapper.querySelector('.btn-control');
const btnSwitch = btnWrapper.querySelector('.btn-switch');
const btnMotion= btnWrapper.querySelector('.btn-motion');
const btnTraffic = btnWrapper.querySelector('.btn-traffic');

btnWrapper.addEventListener('mouseenter', () => { //добавляем слушателя (addEventListener) на событие наведения мыши ('mouseenter') на элемент (btnWrapper)
    btnColor.style.display = 'block';
    btnSwitch.style.display = 'block';
    btnMotion.style.display = 'block';
    btnTraffic.style.display = 'block';
});

btnWrapper.addEventListener('mouseleave', () => {
    btnColor.style.display = 'none';
    btnSwitch.style.display = 'none';
    btnMotion.style.display = 'none';
    btnTraffic.style.display = 'none';
});


let isColumnShow = true; // флаг для отслеживания сосотояния в котором у тебя находится элемент сейчас
//false - нет, true - да

btnSwitch.addEventListener('click', () => {
    // если выключены колонки, то надо их включить (блок if)
    // если колонки включены, то надо их выключить (блок else)
    if (isColumnShow) { 
        // выполняем, если isSwitched = true
        btnSwitch.setAttribute('src', "./img/buttonn2.svg");
        topColumnsWrapper.style.display = 'none';
        bottomColumnsWrapper.style.display = 'none';
    } else {
        btnSwitch.setAttribute('src', "./img/buttonn.svg");
        topColumnsWrapper.style.display = 'flex';
        bottomColumnsWrapper.style.display = 'flex';
    }

    isColumnShow = !isColumnShow;
});


const body = document.querySelector('body');

let isBackgroundChanged = false;

btnColor.addEventListener('click', () => {
    if (isBackgroundChanged) {
        body.style.background = 'linear-gradient(to bottom, black 0%, blue 50%, black 100%)';
    } else {
       body.style.background=' linear-gradient(to right, #373b44, #4286f4)'; /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
     
    }
    

    isBackgroundChanged = !isBackgroundChanged;
})


const numerals = document.querySelector('.numeral');


let scale = '100%'; // 0.8 , 0.6

btnTraffic.addEventListener('click', () => {
    // поменять еще ссылки на картинки в html
    if (scale === '100%') {
        scale = '80%';
        // img with 2 position
        btnTraffic.setAttribute('src', './img/buttonmotion.svg'); //button-slider-2
    } else if (scale === '80%') {
        scale = '60%';
        // img with 3 position
        btnTraffic.setAttribute('src', './img/buttonaction.svg'); //button-slider-3
    } else {
        scale = '100%';
        //  img with 1 position
        btnTraffic.setAttribute('src', './img/buttontraffic.svg'); //button-slider-1
    }
    numerals.style.maxWidth = scale;
})


let animationDuration = 'initial'; // состояние анимации в моменте - начальное, медленное, самое медленное
let time = 0; // на сколько хотим поменять время анимации: было 5, хотим чтобы стало 7 - тогда в time пишем 2 (time = стало - было)

const itemsImg = bottomColumnsWrapper.querySelectorAll('img');
const itemsText = bottomColumnsWrapper.querySelectorAll('p');

function changeItemAnimationDuration(items, time) { 
    //на вход в функцию мы передаем элементы (items), у которых надо поменять время анимации, а также время (time), на которое нужно эту анимацию
    items.forEach(item => {
        // debugger;
        const initialTagTime = item.style.animationDuration; // время анимации в теге (атрибут style)
        const initialTime = window.getComputedStyle(item).animationDuration; // время анимации из стилей в style.css
        const initialNumberTime = initialTagTime ? parseInt(initialTagTime) : parseInt(initialTime);
    
        item.style.animationDuration = `${initialNumberTime + time}s`
    });
} 

btnMotion.addEventListener('click', () => {
    // поменять еще ссылки на картинки в html
    if (animationDuration === 'initial') {
        animationDuration = 'slower';
        time = 2;
        // img with 2 position
        btnMotion.setAttribute('src', './img/buttonmotion.svg'); //button-slider-2
    } else if (animationDuration === 'slower') {
        animationDuration = 'the slowest';
        time = 2;
        // img with 3 position
        btnMotion.setAttribute('src', './img/buttonaction.svg'); //button-slider-3
    } else {
        animationDuration = 'initial';
        time = -4;
        //  img with 1 position
        btnMotion.setAttribute('src', './img/buttontraffic.svg'); //button-slider-1
    }

    changeItemAnimationDuration(itemsImg, time); // для div с склассом item
    changeItemAnimationDuration(itemsText, time); // для p внутри item
})