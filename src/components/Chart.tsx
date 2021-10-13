import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

interface TimeProps {
  times: any;
}
const Chart = ({ times }: TimeProps) => {
  const [lables, setLables] = useState();
  const [confirmed, setConfirmed] = useState<any>([]);
  const [deaths, setDeaths] = useState<any>([]);
  const [recovered, setRecovered] = useState<any>([]);
  const getDataTimes = () => {
    if (times) {
      const { timeseries } = times;
      const lable: any = Object.keys(timeseries);
      setLables(lable);
      let comfirmeds: any = [];
      let deaths: any = [];
      let recovered: any = [];

      for (let date in timeseries) {
        comfirmeds.push(timeseries[date].confirmed);
        deaths.push(timeseries[date].deaths);
        recovered.push(timeseries[date].recovered);
      }
      setConfirmed(comfirmeds);
      setDeaths(deaths);
      setRecovered(recovered);
    }
  };
  useEffect(() => {
    getDataTimes();
  }, [times]);
  return (
    <>
      {times && (
        <Line
          data={{
            labels: lables,
            datasets: [
              {
                data: confirmed,
                label: "Comfirmed",
                borderColor: "#3e95cd",
                fill: false,
              },
              {
                data: deaths,
                label: "Deaths",
                borderColor: "#8e5ea2",
                fill: false,
              },
              {
                data: recovered,
                label: "Recovered",
                borderColor: "#3cba9f",
                fill: false,
              },
            ],
          }}
        />
      )}
    </>
  );
};
export default Chart;
