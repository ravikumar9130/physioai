import axios from "axios";
import { useEffect, useMemo ,useState} from "react";
import { useTable, useSortBy, usePagination } from "react-table";

import { useNavigate } from "react-router-dom";

function Dashboard() {
const Navigate = useNavigate()
  const [Data, setData] = useState([]);
  const getData = async () => {
    const res = await axios.post(
      `https://myphysio.digitaldarwin.in/api/get-patient/`, {"id":1},{
        headers: {
            Cookie: "csrftoken=q0FqcIRO1do5fs8c7A5xOA0tq9PwYicn24k7Ajv7AX0oVn9FUgUwI7WLtUwXxVXE; sessionid=wjtbes2w68vagjm123nj7jreughzpzhf; jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.bdfW8B6lG7RhPmHCtO6rPgf3IYlDwAJc7LUKtfTE2eU; "
        }
    }
    );
    if (res) {

      
      const data = res.data;
     

      setData(data);

    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const tableData = useMemo(() => [...Data], [Data]);
  const tableColumns = useMemo(
    () =>[
    
    
      
        {
          Header: 'Patient Code',
          accessor: 'patient_code',
        },
        {
          Header: 'Name',
          accessor: 'first_name',
        },
        {
          Header: 'Date of Birth',
          accessor: 'dob',
        },
        {
          Header: 'Mobile No',
          accessor: 'mobile_no',
        },
        
      ],
   
    [Data]
  );

 
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: tableColumns,
      data: tableData,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );
  return (
  <div>
    <table className="table  m-auto" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="text-center" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-3 "
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="text-center" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="p-3 mx-3 text-center">
       
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <div className="btn">
        <button onClick={()=>{ localStorage.removeItem('token')
      Navigate("/")}}>Log out</button>
      </div>
  </div>
  )
}

export default Dashboard;
