


// 木代表數字
// 1為木的陽性；2為木的陰性
// 火代表數字
// 3為火的陽性；4為火的陰性
// 土代表數字
// 5為土的陽性；6 為土的陰性
// 金代表數字
// 7 為金的陽性；8 為金的陰性
// 水代表數字
// 9為水的陽性；10 為水的陰性




class WushingType {
    wushing;
    yinyang;

    Wushing(wushing,
        yinyang,
    ) {
        this.wushing = wushing;
        this.yinyang = yinyang;
    }
}


export default [
    WushingType('water', 'yin'),
    WushingType('wood', 'yang'),
    WushingType('wood', 'yin'),
    WushingType('fire', 'yang'),
    WushingType('fire', 'yin'),
    WushingType('earth', 'yang'),
    WushingType('earth', 'yin'),
    WushingType('metal', 'yang'),
    WushingType('metal', 'yin'),
    WushingType('water', 'yang'),
];