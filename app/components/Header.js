import {Title} from '/app/components/Title.js';
import { Menu } from '/app/components/Menu.js';
import { SearchForm } from '/app/components/SearchForm.js';

//Componentes sin logica
export function Header() {
    const $header = document.createElement('header');
    $header.classList.add('header');
    $header.appendChild(Title());
    $header.appendChild(Menu());
    $header.appendChild(SearchForm());

    return $header;
}