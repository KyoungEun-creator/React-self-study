import React, { Component } from 'react';

class TOC extends Component {
    render () {
      var list=[];
      var data=this.props.data;
      var i=0;
      while (i<data.length) {
        list.push(<li key={data[i].id}><a href={"/content/"+data[i].id}> {data[i].title} </a></li>);  
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