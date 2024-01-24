import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from 'react';

function App() {
  const buttons = [
    '1','2','3','Back',
    '4','5','6','+',
    '7','8','9','-',
    '=','0','/','*'
  ];

  const [operand1, setOperand1] = useState('');
  const [operator, setOperator] = useState(null);
  const [operand2, setOperand2] = useState('');

  const handleClick = (value) => {
    switch (value) {
      case 'Back':
        // Implement backspace functionality if needed
        if (operator === null) {
          setOperand1((prevOperand1) => prevOperand1.slice(0, -1));
        } else if (operand2 !== '') {
          setOperand2((prevOperand2) => prevOperand2.slice(0, -1));
        } else {
          // If operand2 is empty, backspace on the operator
          setOperator(null);
        }
        break;
      case '=':
        // Implement the calculation logic
        calculateResult();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        // Update the operator
        setOperator(value);
        break;
      default:
        // Update operands based on the current state
        if (operator === null) {
          setOperand1((prevOperand1) => prevOperand1 + value);
        } else {
          setOperand2((prevOperand2) => prevOperand2 + value);
        }
        break;
    }
  };

  const calculateResult = () => {
    // Check if both operands and an operator are present
    if (operand1 !== '' && operator !== null && operand2 !== '') {
      const num1 = parseFloat(operand1);  // Convert operand1 to a number
      const num2 = parseFloat(operand2);  // Convert operand2 to a number
  
      switch (operator) {
        case '+':
          setOperand1(num1 + num2);
          break;
        case '-':
          setOperand1(num1 - num2);
          break;
        case '*':
          setOperand1(num1 * num2);
          break;
        case '/':
          // Check if dividing by zero
          if (num2 !== 0) {
            setOperand1(num1 / num2);
          } else {
            // Handle division by zero error (you can display an error message)
            setOperand1('Error');
          }
          break;
        default:
          // Handle invalid operator
          setOperand1('Error');
          break;
      }
  
      // Reset operator and operand2
      setOperator(null);
      setOperand2('');
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-sm-4 bg-dark'>
          <div className='col m-3'>
            <div className='justify-content-center'>
              <div className="card bg-primary justify-content-center">
                <div className="card-body">
                  <h3 className='float-end'>{operand1} {operator} {operand2}</h3>
                </div>
              </div>
              {buttons.map((button) => (
                <button 
                  key={button}
                  value={button} 
                  type='button' 
                  onClick={() => handleClick(button)}
                  className='btn btn-warning custom mx-1 mt-1 mb-1'
                >
                  {button}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
