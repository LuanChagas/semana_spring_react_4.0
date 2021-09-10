import axios from "axios"
import Chart from "react-apexcharts"
import BASE_URL from "utils/request"
import { SaleSum } from "types/sale"
import { useEffect, useState } from "react"
type ChartData = {
    labels: string[];
    series: number[];
}
const DonutChat = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] })


    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`).then(
            response => {
                const data = response.data as SaleSum[];
                const MyLabels = data.map(x => x.sellerName);
                const MySeries = data.map(x => x.sum);

                setChartData({ labels: MyLabels, series: MySeries })
            }
        );

    }, [])


    const options = {
        legend: {
            show: true
        }
    }
    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChat
    ;