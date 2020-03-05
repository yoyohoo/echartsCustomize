
'use strict'

/**
 * 全局变量
 */
let wd: any = window,
    et: any = wd.echarts;

/**
 * 默认配置项
 */
const defs = {
    gradulals: ['#a3423e', '#f05a23', '#f5ebd4'],
    borderStrokeColor: '#fff',
    borderShadowColor: 'rgba(0,0,0,0.3)',
    graphic: {
        type: 'group',
        left: 50,
        top: 50,
        children: []
    }
}

/**
 * 梯度配置
 */
const gradleRegionSettings = {
    t1: -15,
    t2: 35,
    l1: 0,
    l2: 75,
    offset: [0, -10, -10, 0, 20],
    remark: ['>85%',
        '极好',
        '85%~70%',
        '很好',
        '70%~55%',
        '较好',
        '55%~40%',
        '一般',
        '<40%',
        '一般以下']
}

/**
 * 生成梯度元素
 */
const generateGradleRegions = function () {
    let regions = new Array(),
        offset = gradleRegionSettings.offset,
        remarks = gradleRegionSettings.remark,
        color,
        colors = defs.gradulals,
        len = remarks.length;
    remarks.forEach((r, k) => {
        let flag = k % 2,
            idx = Math.floor(k / 2),
            off = flag ? 0 : offset[idx];
        if (!flag) {
            let c = k * 2 < len ? 0 : 1,
                c1 = colors[c + 1].toLowerCase(),
                c2 = colors[c].toLowerCase();
            color = colorBlend(c1, c2, 1 - idx * 2 / len);
        }
        regions.push({
            top: flag ? gradleRegionSettings.t2 : gradleRegionSettings.t1,
            left: off + gradleRegionSettings.l1 + gradleRegionSettings.l2 * idx,
            text: r,
            color: color
        })
    });
    return regions;
}

/**
 * 填充色
 */
function colorFill() {
    let fill = new Object(),
        offset = 1,
        fillers = new Array();
    defs.gradulals.forEach(g => {
        fillers.push({ offset: offset, color: g });
        offset -= 1 / 2;
    });
    fill = new et.graphic.LinearGradient(1, 0, 0, 1, fillers);
    return {
        fill: fill,
        stroke: defs.borderStrokeColor,
        lineWidth: .5,
        shadowBlur: 5,
        shadowOffsetX: 2,
        shadowOffsetY: 3,
        shadowColor: defs.borderShadowColor
    }
}

/**
 * 混色比率
 * @param c1 
 * @param c2 
 * @param ratio 
 */
function colorBlend(c1, c2, ratio) {
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

/**
 * 矩形
 * @param opt 
 */
function gradleRectangle(opt) {
    return {
        type: 'rect',
        z: 100,
        left: opt.left || 0,
        top: opt.top || 0,
        shape: {
            width: opt.width || 350,
            height: opt.height || 25
        },
        style: colorFill()
    }
}

/**
 * 标签
 * @param opt 
 */
function gradleLabels(opt) {
    return {
        type: 'text',
        z: 100,
        left: opt.left,
        top: opt.top,
        style: {
            fill: opt.color || '#333',
            text: opt.text,
            font: '12px Microsoft YaHei'
        }
    }
}

/**
 * 等级梯度图
 * chart:嵌入其它
 * el:   单独引入
 */
export const GradleRegionChart = {

    render: function (opt) {
        let chart,
            options = { graphic: defs.graphic };

        let rect = gradleRectangle({
            top: 0,
            left: 0
        });
        options.graphic.children.push(rect);
        generateGradleRegions().forEach(r => {
            let label = gradleLabels(r);
            options.graphic.children.push(label);
        });

        if (opt.chart) {
            chart = opt.chart;
        } else if (opt.el) {
            chart = et.init(opt.el);
        }
        chart.setOption(options);
        return chart;
    }

}
