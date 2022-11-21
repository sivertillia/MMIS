import { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const type = 'bar'
// line
// area
// bar
// radar
// histogram
// pie
// donut
// radialBar
// scatter
// bubble
// heatmap
// candlestick

const areaChartOptions = {
  chart: {
    height: 450,
    type: type,
    toolbar: {
      show: false,
    },
    stacked: true,
    stackType: '100%',
  },
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom',
        offsetX: -10,
        offsetY: 0
      }
    }
  }],
  fill: {
    opacity: 1
  },
  legend: {
    position: 'right',
    offsetX: 0,
    offsetY: 50
  },
}

const MultilineChart = ({ col, count, update }) => {

  const [options, setOptions] = useState(areaChartOptions)
  const [data, setData] = useState([])
  const [series, setSeries] = useState([
    {
      name: 'Page Views',
      data: data,
    },
  ])

  useEffect(() => {
    const eagle = []
    const tails = []
    for (let i = 0; i < col; i++) {
      const eagleT = []
      const tailsT = []
      for (let k = 0; k < count; k++) {
        const money = Math.round(Math.random())
        if (money === 1) eagleT.push(1)
        if (money === 0) tailsT.push(1)
      }

      eagle.push(eagleT.length)
      tails.push(tailsT.length)
    }


    setSeries([{
      name: 'Eagle',
      data: eagle
    }, {
      name: 'Tails',
      data: tails
    }])
  }, [update])

  useEffect(() => {
  }, [])

  return <ReactApexChart options={options} series={series} type={type} height={450} />
}

export default MultilineChart
