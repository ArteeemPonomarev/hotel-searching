export const starsElement = (stars: number) => {
    let starsArr = []
    for (let i = 0; i < 5; i++) {
        if (stars > i) {
            starsArr.push({id: i, value: 1})
        } else {
            starsArr.push({id: i, value: 0})
        }
    }
    return starsArr
}