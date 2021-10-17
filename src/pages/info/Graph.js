import React, { useRef, useEffect } from 'react'
import './infoPage.css'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Graph({status}) {
    const graph = useRef(null)


    useEffect(() => {

        var ctx = graph?.current.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data:  {
                labels: [
                  'Red',
                  'Blue',
                  'Yellow'
                ],
                datasets: [{
                  label: 'My First Dataset',
                  data: [300, 50, 100],
                  backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                  ],
                  hoverOffset: 4
                }]
              },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        
        if (window.innerWidth <= 450) {
            document.querySelector('.graph').style.width = (window.innerWidth - 100) + 'px'

        }
    }, [])




    return (
        <div>

            <canvas className="myChart" ref={graph} aria-label="Graph" ></canvas>
            
        </div>
    )
}

export default Graph