'use strict';

import React from 'react';
import CommentList from './CommontList';
import CommentForm from './CommontFrom';
import $ from 'jquery';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []}; // 初始化状态
    this.getComments();
    // setInterval(() => this.getComments(), 5000);
  }

  handleCommentSubmit(comment) {
    let comments = this.state.data,
        newComments = comments.concat(comment);
    this.setState({data: newComments});
  }
  
  getComments() {
    // 引入jquery的ajax
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: comments => {
        this.setState({data: comments})
      },
      error: (xhr, status, error) => {
        console.log(error);
      }
    });
  }

  render() {
    return(
      <div className="ui comments">
        <h1>评论</h1>
        <div className="ui divider"></div>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
      </div>
    );
  }
}

export { CommentBox as default }