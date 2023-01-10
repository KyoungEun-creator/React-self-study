import React, { Component } from 'react';

class Subject extends Component {
    render () {
      return (        
        <header>
          <h1><a href="/" onClick={function(e){
            e.preventDefault();                 {/* 링크 클릭했을 때 페이지가 바뀌는 것 방지 */}
            this.props.onChangePage();          {/* 함수 호출 */}
          }.bind(this)}> {this.props.title} </a></h1>
          {this.props.sub}
        </header>  
      );
    }
  }

export default Subject;