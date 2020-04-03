import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import '../App.css';

import TableEmployee from './TableEmployee';

class Report extends React.Component {

  constructor() {
    super();
    this.state = {
      people: [] //ovdje treba uzeti sav sadrzaj tabele, to je ono employees iz state-a u TableEmployee
    }
  };

  exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Employee report";
    const headers = [["Name", "Surname", "Email", "Address", "Phone number", "Country", "City"]];

    const data = this.state.people.map(elt => [elt.name, elt.surname, elt.email, elt.address, elt.phoneNumber, elt.country, elt.city]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf")
  }

  render() {
    return (
      <div>
        <button onClick={() => this.exportPDF()}>Generate Report</button>
      </div>      
    );
  }
}

export default Report;