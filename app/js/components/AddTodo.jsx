import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions';
import { getErrorMessage } from '../store/byId';

class AddTodo extends Component {
  componentDidUpdate() {
    console.log('hi');
  }

  render() {
    let input;
    const { dispatch, error } = this.props;
    return (
      <div>
        <input ref={node => {
          input = node;
        }} />
        <button onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
        }}>
          Add Todo
            </button>
        <div>{!!error ? error : ""}</div>
      </div>
    );
  }
}
// ({ dispatch, error }) => {
//   let input;
//   console.log(error);
//   
// };
const mapStateToProps = (state) => ({
  error: getErrorMessage(state),
});
export default connect(mapStateToProps)(AddTodo);