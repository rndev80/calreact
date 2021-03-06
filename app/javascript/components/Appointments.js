import React from "react"
import PropTypes from "prop-types"
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: props.appointments,
    };
  }

  componentDidMount() {
    if (this.props.match) {
      $.ajax({
        type: 'GET',
        url: `/appointments`,
        dataType: 'JSON',
      }).done(data => {
        this.setState(prevState => ({
          ...prevState,
          appointments: data,
        }))
      });
    }
  }
  
  addNewAppointment = appointment => {
    const appointments = [
      ...this.state.appointments,
      appointment,
    ];
    this.setState(prevState => ({
      ...prevState,
      appointments: appointments.sort((a, b) => (new Date(a.appt_time) - new Date(b.appt_time))),
    }));
  };

  render () {
    const { appointments } = this.state;
    const { addNewAppointment } = this;
    return (
      <React.Fragment>
        <AppointmentForm handleNewAppointment={addNewAppointment} />
        <AppointmentList appointments={appointments} />
      </React.Fragment>
    );
  }
}

Appointments.propTypes = {
  appointments: PropTypes.array
};

Appointments.defaultProps = {
  appointments: [],
};
export default Appointments
