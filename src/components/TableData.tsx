import React from "react";
import { Table } from "react-bootstrap";
import { Brief } from "../types/brief.type";
interface Props {
  data: Brief;
}

const TableData = ({ data }: Props) => {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>confirmed</th>
          <th>deaths</th>
          <th>recovered</th>
          <th>fatality rate</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{data.confirmed}</td>
          <td>{data.deaths}</td>
          <td>{data.recovered}</td>
          <td>{((data.deaths / data.confirmed) * 100).toFixed(2)} %</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default TableData;
