var React = require('react');

var ProgressModal = React.createClass({

  getPercentValue() {
    return Math.round((this.props.value * 100) / this.props.maxValue);
  },

  render: function() {
    return (
      <form role="dialog" data-type="confirm">
        <section>
          <h1>Downloading map area...</h1>
          <p role="status"><span>{this.getPercentValue()}%</span></p>
          <progress value={this.props.value} max={this.props.maxValue}></progress>
        </section>
        <menu><button className="full" onClick={this.props.onCancel}>Cancel</button></menu>
      </form>
    );
  }
});

module.exports = ProgressModal;
