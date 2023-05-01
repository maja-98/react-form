import React, { useEffect, useRef } from "react";
import $ from "jquery";

import { useGetUsersQuery } from "./userAPISlice";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";

const UserTable = () => {
  const tableRef = useRef();
  const { data: userData, isLoading, isError, error } = useGetUsersQuery();

  useEffect(() => {
    if (userData) {
      const table = $("#table").DataTable({
        dom: '<"top"<"left-col"lB><"right-col"f>>rtip',
        data: userData,
        columns: [
          { data: "name", title: "Name" },
          { data: "ageSex", title: "Age/Sex" },
          { data: "mobile", title: "Mobile" },
          { data: "fullAddress", title: "Address" },
          { data: "govtId", title: "Govt ID" },
          { data: "guardian", title: "Guardian Details" },
          { data: "nationality", title: "nationality" },
        ],
        destroy: true,
        searching: true,
        buttons: ["excel", "print"],
        lengthMenu: [10, 20, 30],
      });
      return () => {
        table.destroy();
      };
    }
  }, [userData]);
  let content;
  if (isLoading) {
    content = (
      <div className="d-flex-ccenter">
        <h1>{"Loading..."}</h1>
      </div>
    );
  } else if (isError) {
    content = (
      <div className="d-flex-ccenter">
        <h1>{error.message}</h1>
      </div>
    );
  } else {
    content = (
      <div>
        <table
          className="display"
          width={"100%"}
          id="table"
          ref={tableRef}
        ></table>
      </div>
    );
  }
  return content;
};

export default UserTable;
