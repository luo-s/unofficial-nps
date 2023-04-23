const chart1 = document.getElementById("myChart1");
new Chart(chart1, {
  type: "bar",
  data: {
    labels: [
      "Great Smoky",
      "Grand Canyon",
      "Zion",
      "Rocky Mountain",
      "Acadia",
      "Yosemite",
      "Yellowstone",
      "Joshua Tree",
      "Cuyahoga Valley",
      "Glacoer",
    ],
    datasets: [
      {
        label: "US Top 10 Most Visited NP",
        data: [12.94, 4.73, 4.69, 4.3, 3.97, 3.67, 3.29, 3.06, 2.91, 2.9],
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Top 10 Most Visited National Parks in 2022",
        font: {
          size: 24,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: true,
        position: "left",
        ticks: {
          callback: function (value, index, values) {
            return `${value} m`;
          },
        },
      },
    },
  },
});

const chart2 = document.getElementById("myChart2");
let years = [];
for (let i = 1904; i <= 2022; i++) {
  years.push(i);
}
let data = [
  120690, 140954, 30569, 32935, 42768, 60899, 173416, 194207, 198334, 216853,
  209693, 314299, 326506, 453498, 436222, 781178, 1022091, 1101697, 1136949,
  1364024, 1527999, 1900499, 2162640, 2465058, 2703753, 3010912, 3038935,
  3217674, 3551885, 3255684, 6095201, 7435659, 11749790, 14838640, 16019483,
  15141032, 16410148, 20487633, 8891495, 6383513, 7723790, 10855548, 20918012,
  24258527, 26294795, 29124837, 32706172, 36613178, 41804313, 45679754,
  47967800, 48891000, 53872100, 58220600, 58466800, 62834000, 71586000,
  78933900, 88548300, 101959800, 109190300, 118662500, 129282100, 135414200,
  145449500, 159103500, 168135100, 151265400, 163156569, 166572300, 168686500,
  188085700, 215359800, 209370600, 221127705, 205369795, 220463211, 238592669,
  244924579, 243619396, 248785509, 263441808, 281094850, 287244998, 282451441,
  269399837, 255581467, 267840999, 274694549, 273120925, 268636169, 269564307,
  265796163, 275236335, 286762265, 287130879, 285891275, 279873926, 227299880,
  266230290, 276908337, 273488751, 272623980, 275581547, 274852949, 285579941,
  281303769, 278939216, 282765682, 273630895, 292800082, 307247252, 330971689,
  330882751, 318211833, 327516619, 237064332, 297115406, 311985998,
];
let myData = data.map((num) => num / 10 ** 6);
let accu = [];
let sum = 0;
for (let ele of myData) {
  sum += ele / 10 ** 3;
  accu.push(sum);
}
new Chart(chart2, {
  type: "line",
  data: {
    labels: years,
    datasets: [
      {
        label: "Yearly",
        data: myData,
        tension: 0.5,
        borderColor: "pink",
        borderWidth: 3,
        fill: false,
        yAxisID: "y",
      },
      {
        label: "Accumulative",
        data: accu,
        tension: 0.5,
        borderColor: "skyblue",
        borderWidth: 3,
        fill: false,
        yAxisID: "m2",
      },
    ],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "How Many People Visited The National Parks in History?",
        font: {
          size: 24,
        },
      },
    },
    responsive: true,
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        ticks: {
          callback: function (value, index, values) {
            return `${value} m`;
          },
        },
      },
      m2: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return `${value} b`;
          },
        },
      },
    },
  },
});
