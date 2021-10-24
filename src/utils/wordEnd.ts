export const wordEnd = (value: number, root: string, endings: string[]) => {
    value = value % 100;

    let value2 = value % 10;

    if(value > 10 && value < 20) {
        root += endings[2];
    } else if (value2 > 1 && value2 < 5) {
        root += endings[1];
    } else if (value2 === 1) {
        root += endings[0]
    } else {
        root += endings[2]
    }

    return root;

}