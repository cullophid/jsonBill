'use strict';
import R from 'ramda';
import React from 'react';
import billService from  '../services/billService';

const renderRow = R.curry((prop, item) => {
  return (
    <tr>
      <td>{item[prop]}</td>
      <td>{item.cost}</td>
    </tr>
  );
})

const renderTable = R.curry((renderFunc, items) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>
      {R.map(renderFunc, items)}
    </table>
  )
});

export default React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    billService.getBill()
      .then(bill => this.setState({bill}));
  },

  render () {
    if (!this.state.bill) {
      return (<article className="panel panel-default" No data></article>);
    }
    
    const {statement, total, skyStore, callCharges} = this.state.bill;
    const pack = this.state.bill.package; // because package is a reserved word

    return (
      <article className="panel panel-default">
        <header className="panel-heading">
          <span className="pull-right">Date: {statement.generated}</span>
          <h1>Give sky money</h1>
          <div>for period {statement.period.from} to {statement.period.to}</div>
        </header>

        <section className="panel-body">
          <h1 className="section-title">Package</h1>
          {renderTable(renderRow('name'), pack.subscriptions)}
          <div>Package Total: {pack.total}</div>
        </section>

        <section className="panel-body">
          <h1 className="section-title">Sky Store</h1>
          {renderTable(renderRow('title'), R.concat(skyStore.rentals, skyStore.buyAndKeep))}
          <div>Sky Store Total: {skyStore.total}</div>
        </section>

        <section className="panel-body">
          <h1 className="section-title">Package</h1>
          {renderTable(renderRow('name'), pack.subscriptions)}
          <div>Package Total: {pack.total}</div>
        </section>

        <section className="panel-footer clearfix">
          <h2 className="">Total: {total}</h2>
          <div className="">Payment due: {statement.due}</div>
        </section>
      </article>
    );
  },
})
