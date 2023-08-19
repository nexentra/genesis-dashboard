import React from "react";
import PropTypes from "prop-types";

// components

import TableDropdown from "./TableDropdown";
import { Link } from "react-router-dom";

export default function CustomCardTable(props) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (props.color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-nowrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (props.color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                {props?.getData?.name}
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <div className="flex flex-row space-x-4 justify-end">
            <Link
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                to={"/admin/customdata/add/"+ props.schema_id}
              >
                Add Data
              </Link>
              <Link
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => {
                  props.deleteMyCustom(props.schema_id);
                }}
              >
                Delete Table
              </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {props?.getData?.field_names?.map((field, index) => (
                  <>
                    <th
                      key={field}
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (props.color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      {field}
                    </th>
                  </>
                ))}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (props.color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Actions
                </th>
              </tr>
            </thead>
            {props.getData.data.map((data) => (
              <tr>
                {Object.entries(data).map(([key, value]) => (
                  <>
                    {
                      key !== "id" && <td key={key}>{value}</td>
                    }
                  </>
                ))}
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4 text-right">
                  <TableDropdown
                    deleteFunc={props.deleteMyDatas}
                    id={data.id}
                    schema_id={props.schema_id}
                  />
                </td>
              </tr>
            ))}
            {/* {
              props.getData.map((data) =>
              <tbody key={data.id}>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4 text-left flex items-center">
                  <img
                    src={data.institution_icon}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(props.color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    {data.institution_name}
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                {data.institution_title}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">{data.institution_progress}</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                        <div
                          style={{ width: data.institution_progress }}
                          className="shadow-none flex flex-col text-center whitespace-wrap text-white justify-center bg-red-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                <a href={data.institution_links} target="_blank">{data.institution_links}</a>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap text-ellipsis p-4">
                {data.education_level}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap text-ellipsis p-4">
                {data.education_period_from}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap text-ellipsis p-4">
                {data.education_period_to}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap text-ellipsis p-4">
                {data.study_motivation}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap text-ellipsis p-4">
                {data.institution_description}
                </td>
                
              </tr>
            </tbody>
            )
            } */}
          </table>
        </div>
      </div>
    </>
  );
}

CustomCardTable.defaultProps = {
  color: "light",
};

CustomCardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
