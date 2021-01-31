const headerTemplate = document.createElement('template');
headerTemplate.innerHTML = `
<style> 
  .logo {
    float: left;
    margin-top: 15px;
    margin-left: 20px;
  }

  nav a {
    color: white;
    font-size: 18px;
    font-weight: bold;
    transition: 0.3s ease;
  }

  nav a:hover {
    text-decoration: none;
    color: white;
    text-shadow: -1px 0px 11px red;
  }
  
  nav a img {
    width: 50px;
  }

  .menu {
    padding-top: 40px;
    padding-bottom: 20px;
    display: flex;
    justify-content: flex-end;
    margin-left: 10px;
  }
  
  .nav-button {
    margin-left: 10px;
    margin-right: 10px;
  }

  .btn-sm {
    padding: 10px 20px;
    font-size: 15px;
    line-height: 1.5;
  }

  .btn-sm:hover {
    box-shadow: 0 5px 15px rgb(47, 121, 231);
    font-weight: bold;
  }
  
  .btn :active{
    background:
  }
  
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    height: 120px;
    z-index: 1000;
    background: rgb(71, 13, 13);
    background: linear-gradient(
      357deg,
      rgba(71, 13, 13, 0.404096672848827) 0%,
      rgba(71, 13, 13, 1) 100%
    );
  }
  
  .search-bar {
    float: left;
    margin-left: 20%;
    margin-top: 40px;
  }
  
  .search-input {
    width: 500px;
    border-radius: 20px;
    padding: 5px 15px;
    font-weight: bold;
    color: rgba(71, 13, 13, 1);
    border: none;

    transition: 0.3s ease;
  }

  .search-input:hover {
    box-shadow: 0 5px 15px rgb(47, 121, 231);
    background-color: rgb(198, 232, 255);
  }
</style>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
    integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

  <header>

    <nav>
      <div class="logo">
        <a href="../home/home.html">
          <img src="https://cdn.pixabay.com/photo/2013/07/13/11/21/folder-158012_960_720.png"/>
          <h1>iMovies</b>
        </a>
      </div>

      <div class = search-bar>
        <input type="text" class="search-input" placeholder="Cautati dupa titlu">
      </div>

    <div class="menu">
    <a href="../search/search.html" class="nav-button btn btn-light btn-sm rounded-pill">Search</a>
    <a href="../loginRegister/LogInRegister.html" class="nav-button btn btn-light btn-sm rounded-pill padding">Login</a>
   
    </div>
    </nav>

  </header>
`;

class Header extends HTMLElement {

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(headerTemplate.content);
  }
}
customElements.define('header-component', Header);