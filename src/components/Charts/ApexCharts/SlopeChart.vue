<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import VueApexCharts from 'vue3-apexcharts'

const chart = ref(null)

const data = {
  series: [
    {
      name: 'Blue',
      data: [
        {
          x: 'Category 1',
          y: 503
        },
        {
          x: 'Category 2',
          y: 580
        },
        {
          x: 'Category 3',
          y: 135
        }
      ]
    },
    {
      name: 'Green',
      data: [
        {
          x: 'Category 1',
          y: 733
        },
        {
          x: 'Category 2',
          y: 385
        },
        {
          x: 'Category 3',
          y: 715
        }
      ]
    },
    {
      name: 'Orange',
      data: [
        {
          x: 'Category 1',
          y: 255
        },
        {
          x: 'Category 2',
          y: 211
        },
        {
          x: 'Category 3',
          y: 441
        }
      ]
    },
    {
      name: 'Red',
      data: [
        {
          x: 'Category 1',
          y: 428
        },
        {
          x: 'Category 2',
          y: 749
        },
        {
          x: 'Category 3',
          y: 559
        }
      ]
    }
  ],
  chartOptions: {
    chart: {
      height: 350,
      width: 600,
      type: 'line'
    },
    plotOptions: {
      line: {
        isSlopeChart: true
      }
    },
    tooltip: {
      followCursor: true,
      intersect: false,
      shared: true
    },
    dataLabels: {
      background: {
        enabled: true
      },
      formatter(val: any, opts: any) {
        const seriesName = opts.w.config.series[opts.seriesIndex].name
        return val !== null ? seriesName : ''
      }
    },
    yaxis: {
      show: true,
      labels: {
        show: true
      }
    },
    xaxis: {
      position: 'bottom'
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left'
    },
    stroke: {
      width: [2, 3, 4, 2],
      dashArray: [0, 0, 5, 2],
      curve: 'smooth'
    }
  }
}
</script>

<template>
  <div
    class="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7"
  >
    <div class="mb-3 justify-between gap-4 sm:flex">
      <div>
        <h4 class="text-xl font-bold text-black dark:text-white">Slope Map Analytics</h4>
      </div>
      <div>
        <div class="relative z-20 inline-block">
          <!-- <select
            name=""
            id=""
            class="relative z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
          >
            <option value="">Monthly</option>
            <option value="">Yearly</option>
          </select> -->
          <!-- <span class="absolute top-1/2 right-3 z-10 -translate-y-1/2">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.47072 1.08816C0.47072 1.02932 0.500141 0.955772 0.54427 0.911642C0.647241 0.808672 0.809051 0.808672 0.912022 0.896932L4.85431 4.60386C4.92785 4.67741 5.06025 4.67741 5.14851 4.60386L9.09079 0.896932C9.19376 0.793962 9.35557 0.808672 9.45854 0.911642C9.56151 1.01461 9.5468 1.17642 9.44383 1.27939L5.50155 4.98632C5.22206 5.23639 4.78076 5.23639 4.51598 4.98632L0.558981 1.27939C0.50014 1.22055 0.47072 1.16171 0.47072 1.08816Z"
                fill="#637381"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.22659 0.546578L5.00141 4.09604L8.76422 0.557869C9.08459 0.244537 9.54201 0.329403 9.79139 0.578788C10.112 0.899434 10.0277 1.36122 9.77668 1.61224L9.76644 1.62248L5.81552 5.33722C5.36257 5.74249 4.6445 5.7544 4.19352 5.32924C4.19327 5.32901 4.19377 5.32948 4.19352 5.32924L0.225953 1.61241C0.102762 1.48922 -4.20186e-08 1.31674 -3.20269e-08 1.08816C-2.40601e-08 0.905899 0.0780105 0.712197 0.211421 0.578787C0.494701 0.295506 0.935574 0.297138 1.21836 0.539529L1.22659 0.546578ZM4.51598 4.98632C4.78076 5.23639 5.22206 5.23639 5.50155 4.98632L9.44383 1.27939C9.5468 1.17642 9.56151 1.01461 9.45854 0.911642C9.35557 0.808672 9.19376 0.793962 9.09079 0.896932L5.14851 4.60386C5.06025 4.67741 4.92785 4.67741 4.85431 4.60386L0.912022 0.896932C0.809051 0.808672 0.647241 0.808672 0.54427 0.911642C0.500141 0.955772 0.47072 1.02932 0.47072 1.08816C0.47072 1.16171 0.50014 1.22055 0.558981 1.27939L4.51598 4.98632Z"
                fill="#637381"
              />
            </svg>
          </span> -->
        </div>
      </div>
    </div>
    <div class="mb-2">
      <div id="TreeMap" class="mx-auto flex justify-center">
        <VueApexCharts
          type="line"
          height="350"
          width="800"
          :options="data.chartOptions"
          :series="data.series"
          ref="chart"
        />
      </div>
    </div>
  </div>
</template>
