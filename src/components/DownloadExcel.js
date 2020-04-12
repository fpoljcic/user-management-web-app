import React from "react";
import { Button } from 'antd';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class DownloadExcel extends React.Component {
    render() {
        return (
            <ExcelFile filename={this.props.filename} element={(<Button style={{ marginLeft: '5px' }}> Export log to excel </Button>)}>
                <ExcelSheet data={this.props.data} name="Log">
                    <ExcelColumn label="Date" value={(col) => col.timestamp.split(" ")[0]} />
                    <ExcelColumn label="Time" value={(col) => col.timestamp.split(" ")[1]} />
                    <ExcelColumn label="Username" value="username" />
                    <ExcelColumn label="Action" value="name" />
                    <ExcelColumn label="Object" value="object" />
                    <ExcelColumn label="Description" value="description" />
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default DownloadExcel;