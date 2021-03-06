import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
  state = {
    username: '',
    email: '',
    pass:'',
    accept: false,
    message:'',

    errors: {
    username: false,
    email: false,
    pass: false,
    accept: false,

    }
  }

  messages = {
    username_incorrect: 'Nazwa musi być dłuższa niż 10 znaków i nie może zawierać spacji',
    email_incorrect: 'Brak @ w emailu',
    password_incorrect: 'Hasło musi miec 8 znaków',
    accept_incorrect: 'Brak akceptacji regulaminu'
  }

  handleChange = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    if(type === "text" || type === "password" || type==="email"){
    const value = e.target.value;
    // const chacked = e.target.checked;
    this.setState({
      [name]: value,
    })
  } else if (type === "checkbox") {
    const checked = e.target.checked;
    // const chacked = e.target.checked;
    this.setState({
      [name]: checked,
    })
  }
}
  handleSubmit = (e) => {
    e.preventDefault()

    const validation = this.formValidation()
    if(validation.correct) {
      this.setState({
        username: '',
        email: '',
        pass:'',
        accept: false,
        message: 'Formularz został wysłany',
        errors: {
        username: false,
        email: false,
        pass: false,
        accept: false,
        }
      })
    } else {
      this.setState({
        errors: {
          username: !validation.username,
          email: !validation.email,
          pass: !validation.password,
          accept: !validation.accept,
        }

      })
    }
  }

  formValidation = () => {
    let username = false;
    let email = false;
    let password = false;
    let accept = false;
    let correct = false;

    if(this.state.username.length > 10 && this.state.username.indexOf(' ') === -1) {
      username = true;
    }
    if(this.state.email.indexOf('@') !== -1) {
      email = true;
    }
    if(this.state.pass.length === 8) {
      password = true;
    }

    if(this.state.accept) {
      correct = true;
    }

    if(username && email && password && accept) {
      correct = true;
    }
    return ({
      correct,
      username,
      email,
      password,
      accept
    })
  }

  componentDidUpdate() {
    if(this.state.message ==! '') {
      setTimeout(() => this.setState({
        message: ''
      }), 3000)
    }
  }


  render(){
  return (
    <div className="App container-fluid" > 
     <form onSubmit={this.handleSubmit} noValidate>

        <div className="form-group row">
       <label htmlFor="user" className="form-group"> Twoję imię:
        
         <input type="text" id="user" name="username" className="form-control"
         value={this.state.username}
         onChange={this.handleChange}/>
        
         {this.state.errors.username && 
        <span className="text-muted">{this.messages.username_incorrect}</span>}
       </label>
       </div>

        <div className="form-group row">
       <label htmlFor="user" className="form-group"> Twój email:
         <input type="email" id="email" name="email" className="form-control"
         value={this.state.email}
         onChange={this.handleChange}/>
         {this.state.errors.email && 
  <span className="text-muted">{this.messages.email_incorrect}</span>}
       </label>
       </div>

        <div className="form-group row">
       <label htmlFor="password" className="form-group"> Twoje hasło:
         <input type="password" id="password" name="pass" className="form-control"
         value={this.state.pass}
         onChange={this.handleChange}/>
         {this.state.errors.pass && 
          <span className="text-muted">{this.messages.password_incorrect}</span>}
       </label>
       </div>

       <div className="form-group row">
       <label htmlFor='accept'>
         <input type="checkbox" id="accept" name="accept" 
         checked={this.state.accept} onChange={this.handleChange}/> Akceptuję regulamin
       </label>
       {this.state.errors.accept && 
      <span className="text-muted">{this.messages.accept_incorrect}</span>}
      </div>

       <button className="btn btn-primary">Zapisz się</button>
     </form>
     {this.state.message && <h3 className="alert alert-success">{this.state.message}</h3> }
    </div>
  );
  }
}

export default App;
