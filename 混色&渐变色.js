// 根据百分比取混色，然后生成渐变色
color: function (params) {
    let color,
        colors = ['#a3423e', '#f05a23', '#f5ebd4'],
        i = parseFloat(params.value) / 100;
    let c = i * 2 < 1 ? 1 : 0,
        c1 = colors[c + 1].toLowerCase(),
        c2 = colors[c].toLowerCase();
    color = colorBlend(c1, c2, i);
    return new echarts.graphic.LinearGradient(
        0, 0, 1, 0,
        [
            { offset: 0, color: colors[2] },
            { offset: 1, color: color },
        ]
    )
}


// 渐变色顺序：右，上，左，下
color: new echarts.graphic.LinearGradient(
    0, 0, 1, 0,
    [
        { offset: 0, color: '#ccc' },
        { offset: 1, color: '#333' },
    ]
)

/**
 * 混色比率
 * @param c1 
 * @param c2 
 * @param ratio 
 */
export function colorBlend(c1, c2, ratio) {
    ratio = Math.max(Math.min(Number(ratio), 1), 0);
    let r1 = parseInt(c1.substring(1, 3), 16),
        g1 = parseInt(c1.substring(3, 5), 16),
        b1 = parseInt(c1.substring(5, 7), 16),
        r2 = parseInt(c2.substring(1, 3), 16),
        g2 = parseInt(c2.substring(3, 5), 16),
        b2 = parseInt(c2.substring(5, 7), 16),
        r3 = Math.round(r1 * (1 - ratio) + r2 * ratio),
        g3 = Math.round(g1 * (1 - ratio) + g2 * ratio),
        b3 = Math.round(b1 * (1 - ratio) + b2 * ratio),
        r = ('0' + (r3 || 0).toString(16)).slice(-2),
        g = ('0' + (g3 || 0).toString(16)).slice(-2),
        b = ('0' + (b3 || 0).toString(16)).slice(-2);
    return '#' + r + g + b;
}
