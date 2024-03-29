import axios from "axios"
import { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import { SaleSucess } from "types/sale"
import BASE_URL from "utils/request"
import { round } from "utils/format"
type SeriesData = {
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[]
}

const BarChat = () => {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    })


    useEffect(() => {
        axios.get(`${BASE_URL}/sales/sucess-by-seller`).then(
            response => {
                const data = response.data as SaleSucess[];
                const MyLabels = data.map(x => x.sellerName);
                const MySeries = data.map(x => round(100 * x.deals / x.visited, 1));

                setChartData({
                    labels: {
                        categories: MyLabels
                    },
                    series: [
                        {
                            name: "% Sucess",
                            data: MySeries
                        }
                    ]
                })
            }
        );

    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
    };


    return (
        <Chart
            options={{
                ...options, xaxis: chartData.labels
            }}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}

export default BarChat;

