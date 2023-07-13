function kolobok(character) {
    switch (character) {
        case 'Дедушка':
            return 'Я от дедушки ушёл';
        case 'Лиса':
            return 'Меня съели';
        default:
            return 'Нет информации';
    }
}

let character = 'Дедушка';
console.log(kolobok(character));

character = 'Заяц';
console.log(kolobok(character));

character = 'Лиса';
console.log(kolobok(character));

