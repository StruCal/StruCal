function coordinateMultiplier(coordinate)
{
    let x = coordinate.x / 1000;
    let y = coordinate.y / 1000;
    return { x, y };
}


function barMultiplier(bar) {
    let x = bar.x / 1000;
    let y = bar.y / 1000;
    let d = bar.d / 1000000;
    return { x, y, d };
}