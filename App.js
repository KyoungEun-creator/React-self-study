import React, { Component } from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
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
  render() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>  //기존의 ReadContent를 _article이라는 변수에 줌 
    } else if (this.state.mode === 'read') {
      var i = 0;
      while(i<this.state.contents.length) {
        var data=this.state.contents[i]
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i+=1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent> //mode가 'welcome'이든 'article이든 기존 ReadContent
    } else if (this.state.mode === 'create') {
      _article = <CreateContent></CreateContent>
    }
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
          this.setState({
            mode: _mode});
          }.bind(this)}>
        </Control>
        {_article}
      </div>
    );
  }
}

export default App;
