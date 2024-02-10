/* eslint-disable no-unused-vars */
import React from 'react'
import Table from '../components/utils/Table'
import { createColumnHelper } from '@tanstack/react-table';

const data = [
    {
        name: "Hein",
        email: "htz@gmail.com",
        phNo: "0986789678",
        address:"Yangon"
    },
    {
        name: "Zwe",
        email: "zwe@gmail.com",
        phNo: "0986789678",
        address:"Yangon"
    },
];

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("name", {
        header: () => "Name"
    }),
    columnHelper.accessor("email", {
        header: () => "Email"
    }),
    columnHelper.accessor("phNo", {
        header: () => "Phone Number"
    }),
    columnHelper.accessor("address", {
        header: () => "Address"
    }),
    columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (<div>
                <button>
                    click 1
                </button>
                <button>
                    click 2
                </button>
            </div>);
        }
    }),
]

export const UserTable = () => {
    return (
      <Table data={data} columns={ columns } />
  )
}
