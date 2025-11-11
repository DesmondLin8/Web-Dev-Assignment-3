/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {
    super();
    this.state = {
      accountBalance: 0,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
    };
  }

  /*-----------------------------------
   Fetch data from the API after mount
  -----------------------------------*/
  async componentDidMount() {
    try {
      // Fetch both credits and debits from the given URLs
      const creditsResponse = await fetch('https://johnnylaicode.github.io/api/credits.json');
      const debitsResponse = await fetch('https://johnnylaicode.github.io/api/debits.json');

      const creditsData = await creditsResponse.json();
      const debitsData = await debitsResponse.json();

      // Calculate totals
      const totalCredits = creditsData.reduce((acc, item) => acc + item.amount, 0);
      const totalDebits = debitsData.reduce((acc, item) => acc + item.amount, 0);

      const accountBalance = totalCredits - totalDebits;

      // Update state
      this.setState({
        creditList: creditsData,
        debitList: debitsData,
        accountBalance: accountBalance,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  /*-----------------------------------
   Add a new Credit
  -----------------------------------*/
  addCredit = (credit) => {
    const newCredit = {
      description: credit.description,
      amount: parseFloat(credit.amount),
      date: new Date().toISOString(),
    };

    this.setState((prevState) => {
      const updatedCredits = [...prevState.creditList, newCredit];
      const newBalance = (
        parseFloat(prevState.accountBalance) + newCredit.amount
      ).toFixed(2);

      return {
        creditList: updatedCredits,
        accountBalance: parseFloat(newBalance), // store as number
      };
    });
  };

  /*-----------------------------------
   Add a new Debit
  -----------------------------------*/
  addDebit = (debit) => {
    const newDebit = {
      description: debit.description,
      amount: parseFloat(debit.amount),
      date: new Date().toISOString(),
    };

    this.setState((prevState) => {
      const updatedDebits = [...prevState.debitList, newDebit];
      const newBalance = (
        parseFloat(prevState.accountBalance) - newDebit.amount
      ).toFixed(2);

      return {
        debitList: updatedDebits,
        accountBalance: parseFloat(newBalance),
      };
    });
  };


  /*-----------------------------------
   Mock login function 
  -----------------------------------*/
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  /*-----------------------------------
   Render all routes
  -----------------------------------*/
  render() {
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        accountBalance={this.state.accountBalance}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        addDebit={this.addDebit}
        accountBalance={this.state.accountBalance}
      />
    );

    return (
      <Router basename="/Web-Dev-Assignment-3">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
