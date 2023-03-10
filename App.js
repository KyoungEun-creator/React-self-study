import React, { Component } from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id=3;
    this.state = {
      mode:'welcome',
      selected_content_id: 2,
      subject:{title:'WEB', sub:'World Wide Web'},
      welcome:{title:'Welcome', desc:'Hello, React'},
      contents:[
        {id:1, title:"HTML", desc:"HTML is for information."},
        {id:2, title:"CSS", desc:"CSS is for design."},
        {id:3, title:"JAVASCRIPT", desc:"JAVASCRIPT is for interaction."}
      ]
    }
  }
  getReadContent(){
    var i = 0;
    while(i<this.state.contents.length) {
      var data=this.state.contents[i]
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i+=1;
    }
  }

  getContent(){
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>  //기존의 ReadContent를 _article이라는 변수에 줌 
    } 
      else if (this.state.mode === 'read') {
        var _content = this.getReadContent();
        _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      } 
        else if (this.state.mode === 'create') {
          _article = <CreateContent onSubmit={function(_title, _desc){
            //add content to this.state.contents
            this.max_content_id+=1; 
            // this.state.contents.push(                             오리지널 데이터를 바꿔버림
            //   {id:this.max_content_id, title:_title, desc:_desc}
            // );
            var _contents = this.state.contents.concat(             //오리지널 데이터 변경 없이 새로운 데이터 추가
              {id:this.max_content_id, title:_title, desc:_desc}
            );
            this.setState({
              contents:_contents,
              mode:'read',
              selected_content_id:this.max_content_id 
            })
          }.bind(this)}></CreateContent>
        } 
          else if (this.state.mode === 'update') {
            var _content = this.getReadContent();
            _article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
              var _contents = Array.from(this.state.contents);      //오리지널 데이터 변경 없이 복제해서 새로운 배열을 만들어 사용함
              var i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === _id) {
                  _contents[i] = {id:_id, title:_title, desc:_desc}
                  break;
                }
                i+=1;
              }
              this.setState({
                contents:_contents,
                mode:'read'
              })
            }.bind(this)}></UpdateContent>
          } 
          return _article;
      } 


  render() {
    console.log('App render');
    return (
      <div className="App">
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){       {/* 내가 만든 이벤트 함수 */}
            this.setState({mode:'welcome'});
          }.bind(this)}>
        </Subject>
        <TOC onChangePage={function(id){
          this.setState({
            mode:'read', 
            selected_content_id:Number(id)
          });
        }.bind(this)} 
        data={this.state.contents}>
        </TOC>
        <Control onChangeMode={function(_mode){
          if (_mode === 'delete') {
            if(window.confirm('Really?')) {      //정말 삭제할 건지 확인
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i,1);  //어디서부터 어디까지 지울 것인가
                  break;
                }
                i+=1;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('delete complete');
            } 
          } else {
            this.setState({
              mode:_mode
            });
          }
        }.bind(this)}></Control>
        {this.getContent()}
       </div>
    );
  }
}

export default App;
