import React from "react";
import { Brief } from "../types/brief.type";

interface DataProps {
  data: Brief;
}
const ShowData = ({ data }: DataProps) => {
  return (
    <div className="d-flex worldwide">
      <div className="comfirmed">
        <h6> Comfirmed </h6>
        <h6> {data.confirmed} </h6>
      </div>

      <div className="deaths">
        <h6> Deaths </h6>
        <h6> {data.deaths} </h6>
      </div>

      <div className="recovered">
        <h6> Recovered </h6>
        <h6>{data.recovered}</h6>
      </div>
      <div className="fatality">
        <h6> Fatality rate </h6>
        <h6>{((data.deaths / data.confirmed) * 100).toFixed(2)} %</h6>
      </div>
    </div>
  );
};

export default ShowData;
