// data/slides.js
import * as images from '../data/imgImports';
import * as svgs from '../data/svgImports';

export const slides = [
    { id: 1, img: [images.womencollection, images.womencollection2], svg: svgs.womencollectiontext },
    { id: 2, img: [images.kidcollection, images.kidcollection2], svg: svgs.kidcollectiontext },
    { id: 3, img: [images.mancollection, images.mancollection2], svg: svgs.mancollectiontext },
];

export const additionalSlides = [
    { id: 4, img: images.travelcollection, svg: svgs.travelcollectiontext },
];