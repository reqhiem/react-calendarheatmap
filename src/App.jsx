import React, { useState, useEffect } from 'react'
import moment from 'moment'
import * as d3 from 'd3'
import CalendarHeatmap from './components/CalendarHeatmap'
import './App.css'

function App() {
  const [data, setData] = useState(
    [{
      "date": "2016-01-01",
      "total": 17164,
      "details": [{
        "name": "Project 1",
        "date": "2016-01-01 12:30:45",
        "value": 9192
      }, {
        "name": "Project 2",
        "date": "2016-01-01 13:37:00",
        "value": 6753
      },
      {
        "name": "Project N",
        "date": "2016-01-01 17:52:41",
        "value": 1219
      }]
    }]
  )

  useEffect(() => {
    // Initialize random data for the demo
    let now = moment().endOf('day').toDate()
    let time_ago = moment().startOf('day').subtract(10, 'year').toDate()
    let data = d3.timeDays(time_ago, now).map(function (dateElement, index) {
      return {
        date: dateElement,
        details: Array.apply(null, new Array(Math.floor(Math.random() * 15))).map(function(e, i, arr) {
          return {
            'name': 'Project ' + Math.ceil(Math.random() * 10),
            'date': function () {
              let projectDate = new Date(dateElement.getTime())
              projectDate.setHours(Math.floor(Math.random() * 24))
              projectDate.setMinutes(Math.floor(Math.random() * 60))
              return projectDate
            }(),
            'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600) * Math.round(Math.random() * (index / 365))
          }
        }),
        init: function () {
          this.total = this.details.reduce(function (prev, e) {
            return prev + e.value
          }, 0)
          return this
        }
      }.init()
    })

    setData(data)
  }, []);

  return (
    <div>
      <CalendarHeatmap data={data} overview="year" color="#cd2327" />
    </div>
  )
}

export default App
