// Your code here
// Create a single employee record from an Array
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

// Create multiple employee records from an Array of Arrays
function createEmployeeRecords(arrays) {
  return arrays.map(record => createEmployeeRecord(record))
}

// Record a Time In event
function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  })
  return employee
}

// Record a Time Out event
function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  })
  return employee
}

// Hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(e => e.date === date)
  let timeOut = employee.timeOutEvents.find(e => e.date === date)
  return (timeOut.hour - timeIn.hour) / 100
}

// Wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
  let hours = hoursWorkedOnDate(employee, date)
  return hours * employee.payPerHour
}

// Total wages for all dates
function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, e) => {
    return total + wagesEarnedOnDate(employee, e.date)
  }, 0)
}

// Payroll for all employees
function calculatePayroll(employees) {
  return employees.reduce((total, e) => {
    return total + allWagesFor(e)
  }, 0)
}

// Export functions for testing
module.exports = {
  createEmployeeRecord,
  createEmployeeRecords,
  createTimeInEvent,
  createTimeOutEvent,
  hoursWorkedOnDate,
  wagesEarnedOnDate,
  allWagesFor,
  calculatePayroll
}
