import React, { Component } from 'react';

class UpdateContent extends Component {
    render () {
      console.log(this.props.data);
      console.log('UpdateContent render');
      return (
        <article>
          <h2>Update</h2>                                                      {/* action:사용자가 입력한 정보 전송할 장소, method:url에 노출 안 되도록*/}
          <form action="/create_process" method="post"                         
            onSubmit={function(e){
              e.preventDefault();
              this.props.onSubmit(
                e.target.title.value,
                e.target.desc.value
              );
            }.bind(this)}>
            <p><input type="text" name="title" placeholder="title"></input></p>
            <textarea name="desc" placeholder="description"></textarea>         {/* 입력할 텍스트가 여러 줄일 때 사용 */}
            <p><input type="submit"></input></p>
          </form>
        </article>
      );
    }
  }

export default UpdateContent;