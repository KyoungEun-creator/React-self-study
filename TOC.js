import React, { Component } from 'react';

class TOC extends Component {
  shouldComponentUpdate(newProps, newState){    //performance개선 위해
    if (this.props.data === newProps.data) {
      return false;                             //render 호출 X
    } else {
      return true;                              //render 호출 O
    }
  }
    render () {
      var list=[];
      var data=this.props.data;
      var i=0;
      while (i<data.length) {
        list.push(
        <li key={data[i].id}> 
          <a 
            href={"/content/"+data[i].id}
            data-id={data[i].id}
            onClick={function(e){
              e.preventDefault();
              this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}> 
              {data[i].title} 
          </a>
        </li>);  
        i+=1;
      }
      return (
        <nav>
          <ul>
            {list}
          </ul>
        </nav>
      );
    }
  }

export default TOC;