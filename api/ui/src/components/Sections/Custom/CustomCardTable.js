import React from "react";
import PropTypes from "prop-types";
import TableDropdown from "./TableDropdown";
import { Link } from "react-router-dom";
export default function CustomCardTable(props) {
  const truncate = (str) => {
    return str.length > 35 ? str.substring(0, 35) + "..." : str;
  };
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
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-center"
                  to={"/admin/customdata/add/" + props.schema_id}
                >
                  Add Data
                </Link>
                <Link
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-center"
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
                  {/* Actions */}
                </th>
              </tr>
            </thead>
            {props.getData.data.map((data) => (
              <tr>
                {props?.getData?.field_names?.map((field) => (
                  <>{field !== "id" && <td className="px-6 align-middle py-3 text-xs uppercase whitespace-nowrap font-semibold text-left"  key={field}>{truncate(data[field])}</td>}</>
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
