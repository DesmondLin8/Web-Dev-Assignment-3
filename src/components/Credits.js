/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';

const Credits = (props) => {
  // Create the list of Credit items
  const creditsView = () => {
    return props.credits.map((credit, index) => {
      let date = credit.date.slice(0, 10); // format yyyy-mm-dd
      return (
        <li key={index}>
          ${credit.amount.toFixed(2)} — {credit.description} ({date})
        </li>
      );
    });
  };

  // Render the page
  return (
    <div>
      <h1>Credits</h1>
      <h3>Account Balance: ${props.accountBalance.toFixed(2)}</h3>

      <ul>{creditsView()}</ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const description = e.target.description.value;
          const amount = parseFloat(e.target.amount.value);
          props.addCredit({ description, amount });
          e.target.reset();
        }}
      >
        <input
          type="text"
          name="description"
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          step="0.01"
          required
        />
        <button type="submit">Add Credit</button>
      </form>

      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;