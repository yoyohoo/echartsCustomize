option = {
   
    graphic: [
         {
            type: 'group',
            left: 'center',
            top: 100,
            children: [
                {
                    type: 'rect',
                    z: 100,
                    left: 'center',
                    top: 'middle',
                    shape: {
                        width: 300,
                        height: 30
                    },
                    style: {
                        fill: new echarts.graphic.LinearGradient(
                            1, 0, 0, 1,
                            [
                                {offset: 1, color: '#a3423e'},
                                {offset: 0.5, color: '#f05a23'},
                                {offset: 0, color: '#f5ebd4'}
                            ]
                        ),
                        stroke: '#fff',
                        lineWidth: .5,
                        shadowBlur: 5,
                        shadowOffsetX: 2,
                        shadowOffsetY: 3,
                        shadowColor: 'rgba(0,0,0,0.3)'
                    }
                }]
                }
