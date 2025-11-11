/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from 'react-router-dom';

const Debits = (props) => {
  // Render the list of Debit items
  const debitsView = () => {
    return props.debits.map((debit, index) => {
      const date = debit.date.slice(0, 10);
      return (
        <li key={index}>
          ${debit.amount.toFixed(2)} — {debit.description} ({date})
        </li>
      );
    });
  };

  return (
    <div>
      <h1>Debits</h1>
      <h3>Account Balance: ${props.accountBalance.toFixed(2)}</h3>

      <ul>{debitsView()}</ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const description = e.target.description.value;
          const amount = parseFloat(e.target.amount.value);
          props.addDebit({ description, amount }); // call prop function
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
        <button type="submit">Add Debit</button>
      </form>

      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;