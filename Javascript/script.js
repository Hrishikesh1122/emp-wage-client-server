/*
Purpose :- Contains all the javascript functons for employee wage page.
@author :- Hrishikesh
@Version :- 1.0
@Since :- 16/07/2021
*/

//Simple class model for an employee
class EmployeePayroll{
    get name() {
        return this._name;
    }

    get gender() {
        return this._gender;
    }

    get department() {
        return this._department;
    }

    get salary() {
        return this._salary;
    }

    get startDate() {
        return this._startDate;
    }

    get notes() {
        return this._notes;
    }

    set name(value) {
        let re = new RegExp('[A-Z]+[a-z]{2,}')
        let match = re.test(value)
        if(match){this._name=value;}
        else{alert("Invalid first name , enter again")
        throw new Error("Invalid first name")
        }
    }

    set department(department) {
        this._department = department;
    }

    set salary(salary) {
        this._salary = salary;
    }

    set gender(gender) {
        this._gender = gender;
    }

    set startDate(startDate) {
          this._startDate = startDate;
    }

    set notes(notes) {
          this._notes = notes;
    }

    constructor(...params){
        this.name = params[0];
        this.gender=params[1];
        this.department = params[2];
        this.salary = params[3];
        this.startDate = params[4];
        this.notes = params[5];     
    }
    toString(){
        return ("Name : "+this.name+" Gender : "+this.gender+" Departments : "+this.department+" Salary : "+this.salary+" StartDate : "
        +this.startDate +" Notes : "+this.notes); 
    }
}

//This method displays salary when user selects it from rangebar
const salary = document.querySelector('#salary')
const output = document.querySelector('.salary-output')
output.textContent = salary.value;
salary.addEventListener('input',function(){
         output.textContent = salary.value;
        });


//On click submit this method creates a Employeepayroll object
function save(){
    let empList =[];
    console.log("Hello")
    let name = document.querySelector('#name').value;
    let gender = document.querySelector('input[name=gender]:checked').value;
    let departments = document.querySelectorAll('input[name=dept]:checked');
    let deptArray=[];
    departments.forEach((department)=>{
        deptArray.push(department.value)
    })
    let salary = document.querySelector('#salary').value
    let day = document.querySelector('#day').value
    let month = document.querySelector('#month').value
    let year = document.querySelector('#year').value
    let dateStr = `${day}-${month}-${year}`;
    let parts = dateStr.split('-');
    let startDate = new Date(
        parseInt(parts[2]),
        parseInt(parts[1])-1,
        parseInt(parts[0])
    )
    let notes = document.querySelector('#notes').value

    try{
    let employee = new EmployeePayroll(name,gender,deptArray,salary,startDate,notes)
    createLocalStorage(employee);
    }
    catch (E){
        console.error(E)
    }
    
}

//This method saves employee payroll data as local storage
function createLocalStorage(employee){
    let empPayrollLocal = JSON.parse(localStorage.getItem("empListLocal"));
    if(empPayrollLocal != undefined){
        empPayrollLocal.push(employee);
    } else {
        empPayrollLocal = [employee]
    }
    alert(empPayrollLocal.toString());
    localStorage.setItem("empListLocal",JSON.stringify(empPayrollLocal));
}

//Function to reset the form to original state
const resetForm = () => {
    setValue('#name', '');
    unSetSelectedValues('[name=profile]');
    unSetSelectedValues('[name=gender]');
    unSetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setTextValue('#salary-op', '400000');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2020');
    
}

const unSetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}