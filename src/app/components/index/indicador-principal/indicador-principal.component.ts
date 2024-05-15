import { Component, OnInit } from '@angular/core';
import { SensoresService } from 'src/app/services/sensores.service';
declare var echarts: any;
@Component({
  selector: 'app-indicador-principal',
  templateUrl: './indicador-principal.component.html',
  styleUrls: ['./indicador-principal.component.css']
})

export class IndicadorPrincipalComponent implements OnInit {

  sensors: any[];
  tituloModal: string = ''; 
  constructor(private sensorService: SensoresService) { }

  ngOnInit(): void {
    this.getAllSensors();
  }

  getAllSensors() {
    this.sensorService.getAllSensors().subscribe(
      (response) => {
        this.sensors = response;
      },
      (error) => {
        console.error('Error fetching sensors:', error);
      }
    );
  }

  preArmarGrafico(sensor: any){
    this.tituloModal = sensor.sensor_name;
    this.armarGrafico(sensor);
  }
  
  
  
    armarGrafico(sensor: any) {
      const chartDom = document.getElementById('echart');
      const myChart = echarts.init(chartDom);
      let option;
    
      // Función para mapear los nombres de los datos del sensor a los títulos deseados en la leyenda
      const mapLegendTitles = (data) => {
        const dataType = Object.keys(data[0]).filter(key => key !== 'timestamp')[0];
        switch (dataType) {
          case 'temperature':
          case 'humidity':
            return ['Temperature', 'Humidity'];
          case 'pressure':
          case 'wind_speed':
            return ['Pressure', 'Wind Speed'];
          case 'noise_level':
          case 'air_quality':
            return ['Noise Level', 'Air Quality'];
          default:
            return [];
        }
      };
    
      // Utiliza los datos del sensor seleccionado para el gráfico
      const data = sensor.data.map(entry => ({
        timestamp: entry.timestamp,
        value1: entry.temperature !== undefined ? entry.temperature :
                entry.pressure !== undefined ? entry.pressure :
                entry.noise_level,
        value2: entry.humidity !== undefined ? entry.humidity :
                entry.wind_speed !== undefined ? entry.wind_speed :
                entry.air_quality
      }));
    
      const legendTitles = mapLegendTitles(sensor.data);
    
      option = {
        legend: {
          data: [`${sensor.sensor_name} - ${legendTitles[0]}`, `${sensor.sensor_name} - ${legendTitles[1]}`], // Nombres de las series en la leyenda
          textStyle: {
            color: '#333' // Color del texto de la leyenda
          }
        },
        tooltip: {},
        toolbox: {
          top: 0,
          feature: {
            dataView: {
              show: false
            },
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          },
          iconStyle: {  
            borderWidth: 1
          },
          emphasis: {
            iconStyle: {}
          }
        },
        xAxis: { 
          type: 'category', 
          data: data.map(entry => `${entry.value1} - ${entry.value2}`) // Mostrar los valores de ambas gráficas concatenados con un guión
        },
        yAxis: {},
        series: [
          {
            type: 'line', 
            name: `${sensor.sensor_name} - ${legendTitles[0]}`, // Nombre de la serie 1
            data: data.map(entry => entry.value1) 
          },
          {
            type: 'line', 
            name: `${sensor.sensor_name} - ${legendTitles[1]}`, // Nombre de la serie 2
            data: data.map(entry => entry.value2) 
          }
        ]
      };
    
      myChart.setOption(option);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    }
    

  
 
}




