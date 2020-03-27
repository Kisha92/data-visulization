import React from 'react';
//import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import {data} from './data.js';
import './demo.css';


class Demo extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			source: [],
			timeStamp: null,
		}

	}

	componentDidMount() {
		this.getData();
	}

	getData = () => {
		//通过ajax请求获取数据然后创建图表
		// axios.get().then((res) => {

		// });
		console.log(data);
		var result  = data.result;
		var timeStamp = data.timeStamp;
		console.log(result, 'result');
		var source = [];

		result.map(item => {
			var _result = {};

			_result['title'] = item['主题'];
			_result['label'] = [];
			_result['data'] = [];
			item['媒体'].map(i => {
				let name = i['名称'];
				let report = i['报道量'];
				let detail = i['标题'];
				let _data = {};
				_result['label'].push(name);
				_result[name] = report;
				_data['name'] = name;
				_data['value'] = report;
				_data['detail'] = detail;
				_result['data'].push(_data);

			})
			source.push(_result);
		})
		console.log(source, 'source');

		this.setState({source, timeStamp});



	}
	getOption = (chart) => {
		let option = {
			title: {
				text: chart.title,
				left: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: function(params) {
					            let data = params.data;
								let res = `${params.seriesName} ${data.name} : ${data.value} <br/> 详情：<br/>`;
								let detail = '';
								data.detail.map(i => {
									detail = detail + `${i.published}   ${i.title} <br/> `
								})
					            console.log(detail, 'deatil');
								return `${params.seriesName} ${data.name} : ${data.value} <br/> 详情：<br/> ${detail}`
							},
			},
			legend: {
				orient: 'vertical',
				left: 'left',
				data: chart.label,
			},
			series: [
				{
					name: '新闻报道量',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data:  chart.data,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}
			]
		};
		return option;

	}


	render() {
		const {source} = this.state;
		return(
			<div className="container">
				<h1>热点新闻报道量统计</h1>
				{
					source.map(chart => {
						return(
							<div className="pie-chart">
								<ReactEcharts option={this.getOption(chart)}/>
							</div>
						)
					})
				}
			</div>
		)
	}
}


export default Demo;